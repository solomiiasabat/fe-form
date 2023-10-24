import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { DataService } from './service/data.service';
import { minArrayLength } from './shared/hobby-validator';

/**
 * This component handles the frontend engineer form.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  /** Available technologies and their versions */
  techData = {
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  };

  /** Form for frontend engineer */
  frontendEngineerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: [null, Validators.required],
    feTechnology: [null, Validators.required],
    feTechnologyVersion: [{ value: '', disabled: true }, Validators.required],
    email: ['', [Validators.required, Validators.email]],
    hobbies: this.fb.array([], [minArrayLength(1)]),
  });

  /** List of user emails */
  userEmails: string[] = [];

  /** Observable to handle component destruction for unsubscribe */
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private data_service: DataService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.subscribeToTechValueChanges();
    this.fetchUserEmails();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Handle form submission. Validates email against the existing email list.
   */
  onSubmit(): void {
    const emailValue = this.frontendEngineerForm.get('email')?.value || '';
    this.userEmails.includes(emailValue)
      ? alert('Ooops! This email already exists. Use a new one')
      : this.handleSuccessfulSubmit();
  }

  /**
   * Retrieves the 'hobbies' FormArray from the 'frontendEngineerForm'.
   */
  get hobbies(): FormArray {
    return this.frontendEngineerForm.get('hobbies') as FormArray;
  }

  /**
   * Adds an empty and required hobby control to the 'hobbies' form array.
   */
  addHobby(): void {
    this.hobbies.push(this.fb.control('', Validators.required));
  }

  /**
   * Listens for changes in 'feTechnology' and updates the 'feTechnologyVersion' field accordingly.
   */
  private subscribeToTechValueChanges(): void {
    this.frontendEngineerForm
      .get('feTechnology')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((tech) => {
        const feTechVersionControl = this.frontendEngineerForm.get(
          'feTechnologyVersion'
        );
        tech ? feTechVersionControl?.enable() : feTechVersionControl?.disable();
        feTechVersionControl?.setValue('');
      });
  }

  /**
   * Fetches user emails from `data_service` and stores them in `userEmails`.
   */
  private fetchUserEmails(): void {
    this.data_service
      .getAllUsers()
      .pipe(take(1))
      .subscribe((response) => {
        this.userEmails = response.users.map((user) => user.email);
      });
  }

  /**
   * Handles successful form submission, transforms data and logs it.
   */
  private handleSuccessfulSubmit(): void {
    const { dateOfBirth, ...rest } = this.frontendEngineerForm.value;
    const transformedValues = {
      ...rest,
      dateOfBirth: this.transformDate(dateOfBirth),
    };
    console.log(transformedValues);

    alert('Your form is successfully submitted!');
    this.frontendEngineerForm.reset();
  }

  // Utility method to transform date using DatePipe
  private transformDate(date: Date | null | undefined): string | null {
    return date ? this.datePipe.transform(date, 'dd-MM-yy') : null;
  }
}

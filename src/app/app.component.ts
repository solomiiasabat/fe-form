import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { DataService, UsersAPIResponse } from './service/data.service';

/**
 * This component handles the frontend engineer form.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  /** Title of the form */
  title = 'fe-form';

  /** List of user emails */
  userEmails: string[] = [];

  /** Observable to handle component destruction for unsubscribe */
  private destroy$ = new Subject<void>();

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
  });

  constructor(private fb: FormBuilder, private data_service: DataService) {}

  ngOnInit(): void {
    this.listenToTechValueChanges();
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
      ? alert('Error: This email already exists!')
      : console.log(this.frontendEngineerForm.value);
  }

  private listenToTechValueChanges(): void {
    this.frontendEngineerForm
      .get('feTechnology')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((tech) => {
        const feTechVersionControl = this.frontendEngineerForm.get(
          'feTechnologyVersion'
        );
        tech ? feTechVersionControl?.enable() : feTechVersionControl?.disable();
        feTechVersionControl?.setValue(tech ? '' : feTechVersionControl?.value);
      });
  }

  private fetchUserEmails(): void {
    this.data_service
      .getAllUsers()
      .pipe(take(1))
      .subscribe((response) => {
        this.userEmails = response.users.map((user) => user.email);
      });
  }
}

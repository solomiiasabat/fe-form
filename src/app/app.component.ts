import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'fe-form';
  technologies: string[] = ['Angular', 'React', 'Vue'];

  frontendEngineerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dateOfBirth: new FormControl(),
    feTechnology: new FormControl([this.technologies]),
  });

  date = this.frontendEngineerForm.value.dateOfBirth;

  onSubmit() {
    // TODO: Use EventEmitter with form value

    console.log(this.frontendEngineerForm.value);
  }
}

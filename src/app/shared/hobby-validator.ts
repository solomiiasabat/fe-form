import { ValidatorFn, AbstractControl } from '@angular/forms';

export function minArrayLength(minLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    return !control.value || control.value.length < minLength
      ? { minArrayLength: true }
      : null;
  };
}

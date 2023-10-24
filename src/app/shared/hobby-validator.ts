import { ValidatorFn, AbstractControl } from '@angular/forms';

export function minArrayLength(minLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!control.value || control.value.length < minLength) {
      return { minArrayLength: true };
    }
    return null;
  };
}

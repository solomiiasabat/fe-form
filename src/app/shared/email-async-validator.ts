import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { DataService } from '../service/data.service';

export function emailAsyncValidator(
  data_service: DataService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return data_service.emailExists(control.value).pipe(
      map((exists) => (exists ? { emailExists: true } : null)),
      catchError(() => of(null))
    );
  };
}

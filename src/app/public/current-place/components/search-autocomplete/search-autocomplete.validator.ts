import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function correctSymbolsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (typeof control.value === 'object') {
      return null;
    }
    const valid = /^[a-zA-Z0-9.,\-\s]*$/.test(control.value);
    return valid ? null : { invalidCharacters: { value: control.value } };
  };
}

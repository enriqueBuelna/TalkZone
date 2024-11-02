import { AbstractControl, ValidatorFn } from '@angular/forms';

export function atLeastOneFieldRequired(fields: string[]): ValidatorFn {
  console.log("HOLA")
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isAtLeastOneFilled = fields.some(field => control.get(field)?.value);
    
    return isAtLeastOneFilled ? null : { atLeastOneFieldRequired: true };
  };
}

import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ValidationPassword {
  static passwordCoincidence(control: AbstractControl): ValidationErrors | null {
    // Accedemos al grupo de formularios padre
    const formGroup = control.parent;
    if (!formGroup) {
      return null;
    }

    const password = formGroup.get('password')?.value;
    const repeatPassword = control.value;

    // Si las contraseñas no coinciden, retornamos un error
    if (password !== repeatPassword) {
      return { coincidencePassword: true };
    }

    return null; // No hay errores si las contraseñas coinciden
  }
}

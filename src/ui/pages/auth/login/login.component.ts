import { Component, DestroyRef, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonComponent } from '../../../utils/button/button.component';
import { InputOtpModule } from 'primeng/inputotp';
import { PasswordModule } from 'primeng/password';
import { StepperModule } from 'primeng/stepper';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../../domain/services/auth.service';
import { ValidationPassword } from '../register/validators/password.validator';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    ButtonComponent,
    InputOtpModule,
    InputTextModule,
    PasswordModule,
    StepperModule,
  ],
  styleUrl: './login.component.css',
})
export class LoginApp {
  visible: boolean = true; //PARA QUE MI MODAL SE VEA
  visiblePassword: boolean = false; //MI MODAL DE CONSEGUIR CONTRASEÑA
  loginForm!: FormGroup;
  passwordForm!: FormGroup;
  activeStep: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private _userService: UserService,
    private _router: Router,
    private _destroyRef: DestroyRef
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.passwordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          ValidationPassword.passwordCoincidence,
        ],
      ],
    });
  }

  submit() {}

  login() {
    // Llamar a la función y verificar si todos los campos son válidos
    const fields = ['username', 'password'];
    const allFieldsValid = this.markFieldsAsTouchedAndValidate(
      this.loginForm,
      fields
    );

    if (allFieldsValid) {
      //api prendida
      let { username, password } = this.loginForm.value;
      this._authService.login(username, password).pipe().subscribe((response) => {
        this._userService.setToken(response.token);
        this._userService.setUser(response.user);
        if(this._userService.getUserId() === 'dbb9d930-e338-40c2-9162-d7a04ab685d5'){
          this._router.navigate(['/admin']); // Redirigir a la página de bienvenida
        }else{
          this._router.navigate(['/home/posts']); // Redirigir a la página de bienvenida
        }
      });
      // me deberia que ir a la parte de pues el inicio, pero ahorita no me voy a poner con eso, ocupo ir al //terminar mi perfil
    }
    //api no prendida
    // this._router.navigate(['/home']); // Redirigir a la página de bienvenida
  }

  forgotPassword() {
    this.visible = false;
    this.visiblePassword = true;
  }

  processPassword() {}

  markFieldsAsTouchedAndValidate(form: FormGroup, fields: string[]): boolean {
    // Recorre los campos proporcionados
    fields.forEach((field) => {
      const control = form.get(field);
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });

    // Retorna true si todos los campos son válidos
    return fields.every((field) => form.get(field)?.valid);
  }
}

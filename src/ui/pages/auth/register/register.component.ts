import { Component, DestroyRef, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputOtpModule } from 'primeng/inputotp';
import { PasswordModule } from 'primeng/password';
import { ButtonComponent } from '../../../utils/button/button.component';
import { AuthService } from '../../../../domain/services/auth.service';
import { DialogModule } from 'primeng/dialog';
import { MessageResponse } from '../../../../domain/entities/users/MessageResponse.entitie';
import { ValidationPassword } from './validators/password.validator';
import { User } from '../../../../domain/models/user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
interface Genre {
  text: string;
  typeBD: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    ButtonModule,
    StepperModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,
    CommonModule,
    DropdownModule,
    ButtonComponent,
    InputOtpModule,
    DialogModule,
    PasswordModule,
  ],
  styleUrl: './register.component.css',
})
export class RegisterApp {
  visible: boolean = true; //PARA QUE MI MODAL SE VEA
  activeStep: number = 0; //INDICE DE EN QUE PASO ESTA EL STEPPER
  registerForm!: FormGroup; //MI FORMULARIO
  response: boolean = false;
  //COSAS DEL FORMULARIO
  genre: Genre[] | undefined;
  minDate: Date = new Date(1940, 0, 1);
  today?: Date;
  maxDate?: Date;

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private _destroyRef: DestroyRef
  ) {
    this.today = new Date();
    this.maxDate = new Date(
      this.today.getFullYear() - 15,
      this.today.getMonth(),
      this.today.getDate()
    );
    this.genre = [
      { text: 'Masculino', typeBD: 'male' },
      { text: 'Femenino', typeBD: 'female' },
      { text: 'Prefiero no decir', typeBD: 'prefer not to say' },
    ];
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      date_of_birth: ['', [Validators.required]],
      selectedGenre: ['', [Validators.required]],
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
  submit() {
    if (this.registerForm.valid) {
      const { username, email, date_of_birth, selectedGenre, password } =
        this.registerForm.value;
      const user: User = {
        id: '',
        username,
        email,
        date_of_birth: this.formatDate(date_of_birth),
        gender: selectedGenre.typeBD,
        password,
        is_profile_complete: false,
        profile_pic: null,
      };
      this._authService
        .register(user)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((response) => {
          console.log(response);
        });
    } else {
      alert('invalido');
    }
    this.visible = false;
    console.log('putos');
  }

  hasErrors(field: string, typeError: string) {
    return (
      this.registerForm.get(field)?.hasError(typeError) &&
      this.registerForm.get(field)?.touched
    );
  }

  comparePassword() {
    const { password, repeatPassword } = this.registerForm.value;

    return password === repeatPassword ? true : false;
  }

  register() {
    if (this.activeStep == 0) {
      //ocupo verificar que todos los campos esten llenos correctamente
      const firstStepFields = [
        'username',
        'email',
        'date_of_birth',
        'selectedGenre',
      ];

      // Marcar los campos del primer paso como tocados para activar la validación
      firstStepFields.forEach((field) => {
        const control = this.registerForm.get(field);
        control?.markAsTouched();
        control?.updateValueAndValidity();
      });

      if (
        firstStepFields.every((field) => this.registerForm.get(field)?.valid)
      ) {
        //VERIFICAR SI YA ESTAN AGARRADOS ESE USERNAME O ESE EMAIL
        const { username, email } = this.registerForm.value;
        this._authService
          .checkAvailability(username, email)
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe((response: MessageResponse) => {
            let { message } = response;
            if (message === 'Todo bien') {
              this.activeStep++;
            }
          });
      } else {
        //OCUPARIA NOTIFICAR AL SIGUEINTE WEY
        console.log(
          'Por favor, completa todos los campos obligatorios del primer paso.'
        );
      }
    } else if (this.activeStep === 1) {
      const secondStepFields = ['code'];
      secondStepFields.forEach((field) => {
        const control = this.registerForm.get(field);
        control?.markAsTouched();
        control?.updateValueAndValidity();
      });

      if (
        secondStepFields.every((field) => this.registerForm.get(field)?.valid)
      ) {
        const { code, email } = this.registerForm.value;
        this._authService
          .verifyCode(code, email)
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe((response: MessageResponse) => {
            let { message } = response;
            if (message === 'Verificación exitosa') {
              this.activeStep++;
            }
          });
      }
    } else if (this.activeStep === 2) {
      const { repeatPassword, password } = this.registerForm.value;
      const thirdStepFields = ['password', 'repeatPassword'];
      thirdStepFields.forEach((field) => {
        const control = this.registerForm.get(field);
        control?.markAsTouched();
        control?.updateValueAndValidity();
      });
      if (
        this.comparePassword() &&
        thirdStepFields.every((field) => this.registerForm.get(field)?.valid)
      ) {
        this.submit();
      }
    }
  }

  formatDate(dateString: string) {
    const date = new Date(dateString);

    // Obtenemos el año, mes y día de la fecha
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Sumamos 1 al mes (0-11)
    const day = String(date.getDate()).padStart(2, '0');

    // Formateamos la fecha como 'YYYY-MM-DD'
    return `${year}-${month}-${day}`;
  }

  showDialog() {
    this.visible = true;
  }

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}

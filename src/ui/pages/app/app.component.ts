import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { User } from '../../../domain/models/user.model';
import { AuthService } from '../../../domain/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TalkZoneCA';
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, email, password, dateOfBirth, gender } = this.registerForm.value;

      const newUser = new User(null, username, email, password, new Date(dateOfBirth), gender);

      this.authService.register(newUser).subscribe({
        next: (user) => {
          console.log('User registered successfully:', user);
        },
        error: (err) => {
          this.errorMessage = 'Failed to register user. Please try again.';
          console.error(err);
        }
      });
    }
  }

}

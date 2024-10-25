import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { User } from '../../../domain/models/user.model';
import { AuthService } from '../../../domain/services/auth.service';
import { CommonModule } from '@angular/common';
import { AuthComponent } from '../auth/auth.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'TalkZoneCA';
}

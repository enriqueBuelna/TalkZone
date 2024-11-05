import { Component, OnInit } from '@angular/core';
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
import { SocketService } from '../../../socket_service/socket.service';
import { UserService } from '../auth/services/user.service';
import { NavbarApp } from "../../utils/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, AuthComponent, NavbarApp],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{
  title = 'TalkZoneCA';

  
}

import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthComponent } from '../auth/auth.component';
import { NavbarApp } from "../../utils/navbar/navbar.component";
import AgoraRTC from 'agora-rtc-sdk-ng';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{
  title = 'TalkZoneCA';

  constructor(){
    AgoraRTC.setLogLevel(4); // Opciones: "none", "error", "warning", "info", "debug
  }

  
}

// online-users.component.ts
import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { UserDemo } from '../../../../domain/models/user-demo.model';
import { UserSocket } from '../../../../socket_service/user_socket.service';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ButtonComponent } from "../../../utils/button/button.component";
interface User {
  id: number;
  name: string;
  isOnline: boolean;
}

@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.component.html',
  styleUrl: './online-users.component.css',
  imports: [CommonModule, ButtonComponent],
  standalone: true,
})
export class OnlineUsersComponent implements OnInit, OnDestroy {
  users = signal<UserDemo[]>([]);

  constructor(
    private _userSocket: UserSocket,
    private _router:Router
  ) {}

  goToConect(){
    this._router.navigate(['/home/connect'])
  }

  ngOnInit(): void {
    this.users = this._userSocket.getUsers();
  }

  hoveredUser: string | null = null;

  viewProfile(id: string) {
    this._router.navigate(['home','profile', id]);
  }

  sendMessage(id: string) {
    this._router.navigate(['home','messages', id])
  }

  ngOnDestroy(): void {
  }
}

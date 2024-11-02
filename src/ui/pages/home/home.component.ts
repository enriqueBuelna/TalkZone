import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarApp } from '../../utils/navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../auth/services/user.service';
import { SocketService } from '../../../socket_service/socket.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarApp, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private _authService: UserService,
    private _router: Router,
    private _socketService: SocketService
  ) {}
  ngOnInit(): void {
    // if (!this._authService.isNewUser()) {
    //   this._router.navigate(['home','welcome']); // Redirigir a la página de bienvenida
    // }
    this._socketService.emitEvent('connection', null);
    this._socketService.emitEvent('getUsers', this._authService.getUserId());
    // this._router.navigate(['home', 'welcome']); // Redirigir a la página de bienvenida
  }

  ngOnDestroy(): void {
    this._socketService.disconnect();
  }
}

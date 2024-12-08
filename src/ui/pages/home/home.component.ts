import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { NavbarApp } from '../../utils/navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from '../auth/services/user.service';
import { SocketService } from '../../../socket_service/socket.service';
import { UserSocket } from '../../../socket_service/user_socket.service';
import { UserDemo } from '../../../domain/models/user-demo.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotificationService } from '../../../domain/services/notifications.service';
import { NotService } from '../notifications/services/notifications.service';
import { GoogleGeminiProService } from '../../../gemini/gemini.service';

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
    private _socketService: SocketService,
    private _userSocket: UserSocket,
    private _destroyRef: DestroyRef,
    private _notificationService: NotificationService,
    private _notService: NotService,
    private googleGeminiPro: GoogleGeminiProService
  ) {
    // this.googleGeminiPro.initialize('AIzaSyDrFMvd5Z1TFrXLnzZ8uX_NctKsUtGaFko');
  }
  ngOnInit(): void {
    this._notificationService
      .getCantNotifications(this._authService.getUserId())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (el) => {
          if(el){
            this._notService.setUnreadNotifications(el);
          }
        },
        error: (el) => {}
      });
    if (!this._authService.isProfileComplete()) {
      this._router.navigate(['home', 'welcome']);
    }
    this._socketService.connect();
    this._socketService.emitEvent('getUsers', this._authService.getUserId());
    this._userSocket
      .getUsersFollowed()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((el) => {
        let aux: UserDemo[] = [];
        el.forEach((ele: any) => {
          let aux2 = new UserDemo(
            ele.id,
            ele.username,
            ele.gender,
            ele.profile_picture
          );
          aux.push(aux2);
        });
        this._userSocket.setUsers(aux);
      });
  }

  ngOnDestroy(): void {
    // this._socketService.disconnect();
  }
}

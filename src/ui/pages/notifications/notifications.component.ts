import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { AsideComponent } from '../../utils/aside/aside.component';
import { HeaderComponent } from '../../utils/header/header.component';
import { UserService } from '../auth/services/user.service';
import { NotificationService } from '../../../domain/services/notifications.service';
import { Notification } from '../../../domain/models/notifications.model';
import { NotificationComponent } from './notification/notification.component';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotService } from './services/notifications.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    AsideComponent,
    HeaderComponent,
    NotificationComponent,
    CommonModule,
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit {
  allNotifications!: Notification[];
  notifications!: Notification[];
  rule = 'all';
  constructor(
    private _userService: UserService,
    private _notificationService: NotificationService,
    private _destroyRef: DestroyRef,
    private _notService: NotService
  ) {}

  ngOnInit() {
    this._notificationService
      .getAllMyNotifications(this._userService.getUserId())
      .subscribe((el) => {
        console.log(el);
        this.allNotifications = el;
        this.notifications = el;
        this.read();
      });
  }

  read() {
    this._notificationService
      .markAsRead(this._userService.getUserId())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (el) => {
          console.log('soy chivo');
          this._notService.setUnreadNotifications(0);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  changeNotifications(option: string) {
    if (option === 'todas') {
      this.notifications = this.allNotifications;
      this.rule = 'all';
    } else if (option === 'like') {
      this.notifications = this.allNotifications.filter(
        (el) => el.getType() === 'like'
      );
      this.rule = 'like';
    } else if (option === 'follower') {
      this.notifications = this.allNotifications.filter(
        (el) => el.getType() === 'follower'
      );
      this.rule = 'follower';
    }
  }
}

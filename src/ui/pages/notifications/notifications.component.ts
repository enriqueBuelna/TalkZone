import { Component, OnInit } from '@angular/core';
import { AsideComponent } from '../../utils/aside/aside.component';
import { HeaderComponent } from '../../utils/header/header.component';
import { UserService } from '../auth/services/user.service';
import { NotificationService } from '../../../domain/services/notifications.service';
import { Notification } from '../../../domain/models/notifications.model';
import { NotificationComponent } from './notification/notification.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [AsideComponent, HeaderComponent, NotificationComponent, CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit {
  allNotifications!: Notification[];
  notifications!: Notification[];
  rule = 'all';
  constructor(
    private _userService: UserService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit() {
    this._notificationService
      .getAllMyNotifications(this._userService.getUserId())
      .subscribe((el) => {
        console.log(el);
        this.allNotifications = el;
        this.notifications = el;
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

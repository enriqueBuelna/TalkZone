import { Component, Input } from '@angular/core';
import { Notification } from '../../../../domain/models/notifications.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  @Input() notification!: Notification;

  constructor(private _router: Router) {}

  goToRoot() {
    if (this.notification.getFollower()) {
      this._router.navigate(['home','profile', this.notification.getFollower()]);
    }
    if (this.notification.getVoiceRoom()) {
      this._router.navigate(['voice_room', this.notification.getVoiceRoom()]);
    } else if (this.notification.getLike()) {
      let aux;
      if (this.notification.getLikeLike()?.getPostId()) {
        aux = this.notification.getLikeLike()?.getPostId();
      } else if (this.notification.getLikeLike()?.getPostIdComment()) {
        aux = this.notification.getLikeLike()?.getPostIdComment();
      }
      this._router.navigate(['home', 'posts', 'detail_post', aux]);
    }
    if(this.notification.getComment()){
      this._router.navigate(['home','posts', 'detail_post', this.notification.getPostId()])
    }
  }
}

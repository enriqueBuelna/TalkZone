import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { NotificationRepository } from '../../domain/repositories/notifications.repository';
import { Notification } from '../../domain/models/notifications.model';
import { UserDemo } from '../../domain/models/user-demo.model';
import { Like } from '../../domain/models/like.model';
@Injectable({
  providedIn: 'root',
})
export class RemoteNotificationRepository extends NotificationRepository {
  private readonly API_URL = 'http://localhost:3000';
  private _http = inject(HttpClient);
  getAllMyNotifications(user_id: string): Observable<Notification[]> {
    const params = new HttpParams().set('user_id', user_id);
    return this._http
      .get<Notification[]>(`${this.API_URL}/notifications/getNotification`, {
        params,
      })
      .pipe(
        map((notifications: any[]) => {
          // Verifica si conversations es un array vacío
          console.log(notifications);
          if (!Array.isArray(notifications) || notifications.length === 0) {
            return []; // Devuelve un array vacío si no hay conversaciones
          }
          return notifications.map(
            (n: any) =>
              new Notification(
                n.id,
                n.type,
                new UserDemo(
                  n.userSender.id,
                  n.userSender.username,
                  n.userSender.gender,
                  n.userSender.profile_picture
                ),
                n.related_message_id,
                n.related_comment_id,
                n.related_post_id,
                n.related_room_open_id,
                n.related_like_id,
                n.follower_id,
                new Like(
                  n.like?.post_id,
                  n.like?.comment_id,
                  n.like?.comment?.postss.id
                )
              )
          );
        })
      );
  }
}

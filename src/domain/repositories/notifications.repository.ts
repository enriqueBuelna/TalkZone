import { Observable } from 'rxjs';
import { Notification } from '../models/notifications.model';

export abstract class NotificationRepository {
  abstract getAllMyNotifications(
    user_id:string
  ): Observable<Notification[]>;
}

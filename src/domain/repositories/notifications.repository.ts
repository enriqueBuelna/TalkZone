import { Observable } from 'rxjs';
import { Notification } from '../models/notifications.model';

export abstract class NotificationRepository {
  abstract getAllMyNotifications(user_id: string): Observable<Notification[]>;
  abstract getCantNotifications(user_id: string): Observable<number>;
  abstract markAsRead(user_id: string): Observable<void>;
  abstract getCantMessages(user_id: string): Observable<number>;
}

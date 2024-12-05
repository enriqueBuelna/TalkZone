import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationRepository } from '../../repositories/notifications.repository';
import { Notification } from '../../models/notifications.model';

@Injectable({
  providedIn: 'root',
})
export class GetCantNotifications {
  constructor(private _notificationRepository: NotificationRepository) {}

  execute(user_id: string): Observable<number> {
    return this._notificationRepository.getCantNotifications(user_id);
  }
}

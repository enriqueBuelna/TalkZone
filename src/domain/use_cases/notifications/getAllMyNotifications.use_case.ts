import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationRepository } from '../../repositories/notifications.repository';
import { Notification } from '../../models/notifications.model';

@Injectable({
  providedIn: 'root',
})
export class GetAllMyNotifications {
  constructor(private _notificationRepository: NotificationRepository) {}

  execute(user_id: string): Observable<Notification[]> {
    return this._notificationRepository.getAllMyNotifications(user_id);
  }
}

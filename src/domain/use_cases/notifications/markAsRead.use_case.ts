import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationRepository } from '../../repositories/notifications.repository';
import { Notification } from '../../models/notifications.model';

@Injectable({
  providedIn: 'root',
})
export class MarkAsRead {
  constructor(private _notificationRepository: NotificationRepository) {}

  execute(user_id: string): Observable<void> {
    return this._notificationRepository.markAsRead(user_id);
  }
}

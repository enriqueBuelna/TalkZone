import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateGroup } from '../use_cases/comunities/createGroup.use_case';
import { GetMyGroupsCreated } from '../use_cases/comunities/getMyGroupsCreated.use_case';
import { GroupPresentation } from '../models/group/presentation-group.model';
import { GetAllMyNotifications } from '../use_cases/notifications/getAllMyNotifications.use_case';
import { Notification } from '../models/notifications.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _getAllMyNotifications: GetAllMyNotifications) {}

  getAllMyNotifications(user_id: string): Observable<Notification[]> {
    return this._getAllMyNotifications.execute(user_id);
  }
}

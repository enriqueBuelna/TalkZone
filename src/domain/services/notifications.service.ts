import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateGroup } from '../use_cases/comunities/createGroup.use_case';
import { GetMyGroupsCreated } from '../use_cases/comunities/getMyGroupsCreated.use_case';
import { GroupPresentation } from '../models/group/presentation-group.model';
import { GetAllMyNotifications } from '../use_cases/notifications/getAllMyNotifications.use_case';
import { Notification } from '../models/notifications.model';
import { GetCantNotifications } from '../use_cases/notifications/getCantNotifications.use_case';
import { MarkAsRead } from '../use_cases/notifications/markAsRead.use_case';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private _getAllMyNotifications: GetAllMyNotifications,
    private _getCantNotifications: GetCantNotifications,
    private _markAsRead: MarkAsRead
  ) {}

  getAllMyNotifications(user_id: string): Observable<Notification[]> {
    return this._getAllMyNotifications.execute(user_id);
  }

  getCantNotifications(user_id:string):Observable<number>{
    return this._getCantNotifications.execute(user_id);
  }

  markAsRead(user_id:string):Observable<void>{
    return this._markAsRead.execute(user_id);
  }
}

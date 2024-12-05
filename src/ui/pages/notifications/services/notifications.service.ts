import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotService {
  private unreadNotifications: number = 0;

  getUnreadNotifications() {
    return this.unreadNotifications;
  }

  setUnreadNotifications(cant: number) {
    this.unreadNotifications = cant;
  }
}

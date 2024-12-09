import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotService {
  private unreadNotifications: number = 0;
  private unreadMessage: number = 0;
  getUnreadNotifications() {
    return this.unreadNotifications;
  }

  setUnreadNotifications(cant: number) {
    this.unreadNotifications = cant;
  }

  getUnreadMessages() {
    return this.unreadMessage;
  }

  setUnreadMessages(cant: number) {
    this.unreadMessage = cant;
  }

  addMessage() {
    this.unreadMessage++;
  }

  readMessages(cant: number | undefined) {
    if (cant) {
      this.unreadMessage -= cant;
    }
  }
}

import { Injectable, signal } from '@angular/core';
import { SocketService } from './socket.service';
import { Observable } from 'rxjs';
import { UserDemo } from '../domain/models/user-demo.model';

@Injectable({
  providedIn: 'root',
})
export class UserSocket {
  private users = signal<UserDemo[]>([]);
  constructor(private _socketService: SocketService) {}

  getUsersFollowed(): Observable<any> {
    return this._socketService.listenEvent('usersFollowed');
  }

  setUsers(users:UserDemo[]){
    this.users.set(users);
  }

  getUsers(){
    return this.users;
  }
}

import { Injectable, signal } from '@angular/core';
import { UserDemo } from '../../../../domain/models/user-demo.model';

@Injectable({
  providedIn: 'root',
})
export class MyUserInformation {
  myUserInformation = signal<UserDemo>(new UserDemo('', '', '', ''));

  setMyUserInformation(user:UserDemo){
    this.myUserInformation.set(user);
  }

  getMyUserInformation(){
    return this.myUserInformation;
  }
}

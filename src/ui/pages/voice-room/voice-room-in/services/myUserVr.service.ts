import { Injectable, signal } from '@angular/core';
import { UserInVoiceRoom } from '../../../../../domain/models/user_in_voice_room.model';

@Injectable({
  providedIn: 'root',
})
export class myUserVoiceRoom {
  private myUserVoiceRoom = signal<UserInVoiceRoom>(new UserInVoiceRoom('','','','', false));

  constructor() {
    
  }

  setMyUser(myUser:UserInVoiceRoom){
    this.myUserVoiceRoom.set(myUser);
  }

  getMyUser(){
    return this.myUserVoiceRoom;
  }
}
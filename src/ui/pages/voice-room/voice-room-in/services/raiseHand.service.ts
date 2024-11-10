import { Injectable, signal } from '@angular/core';
import { UserInVoiceRoom } from '../../../../../domain/models/user_in_voice_room.model';

@Injectable({
  providedIn: 'root',
})
export class RaisedHand {
  usersInVoiceRoom = signal<UserInVoiceRoom[]>([]);

  setUserInVoiceRoom(users: UserInVoiceRoom[]) {
    this.usersInVoiceRoom.set(users);
  }

  updateRaisedHand(user: UserInVoiceRoom) {
    this.usersInVoiceRoom.update((users) => {
      if (!users.some((existingUser) => existingUser.getUserId() === user.getUserId())) {
        return [...users, user];
      }
      return users;
    });
  }

  getUsersInVoiceRoom() {
    return this.usersInVoiceRoom;
  }

  userLeft(user_id: string) {
    this.usersInVoiceRoom.update((users) =>
      users.filter((u) => u.getUserId() !== user_id)
    );
  }

  //VOICEROOMMEMBERRAISEDHAND
}

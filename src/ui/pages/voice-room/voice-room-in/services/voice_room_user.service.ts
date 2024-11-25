import { Injectable, signal } from '@angular/core';
import { UserInVoiceRoom } from '../../../../../domain/models/user_in_voice_room.model';

@Injectable({
  providedIn: 'root',
})
export class VoiceRoomUser {
  usersInVoiceRoom = signal<UserInVoiceRoom[]>([]);
  userAdmin = signal('');

  setUserInVoiceRoom(users: UserInVoiceRoom[]) {
    this.usersInVoiceRoom.set(users);
  }

  updateUsersInVoiceRoom(user: UserInVoiceRoom) {
    if(user.getType() === 'host'){
      this.userAdmin.set(user.getUserId());
    }
    this.usersInVoiceRoom.update((users) => {
      if (
        !users.some(
          (existingUser) => existingUser.getUserId() === user.getUserId()
        )
      ) {
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

  changesUserInStage(user_id: string, option:string) {
    // this.usersInVoiceRoom.update((users) => {
    //   // users.map((user) =>
    //   //   user.getUserId() === updatedUser.getUserId() ? { ...user, ...updatedUser } : user
    //   // )
    //   // return users
    //   return users.map((user) => {
    //     if (user.getUserId() === updatedUser.getUserId()) {
    //       // Retorna el mismo usuario, pero con la propiedad 'inStage' actualizada
    //       return { ...user, inStage: updatedUser.inStage };
    //     }
    //     return user; // Retorna el usuario sin cambios si no coincide
    //   });
    // });
    this.usersInVoiceRoom.update((users) => {
      users.forEach((user) => {
        if (user.getUserId() === user_id) {
          if(option === 'yes'){
            user.goToStage();  // Cambiar directamente la propiedad 'inStage'
          }else if(option === 'no'){
            user.backFromStage();
          }
        }
      });
      return [...users];  // Retorna el arreglo completo (esto es importante para mantener la reactividad)
    });
  }

  
}

import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { map, Observable } from 'rxjs';
import { UserInVoiceRoom } from '../domain/models/user_in_voice_room.model';
import { ResponseVR } from '../domain/entities/voice_rooms/ResponseVR.entitie';

@Injectable({
  providedIn: 'root',
})
export class voiceRoomSocket {
  constructor(private _socket: SocketService) {}

  silenceMember(room_id:string, user_id:string){
    const payload = {
      room_id, 
      user_id
    }
    this._socket.emitEvent('silenceMember', payload);
  }

  silenceMicrophone():Observable<any>{
    return this._socket.listenEvent('silenceMicrophone');
  }

  acceptInvitation(){

  }

  downOfStage(room_id:string, user_id:string){
    const payload = {
      room_id,
      user_id
    };
    this._socket.emitEvent('downOfStage', payload);
  }

  getDown():Observable<any>{
    return this._socket.listenEvent('getDown');
  }

  goOffRoom(room_id:string, user_id:string){
    const payload = {
      room_id,
      user_id,
      roomLogId:0,
      deleted:true
    }
    this._socket.emitEvent('leaveRoom', payload);
  }

  joinRoom(room_id: string | null, user_id: string) {
    const payload = {
      room_id,
      user_id,
    };
    this._socket.emitEvent('joinRoom', payload);
  }

  raiseHand(room_id: string, user_id: string) {
    const payload = {
      room_id,
      user_id,
    };

    this._socket.emitEvent('raiseHand', payload);
  }

  answerRaisedHand(answer: string, user_id: string, room_id: string) {
    const payload = {
      answer,
      user_id,
      room_id,
    };

    this._socket.emitEvent('answerRaiseHand', payload);
  }

  userLeftStage(user_id: string, room_id: string) {
    const payload = {
      user_id,
      room_id,
    };

    this._socket.emitEvent('userLeftStage', payload);
  }

  userLeftStageComplete(): Observable<any> {
    return this._socket
      .listenEvent('userLeftStageComplete')
      .pipe(map((user) => user.user_id));
  }

  handRaised(): Observable<any> {
    return this._socket
      .listenEvent('handRaised')
      .pipe(map((user_id: string) => user_id));
  }

  responseHandRaised(): Observable<any> {
    return this._socket
      .listenEvent('responseHandRaised')
      .pipe(map((resp: any) => new ResponseVR(resp.answer, resp.user_id)));
  }

  getMyUserVoiceRoom(): Observable<any> {
    return this._socket
      .listenEvent('myUserVoiceRoom')
      .pipe(
        map(
          (user: any) =>
            new UserInVoiceRoom(
              user.id,
              user.username,
              user.profile_picture,
              user.type,
              user.in_stage
            )
        )
      );
  }

  voiceRoomClosed(): Observable<any> {
    return this._socket.listenEvent('voiceRoomClosed');
  }

  addNewUser(): Observable<any> {
    return this._socket.listenEvent('newUserVoiceRoom').pipe(
      map((user: any) => {
        console.log(user)
        // Verifica si el usuario tiene todos los campos necesarios
        if (
          !user ||
          !user.id ||
          !user.username ||
          !user.type ||
          !user.profile_picture
        ) {
          // Si falta algún campo, puedes devolver null, un objeto vacío, o lo que prefieras
          return null;
        }

        // Si el usuario está completo, crea el objeto UserDemo
        return new UserInVoiceRoom(
          user.id,
          user.username,
          user.profile_picture,
          user.type,
          user.in_stage,
          user.roomLog
        );
      })
    );
  }

  userLeft(): Observable<any> {
    return this._socket.listenEvent('userLeft');
  }

  getAllUsers(): Observable<any> {
    return this._socket.listenEvent('existingUsersInRoom');
  }

  leaveRoom(room_id: string, user_id: string, roomLogId?:string) {
    const payload = {
      room_id,
      user_id,
      roomLogId
    };
    this._socket.emitEvent('leaveRoom', payload);
  }

  amWent():Observable<any>{
    return this._socket.listenEvent('imWent');
  }
}

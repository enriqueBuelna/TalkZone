import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetVoiceRoom } from '../use_cases/voice_room/getVoiceRoom.use_case';
import { VoiceRoom } from '../models/voice_room.model';
import { CreateVoiceRoom } from '../use_cases/voice_room/createVoiceRoom.use_case';
import { GetAllVoiceRoomMembers } from '../use_cases/voice_room/getAllVoiceRoomMembers.use_case';
import { UserInVoiceRoom } from '../models/user_in_voice_room.model';
import { CloseVoiceRoom } from '../use_cases/voice_room/closeVoiceRoom.use_case';
import { VerifyOpenVoiceRoom } from '../use_cases/voice_room/verifyOpenVoiceRoom.use_case';
import { AddRating } from '../use_cases/voice_room/addRating.use_case';
import { createVoiceRoomPrivate } from '../use_cases/voice_room/createVoiceRoomPrivate.use_case';
import { InviteMessage } from '../use_cases/voice_room/inviteMessage.use_case';
@Injectable({
  providedIn: 'root',
})
export class VoiceRoomService {
  constructor(
    private _getVoiceRoom: GetVoiceRoom,
    private _createVoiceRoom: CreateVoiceRoom,
    private _getAllVoiceRoomMembers: GetAllVoiceRoomMembers,
    private _closeVoiceRoom: CloseVoiceRoom,
    private _verifyOpenVoiceRoom: VerifyOpenVoiceRoom,
    private _addRating: AddRating,
    private _createVoiceRoomPrivate: createVoiceRoomPrivate,
    private _inviteMessage: InviteMessage
  ) {}

  inviteMessage(sender_id: string, receiver_id: string, room_id: string): Observable<any> {
    return this._inviteMessage.execute(sender_id, receiver_id, room_id);
  }

  createVoiceRoomPrivate(
    room_name: string,
    host_user_id: string,
    topic_id: number,
    type: string
  ): Observable<any> {
    return this._createVoiceRoomPrivate.execute(
      room_name,
      host_user_id,
      topic_id,
      type
    );
  }

  addRating(
    room_id: string,
    rating: number,
    user_id: string
  ): Observable<boolean> {
    return this._addRating.execute(room_id, rating, user_id);
  }

  verifyOpenVoiceRoom(room_id: string, user_id: string): Observable<boolean> {
    return this._verifyOpenVoiceRoom.execute(room_id, user_id);
  }

  getVoiceRoom(
    user_id: string,
    filters: any,
    page: number
  ): Observable<VoiceRoom[]> {
    return this._getVoiceRoom.execute(user_id, filters, page);
  }

  createVoiceRoom(
    room_name: string,
    host_user_id: string,
    topic_id: number,
    type: string
  ): Observable<any> {
    return this._createVoiceRoom.execute(
      room_name,
      host_user_id,
      topic_id,
      type
    );
  }

  getAllVoiceRoomMembers(room_id: string): Observable<UserInVoiceRoom[]> {
    return this._getAllVoiceRoomMembers.execute(room_id);
  }

  closeVoiceRoom(room_id: string): Observable<any> {
    return this._closeVoiceRoom.execute(room_id);
  }
}

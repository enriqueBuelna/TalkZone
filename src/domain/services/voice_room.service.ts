import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetVoiceRoom } from '../use_cases/voice_room/getVoiceRoom.use_case';
import { VoiceRoom } from '../models/voice_room.model';
@Injectable({
  providedIn: 'root',
})
export class VoiceRoomService {
  constructor(private _getVoiceRoom: GetVoiceRoom) {}

  getVoiceRoom(user_id:string):Observable<VoiceRoom[]>{
    return this._getVoiceRoom.execute(user_id);
  }
}
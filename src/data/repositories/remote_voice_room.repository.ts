import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { VoiceRoomRepository } from '../../domain/repositories/voice_room.repository';
import { VoiceRoom } from '../../domain/models/voice_room.model';

@Injectable({
  providedIn: 'root',
})
export class RemoteVoiceRoomRepository extends VoiceRoomRepository {
  private readonly API_URL = 'http://localhost:3000/voice_rooms';
  private _http = inject(HttpClient);

  getVoiceRoom(user_id: string): Observable<VoiceRoom[]> {
    const params = new HttpParams().set('user_id', user_id);
    console.log(params);
    return this._http.get<VoiceRoom[]>(`${this.API_URL}/getVoiceRooms`, {
      params,
    });
  }
}

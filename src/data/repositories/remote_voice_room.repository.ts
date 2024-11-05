import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { VoiceRoomRepository } from '../../domain/repositories/voice_room.repository';
import { VoiceRoom } from '../../domain/models/voice_room.model';
import { UserOfVoiceRoom } from '../../domain/entities/voice_rooms/UserOfVoiceRoom.entitie';
import { VoiceRoomToVoiceRoomTag } from '../../domain/entities/voice_rooms/VoiceRoomToVoiceRoomTag.entitie';

@Injectable({
  providedIn: 'root',
})
export class RemoteVoiceRoomRepository extends VoiceRoomRepository {
  private readonly API_URL = 'http://localhost:3000/voice_rooms';
  private _http = inject(HttpClient);

  getVoiceRoom(user_id: string): Observable<VoiceRoom[]> {
    const params = new HttpParams().set('user_id', user_id);
    return this._http
      .get<VoiceRoom[]>(`${this.API_URL}/getVoiceRooms`, {
        params,
      })
      .pipe(
        map((rooms: any[]) => {
          if (!Array.isArray(rooms) || rooms.length === 0) {
            return []; // Devuelve un array vacío si no hay conversaciones
          }
          return rooms.map(
            (room) =>
              new VoiceRoom(
                room.id,
                room.room_name,
                room.users_of_voice_room.map(
                  (user: any) =>
                    new UserOfVoiceRoom(
                      user.id, // El ID de la sala de voz
                      {
                        username: user.user_information_voice_room.username,
                        profile_picture:
                          user.user_information_voice_room.profile_picture,
                        id: user.user_information_voice_room.id,
                      }
                    )
                ),
                room.topic_id,
                room.topic.topic_name,
                room.voice_room_to_voice_room_tag.map(
                  (tag: any) =>
                    new VoiceRoomToVoiceRoomTag(
                      tag.id,
                      tag.voice_room_tag_to_tag.tag_name
                    )
                ),
                room.host_user
              )
          );
        })
      );
  }
}

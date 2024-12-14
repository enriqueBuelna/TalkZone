import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { VoiceRoomRepository } from '../../domain/repositories/voice_room.repository';
import { VoiceRoom } from '../../domain/models/voice_room.model';
import { UserOfVoiceRoom } from '../../domain/entities/voice_rooms/UserOfVoiceRoom.entitie';
import { VoiceRoomToVoiceRoomTag } from '../../domain/entities/voice_rooms/VoiceRoomToVoiceRoomTag.entitie';
import { UserDemo } from '../../domain/models/user-demo.model';
import { UserInVoiceRoom } from '../../domain/models/user_in_voice_room.model';

@Injectable({
  providedIn: 'root',
})
export class RemoteVoiceRoomRepository extends VoiceRoomRepository {

  override inviteMessage(sender_id: string, receiver_id: string, room_id: string): Observable<any> {
    console.log(sender_id, receiver_id, room_id)
    const payload = {
      sender_id, 
      receiver_id,
      room_id
    }
    return this._http.post<any>(
      `${this.API_URL}/voice_rooms/inviteMessage`,
      payload
    );
  }

  createVoiceRoomPrivate(
    room_name: string,
    host_user_id: string,
    topic_id: number,
    type: string
  ): Observable<any> {
    const payload = {
      room_name,
      host_user_id,
      topic_id,
      type,
    };
    return this._http.post<any>(
      `${this.API_URL}/voice_rooms/createVoiceRoomPrivate`,
      payload
    );
  }

  override addRating(
    room_id: string,
    rating: number,
    user_id: string
  ): Observable<boolean> {
    const payload = {
      room_id,
      rating,
      user_id,
    };

    return this._http.post<boolean>(
      `${this.API_URL}/voice_rooms/addRating`,
      payload
    );
  }

  override verifyOpenVoiceRoom(
    room_id: string,
    user_id: string
  ): Observable<boolean> {
    const params = new HttpParams()
      .set('room_id', room_id)
      .set('user_id', user_id);
    return this._http.get<boolean>(`${this.API_URL}/voice_rooms/verifyStatus`, {
      params,
    });
  }
  override getInVoiceRoom(user_id: string): Observable<void> {
    throw new Error('Method not implemented.');
  }
  private readonly API_URL = 'http://localhost:3000';
  private _http = inject(HttpClient);

  getVoiceRoom(
    user_id: string,
    filter: any,
    page: number
  ): Observable<VoiceRoom[]> {
    const payload = {
      user_id,
      filter,
      page,
    };
    return this._http
      .post<VoiceRoom[]>(`${this.API_URL}/voice_rooms/getVoiceRooms`, payload)
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
                        is_verified: user.user_information_voice_room.is_verified
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
                room.host_user,
                room?.host_user?.rating_?.[0]?.average_rating || 0,
                room?.host_user?.rating_?.[0]?.total_ratings || 0,
                room.type
              )
          );
        })
      );
  }

  createVoiceRoom(
    room_name: string,
    host_user_id: string,
    topic_id: number,
    type: string
  ): Observable<any> {
    const payload = {
      room_name,
      host_user_id,
      topic_id,
      type,
    };
    return this._http.post<any>(
      `${this.API_URL}/voice_rooms/createVoiceRoom`,
      payload
    );
  }

  getAllVoiceRoomMembers(room_id: string): Observable<UserInVoiceRoom[]> {
    const params = new HttpParams().set('room_id', room_id);
    return this._http
      .get<UserInVoiceRoom[]>(
        `${this.API_URL}/voice_rooms_members/getAllVoiceRoomMembers`,
        { params }
      )
      .pipe(
        map((users: any[]) => {
          if (!Array.isArray(users) || users.length === 0) {
            return []; // Devuelve un array vacío si no hay conversaciones
          }

          return users.map(
            (user: any) =>
              new UserInVoiceRoom(
                user.id,
                user.username,
                user.profile_picture,
                user.type,
                user.in_stage
              )
          );
        })
      );
  }

  closeVoiceRoom(room_id: string): Observable<any> {
    const payload = {
      room_id,
    };
    return this._http.post<any>(
      `${this.API_URL}/voice_rooms/closeVoiceRoom`,
      payload
    );
  }
}

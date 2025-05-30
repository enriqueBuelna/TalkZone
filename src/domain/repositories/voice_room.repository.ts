import { Observable } from 'rxjs';
import { VoiceRoom } from '../models/voice_room.model';
import { UserDemo } from '../models/user-demo.model';
import { UserInVoiceRoom } from '../models/user_in_voice_room.model';

export abstract class VoiceRoomRepository {
  abstract getVoiceRoom(
    user_id: string,
    filters: any,
    page: number
  ): Observable<VoiceRoom[]>;
  abstract createVoiceRoom(
    room_name: string,
    host_user_id: string,
    topic_id: number,
    type: string
  ): Observable<void>; //createVoiceRoom y meter al usuario dentro del voice_room
  abstract getAllVoiceRoomMembers(
    room_id: string
  ): Observable<UserInVoiceRoom[]>; //cuando entro al vr
  abstract getInVoiceRoom(user_id: string): Observable<void>; // cuando entro al vr tmbn
  abstract closeVoiceRoom(room_id: string): Observable<void>;
  abstract verifyOpenVoiceRoom(
    room_id: string,
    user_id: string
  ): Observable<boolean>;
  abstract addRating(
    room_id: string,
    rating: number,
    user_id: string
  ): Observable<boolean>;
  abstract createVoiceRoomPrivate(
    room_name: string,
    host_user_id: string,
    topic_id: number,
    type: string
  ): Observable<void>; //createVoiceRoom y meter al usuario dentro del voice_room
  //en createVR Y GetIn, me puede dar el user_id admin
  abstract inviteMessage(
    sender_id: string,
    receiver_id: string,
    room_id: string
  ): Observable<any>;
}

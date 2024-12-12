import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VoiceRoomRepository } from '../../repositories/voice_room.repository';
import { VoiceRoom } from '../../models/voice_room.model';

@Injectable({
  providedIn: 'root',
})
export class createVoiceRoomPrivate {
  constructor(private VoiceRoomRepository: VoiceRoomRepository) {}

  execute(
    room_name: string,
    host_user_id: string,
    topic_id: number,
    type:string
  ): Observable<any> {
    return this.VoiceRoomRepository.createVoiceRoomPrivate(
      room_name,
      host_user_id,
      topic_id,
      type
    );
  }
}

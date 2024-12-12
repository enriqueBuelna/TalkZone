import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VoiceRoomRepository } from '../../repositories/voice_room.repository';
import { VoiceRoom } from '../../models/voice_room.model';

@Injectable({
  providedIn: 'root',
})
export class InviteMessage {
  constructor(private VoiceRoomRepository: VoiceRoomRepository) {}

  execute(
    sender_id: string,
    receiver_id: string,
    room_id: string
  ): Observable<any> {
    return this.VoiceRoomRepository.inviteMessage(
      sender_id,
      receiver_id,
      room_id
    );
  }
}

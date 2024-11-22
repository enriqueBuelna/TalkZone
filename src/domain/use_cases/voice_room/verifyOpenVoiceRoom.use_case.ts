import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VoiceRoomRepository } from '../../repositories/voice_room.repository';
import { VoiceRoom } from '../../models/voice_room.model';

@Injectable({
  providedIn: 'root',
})
export class VerifyOpenVoiceRoom {
  constructor(private VoiceRoomRepository: VoiceRoomRepository) {}

  execute(
    room_id: string,
  ): Observable<boolean> {
    return this.VoiceRoomRepository.verifyOpenVoiceRoom(room_id);
  }
}

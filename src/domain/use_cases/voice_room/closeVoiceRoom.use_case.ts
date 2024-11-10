import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VoiceRoomRepository } from '../../repositories/voice_room.repository';
import { VoiceRoom } from '../../models/voice_room.model';

@Injectable({
  providedIn: 'root',
})
export class CloseVoiceRoom {
  constructor(private VoiceRoomRepository: VoiceRoomRepository) {}

  execute(
    room_id: string,
  ): Observable<any> {
    return this.VoiceRoomRepository.closeVoiceRoom(
      room_id
    );
  }
}

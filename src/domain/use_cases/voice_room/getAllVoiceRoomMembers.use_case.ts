import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VoiceRoomRepository } from '../../repositories/voice_room.repository';
import { VoiceRoom } from '../../models/voice_room.model';
import { UserDemo } from '../../models/user-demo.model';
import { UserInVoiceRoom } from '../../models/user_in_voice_room.model';

@Injectable({
  providedIn: 'root',
})
export class GetAllVoiceRoomMembers {
  constructor(private VoiceRoomRepository: VoiceRoomRepository) {}

  execute(room_id: string): Observable<UserInVoiceRoom[]> {
    return this.VoiceRoomRepository.getAllVoiceRoomMembers(room_id);
  }
}

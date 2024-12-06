import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VoiceRoomRepository } from '../../repositories/voice_room.repository';
import { VoiceRoom } from '../../models/voice_room.model';

@Injectable({
  providedIn: 'root',
})
export class GetVoiceRoom {
  constructor(private VoiceRoomRepository: VoiceRoomRepository) {}

  execute(user_id: string, filters: any, page:number): Observable<VoiceRoom[]> {
    return this.VoiceRoomRepository.getVoiceRoom(user_id, filters, page);
  }
}
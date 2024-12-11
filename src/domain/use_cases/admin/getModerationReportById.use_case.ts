import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminRepository } from '../../repositories/admin.repository';
import { Post } from '../../models/post.model';
import { VoiceRoom } from '../../models/voice_room.model';
import { Message } from '../../models/message.model';
import { Comment } from '../../models/comment.model';
@Injectable({
  providedIn: 'root',
})
export class GetModerationReportById {
  constructor(private adminRepository: AdminRepository) {}

  execute(id: number, type: string): Observable<number | Post | Comment | VoiceRoom | Message | any> {
    return this.adminRepository.getModerationReportById(id, type);
  }
}

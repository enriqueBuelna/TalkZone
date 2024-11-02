import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageRepository } from '../../repositories/message.repository';
import { Message } from '../../models/message.model';
import { Conversation } from '../../models/conversation.model';

@Injectable({
  providedIn: 'root',
})
export class GetMyConversation {
  constructor(private messageRespository: MessageRepository) {}

  execute(user_id: string): Observable<Conversation[]> {
    return this.messageRespository.getMyConversations(user_id);
  }
}

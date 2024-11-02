
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageRepository } from '../../repositories/message.repository';
import { Message } from '../../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class GetAllMessagesFromConversation {
  constructor(private messageRespository: MessageRepository) {}

  execute(myUser_id:string, user_id:string): Observable<Message[]> {
    return this.messageRespository.getAllMessagesFromConversation(myUser_id, user_id);
  }
}
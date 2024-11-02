import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllMessagesFromConversation } from '../use_cases/messages/getAllMessagesFromConversation.use_case';
import { Message } from '../models/message.model';
import { GetMyConversation } from '../use_cases/messages/getMyConversations.use_case';
import { Conversation } from '../models/conversation.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(
    private _getAllMessagesFromConversation: GetAllMessagesFromConversation,
    private _getMyConversations: GetMyConversation
  ) {}

  getAllMessagesFromConversation(
    myUser_id: string,
    user_id: string
  ): Observable<Message[]> {
    return this._getAllMessagesFromConversation.execute(myUser_id, user_id);
  }

  getMyConversation(user_id: string): Observable<Conversation[]> {
    return this._getMyConversations.execute(user_id);
  }
}

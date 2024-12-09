import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllMessagesFromConversation } from '../use_cases/messages/getAllMessagesFromConversation.use_case';
import { Message } from '../models/message.model';
import { GetMyConversation } from '../use_cases/messages/getMyConversations.use_case';
import { Conversation } from '../models/conversation.model';
import { ReportMessage } from '../use_cases/messages/reportMessage.use_case';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(
    private _getAllMessagesFromConversation: GetAllMessagesFromConversation,
    private _getMyConversations: GetMyConversation,
    private _reportMessage: ReportMessage
  ) {}

  reportMessage(
    reason: string,
    details: string,
    reported_user_id: string,
    reporter_id: string,
    message_id: string
  ): Observable<boolean> {
    return this._reportMessage.execute(
      reason,
      details,
      reported_user_id,
      reporter_id,
      message_id
    );
  }

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

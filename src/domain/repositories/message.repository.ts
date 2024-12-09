import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { Conversation } from '../models/conversation.model';

export abstract class MessageRepository {
  abstract getAllMessagesFromConversation(
    myUser_id: string,
    user_id: string
  ): Observable<Message[]>;
  abstract getMyConversations(user_id: string): Observable<Conversation[]>;
  abstract reportMessage(
    reason: string,
    details: string,
    reported_user_id: string,
    reporter_id: string,
    message_id: string
  ): Observable<boolean>;
}

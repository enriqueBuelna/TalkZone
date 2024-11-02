import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { Conversation } from '../models/conversation.model';

export abstract class MessageRepository {
  abstract getAllMessagesFromConversation(
    myUser_id: string,
    user_id: string
  ): Observable<Message[]>;
  abstract getMyConversations(user_id: string): Observable<Conversation[]>;
}

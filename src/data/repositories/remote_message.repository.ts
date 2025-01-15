import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MessageRepository } from '../../domain/repositories/message.repository';
import { Message } from '../../domain/models/message.model';
import { Conversation } from '../../domain/models/conversation.model';
import { UserDemo } from '../../domain/models/user-demo.model';

@Injectable({
  providedIn: 'root',
})
export class RemoteMessageRepository extends MessageRepository {
  private readonly API_URL = 'https://api-talkzone.onrender.com/messages';
  private _http = inject(HttpClient);

  override reportMessage(reason: string, details: string, reported_user_id: string, reporter_id: string, message_id: string): Observable<boolean> {
    const payload = {
      reason,
      details,
      reported_user_id,
      reporter_id,
      message_id,
    };
    console.log(message_id);
    return this._http.post<boolean>(
      `${this.API_URL}/reportMessage`,
      payload
    );
  }

  getAllMessagesFromConversation(
    myUser_id: string,
    user_id: string
  ): Observable<Message[]> {
    const params = new HttpParams()
      .set('myUser_id', myUser_id)
      .set('user_id', user_id); // Convierte también el userId a string
    return this._http
      .get<Message[]>(`${this.API_URL}/getMessages`, { params })
      .pipe(
        map((messages: any[]) => {
          // Verifica si conversations es un array vacío
          if (!Array.isArray(messages) || messages.length === 0) {
            return []; // Devuelve un array vacío si no hay conversaciones
          }
          return messages.map(
            (message: any) =>
              new Message(
                message.id,
                message.sender_id,
                message.receiver_id,
                message.content,
                message.media_url,
                message.sent_at
              )
          );
        })
      );
  }

  getMyConversations(user_id: string): Observable<Conversation[]> {
    const params = new HttpParams().set('user_id', user_id);
    return this._http
      .get<Conversation[]>(`${this.API_URL}/getMyConversations`, { params })
      .pipe(
        map((conversations: any[]) => {
          // Verifica si conversations es un array vacío
          if (!Array.isArray(conversations) || conversations.length === 0) {
            return []; // Devuelve un array vacío si no hay conversaciones
          }
          // Mapea los elementos de conversations si contiene datos
          return conversations.map(
            (conversation: any) =>
              new Conversation(
                conversation.id,
                new Message(
                  conversation.last_message_id.id,
                  conversation.last_message_id.sender_id,
                  conversation.last_message_id.receiver_id,
                  conversation.last_message_id.content,
                  conversation.last_message_id.media_url,
                  conversation.last_message_id.sent_at
                ),
                new UserDemo(
                  conversation.other_user.id,
                  conversation.other_user.username,
                  '',
                  conversation.other_user.profile_picture,
                  conversation.other_user.is_verified
                ),
                conversation.unread_count
              )
          );
        })
      );
  }
}

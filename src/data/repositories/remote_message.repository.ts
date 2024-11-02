import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { MessageRepository } from '../../domain/repositories/message.repository';
import { Message } from '../../domain/models/message.model';
import { Conversation } from '../../domain/models/conversation.model';

@Injectable({
  providedIn: 'root',
})
export class RemoteMessageRepository extends MessageRepository {
  private readonly API_URL = 'http://localhost:3000/messages';
  private _http = inject(HttpClient);

  getAllMessagesFromConversation(
    myUser_id: string,
    user_id: string
  ): Observable<Message[]> {
    const params = new HttpParams()
      .set('myUser_id', myUser_id)
      .set('user_id', user_id); // Convierte también el userId a string
    return this._http.get<Message[]>(`${this.API_URL}/getMessages`, { params });
  }

  getMyConversations(user_id: string): Observable<Conversation[]> {
    const params = new HttpParams().set('user_id', user_id);
    return this._http.get<Conversation[]>(
      `${this.API_URL}/getMyConversations`,
      { params }
    );
  }
}

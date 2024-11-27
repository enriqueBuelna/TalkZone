import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { UserDemo } from '../../../../../domain/models/user-demo.model';
import { Message } from '../../../../../domain/models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageComponentService {
  //aqui yo ocupo obtener los mensajes anteriores mediante el user_id, y ocupo poner que user_id es al que estoy ahorita
  private user?: UserDemo;
  private myMessages = signal<Message[]>([]);

  getUser() {
    return this.user;
  }

  setUser(user: UserDemo) {
    this.user = user;
  }

  setMessages(messages: Message[]) {
    this.myMessages.set(messages);
  }

  getMessages() {
    return this.myMessages;
  }

  addNewMessage(message: Message) {
    this.myMessages.update((msg) => [...msg, message]);
  }
}

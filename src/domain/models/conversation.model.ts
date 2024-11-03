import { Message } from './message.model';
import { UserDemo } from './user-demo.model';

export class Conversation {
  private id: number;
  private last_message: Message;
  private userInfo: UserDemo;

  constructor(id: number, last_message: Message, userInfo: UserDemo) {
    this.last_message = last_message;
    this.userInfo = userInfo;
    this.id = id;
  }

  getLastMessage() {
    return this.last_message;
  }

  getUserInfo() {
    return this.userInfo;
  }

  getConversationId() {
    return this.id;
  }

  setNewMessage(msg: Message) {
    this.last_message = msg;
  }
}

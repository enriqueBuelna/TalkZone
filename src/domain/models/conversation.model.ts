import { Message } from './message.model';
import { UserDemo } from './user-demo.model';

export class Conversation {
  private id: number;
  private last_message: Message;
  private userInfo: UserDemo;
  private unread_count:number;

  constructor(id: number, last_message: Message, userInfo: UserDemo, unread_count:number) {
    this.last_message = last_message;
    this.userInfo = userInfo;
    this.id = id;
    this.unread_count = unread_count;
  }

  readMessage(){
    this.unread_count = 0;
  }

  getUnreadCount(){
    return this.unread_count;
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

  plusNoRead(){
    this.unread_count++;
  }
}

import { Injectable, signal } from '@angular/core';
import { Conversation } from '../../../../../domain/models/conversation.model';

@Injectable({
  providedIn: 'root',
})
export class ConversationCService {
  // private myConversations: Conversation[] = [];
  private myConversations = signal<Conversation[]>([]);
  getMyConversations() {
    return this.myConversations;
  }

  setMyConversations(conversation: Conversation[]) {
    this.myConversations.set(conversation);
  }
}

import { Injectable, signal } from '@angular/core';
import { Conversation } from '../../../../../domain/models/conversation.model';

@Injectable({
  providedIn: 'root',
})
export class ConversationCService {
  // private myConversations: Conversation[] = [];
  private emptyBucket = signal(true);
  private prueba = false;
  private myConversations = signal<Conversation[]>([]);
  getMyConversations() {
    return this.myConversations;
  }

  setMyConversations(conversation: Conversation[]) {
    this.myConversations.set(conversation);
  }

  findConversation(id: number) {
    return this.myConversations().find((el) => el.getConversationId() === id);
  }

  addNewConversation(conversation: Conversation) {
    this.myConversations.update((el) => [...el, conversation]); //aqui va cambiar
    if (this.emptyBucket()) {
      this.emptyBucket.set(false);
    }
  }

  hasConversations() {
    if (this.myConversations().length > 0) {
      this.emptyBucket.set(false);
    } else {
      this.emptyBucket.set(true);
    }
    return this.emptyBucket;
  }

  reorderConversation() {
    this.myConversations().sort(
      (a, b) =>
        new Date(b.getLastMessage().getSentAt()).getTime() -
        new Date(a.getLastMessage().getSentAt()).getTime()
    );
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { ConversationComponent } from './conversation/conversation.component';
import { Conversation } from '../../../../../domain/models/conversation.model';
import { ConversationCService } from '../services/conversation.service';

@Component({
  selector: 'app-conversations-container',
  standalone: true,
  imports: [ConversationComponent],
  templateUrl: './conversations-container.component.html',
  styleUrl: './conversations-container.component.css',
})
export class ConversationsContainerComponent implements OnInit {
  isLoading = signal(true);
  myConversations = signal<Conversation[]>([]);

  constructor(private _conversationService: ConversationCService) {}
  ngOnInit() {
    this.isLoading.set(true);
    this.myConversations = this._conversationService.getMyConversations();
    this.isLoading.set(false);
  }
}

import { Component, Input } from '@angular/core';
import { UserDemo } from '../../../../../../domain/models/user-demo.model';
import { Message } from '../../../../../../domain/models/message.model';
import { Router } from '@angular/router';
import { ConversationCService } from '../../services/conversation.service';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css',
})
export class ConversationComponent {
  @Input() last_message!: Message;
  @Input() userDemo!: UserDemo;
  @Input() unread!:number;
  @Input() id!:string;

  constructor(private _router: Router, private _conversationService:ConversationCService) {}

  goToChat() {
    this._conversationService.findConversation(parseInt(this.id))?.readMessage();
    this._router.navigate(['home/messages', this.userDemo.getUserId()]); // Redirigir a la página de bienvenida
  }
}

import { Component, Input } from '@angular/core';
import { ChatMessageComponent } from './chat-messages/chat-message.component';
import { InputChatComponent } from './input-chat/input-chat.component';
import { UserDemo } from '../../../../../domain/models/user-demo.model';


@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [ChatMessageComponent, InputChatComponent],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.css'
})
export class ChatContainerComponent {
  @Input() userDemo!:UserDemo | undefined;
}

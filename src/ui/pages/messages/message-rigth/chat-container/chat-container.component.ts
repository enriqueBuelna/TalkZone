import { Component } from '@angular/core';
import { ChatMessageComponent } from './chat-messages/chat-message.component';
import { InputChatComponent } from './input-chat/input-chat.component';


@Component({
  selector: 'app-chat-container',
  standalone: true,
  imports: [ChatMessageComponent, InputChatComponent],
  templateUrl: './chat-container.component.html',
  styleUrl: './chat-container.component.css'
})
export class ChatContainerComponent {

}

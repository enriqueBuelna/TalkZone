import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageComponentService } from '../../services/message-component.service';
import { SocketService } from '../../../../../../socket_service/socket.service';
import { UserService } from '../../../../auth/services/user.service';
import { ChatService } from '../../../services/chatService.service';

@Component({
  selector: 'app-input-chat',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-chat.component.html',
  styleUrl: './input-chat.component.css',
})
export class InputChatComponent implements OnInit{
  messageForm!: FormGroup;
  @ViewChild('chatContainer') chatContainer!: ElementRef; // Referencia al contenedor de mensajes
  constructor(
    private formBuilder: FormBuilder,
    private _messageService: MessageComponentService,
    private _socketService: SocketService,
    private _userService: UserService,
    private _chatService:ChatService
  ) {
    this.messageForm = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
  }

  

  ngOnInit(): void {
   
    
  }

  sendMessage() {
    if (this.messageForm.valid) {
      let { message } = this.messageForm.value;

      const payload = {
        sender_id: this._userService.getUserId(),
        receiver_id: this._messageService.getUser()?.getUserId(),
        content: message,
        media_url: null,
      };

      this._socketService.emitEvent('sendMessage', payload);
    
      this.messageForm.get('message')?.reset();

      
    }
  }
}

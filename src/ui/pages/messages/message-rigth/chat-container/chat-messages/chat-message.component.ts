import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from '../../../../../../domain/services/message.service';
import { UserService } from '../../../../auth/services/user.service';
import { MessageComponentService } from '../../services/message-component.service';
import { map, Observable, Subscription } from 'rxjs';
import { Message } from '../../../../../../domain/models/message.model';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../../../../../../socket_service/socket.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChatService } from '../../../services/chatService.service';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [MessagesComponent],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css',
})
export class ChatMessageComponent implements OnInit {
  //cargar los mensajes
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  private subscription!: Subscription;
  responseAllMessages?: Observable<Message[]>;
  observable!: Subscription;
  allMessages = signal<Message[]>([]);
  idOtherUser: string = '';
  private hasNewMessages = false;

  constructor(
    private _messageService: MessageService,
    private _userService: UserService,
    private _messages: MessageComponentService,
    private _route: ActivatedRoute,
    private _destroyRefe: DestroyRef,
    private chatService: ChatService,
    private _messageSocket: SocketService
  ) {}

  ngOnInit() {
    this.chatService.setHere();
    const roomId =
      this._route.snapshot.paramMap.get('user_id') ?? 'defaultRoomId';
    const payload = {
      user_id: this._userService.getUserId(),
      user_id_2: roomId,
    };
    this._messageSocket.emitEvent('readMessages', payload);
    this._route.paramMap
      .pipe(takeUntilDestroyed(this._destroyRefe))
      .subscribe((params) => {
        this.idOtherUser = params.get('user_id') + '';
        this.responseAllMessages =
          this._messageService.getAllMessagesFromConversation(
            this._userService.getUserId(),
            this.idOtherUser
          );

        this.responseAllMessages
          .pipe(takeUntilDestroyed(this._destroyRefe))
          .subscribe((el) => {
            this._messages.setMessages(el);
            this.allMessages = this._messages.getMessages();
            this.hasNewMessages = true; // Indicar que hay nuevos mensajes
          });
      });
  }

  ngOnDestroy() {
    this.chatService.setNoHere();
  }

  scrollToBottom() {
    const container = this.chatContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }

  // Método para desplazar al último mensaje
}

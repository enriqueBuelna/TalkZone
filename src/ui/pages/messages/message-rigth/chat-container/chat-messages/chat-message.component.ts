import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from '../../../../../../domain/services/message.service';
import { UserService } from '../../../../auth/services/user.service';
import { MessageComponentService } from '../../services/message-component.service';
import { map, Observable, Subscription } from 'rxjs';
import { Message } from '../../../../../../domain/models/message.model';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../../../../../../socket_service/socket.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [MessagesComponent],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css',
})
export class ChatMessageComponent implements OnInit {
  //cargar los mensajes
  responseAllMessages?: Observable<Message[]>;
  observable!: Subscription;
  allMessages = signal<Message[]>([]);
  idOtherUser: string = '';
  constructor(
    private _messageService: MessageService,
    private _userService: UserService,
    private _messages: MessageComponentService,
    private _route: ActivatedRoute,
    private _destroyRefe: DestroyRef
  ) {}

  ngOnInit() {
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
            //all messages, guardarlo en un servicio
            this._messages.setMessages(el);
            this.allMessages = this._messages.getMessages();
          });
      });
  }
}

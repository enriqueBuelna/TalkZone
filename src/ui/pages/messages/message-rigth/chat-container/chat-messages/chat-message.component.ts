import { Component, OnInit, signal } from '@angular/core';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from '../../../../../../domain/services/message.service';
import { UserService } from '../../../../auth/services/user.service';
import { MessageComponentService } from '../../services/message-component.service';
import { map, Observable, Subscription } from 'rxjs';
import { Message } from '../../../../../../domain/models/message.model';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../../../../../../socket_service/socket.service';

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
    private messageService: MessageService,
    private userService: UserService,
    private messages: MessageComponentService,
    private route: ActivatedRoute,
    private _socketService: SocketService
  ) {}

  ngOnInit() {
    // this.observable = this._socketService
    //   .listenEvent('chatMessage')
    //   .subscribe((el) => {
    //     this.messages.addNewMessage(
    //       new Message(
    //         el.id,
    //         el.sender_id,
    //         el.receiver_id,
    //         el.content,
    //         el.media_url
    //       )
    //     );
    //   });

    this.route.paramMap.subscribe((params) => {
      this.idOtherUser = params.get('user_id') + '';
      this.responseAllMessages = this.messageService
        .getAllMessagesFromConversation(
          this.userService.getUserId(),
          this.idOtherUser
        )
        .pipe(
          map((messages: any[]) =>
            messages.map(
              (message: any) =>
                new Message(
                  message.id,
                  message.sender_id,
                  message.receiver_id,
                  message.content,
                  message.media_url,
                  message.sent_at
                )
            )
          )
        );

      this.responseAllMessages.subscribe((el) => {
        //all messages, guardarlo en un servicio
        this.messages.setMessages(el);
        this.allMessages = this.messages.getMessages();
      });
    });
  }
}

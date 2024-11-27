import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../utils/header/header.component';
import { AsideComponent } from '../../utils/aside/aside.component';
import { MessageRigthComponent } from './message-rigth/message-rigth.component';
import { ListMessagesComponent } from './list-messages/list-messages.component';
import { RouterOutlet } from '@angular/router';
import { SocketService } from '../../../socket_service/socket.service';
import { Observable, Subscription } from 'rxjs';
import { MessageComponentService } from './message-rigth/services/message-component.service';
import { ConversationCService } from './list-messages/services/conversation.service';
import { Message } from '../../../domain/models/message.model';
import { UserService } from '../auth/services/user.service';
import { AuthService } from '../../../domain/services/auth.service';
import { UserDemo } from '../../../domain/models/user-demo.model';
import { Conversation } from '../../../domain/models/conversation.model';
import { ChatService } from './services/chatService.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ListMessagesComponent,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  observable!: Subscription;
  constructor(
    private _socketService: SocketService,
    private _messageService: MessageComponentService,
    private _conversationService: ConversationCService,
    private _userService: UserService,
    private _userAService: AuthService,
    private _chatService:ChatService
  ) {}

  ngOnInit() {
    this.observable = this._socketService
      .listenEvent('chatMessage')
      .subscribe((el) => {
        let aux = false;
        if(this._chatService.amHere){
          let payload = {
            id:el[0].id,
            sender_id:el[0].sender_id,
            receiver_id:el[0].receiver_id,
            user_id:this._userService.getUserId(),
            amHere: this._chatService.amHere
          }
          this._socketService.emitEvent("readMessage", payload);
          aux = true;
        }
        //TENGO QUE AGARRAR EL SERVICIO DE LOS MENSAJES Y EL DE LAS CONVERSACIONES
        //debo que darme cuenta si ya tengo una conversacion con ese id, si no tengo una conversacion asi, pues hago un push, si no, actualizo el last_message, y en cuestion de los mensajes, yo voy a simplemente hacer un push ahi
        let msg = el[0];
        let newMessage = new Message(
          msg.id,
          msg.sender_id,
          msg.receiver_id,
          msg.content,
          msg.media_url,
          msg.sent_at
        );
        // console.log(newMessage);
        //tengo q cambiar el backend primero , para que me envie las dos cosas en el createMessage
        // console.log(el);
        //el tiene el nuevo mensaje, y la conversacion
        if (this._conversationService.findConversation(el[1].id)) {
          console.log(newMessage.getSenderId(), this._userService.getUserId(), aux);
          if(!aux && newMessage.getSenderId() !== this._userService.getUserId()){
            this._conversationService
            .findConversation(el[1].id)
            ?.plusNoRead();  
            console.log(this._conversationService.findConversation(el[1].id)?.getUnreadCount());
          }
          this._conversationService
            .findConversation(el[1].id)
            ?.setNewMessage(newMessage);
          this._messageService.addNewMessage(newMessage); //es el que pone el mensaje ahi
        } else {
          let user1 = el[2];
          let user2 = el[3];
          let user;
          let unread = 0;
          if(el[0].sender_id !== this._userService.getUserId()){
            unread++;
          }

          if (user1.id === this._userService.getUserId()) {
            user = user2;
          } else {
            user = user1;
          }
          let otherUser = new UserDemo(
            user.id,
            user.username,
            '',
            user.profile_picture
          );
          // let unread_messages = user.unre
          this._conversationService.addNewConversation(
            new Conversation(el[1].id, newMessage, otherUser, unread)
          );
          // this._messageService.addNewMessage(newMessage);
        }
        this._conversationService.reorderConversation();
        //SI LA ENCUENTRA, TENGO QUE CAMBIAR EL LAST_MESSAGE Y HACER UN CAMBIO DE COMO ESTAN ACOMODADOS LOS ELEMENTOS DE MI ARREGLO DE CHATS
      });
  }
}

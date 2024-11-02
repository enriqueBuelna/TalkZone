import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../utils/header/header.component';
import { AsideComponent } from '../../utils/aside/aside.component';
import { MessageRigthComponent } from './message-rigth/message-rigth.component';
import { ListMessagesComponent } from './list-messages/list-messages.component';
import { RouterOutlet } from '@angular/router';
import { SocketService } from '../../../socket_service/socket.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    AsideComponent,
    MessageRigthComponent,
    ListMessagesComponent,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  // observable!: Subscription;
  // constructor(private _socketService: SocketService) {}

  // ngOnInit() {
  //   this.observable = this._socketService
  //     .listenEvent('chatMessage')
  //     .subscribe((el) => {
  //       console.log(el);
  //     });
  // }
}

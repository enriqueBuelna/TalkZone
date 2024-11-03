import {
  Component,
  computed,
  effect,
  EventEmitter,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { ButtonComponent } from '../../../utils/button/button.component';
import { DialogModule } from 'primeng/dialog';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../auth/services/user.service';
import { filter, map, Observable } from 'rxjs';
import { User } from '../../../../domain/models/user.model';
import { AuthService } from '../../../../domain/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ConversationsContainerComponent } from './conversations-container/conversations-container.component';
import { Conversation } from '../../../../domain/models/conversation.model';
import { MessageService } from '../../../../domain/services/message.service';
import { Message } from '../../../../domain/models/message.model';
import { UserDemo } from '../../../../domain/models/user-demo.model';
import { ConversationCService } from './services/conversation.service';
@Component({
  selector: 'app-list-messages',
  standalone: true,
  imports: [
    ButtonComponent,
    DialogModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    ConversationsContainerComponent,
  ],
  templateUrl: './list-messages.component.html',
  styleUrl: './list-messages.component.css',
})
export class ListMessagesComponent implements OnInit {
  emptyBucket = signal(false); //esto me va funcionar por si no tengo algun mensaje
  visible = signal(false);
  conversations = signal<Conversation[]>([]);
  responseFollowersFollowed!: Observable<User[]>;
  resposnseGetConversations$!: Observable<Conversation[]>;
  followersFollowed: User[] = [];
  filteredUsers: any[] = [];
  formFindUser!: FormGroup; //aqui
  @Output() newMessageToUser = new EventEmitter<any>(); // Evento de clic
  showDialog() {
    this.visible.set(true);
    this.responseFollowersFollowed = this._userServiceA
      .getFollowersFollowed(this._userService.getUserId())
      .pipe(
        map((us: any[]) =>
          us.map(
            (user: any) =>
              new User(
                user.id,
                user.username,
                null,
                null,
                null,
                null,
                false,
                user.profile_picture
              )
          )
        )
      );

    this.responseFollowersFollowed.subscribe((el) => {
      this.followersFollowed = el;
    });
  }

  constructor(
    private _userServiceA: AuthService,
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _messageService: MessageService,
    private _conversationService: ConversationCService
  ) {
    this.formFindUser = this.formBuilder.group({
      selectedUser: ['', [Validators.required]],
    });
  }

  //
  ngOnInit() { 
    
    this.resposnseGetConversations$ = this._messageService
      .getMyConversation(this._userService.getUserId())
      .pipe(
        map((conversations: any[]) => {
          // Verifica si conversations es un array vacío
          if (!Array.isArray(conversations) || conversations.length === 0) {
            return []; // Devuelve un array vacío si no hay conversaciones
          }
          // Mapea los elementos de conversations si contiene datos
          return conversations.map(
            (conversation: any) =>
              new Conversation(
                conversation.id,
                new Message(
                  conversation.last_message_id.id,
                  conversation.last_message_id.sender_id,
                  conversation.last_message_id.receiver_id,
                  conversation.last_message_id.content,
                  conversation.last_message_id.media_url,
                  conversation.last_message_id.sent_at
                ),
                new UserDemo(
                  conversation.other_user.id,
                  conversation.other_user.username,
                  '',
                  conversation.other_user.profile_picture
                )
              )
          );
        })
      );

    this.resposnseGetConversations$.subscribe((el) => {
      this._conversationService.setMyConversations(el);
      this.conversations = this._conversationService.getMyConversations();
    this.emptyBucket = this._conversationService.hasConversations();

    });
  }

  filterUsers(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;
    console.log(this.followersFollowed);
    let userList = this.followersFollowed.map((user) => ({
      id: user.id,
      username: user.username,
      profile_picture: user.profile_pic,
    }));
    for (let i = 0; i < userList.length; i++) {
      let user = userList[i];
      if (user.username?.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(user);
      }
    }

    this.filteredUsers = filtered;
  }

  sendMessageUser() {
    if (this.formFindUser.valid) {
      let user = this.formFindUser.get('selectedUser')?.value;

      if (!user.id) {
        user = this.filteredUsers.find((el) => el.username === user);

        if (user === undefined) {
          //MOSTRAR MENSAJE SOBRE QUE NO SE PUDO ENCONTRAR EL USUARIO
          return;
        }
      }

      // this._messageService.selectMessage(user);
      this._router.navigate(['home/messages', user.id]); // Redirigir a la página de bienvenida
      this.visible.set(false);
    }
  }

  verCosas(){
    console.log(this.emptyBucket());
  }
}

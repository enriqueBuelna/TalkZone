import {
  Component,
  DestroyRef,
  HostListener,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { MembersContainerComponent } from '../members-container/members-container.component';
import { StreamContainerComponent } from '../stream-container/stream-container.component';
import { MessagesContainerComponent } from '../messages-container/messages-container.component';
import { CallService } from '../services/call.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../auth/services/user.service';
import { voiceRoomSocket } from '../../../../../socket_service/voice_room_socket.service';
import { Observable, sequenceEqual } from 'rxjs';
import { VoiceRoomService } from '../../../../../domain/services/voice_room.service';
import { VoiceRoomUser } from '../services/voice_room_user.service';
import { SocketService } from '../../../../../socket_service/socket.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserInVoiceRoom } from '../../../../../domain/models/user_in_voice_room.model';
import { myUserVoiceRoom } from '../services/myUserVr.service';
import { RaisedHand } from '../services/raiseHand.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonComponent } from '../../../../utils/button/button.component';
import { RatingComponent } from './rating/rating.component';
import { User } from '../../../../../domain/models/user.model';
import { AuthService } from '../../../../../domain/services/auth.service';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-room-container',
  standalone: true,
  imports: [
    MembersContainerComponent,
    StreamContainerComponent,
    MessagesContainerComponent,
    DialogModule,
    ButtonComponent,
    ReactiveFormsModule,
    AutoCompleteModule
  ],
  templateUrl: './room-container.component.html',
  styleUrl: './room-container.component.css',
})
export class RoomContainerComponent implements OnInit, OnDestroy {
  getAllUsers!: Observable<any>;
  getNewUser!: Observable<any>;
  userLeft!: Observable<any>;
  myUserVoiceRoom!: Observable<any>;
  handRaised!: Observable<any>;
  responseHandRaised!: Observable<any>;
  userLeftStageComplete!: Observable<any>;
  voiceRoomClosed!: Observable<any>;
  userInVoiceRoom = signal<UserInVoiceRoom[]>([]);
  myUserInVoiceRoom = signal<UserInVoiceRoom>(
    new UserInVoiceRoom('', '', '', '', false)
  );
  formFindUser!: FormGroup; //aqui

  closeVoiceRoom!: Observable<any>;
  voiceRoomClosedModal = signal(false);
  isOpen = signal(false);
  roomLog = '';
  showModalRating = signal(false);
  IdRoom = '';
  showExitDeleted = false;
  showNoInvite = false;
  filteredUsers: any[] = [];
  constructor(
    private _callService: CallService,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _voiceRoomSocket: voiceRoomSocket,
    private _voiceRoomService: VoiceRoomService,
    private _voiceRoomUsers: VoiceRoomUser,
    private _socketService: SocketService,
    private _destroyRef: DestroyRef,
    private _router: Router,
    private _myUserVoiceRoomService: myUserVoiceRoom,
    private _raisedHand: RaisedHand,
    private _userServiceA: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.formFindUser = this.formBuilder.group({
      selectedUser: ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    // Cambiar el color de fondo
    // document.body.style.backgroundColor = '#1a1a1a';

    // Obtener el ID de la sala
    const roomId =
      this._route.snapshot.paramMap.get('room_id') ?? 'defaultRoomId';

    // Verificar si la sala está abierta
    this._voiceRoomService
      .verifyOpenVoiceRoom(roomId, this._userService.getUserId())
      .subscribe({
        next: (isOpen: any) => {
          let aux = false;
          if (isOpen !== 'no-invite') {
            if (isOpen === 'active') {
              aux = true;
            }
            this.isOpen.set(aux);

            if (isOpen !== 'deleted') {
              if (isOpen !== 'closed') {
                console.log('AJIEH');
                this.initializeVoiceRoom(roomId);
              } else {
                console.log('ESTO ESTA CERRADO');
                this.voiceRoomClosedModal.set(true);
              }
            } else {
              this.showExitDeleted = true;
            }
          } else {
            this.showNoInvite = true;
          }
        },
        error: () => {
          // Manejar el error sin usar console.error
          this.voiceRoomClosedModal.set(true);
          // Opcional: mostrar algún mensaje al usuario o manejar el error de otra forma.
        },
      });
  }

  private initializeVoiceRoom(roomId: string): void {
    // Conexión al socket
    this._socketService.connect();
    // Unirse a la sala de voz
    this._voiceRoomSocket.joinRoom(roomId, this._userService.getUserId());

    // Obtener todos los usuarios en la sala
    this.getAllUsers = this._voiceRoomService.getAllVoiceRoomMembers(roomId);
    this.getAllUsers
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((users) => {
        this._voiceRoomUsers.setUserInVoiceRoom(users);
        this.userInVoiceRoom = this._voiceRoomUsers.getUsersInVoiceRoom();
      });

    // Manejar nuevos usuarios que se unan
    this._voiceRoomSocket
      .addNewUser()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((newUser) => {
        if (newUser) {
          if (newUser.type !== 'host') {
            this.roomLog = newUser.roomLog;
          }
          this._voiceRoomUsers.updateUsersInVoiceRoom(newUser);
        }
      });

    // Manejar usuarios que salen
    this._voiceRoomSocket
      .userLeft()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(async (userLeft) => {
        let {user_id, is_remove} = userLeft;
        this._voiceRoomUsers.userLeft(user_id);
        this._raisedHand.userLeft(user_id);
        if (user_id === this._userService.getUserId() && is_remove) {
          this.showExitDeleted = true;
          await this._callService.leaveCall();
          this.restartAll();
        }
      });

    // Obtener el usuario actual en la sala
    this._voiceRoomSocket
      .getMyUserVoiceRoom()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(async (myUser) => {
        this._myUserVoiceRoomService.setMyUser(myUser);
        this.myUserInVoiceRoom = this._myUserVoiceRoomService.getMyUser();
        // Inicializar cliente y unirse a la llamada si es host
        await this._callService.initializeClient(
          roomId,
          this.myUserInVoiceRoom().getUserId()
        );

        if (this.myUserInVoiceRoom().getType() === 'host') {
          await this._callService.joinCall();
        }
      });

    // Manejar levantamiento de manos
    this._voiceRoomSocket
      .handRaised()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((raisedHandUserId) => {
        const user = this.userInVoiceRoom().find(
          (u) => u.getUserId() === raisedHandUserId
        );
        if (user) {
          this._raisedHand.updateRaisedHand(user);
        }
      });

    // Responder levantamiento de manos
    this._voiceRoomSocket
      .responseHandRaised()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(async (response) => {
        if (response.answer === 'yes') {
          const myUser = this.myUserInVoiceRoom();
          if (myUser.getUserId() === response.user_id) {
            await this._callService.joinCall();
            myUser.goToStage();
          }
          this._raisedHand.userLeft(response.user_id);
          this._voiceRoomUsers.changesUserInStage(response.user_id, 'yes');
        }
      });

    // Manejar usuarios que dejan el escenario
    this._voiceRoomSocket
      .userLeftStageComplete()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(async (userId) => {
        const myUser = this.myUserInVoiceRoom();
        if (myUser.getUserId() === userId) {
          await this._callService.leaveCall();
          myUser.backFromStage();
        }
        this._voiceRoomUsers.changesUserInStage(userId, 'no');
      });

    // Manejar cierre de sala
    this._voiceRoomSocket
      .voiceRoomClosed()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(async () => {
        await this._callService.leaveCall();
        this.voiceRoomClosedModal.set(true);
        this.restartAll();
      });

    this._voiceRoomSocket
      .silenceMicrophone()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((el) => {
        if (el === this._userService.getUserId()) {
          this._callService.toggleAudio(false);
        }
      });

    this._voiceRoomSocket
      .getDown()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(async (el) => {
        const myUser = this.myUserInVoiceRoom();
        if (myUser.getUserId() === el) {
          await this._callService.leaveCall();
          myUser.backFromStage();
        }
        this._voiceRoomUsers.changesUserInStage(el, 'no');
      });
  }

  async ngOnDestroy() {
    document.body.style.backgroundColor = ''; // Restablece el color al salir del componente
    await this._callService.leaveCall();
    this.restartAll();
  }

  restartAll() {
    this.userInVoiceRoom.set([]);
    this.myUserInVoiceRoom.set(new UserInVoiceRoom('', '', '', '', false));
  }

  goHome() {
    this._router.navigate(['home/voice_room']);
  }

  showMessages = signal(false);
  followersFollowed: User[] = [];
  showFriends() {
    this.showMessages.set(!this.showMessages());

    if (this.showMessages()) {
      this._userServiceA
        .getFollowersFollowed(this._userService.getUserId())
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((el) => {
          this.followersFollowed = el;
        });
    }
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

  sendMessageUser(){
    const roomId =
      this._route.snapshot.paramMap.get('room_id') ?? 'defaultRoomId';
    if(this.formFindUser.valid){
      let {selectedUser} = this.formFindUser.value;
      this._voiceRoomService.inviteMessage(this._userService.getUserId(), selectedUser.id, roomId).pipe(takeUntilDestroyed(this._destroyRef)).subscribe(el => {
        this.showMessages.set(!this.showMessages());
      })
    }
  }
}

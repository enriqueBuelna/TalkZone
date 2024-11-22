import {
  Component,
  DestroyRef,
  inject,
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
import { Observable } from 'rxjs';
import { UserDemo } from '../../../../../domain/models/user-demo.model';
import { VoiceRoomService } from '../../../../../domain/services/voice_room.service';
import { VoiceRoomUser } from '../services/voice_room_user.service';
import { SocketService } from '../../../../../socket_service/socket.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserInVoiceRoom } from '../../../../../domain/models/user_in_voice_room.model';
import { myUserVoiceRoom } from '../services/myUserVr.service';
import { RaisedHand } from '../services/raiseHand.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonComponent } from '../../../../utils/button/button.component';
@Component({
  selector: 'app-room-container',
  standalone: true,
  imports: [
    MembersContainerComponent,
    StreamContainerComponent,
    MessagesContainerComponent,
    DialogModule,
    ButtonComponent,
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
  closeVoiceRoom!: Observable<any>;
  voiceRoomClosedModal = signal(false);
  isClosed = signal(false);
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
    private _raisedHand: RaisedHand
  ) {}

  ngOnInit() {
    document.body.style.backgroundColor = '#1a1a1a'; // o el color que prefieras
    const roomId =
      this._route.snapshot.paramMap.get('room_id') ?? 'defaultRoomId';
    //entrar a la llamada

    //verificar si la sala ya esta cerrada:
    this._voiceRoomService
      .verifyOpenVoiceRoom(roomId)
      .subscribe((el) => this.isClosed.set(el));
    if (this.isClosed()) {
      this._socketService.connect();

      this._voiceRoomSocket.joinRoom(roomId, this._userService.getUserId());

      this.getAllUsers = this._voiceRoomService.getAllVoiceRoomMembers(roomId);

      this.getAllUsers
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((el) => {
          console.log('USUARIOS TOTALES', el);
          this._voiceRoomUsers.setUserInVoiceRoom(el);
          this.userInVoiceRoom = this._voiceRoomUsers.getUsersInVoiceRoom();
        });

      this.getNewUser = this._voiceRoomSocket.addNewUser();

      this.getNewUser
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((el) => {
          if (el) {
            this._voiceRoomUsers.updateUsersInVoiceRoom(el);
          }
        });

      this.userLeft = this._voiceRoomSocket.userLeft();

      this.userLeft
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((el) => {
          this._voiceRoomUsers.userLeft(el);
          this._raisedHand.userLeft(el);
        });

      this.myUserVoiceRoom = this._voiceRoomSocket.getMyUserVoiceRoom();

      this.myUserVoiceRoom
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(async (el) => {
          this._myUserVoiceRoomService.setMyUser(el);
          this.myUserInVoiceRoom = this._myUserVoiceRoomService.getMyUser();

          // Espera la inicialización del cliente antes de unirte a la llamada
          await this._callService.initializeClient(
            roomId,
            this.myUserInVoiceRoom().getUserId()
          );

          if (this.myUserInVoiceRoom().getType() === 'host') {
            await this._callService.joinCall();
          }
        });

      this.handRaised = this._voiceRoomSocket.handRaised();

      this.handRaised
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((el) => {
          const user = this.userInVoiceRoom().find(
            (users) => el === users.getUserId()
          );
          if (user) {
            this._raisedHand.updateRaisedHand(user);
          }
        });

      this.responseHandRaised = this._voiceRoomSocket.responseHandRaised();

      this.responseHandRaised
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(async (el) => {
          if (el.answer === 'yes') {
            //ocupo checar mi usuario
            let myUser = this.myUserInVoiceRoom();
            if (myUser.getUserId() === el.user_id) {
              console.log('ENTROOOOOOOOOOO');
              await this._callService.joinCall();
              this.myUserInVoiceRoom().goToStage();
            }
            this._raisedHand.userLeft(el.user_id);
            this._voiceRoomUsers.changesUserInStage(el.user_id, 'yes');
          }
        });

      this.userLeftStageComplete =
        this._voiceRoomSocket.userLeftStageComplete();

      this.userLeftStageComplete
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(async (el) => {
          let user = this.myUserInVoiceRoom();
          if (user.getUserId() === el) {
            await this._callService.leaveCall();
            this.myUserInVoiceRoom().backFromStage();
          }
          this._voiceRoomUsers.changesUserInStage(el, 'no');
        });

      this.voiceRoomClosed = this._voiceRoomSocket.voiceRoomClosed();

      this.voiceRoomClosed
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(async (el) => {
          //tengo que cerrar la llamada y mostrar un modal adviertiendo de que se cerro la sala y lo que tengo que hacer es regresar a las salas de voz
          await this._callService.leaveCall();
          this.voiceRoomClosedModal.set(true);
          this.restartAll();
        });

      this.closeVoiceRoom = this._voiceRoomService.closeVoiceRoom(roomId);
    } else {
      this.voiceRoomClosedModal.set(!this.isClosed());
      console.log(this.isClosed());
    }
    // this._socketService.emitEvent('connection', null);
    //dejarlos en ese arreglo y ternerlos ahi esperando
  }

  async ngOnDestroy() {
    const roomId =
      this._route.snapshot.paramMap.get('room_id') ?? 'defaultRoomId';
    this._voiceRoomSocket.leaveRoom(roomId, this._userService.getUserId());

    document.body.style.backgroundColor = ''; // Restablece el color al salir del componente
    await this._callService.leaveCall();
    this.restartAll();
    console.log('todo bien hermano');
  }

  restartAll() {
    this.userInVoiceRoom.set([]);
    this.myUserInVoiceRoom.set(new UserInVoiceRoom('', '', '', '', false));
  }

  goToHome() {
    if (this.myUserInVoiceRoom().getType() === 'host') {
      this.closeVoiceRoom
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((el) => {
          this._router.navigate(['home/voice_room']);
        });
    } else {
      this._router.navigate(['home/voice_room']);
    }
  }
}

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
import { Observable } from 'rxjs';
import { VoiceRoomService } from '../../../../../domain/services/voice_room.service';
import { VoiceRoomUser } from '../services/voice_room_user.service';
import { SocketService } from '../../../../../socket_service/socket.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserInVoiceRoom } from '../../../../../domain/models/user_in_voice_room.model';
import { myUserVoiceRoom } from '../services/myUserVr.service';
import { RaisedHand } from '../services/raiseHand.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonComponent } from '../../../../utils/button/button.component';
import { RatingComponent } from "./rating/rating.component";
@Component({
  selector: 'app-room-container',
  standalone: true,
  imports: [
    MembersContainerComponent,
    StreamContainerComponent,
    MessagesContainerComponent,
    DialogModule,
    ButtonComponent,
    RatingComponent
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
  isOpen = signal(false);
  roomLog = '';
  showModalRating = signal(false);
  IdRoom = '';
  showExitDeleted = false;
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

  // ngOnInit() {
  //   document.body.style.backgroundColor = '#1a1a1a'; // o el color que prefieras
  //   const roomId =
  //     this._route.snapshot.paramMap.get('room_id') ?? 'defaultRoomId';
  //   //entrar a la llamada

  //   //verificar si la sala ya esta cerrada:
  //   this._voiceRoomService
  //     .verifyOpenVoiceRoom(roomId)
  //     .subscribe((el) => {
  //       this.isOpen.set(el)
  //     });
  //   if (this.isOpen()) {
  //     this._socketService.connect();

  //     this._voiceRoomSocket.joinRoom(roomId, this._userService.getUserId());

  //     this.getAllUsers = this._voiceRoomService.getAllVoiceRoomMembers(roomId);

  //     this.getAllUsers
  //       .pipe(takeUntilDestroyed(this._destroyRef))
  //       .subscribe((el) => {
  //         console.log('USUARIOS TOTALES', el);
  //         this._voiceRoomUsers.setUserInVoiceRoom(el);
  //         this.userInVoiceRoom = this._voiceRoomUsers.getUsersInVoiceRoom();
  //       });

  //     this.getNewUser = this._voiceRoomSocket.addNewUser();

  //     this.getNewUser
  //       .pipe(takeUntilDestroyed(this._destroyRef))
  //       .subscribe((el) => {
  //         if (el) {
  //           this._voiceRoomUsers.updateUsersInVoiceRoom(el);
  //         }
  //       });

  //     this.userLeft = this._voiceRoomSocket.userLeft();

  //     this.userLeft
  //       .pipe(takeUntilDestroyed(this._destroyRef))
  //       .subscribe((el) => {
  //         this._voiceRoomUsers.userLeft(el);
  //         this._raisedHand.userLeft(el);
  //       });

  //     this.myUserVoiceRoom = this._voiceRoomSocket.getMyUserVoiceRoom();

  //     this.myUserVoiceRoom
  //       .pipe(takeUntilDestroyed(this._destroyRef))
  //       .subscribe(async (el) => {
  //         this._myUserVoiceRoomService.setMyUser(el);
  //         this.myUserInVoiceRoom = this._myUserVoiceRoomService.getMyUser();

  //         // Espera la inicialización del cliente antes de unirte a la llamada
  //         await this._callService.initializeClient(
  //           roomId,
  //           this.myUserInVoiceRoom().getUserId()
  //         );

  //         if (this.myUserInVoiceRoom().getType() === 'host') {
  //           await this._callService.joinCall();
  //         }
  //       });

  //     this.handRaised = this._voiceRoomSocket.handRaised();

  //     this.handRaised
  //       .pipe(takeUntilDestroyed(this._destroyRef))
  //       .subscribe((el) => {
  //         const user = this.userInVoiceRoom().find(
  //           (users) => el === users.getUserId()
  //         );
  //         if (user) {
  //           this._raisedHand.updateRaisedHand(user);
  //         }
  //       });

  //     this.responseHandRaised = this._voiceRoomSocket.responseHandRaised();

  //     this.responseHandRaised
  //       .pipe(takeUntilDestroyed(this._destroyRef))
  //       .subscribe(async (el) => {
  //         if (el.answer === 'yes') {
  //           //ocupo checar mi usuario
  //           let myUser = this.myUserInVoiceRoom();
  //           if (myUser.getUserId() === el.user_id) {
  //             console.log('ENTROOOOOOOOOOO');
  //             await this._callService.joinCall();
  //             this.myUserInVoiceRoom().goToStage();
  //           }
  //           this._raisedHand.userLeft(el.user_id);
  //           this._voiceRoomUsers.changesUserInStage(el.user_id, 'yes');
  //         }
  //       });

  //     this.userLeftStageComplete =
  //       this._voiceRoomSocket.userLeftStageComplete();

  //     this.userLeftStageComplete
  //       .pipe(takeUntilDestroyed(this._destroyRef))
  //       .subscribe(async (el) => {
  //         let user = this.myUserInVoiceRoom();
  //         if (user.getUserId() === el) {
  //           await this._callService.leaveCall();
  //           this.myUserInVoiceRoom().backFromStage();
  //         }
  //         this._voiceRoomUsers.changesUserInStage(el, 'no');
  //       });

  //     this.voiceRoomClosed = this._voiceRoomSocket.voiceRoomClosed();

  //     this.voiceRoomClosed
  //       .pipe(takeUntilDestroyed(this._destroyRef))
  //       .subscribe(async (el) => {
  //         //tengo que cerrar la llamada y mostrar un modal adviertiendo de que se cerro la sala y lo que tengo que hacer es regresar a las salas de voz
  //         await this._callService.leaveCall();
  //         this.voiceRoomClosedModal.set(true);
  //         this.restartAll();
  //       });

  //     this.closeVoiceRoom = this._voiceRoomService.closeVoiceRoom(roomId);
  //   } else {
  //     this.voiceRoomClosedModal.set(!this.isOpen());
  //   }
  //   // this._socketService.emitEvent('connection', null);
  //   //dejarlos en ese arreglo y ternerlos ahi esperando
  // }

  async ngOnInit() {
    // Cambiar el color de fondo
    document.body.style.backgroundColor = '#1a1a1a';

    // Obtener el ID de la sala
    const roomId =
      this._route.snapshot.paramMap.get('room_id') ?? 'defaultRoomId';

    // Verificar si la sala está abierta
    this._voiceRoomService.verifyOpenVoiceRoom(roomId, this._userService.getUserId()).subscribe({
      next: (isOpen:any) => {
        console.log(isOpen);
        let aux = false;
        if(isOpen === 'active'){
          aux = true;
        }
        this.isOpen.set(aux);

        if(isOpen !== 'deleted'){
          if (isOpen) {
            this.initializeVoiceRoom(roomId);
          } else {
            this.voiceRoomClosedModal.set(true);
          }
        }else{
          this.showExitDeleted = true;
        }
      },
      error: (err) => {
        console.error('Error al verificar la sala de voz:', err);
        this.voiceRoomClosedModal.set(true);
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
        this._voiceRoomUsers.userLeft(userLeft);
        this._raisedHand.userLeft(userLeft);
        if(userLeft === this._userService.getUserId()){
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

    this._voiceRoomSocket.silenceMicrophone().pipe(takeUntilDestroyed(this._destroyRef)).subscribe(el => {
      if(el === this._userService.getUserId()){
        this._callService.toggleAudio(false);
      }
    })

    this._voiceRoomSocket.getDown().pipe(takeUntilDestroyed(this._destroyRef)).subscribe(async el => {
      const myUser = this.myUserInVoiceRoom();
        if (myUser.getUserId() === el) {
          await this._callService.leaveCall();
          myUser.backFromStage();
        }
        this._voiceRoomUsers.changesUserInStage(el, 'no');
    })

    this.closeVoiceRoom = this._voiceRoomService.closeVoiceRoom(roomId);
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

  goToHome() {
    const roomId =
      this._route.snapshot.paramMap.get('room_id') ?? 'defaultRoomId';
    if (this.myUserInVoiceRoom().getType() === 'host') {
      this.closeVoiceRoom
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((el) => {
          this._router.navigate(['home/voice_room']);
        });
    } else {
      this._voiceRoomSocket.leaveRoom(
        roomId,
        this._userService.getUserId(),
        this.roomLog
      );
      this._voiceRoomSocket.amWent().subscribe((el) => {
        if(el){
          this.showModalRating.set(el);
        }else{
          this._router.navigate(['home/voice_room']);
        }
      });
    }
  }

  hasUnsavedChanges = true;

  // Escuchar el cierre de ventana
  @HostListener('window:beforeunload', ['$event'])
  async onBeforeUnload(event: BeforeUnloadEvent) {
    const roomId =
      this._route.snapshot.paramMap.get('room_id') ?? 'defaultRoomId';
    this._voiceRoomSocket.leaveRoom(
      roomId,
      this._userService.getUserId(),
      this.roomLog
    );
  }

  goHome(){
    this._router.navigate(['home/voice_room']);
  }
}
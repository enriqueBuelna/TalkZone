import {
  Component,
  DestroyRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CallService } from '../services/call.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MemberVoiceChatComponent } from './member-voice-chat/member-voice-chat.component';
import { UserDemo } from '../../../../../domain/models/user-demo.model';
import { VoiceRoomUser } from '../services/voice_room_user.service';
import { UserInVoiceRoom } from '../../../../../domain/models/user_in_voice_room.model';
import { myUserVoiceRoom } from '../services/myUserVr.service';
import { voiceRoomSocket } from '../../../../../socket_service/voice_room_socket.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  NavigationStart,
  Route,
  Router,
} from '@angular/router';
import { UserService } from '../../../auth/services/user.service';
import { VoiceRoomService } from '../../../../../domain/services/voice_room.service';
import { Observable, Subscription } from 'rxjs';
import { ButtonComponent } from '../../../../utils/button/button.component';
import { DialogModule } from 'primeng/dialog';
import { RatingComponent } from "../room-container/rating/rating.component";
@Component({
  selector: 'app-stream-container',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    ButtonComponent,
    MemberVoiceChatComponent,
    RatingComponent
],
  templateUrl: './stream-container.component.html',
  styleUrl: './stream-container.component.css',
})
export class StreamContainerComponent implements OnInit, OnDestroy {
  usersInVoiceRoom = signal<UserInVoiceRoom[]>([]);
  navigationSubscription!: Subscription;
  myUserInVoiceRoom = signal<UserInVoiceRoom>(
    new UserInVoiceRoom('', '', '', '', false)
  );
  voiceRoomClosedModal = signal(false);
  // myUserInVoiceRoom
  formPrueba!: FormGroup;
  outVoiceChat = signal(true);
  micOn = false;
  closeVoiceRoom!: Observable<any>;
  roomLog = '';
  showModalRating = signal(false);

  constructor(
    private _callService: CallService,
    private _formBuilder: FormBuilder,
    private _voiceRoom: VoiceRoomUser,
    private _myUserVoiceRoomService: myUserVoiceRoom,
    private _route: ActivatedRoute,
    private _voiceRoomSocket: voiceRoomSocket,
    private _destroyRef: DestroyRef,
    private _userService: UserService,
    private _voiceRoomService: VoiceRoomService,
    private _router: Router,
    private _voiceRoomUsers: VoiceRoomUser
  ) {
    this.formPrueba = this._formBuilder.group({
      roomName: ['', [Validators.required]],
      uid: ['', [Validators.required]],
    });
  }

  listening() {
    this.navigationSubscription = this._router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // Antes de navegar, verifica si el usuario es el host
        const roomId =
          this._route.snapshot.paramMap.get('room_id') ?? 'defaultRoomId';
        if (this.myUserInVoiceRoom().getType() === 'host') {
          this.closeVoiceRoom
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((el) => {
              console.log(el);
              this._router.navigate(['home/voice_room']);
            });
          this._voiceRoomSocket.leaveRoom(
            roomId,
            this._userService.getUserId(),
            this.roomLog
          );
        }
      }
    });
  }

  ngOnInit(): void {
    // Obtener el ID de la sala
    const roomId =
      this._route.snapshot.paramMap.get('room_id') ?? 'defaultRoomId';
    this.usersInVoiceRoom = this._voiceRoom.getUsersInVoiceRoom();
    this.myUserInVoiceRoom = this._myUserVoiceRoomService.getMyUser();

    this.listening();

    // Manejar cierre de sala
    this._voiceRoomSocket
      .voiceRoomClosed()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(async () => {
        await this._callService.leaveCall();
        this.voiceRoomClosedModal.set(true);
      });

    this._voiceRoomSocket
      .silenceMicrophone()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((el) => {
        if (el === this._userService.getUserId()) {
          this._callService.toggleAudio(false);
        }
      });

    this.closeVoiceRoom = this._voiceRoomService.closeVoiceRoom(roomId);

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
  }
  joinCall() {
    this.outVoiceChat.set(false);
    this._callService.joinCall();
  }

  putInformation() {
    let { roomName, uid } = this.formPrueba.value;
    this._callService.setOptions(roomName, uid);
  }

  leaveChanel() {
    const roomId =
      this._route.snapshot.paramMap.get('room_id') ?? 'defaultRoomId';
    this._voiceRoomSocket.userLeftStage(
      this.myUserInVoiceRoom().getUserId(),
      roomId
    );
  }

  toggleMicrophone() {
    this.micOn = !this.micOn;
    this._callService.toggleAudio(this.micOn);
  }

  raiseHand() {
    const roomId =
      this._route.snapshot.paramMap.get('room_id') ?? 'defaultRoomId';
    this._voiceRoomSocket.raiseHand(
      roomId,
      this.myUserInVoiceRoom().getUserId()
    );
  }

  goToHome() {
    const roomId =
      this._route.snapshot.paramMap.get('room_id') ?? 'defaultRoomId';
    if (this.myUserInVoiceRoom().getType() === 'host') {
      this.closeVoiceRoom
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((el) => {
          console.log(el);
          this._router.navigate(['home/voice_room']);
        });
      this._voiceRoomSocket.leaveRoom(
        roomId,
        this._userService.getUserId(),
        this.roomLog
      );
    } else {
      this._voiceRoomSocket.leaveRoom(
        roomId,
        this._userService.getUserId(),
        this.roomLog
      );
      this._voiceRoomSocket.amWent().subscribe((el) => {
        if (el) {
          console.log("CHIVOOO");
          this.showModalRating.set(el);
        } else {
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
    console.log('chivo');
  }

  ngOnDestroy() {}
}

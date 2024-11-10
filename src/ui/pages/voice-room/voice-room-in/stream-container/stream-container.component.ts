import { Component, OnInit, signal } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-stream-container',
  standalone: true,
  imports: [ReactiveFormsModule, MemberVoiceChatComponent],
  templateUrl: './stream-container.component.html',
  styleUrl: './stream-container.component.css',
})
export class StreamContainerComponent implements OnInit {
  usersInVoiceRoom = signal<UserInVoiceRoom[]>([]);
  myUserInVoiceRoom = signal<UserInVoiceRoom>(
    new UserInVoiceRoom('', '', '', '', false)
  );
  // myUserInVoiceRoom
  formPrueba!: FormGroup;
  outVoiceChat = signal(true);
  micOn = false;
  constructor(
    private _callService: CallService,
    private _formBuilder: FormBuilder,
    private _voiceRoom: VoiceRoomUser,
    private _myUserVoiceRoomService: myUserVoiceRoom,
    private _route: ActivatedRoute,
    private _voiceRoomSocket: voiceRoomSocket
  ) {
    this.formPrueba = this._formBuilder.group({
      roomName: ['', [Validators.required]],
      uid: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.usersInVoiceRoom = this._voiceRoom.getUsersInVoiceRoom();
    this.myUserInVoiceRoom = this._myUserVoiceRoomService.getMyUser();
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
}

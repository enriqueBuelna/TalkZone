import { Component, DestroyRef, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { voiceRoomSocket } from '../../../../../socket_service/voice_room_socket.service';
import { MessageVoiceRoomComponent } from './message-voice-room/message-voice-room.component';
import { UserService } from '../../../auth/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
interface message {
  from: string;
  message: string;
}
@Component({
  selector: 'app-messages-container',
  standalone: true,
  imports: [MessageVoiceRoomComponent, ReactiveFormsModule],
  templateUrl: './messages-container.component.html',
  styleUrl: './messages-container.component.css',
})
export class MessagesContainerComponent implements OnInit {
  formMessage!: FormGroup;
  messages: message[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _voiceRoomSocket: voiceRoomSocket,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _destroyRef: DestroyRef
  ) {
    this.formMessage = this._formBuilder.group({
      message: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this._voiceRoomSocket.getNewMessage().pipe(takeUntilDestroyed(this._destroyRef)).subscribe((el) => {
      console.log('mensaje recibido', el);
      let aux = {
        from: el.from,
        message: el.message,
      };

      this.messages.push(aux);
    });
  }

  sendMessage() {
    if (this.formMessage.valid) {
      const roomId =
        this._route.snapshot.paramMap.get('room_id') ?? 'defaultRoomId';
      let { message } = this.formMessage.value;
      this._voiceRoomSocket.sendMessage(
        roomId,
        this._userService.getUserId(),
        message
      );
      this.formMessage.get('message')?.reset();
    }
  }
}

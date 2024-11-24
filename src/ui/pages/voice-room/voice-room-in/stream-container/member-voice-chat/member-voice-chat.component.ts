import { Component, Input, signal } from '@angular/core';
import { UserDemo } from '../../../../../../domain/models/user-demo.model';
import { UserInVoiceRoom } from '../../../../../../domain/models/user_in_voice_room.model';
import { UserService } from '../../../../auth/services/user.service';
import { VoiceRoomUser } from '../../services/voice_room_user.service';
import { voiceRoomSocket } from '../../../../../../socket_service/voice_room_socket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-voice-chat',
  standalone: true,
  imports: [],
  templateUrl: './member-voice-chat.component.html',
  styleUrl: './member-voice-chat.component.css',
})
export class MemberVoiceChatComponent {
  constructor(
    private _userService: UserService,
    private _voiceRoomService: VoiceRoomUser,
    private _voiceRoomSocket: voiceRoomSocket,
    private _route: ActivatedRoute
  ) {}
  @Input() userInVoiceRoom!: UserInVoiceRoom;

  isMenuOpen = false;

  toggleMenu() {
    if (this._voiceRoomService.userAdmin() === this._userService.getUserId()) {
      if (this._userService.getUserId() !== this.userInVoiceRoom.getUserId()) {
        this.isMenuOpen = !this.isMenuOpen;
      }
    }
  }

  muteUser() {
    const roomId =
      this._route.snapshot.paramMap.get('room_id') ?? 'defaultRoomId';
    this._voiceRoomSocket.silenceMember(
      roomId,
      this.userInVoiceRoom.getUserId()
    );
    this.isMenuOpen = false; // Cerrar menú
  }

  removeUser() {
    const roomId =
      this._route.snapshot.paramMap.get('room_id') ?? 'defaultRoomId';
    this._voiceRoomSocket.downOfStage(
      roomId,
      this.userInVoiceRoom.getUserId()
    );
    this.isMenuOpen = false; // Cerrar menú
  }
}

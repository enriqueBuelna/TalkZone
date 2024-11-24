import { Component, Input, signal } from '@angular/core';
import { UserDemo } from '../../../../../../domain/models/user-demo.model';
import { UserInVoiceRoom } from '../../../../../../domain/models/user_in_voice_room.model';
import { UserService } from '../../../../auth/services/user.service';
import { VoiceRoomUser } from '../../services/voice_room_user.service';

@Component({
  selector: 'app-member-voice-chat',
  standalone: true,
  imports: [],
  templateUrl: './member-voice-chat.component.html',
  styleUrl: './member-voice-chat.component.css',
})
export class MemberVoiceChatComponent {
  constructor(private _userService: UserService, private _voiceRoomService:VoiceRoomUser) {}
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
    console.log('Usuario silenciado');
    this.isMenuOpen = false; // Cerrar menú
  }

  removeUser() {
    console.log('Usuario bajado del escenario');
    this.isMenuOpen = false; // Cerrar menú
  }
}

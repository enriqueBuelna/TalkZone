import { Component, Input } from '@angular/core';
import { UserDemo } from '../../../../../../domain/models/user-demo.model';
import { UserInVoiceRoom } from '../../../../../../domain/models/user_in_voice_room.model';
import { ActivatedRoute, Router } from '@angular/router';
import { voiceRoomSocket } from '../../../../../../socket_service/voice_room_socket.service';
import { UserService } from '../../../../auth/services/user.service';
import { VoiceRoomUser } from '../../services/voice_room_user.service';
import { DialogModule } from 'primeng/dialog';
import { ButtonComponent } from '../../../../../utils/button/button.component';
import { CallService } from '../../services/call.service';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css',
})
export class MemberComponent {
  @Input() userInVoiceRoom!: UserInVoiceRoom;
  constructor(
    private _userService: UserService,
    private _voiceRoomService: VoiceRoomUser,
    private _voiceRoomSocket: voiceRoomSocket,
    private _route: ActivatedRoute,
    private _router: Router,
     private _callService: CallService
  ) {}
  isMenuOpen = false;
  showExitDeleted = false;
  deleteUser() {
    const roomId =
      this._route.snapshot.paramMap.get('room_id') ?? 'defaultRoomId';
    this._voiceRoomSocket.goOffRoom(roomId, this.userInVoiceRoom.getUserId());
    this.isMenuOpen = false;
    this.showExitDeleted = true;
  }

  toggleMenu() {
    if (this._voiceRoomService.userAdmin() === this._userService.getUserId()) {
      if (this._userService.getUserId() !== this.userInVoiceRoom.getUserId()) {
        this.isMenuOpen = !this.isMenuOpen;
      }
    }
  }

  async goHome() {
    await this._callService.leaveCall();
    this._router.navigate(['home/voice_room']);
  }

}

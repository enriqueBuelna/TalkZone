import { Component, Input } from '@angular/core';
import { UserDemo } from '../../../../../../domain/models/user-demo.model';
import { UserInVoiceRoom } from '../../../../../../domain/models/user_in_voice_room.model';
import { ActivatedRoute } from '@angular/router';
import { voiceRoomSocket } from '../../../../../../socket_service/voice_room_socket.service';
import { UserService } from '../../../../auth/services/user.service';
import { VoiceRoomUser } from '../../services/voice_room_user.service';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent {
  @Input() userInVoiceRoom!: UserInVoiceRoom;
  constructor(
    private _userService: UserService,
    private _voiceRoomService: VoiceRoomUser,
    private _voiceRoomSocket: voiceRoomSocket,
    private _route: ActivatedRoute
  ) {}
  isMenuOpen = false;

  deleteUser(){
    const roomId =
      this._route.snapshot.paramMap.get('room_id') ?? 'defaultRoomId';
    this._voiceRoomSocket.goOffRoom(
      roomId,
      this.userInVoiceRoom.getUserId()
    );
    this.isMenuOpen = false;
  }

  toggleMenu() {
    if (this._voiceRoomService.userAdmin() === this._userService.getUserId()) {
      if (this._userService.getUserId() !== this.userInVoiceRoom.getUserId()) {
        this.isMenuOpen = !this.isMenuOpen;
      }
    }
  }

}

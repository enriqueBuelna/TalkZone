import { Component, signal } from '@angular/core';
import { MemberComponent } from './member/member.component';
import { VoiceRoomUser } from '../services/voice_room_user.service';
import { UserDemo } from '../../../../../domain/models/user-demo.model';
import { UserInVoiceRoom } from '../../../../../domain/models/user_in_voice_room.model';
import { myUserVoiceRoom } from '../services/myUserVr.service';
import { RaisedHand } from '../services/raiseHand.service';
import { DialogModule } from 'primeng/dialog';
import { MemberRaisedHandComponent } from "./member-raised-hand/member.component";
@Component({
  selector: 'app-members-container',
  standalone: true,
  imports: [MemberComponent, DialogModule, MemberRaisedHandComponent],
  templateUrl: './members-container.component.html',
  styleUrl: './members-container.component.css',
})
export class MembersContainerComponent {
  usersInVoiceRoom = signal<UserInVoiceRoom[]>([]);
  myUserVoiceRoom = signal<UserInVoiceRoom>(
    new UserInVoiceRoom('', '', '', '',false)
  );
  modalCreate = signal(false);
  handRaised = signal<UserInVoiceRoom[]>([]);
  constructor(
    private _voiceRoom: VoiceRoomUser,
    private _myUser: myUserVoiceRoom,
    private _raisedHands: RaisedHand
  ) {}

  ngOnInit() {
    this.usersInVoiceRoom = this._voiceRoom.getUsersInVoiceRoom();
    this.myUserVoiceRoom = this._myUser.getMyUser();
    this.handRaised = this._raisedHands.getUsersInVoiceRoom();
  }

  showModal(){
    this.modalCreate.set(true);
  }
}

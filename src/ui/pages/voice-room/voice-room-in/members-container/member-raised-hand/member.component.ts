import { Component, Input, OnInit } from '@angular/core';
import { UserDemo } from '../../../../../../domain/models/user-demo.model';
import { UserInVoiceRoom } from '../../../../../../domain/models/user_in_voice_room.model';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { voiceRoomSocket } from '../../../../../../socket_service/voice_room_socket.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-member-raised-hand',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css',
})
export class MemberRaisedHandComponent implements OnInit {
  @Input() userInVoiceRoom!: UserInVoiceRoom;
  answerHandRaise!: Observable<any>;

  constructor(
    private _route: ActivatedRoute,
    private _socketVoiceRoom: voiceRoomSocket
  ) {}

  ngOnInit(): void {}

  answerRaiseHand(response: string) {
    const roomId =
      this._route.snapshot.paramMap.get('room_id') ?? 'defaultRoomId';
    this._socketVoiceRoom.answerRaisedHand(
      response,
      this.userInVoiceRoom.getUserId(),
      roomId
    );
  }
}

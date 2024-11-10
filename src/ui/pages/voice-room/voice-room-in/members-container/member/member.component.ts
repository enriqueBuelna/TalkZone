import { Component, Input } from '@angular/core';
import { UserDemo } from '../../../../../../domain/models/user-demo.model';
import { UserInVoiceRoom } from '../../../../../../domain/models/user_in_voice_room.model';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [],
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent {
  @Input() userInVoiceRoom!: UserInVoiceRoom;

}

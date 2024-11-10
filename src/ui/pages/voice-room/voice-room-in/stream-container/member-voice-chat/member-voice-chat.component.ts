import { Component, Input } from '@angular/core';
import { UserDemo } from '../../../../../../domain/models/user-demo.model';
import { UserInVoiceRoom } from '../../../../../../domain/models/user_in_voice_room.model';

@Component({
  selector: 'app-member-voice-chat',
  standalone: true,
  imports: [],
  templateUrl: './member-voice-chat.component.html',
  styleUrl: './member-voice-chat.component.css'
})
export class MemberVoiceChatComponent {
  @Input() userInVoiceRoom!: UserInVoiceRoom;
}

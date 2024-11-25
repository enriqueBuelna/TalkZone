import { Component, Input } from '@angular/core';
interface message{
  from:string;
  message:string;
}
@Component({
  selector: 'app-message-voice-room',
  standalone: true,
  imports: [],
  templateUrl: './message-voice-room.component.html',
  styleUrl: './message-voice-room.component.css'
})
export class MessageVoiceRoomComponent {
  @Input() username!:'';
  // @Input() message!:'';
  @Input() message!:message;
}

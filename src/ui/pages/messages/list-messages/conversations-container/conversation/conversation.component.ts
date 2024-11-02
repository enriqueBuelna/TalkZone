import { Component, Input } from '@angular/core';
import { UserDemo } from '../../../../../../domain/models/user-demo.model';
import { Message } from '../../../../../../domain/models/message.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css',
})
export class ConversationComponent {
  @Input() last_message!: Message;
  @Input() userDemo!: UserDemo;

  constructor(private _router: Router) {}

  goToChat() {
    this._router.navigate(['home/messages', this.userDemo.getUserId()]); // Redirigir a la página de bienvenida
  }
}

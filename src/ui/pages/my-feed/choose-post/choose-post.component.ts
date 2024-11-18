import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserDemo } from '../../../../domain/models/user-demo.model';

@Component({
  selector: 'app-choose-post',
  standalone: true,
  imports: [],
  templateUrl: './choose-post.component.html',
  styleUrl: './choose-post.component.css'
})
export class ChoosePostComponent {
  @Output() clickEvent = new EventEmitter<boolean>(); // Evento de clic

  // Método para manejar el clic
  onClick(option:boolean) {
      this.clickEvent.emit(option);
  }
}

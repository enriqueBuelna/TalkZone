import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserDemo } from '../../../../domain/models/user-demo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choose-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './choose-post.component.html',
  styleUrl: './choose-post.component.css',
})
export class ChoosePostComponent {
  @Output() clickEvent = new EventEmitter<boolean>(); // Evento de clic
  rule = 'all';
  // Método para manejar el clic
  onClick(option: boolean) {
    if (option) {
      this.rule = 'all';
    } else {
      this.rule = 'friends';
    }
    this.clickEvent.emit(option);
  }
}

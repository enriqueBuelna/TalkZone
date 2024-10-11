import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() text: string = 'Botón'; // Texto del botón
  @Input() type: 'button' | 'submit' = 'button'; // Tipo de botón
  @Output() clickEvent = new EventEmitter<void>(); // Evento de clic

  // Método para manejar el clic
  onClick() {
    this.clickEvent.emit(); // Emitir el evento
  }
}
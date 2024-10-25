import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() text: string = 'Botón'; // Texto del botón
  @Input() type: 'button' | 'submit' = 'button'; // Tipo de botón
  @Input() buttonClass: string = ''; // Nueva propiedad para la clase
  @Output() clickEvent = new EventEmitter<void>(); // Evento de clic

  // Método para manejar el clic
  onClick() {
    this.clickEvent.emit(); // Emitir el evento
  }
}

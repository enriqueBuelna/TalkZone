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
  @Input() text: string = 'Botón';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() buttonClass: string = '';
  @Input() isDisabled: boolean = false;
  @Input() isLoading: boolean = false; // Nuevo input para estado de carga
  loaderColor = '#fff'; // Puedes cambiar este valor dinámicamente
  @Input() loadingText: string = 'Cargando...'; // Texto alternativo
  @Output() clickEvent = new EventEmitter<void>();

  onClick() {
    if (!this.isDisabled && !this.isLoading) { // Bloquea durante la carga
      this.clickEvent.emit();
    }
  }
}
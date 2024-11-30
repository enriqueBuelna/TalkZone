import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserPreferences } from '../../../../domain/entities/user_preferences/user_preference.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent {
  @Input() userPreference!:UserPreferences;
  @Output() clickEvent = new EventEmitter<UserPreferences>(); // Evento de clic

  selectCard(user:UserPreferences){
    this.clickEvent.emit(user);
  }
}

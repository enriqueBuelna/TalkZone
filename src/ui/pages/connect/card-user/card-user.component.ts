import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserPreferences } from '../../../../domain/entities/user_preferences/user_preference.interface';
import { CommonModule } from '@angular/common';
import { UserPreference } from '../../../../domain/models/user_preference.model';

@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css',
})
export class CardUserComponent {
  @Output() clickEvent = new EventEmitter<UserPreferences>(); // Evento de clic
  @Input() myPreferences: UserPreference[] = [];
  @Input() userPreference!: UserPreferences;
  selectCard(user: UserPreferences) {
    this.clickEvent.emit(user);
  }
  filteredPreferences: UserPreference[] = [];
  filterMatchingPreferences(): UserPreference[] {
    if (!this.myPreferences || !this.userPreference?.userPreference) {
      return [];
    }
    console.log(this.myPreferences, this.userPreference?.userPreference);
    return this.myPreferences.filter((myPref) =>
      this.userPreference.userPreference.some(
        (userPref) => userPref.getTopicName() === myPref.getTopicName()
      )
    );
  }
  ngOnInit(): void {
    this.filteredPreferences = this.filterMatchingPreferences();
    console.log(this.filteredPreferences);
  }
}

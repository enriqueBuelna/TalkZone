

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPreferenceRepository } from '../../repositories/user_preferences.repository';
import { UserPreference } from '../../models/user_preference.model';

@Injectable({
  providedIn: 'root',
})
export class GetMyUserPreferences {
  constructor(private UserPreferenceRepository: UserPreferenceRepository) {}

  execute(user_id: string): Observable<UserPreference[]> {
    return this.UserPreferenceRepository.getMyUserPreferences(user_id);
  }
}



import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPreferenceRepository } from '../../repositories/user_preferences.repository';
import { UserPreference } from '../../models/user_preference.model';

@Injectable({
  providedIn: 'root',
})
export class DeleteUserPreferences {
  constructor(private UserPreferenceRepository: UserPreferenceRepository) {}

  execute(user_preference_id:number): Observable<any> {
    return this.UserPreferenceRepository.deleteUserPreference(user_preference_id);
  }
}

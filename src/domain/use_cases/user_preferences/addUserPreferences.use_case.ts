

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPreferenceRepository } from '../../repositories/user_preferences.repository';
import { UserPreference } from '../../models/user_preference.model';

@Injectable({
  providedIn: 'root',
})
export class AddUserPreferences {
  constructor(private UserPreferenceRepository: UserPreferenceRepository) {}

  execute(user_id:string, userPrefences: UserPreference): Observable<UserPreference> {
    return this.UserPreferenceRepository.addUserPreferences(user_id, userPrefences);
  }
}

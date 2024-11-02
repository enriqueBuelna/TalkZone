import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPreferenceRepository } from '../../repositories/user_preferences.repository';
import { UserPreferences } from '../../entities/user_preferences/user_preference.interface';

@Injectable({
  providedIn: 'root',
})
export class GetUsersByPreferences {
  constructor(private UserPreferenceRepository: UserPreferenceRepository) {}

  execute(user_id: string): Observable<UserPreferences[]> {
    return this.UserPreferenceRepository.getUsersByPreferences(user_id);
  }
}

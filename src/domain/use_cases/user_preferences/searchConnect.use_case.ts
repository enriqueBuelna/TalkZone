import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPreferenceRepository } from '../../repositories/user_preferences.repository';
import { UserPreference } from '../../models/user_preference.model';
import { UserPreferences } from '../../entities/user_preferences/user_preference.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchConnect {
  constructor(private UserPreferenceRepository: UserPreferenceRepository) {}

  execute(search:string,user_id: string): Observable<UserPreferences[]> {
    return this.UserPreferenceRepository.searchConnect(search, user_id);
  }
}

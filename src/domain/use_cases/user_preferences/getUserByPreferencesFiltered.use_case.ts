import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPreferenceRepository } from '../../repositories/user_preferences.repository';
import { ITopic } from '../../entities/topics/topic.interface';
import { UserPreferences } from '../../entities/user_preferences/user_preference.interface';

@Injectable({
  providedIn: 'root',
})
export class GetMyUserPreferencesFiltered {
  constructor(private UserPreferenceRepository: UserPreferenceRepository) {}

  execute(
    user_id:string,
    topicsKnow?: ITopic[],
    topicsLearn?: ITopic[],
    gender?: string,
    connect?: string
  ): Observable<UserPreferences[]> {
    return this.UserPreferenceRepository.getUserByPreferencesFiltered(
      user_id,
      topicsKnow,
      topicsLearn,
      gender,
      connect
    );
  }
}

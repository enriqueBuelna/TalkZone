import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetUsersByPreferences } from '../use_cases/user_preferences/getUsersByPreferences.use_case';
import { UserPreferences } from '../entities/user_preferences/user_preference.interface';
import { GetMyUserPreferences } from '../use_cases/user_preferences/getMyUserPreferences.use_case';
import { UserPreference } from '../models/user_preference.model';
import { GetMyUserPreferencesFiltered } from '../use_cases/user_preferences/getUserByPreferencesFiltered.use_case';
import { ITopic } from '../entities/topics/topic.interface';
@Injectable({
  providedIn: 'root',
})
export class UserPreferenceService {
  constructor(
    private _getUsersByPreferences: GetUsersByPreferences,
    private _getMyUserPreference: GetMyUserPreferences,
    private _getUserByPreferencesFiltered: GetMyUserPreferencesFiltered
  ) {}

  getUsersByPreferences(user_id: string): Observable<UserPreferences[]> {
    return this._getUsersByPreferences.execute(user_id);
  }

  getMyUserPreferences(user_id: string): Observable<UserPreference[]> {
    return this._getMyUserPreference.execute(user_id);
  }

  getUserByPreferencesFiltered(
    user_id:string,
    topicsKnow?: ITopic[],
    topicsLearn?: ITopic[],
    gender?: string,
    connect?: string
  ): Observable<UserPreferences[]> {
    return this._getUserByPreferencesFiltered.execute(
      user_id,
      topicsKnow,
      topicsLearn,
      gender,
      connect
    );
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetUsersByPreferences } from '../use_cases/user_preferences/getUsersByPreferences.use_case';
import { UserPreferences } from '../entities/user_preferences/user_preference.interface';
import { GetMyUserPreferences } from '../use_cases/user_preferences/getMyUserPreferences.use_case';
import { UserPreference } from '../models/user_preference.model';
import { GetMyUserPreferencesFiltered } from '../use_cases/user_preferences/getUserByPreferencesFiltered.use_case';
import { ITopic } from '../entities/topics/topic.interface';
import { Topic } from '../models/topic.model';
import { AddUserPreferences } from '../use_cases/user_preferences/addUserPreferences.use_case';
import { DeleteUserPreferences } from '../use_cases/user_preferences/deleteUserPreference.use_case';
import { SearchConnect } from '../use_cases/user_preferences/searchConnect.use_case';
@Injectable({
  providedIn: 'root',
})
export class UserPreferenceService {
  constructor(
    private _getUsersByPreferences: GetUsersByPreferences,
    private _getMyUserPreference: GetMyUserPreferences,
    private _getUserByPreferencesFiltered: GetMyUserPreferencesFiltered,
    private _addUserPreference: AddUserPreferences,
    private _deleteUserPreference: DeleteUserPreferences,
    private _searchConnect: SearchConnect
  ) {}

  searchConnect(
    search: string,
    user_id: string
  ): Observable<UserPreferences[]> {
    return this._searchConnect.execute(search, user_id);
  }

  getUsersByPreferences(user_id: string): Observable<UserPreferences[]> {
    return this._getUsersByPreferences.execute(user_id);
  }

  getMyUserPreferences(user_id: string): Observable<UserPreference[]> {
    return this._getMyUserPreference.execute(user_id);
  }

  getUserByPreferencesFiltered(
    user_id: string,
    topicsMentores?: ITopic[],
    topicsExploradores?: ITopic[],
    topicsEntusiastas?: ITopic[],
    gender?: string,
    connect?: string,
    onlyMentores?: string,
    onlyExploradores?: string,
    onlyEntusiastas?: string
  ): Observable<UserPreferences[]> {
    return this._getUserByPreferencesFiltered.execute(
      user_id,
      topicsMentores,
      topicsExploradores,
      topicsEntusiastas,
      gender,
      connect,
      onlyMentores,
      onlyEntusiastas,
      onlyExploradores
    );
  }

  addUserPreferences(
    user_id: string,
    userPreference: UserPreference
  ): Observable<UserPreference> {
    return this._addUserPreference.execute(user_id, userPreference);
  }

  deleteUserPreference(user_preference_id: number): Observable<any> {
    return this._deleteUserPreference.execute(user_preference_id);
  }
}

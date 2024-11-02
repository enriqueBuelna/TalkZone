import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPreferenceRepository } from '../../domain/repositories/user_preferences.repository';
import { UserPreferences } from '../../domain/entities/user_preferences/user_preference.interface';
import { UserPreference } from '../../domain/models/user_preference.model';
import { ITopic } from '../../domain/entities/topics/topic.interface';

@Injectable({
  providedIn: 'root',
})
export class RemoteUserPreferenceRespository extends UserPreferenceRepository {
  private readonly API_URL = 'http://localhost:3000/';
  private _http = inject(HttpClient);

  getUsersByPreferences(user_id: string): Observable<UserPreferences[]> {
    const params = new HttpParams().set('user_id', user_id);
    return this._http.get<UserPreferences[]>(
      `${this.API_URL}matchmakingConnect`,
      { params }
    );
  }

  getMyUserPreferences(user_id: string): Observable<UserPreference[]> {
    const params = new HttpParams().set('user_id', user_id);
    return this._http.get<UserPreference[]>(`${this.API_URL}preferences`, {
      params,
    });
  }

  getUserByPreferencesFiltered(
    user_id:string,
    topicsKnow?: ITopic[],
    topicsLearn?: ITopic[],
    gender?: string,
    connect?: string
  ): Observable<UserPreferences[]> {
    const payload = {
      user_id,
      topicsKnow,
      topicsLearn,
      gender,
      connect,
    };

    return this._http.post<UserPreferences[]>(`${this.API_URL}preferences/filtered`, payload);
  }
}

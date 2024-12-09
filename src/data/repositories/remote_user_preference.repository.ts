import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserPreferenceRepository } from '../../domain/repositories/user_preferences.repository';
import { UserPreferences } from '../../domain/entities/user_preferences/user_preference.interface';
import { UserPreference } from '../../domain/models/user_preference.model';
import { ITopic } from '../../domain/entities/topics/topic.interface';
import { Tag } from '../../domain/models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class RemoteUserPreferenceRespository extends UserPreferenceRepository {
  private readonly API_URL = 'http://localhost:3000/';
  private _http = inject(HttpClient);

  override searchConnect(
    search: string,
    user_id: string
  ): Observable<UserPreferences[]> {
    const params = new HttpParams()
      .set('user_id', user_id)
      .set('search', search);
    return this._http
      .get<UserPreferences[]>(`${this.API_URL}searchConnect`, { params })
      .pipe(
        map((userPreferences: any[]) => {
          if (!Array.isArray(userPreferences) || userPreferences.length === 0) {
            return []; // Devuelve un array vacío si no hay conversaciones
          }
          return userPreferences.map(
            (_userPreference) =>
              new UserPreferences(
                _userPreference.userPreferences.map(
                  (user_preference: any) =>
                    new UserPreference(
                      user_preference.id,
                      user_preference.topic.id,
                      user_preference.type,
                      user_preference.topic.topic_name,
                      user_preference.userPreferenceTags.map(
                        (tag: any) =>
                          new Tag(
                            tag.tag.tag_name,
                            tag.tag_id,
                            user_preference.topic_id
                          )
                      )
                    )
                ),
                _userPreference.userInformation,
                _userPreference.matchPercentage,
                _userPreference.user_id
              )
          );
        })
      );
  }

  getUsersByPreferences(user_id: string): Observable<UserPreferences[]> {
    const params = new HttpParams().set('user_id', user_id);
    return this._http
      .get<UserPreferences[]>(`${this.API_URL}matchmakingConnect`, { params })
      .pipe(
        map((userPreferences: any[]) => {
          if (!Array.isArray(userPreferences) || userPreferences.length === 0) {
            return []; // Devuelve un array vacío si no hay conversaciones
          }
          return userPreferences.map(
            (_userPreference) =>
              new UserPreferences(
                _userPreference.userPreferences.map(
                  (user_preference: any) =>
                    new UserPreference(
                      user_preference.id,
                      user_preference.topic.id,
                      user_preference.type,
                      user_preference.topic.topic_name,
                      user_preference.userPreferenceTags.map(
                        (tag: any) =>
                          new Tag(
                            tag.tag.tag_name,
                            tag.tag_id,
                            user_preference.topic_id
                          )
                      )
                    )
                ),
                _userPreference.userInformation,
                _userPreference.matchPercentage,
                _userPreference.user_id
              )
          );
        })
      );
  }

  getMyUserPreferences(user_id: string): Observable<UserPreference[]> {
    const params = new HttpParams().set('user_id', user_id);
    return this._http
      .get<UserPreference[]>(`${this.API_URL}preferences`, {
        params,
      })
      .pipe(
        map((preferences: any[]) => {
          if (!Array.isArray(preferences) || preferences.length === 0) {
            return []; // Devuelve un array vacío si no hay conversaciones
          }
          return preferences.map(
            (pref) =>
              new UserPreference(
                pref.id,
                pref.topic.id,
                pref.type,
                pref.topic.topic_name
              )
          );
        })
      );
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
    const payload = {
      user_id,
      topicsMentores,
      topicsExploradores,
      topicsEntusiastas,
      gender,
      connect,
      onlyMentores,
      onlyEntusiastas,
      onlyExploradores,
    };

    return this._http
      .post<UserPreferences[]>(`${this.API_URL}preferences/filtered`, payload)
      .pipe(
        map((userPreferences: any[]) => {
          if (!Array.isArray(userPreferences) || userPreferences.length === 0) {
            return []; // Devuelve un array vacío si no hay conversaciones
          }
          return userPreferences.map(
            (_userPreference) =>
              new UserPreferences(
                _userPreference.userPreferences.map(
                  (user_preference: any) =>
                    new UserPreference(
                      user_preference.id,
                      user_preference.topic.id,
                      user_preference.type,
                      user_preference.topic.topic_name,
                      user_preference.userPreferenceTags.map(
                        (tag: any) =>
                          new Tag(
                            tag.tag.tag_name,
                            tag.tag_id,
                            user_preference.topic_id
                          )
                      )
                    )
                ),
                _userPreference.userInformation,
                _userPreference.matchPercentage,
                _userPreference.user_id
              )
          );
        })
      );
  }

  addUserPreferences(
    user_id: string,
    userPreferences: UserPreference
  ): Observable<UserPreference> {
    const payload = {
      user_id,
      topic_id: userPreferences.getTopicId(),
      type: userPreferences.getType(),
      tags: userPreferences.getTags(),
    };

    return this._http
      .post<UserPreference>(`${this.API_URL}preferences`, payload)
      .pipe(
        map((el: any) => {
          console.log(el);
          return new UserPreference(
            el.id,
            el.topic_id,
            el.type,
            el.topic_name,
            el.tags.map(
              (tag: any) => new Tag(tag.tag_name, tag.tag_id, tag.topic_id)
            )
          );
        })
      );
  }

  deleteUserPreference(user_preference_id: number): Observable<any> {
    return this._http.delete<any>(
      `${this.API_URL}preferences?id=${user_preference_id}`
    );
  }
}

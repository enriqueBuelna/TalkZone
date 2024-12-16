// src/app/data/repositories/remote-user.repository.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../domain/models/user.model';
import { map } from 'rxjs/operators';
import { UserRepository } from '../../domain/repositories/user.repository';
import { HttpHeaders } from '@angular/common/http';
import { MessageResponse } from '../../domain/entities/users/MessageResponse.entitie';
import { LoginResponse } from '../../domain/entities/users/LoginResponse.entitie';
import { UserPreference } from '../../domain/models/user_preference.model';
import { UserDemo } from '../../domain/models/user-demo.model';
import { UserComplete } from '../../domain/models/user_complete_information.model';
import { Tag } from '../../domain/models/tag.model';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});
@Injectable({
  providedIn: 'root',
})
export class RemoteUserRepository extends UserRepository {
  override getBlockUser(user_id: string): Observable<UserDemo[]> {
    const params = new HttpParams().set('user_id', user_id); // Convierte el ID a string
    return this._http
      .get<UserDemo[]>(`${this.API_URL}/getBlockedUser`, { params })
      .pipe(
        map((ele: any) =>
          ele.map(
            (el: any) =>
              new UserDemo(
                el.blocked.id,
                el.blocked.username,
                el.blocked.gender,
                el.blocked.profile_picture,
                false
              )
          )
        )
      );
  }

  override blockUser(
    blocker_user_id: string,
    blocked_user_id: string
  ): Observable<boolean> {
    const payload = {
      blocked_user_id,
      blocker_user_id,
    };
    return this._http.post<boolean>(`${this.API_URL}/blockUser`, payload);
  }
  override unblockUser(
    blocker_user_id: string,
    blocked_user_id: string
  ): Observable<boolean> {
    const payload = {
      blocked_user_id,
      blocker_user_id,
    };
    return this._http.post<boolean>(`${this.API_URL}/unblockUser`, payload);
  }

  override amFollowing(
    user_id: string,
    other_user_id: string
  ): Observable<boolean> {
    const payload = {
      user_id,
      other_user_id,
    };
    return this._http.post<boolean>(`${this.API_URL}/amFollowing`, payload);
  }

  override completeProfile(user_id: string): Observable<any> {
    const payload = {
      user_id,
    };

    return this._http.post<any>(`${this.API_URL}/completeProfile`, payload);
  }

  override verifyChangePasswordCode(
    code: string,
    email: string
  ): Observable<MessageResponse> {
    throw new Error('Method not implemented.');
  }
  override changePassword(password: string): Observable<void> {
    throw new Error('Method not implemented.');
  }
  private readonly API_URL = 'http://localhost:3000/users';
  private _http = inject(HttpClient);

  register(user: User): Observable<User> {
    const payload = {
      username: user.username,
      email: user.email,
      password: user.password,
      date_of_birth: user.date_of_birth,
      gender: user.gender,
    };

    return this._http
      .post<User>(`${this.API_URL}/register`, payload)
      .pipe(
        map(
          (response: any) =>
            new User(
              response.id,
              response.username,
              response.email,
              response.password,
              response.date_of_birth,
              response.gender,
              response.is_profile_complete,
              response.profile_picture,
              response.is_banned
            )
        )
      );
  }

  login(username: string, password: string): Observable<LoginResponse> {
    const payload = {
      username,
      password,
    };

    return this._http
      .post<LoginResponse>(`${this.API_URL}/login`, payload)
      .pipe(
        map((response) => {
          // Aquí podrías realizar cualquier operación antes de retornar la respuesta.
          return response; // Retorna la respuesta tal cual o manipula si lo necesitas.
        })
      );
  }

  checkAvailability(
    username: string,
    email: string
  ): Observable<MessageResponse> {
    let payload = {
      username,
      email,
    };
    return this._http.post<MessageResponse>(
      `${this.API_URL}/validateEU`,
      payload,
      {
        headers,
      }
    );
  }

  sendVerificationCode(email: string): Observable<void> {
    const payload = { email };
    return this._http.post<void>(`${this.API_URL}/emailVerification`, payload);
  }

  verifyCode(code: string, email: string): Observable<MessageResponse> {
    const payload = { codigo_verificacion: code, email };
    return this._http.post<MessageResponse>(
      `${this.API_URL}/emailVerification/verify`,
      payload
    );
  }

  sendChangePasswordCode(email: string): Observable<MessageResponse> {
    const payload = { email };
    return this._http.post<MessageResponse>(
      `${this.API_URL}/passwordChanges/validateEmail`,
      payload
    );
  }

  finishProfile(
    user_id: string,
    about_me: string,
    profile_picture: string,
    user_preferences: UserPreference[]
  ): Observable<void> {
    const payload = { user_id, about_me, profile_picture, user_preferences };
    return this._http.post<void>(`${this.API_URL}/finishProfile`, payload);
  }

  getFollowersFollowed(user_id: string): Observable<User[]> {
    const params = new HttpParams().set('user_id', user_id.toString()); // Convierte el ID a string
    return this._http
      .get<User[]>(`${this.API_URL}/getFollowersFollowed`, {
        params,
      })
      .pipe(
        map((us: any[]) => {
          if (!Array.isArray(us) || us.length === 0) {
            return []; // Devuelve un array vacío si no hay conversaciones
          }
          return us.map(
            (user: any) =>
              new User(
                user.id,
                user.username,
                null,
                null,
                null,
                null,
                false,
                user.profile_picture,
                false
              )
          );
        })
      );
  }

  getBasicInfo(user_id: string): Observable<UserDemo> {
    const params = new HttpParams().set('user_id', user_id.toString());
    return this._http
      .get<UserDemo>(`${this.API_URL}/getBasicInfo`, { params })
      .pipe(
        map(
          (user: any) =>
            new UserDemo(
              user.id,
              user.username,
              user.gender,
              user.profile_picture,
              user.is_verified
            )
        )
      );
  }

  getCompleteInformation(
    user_id: string,
    myUserId: string
  ): Observable<UserComplete> {
    const params = new HttpParams()
      .set('user_id', user_id.toString())
      .set('myUserId', myUserId);
    return this._http
      .get<UserComplete>(`${this.API_URL}/getCompleteProfile`, { params })
      .pipe(
        map((user: any) => {
          console.log(user);
          return new UserComplete(
            new UserDemo(
              user.id,
              user.username,
              user.gender,
              user.profile_picture,
              user.is_verified
            ),
            user.user_to_user_preference.map(
              (user_preference: any) =>
                new UserPreference(
                  user_preference.id,
                  user_preference.topic_id,
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
            user.about_me,
            user.cover_picture,
            user.followers.map(
              (f: any) =>
                new UserDemo(
                  f.id,
                  f.username,
                  f.gender,
                  f.profile_picture,
                  f.is_verified
                )
            ),
            user.following.map(
              (f: any) =>
                new UserDemo(
                  f.id,
                  f.username,
                  f.gender,
                  f.profile_picture,
                  f.is_verified
                )
            )
          );
        })
      );
  }

  editProfile(
    user_id: string,
    username?: string,
    about_me?: string,
    profile_picture?: string,
    cover_picture?: string
  ): Observable<any> {
    const payload = {
      user_id,
      username,
      about_me,
      profile_picture,
      cover_picture,
    };
    return this._http.post<any>(`${this.API_URL}/editProfile`, payload);
  }
}

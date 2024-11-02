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

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});
@Injectable({
  providedIn: 'root',
})
export class RemoteUserRepository extends UserRepository {
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
              response.profile_picture
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
    return this._http.get<User[]>(`${this.API_URL}/getFollowersFollowed`, {
      params,
    });
  }

  getBasicInfo(user_id: string): Observable<UserDemo> {
    const params = new HttpParams().set('user_id', user_id.toString());
    return this._http.get<UserDemo>(`${this.API_URL}/getBasicInfo`, { params });
  }
}

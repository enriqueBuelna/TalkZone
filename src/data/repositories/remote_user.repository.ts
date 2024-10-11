// src/app/data/repositories/remote-user.repository.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../domain/models/user.model';
import { map } from 'rxjs/operators';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable({
  providedIn: 'root',
})
export class RemoteUserRepository extends UserRepository {
  private readonly API_URL = 'http://localhost:3000/users';
  private _http = inject(HttpClient);
  

  register(user: User): Observable<User> {
    const payload = {
      username: user.username,
      email: user.email,
      password: user.password,
      dateOfBirth: user.dateOfBirth,
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
              response.dateOfBirth,
              response.gender
            )
        )
      );
  }

  login(user: User): Observable<User> {
    const payload = {
      username: user.username,
      email: user.email,
      password: user.password,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
    };

    return this._http
      .post<User>(`${this.API_URL}/login`, payload)
      .pipe(
        map(
          (response: any) =>
            new User(
              response.id,
              response.username,
              response.email,
              response.password,
              response.dateOfBirth,
              response.gender
            )
        )
      );
  }

  checkAvailability(username:string, email:string): Observable<boolean> {
    let payload = {
      username, 
      email
    }
    return this._http.post<boolean>(`${this.API_URL}/validateEU`, payload);
  }

  sendVerificationCode(email:string): Observable<void>{
    const payload = {email};
    return this._http.post<void>(`${this.API_URL}/emailVerification`,payload);
  }

  verifyCode(code:string): Observable<boolean>{
    const payload = {code};
    return this._http.post<boolean>(`${this.API_URL}/emailVerification/verify`, payload);
  }
}

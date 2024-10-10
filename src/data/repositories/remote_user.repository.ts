// src/app/data/repositories/remote-user.repository.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../domain/models/user.model';
import { map } from 'rxjs/operators';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable({
  providedIn: 'root',
})
export class RemoteUserRepository extends UserRepository {
  private readonly API_URL = 'https://api.talkzone.com/users';

  constructor(private http: HttpClient) {
    super();
  }

  register(user: User): Observable<User> {
    const payload = {
      username: user.username,
      email: user.email,
      password: user.password,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
    };

    return this.http
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

    return this.http
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
}

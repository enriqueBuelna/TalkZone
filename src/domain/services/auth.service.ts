import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { RegisterUser } from '../use_cases/user/register_user.usecase';
import { LoginUser } from '../use_cases/user/login_user.usecase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private registerUser: RegisterUser,
    private loginUser: LoginUser
  ) {}

  register(user: User): Observable<User> {
    return this.registerUser.execute(user);
  }

  login(user: User): Observable<User> {
    return this.loginUser.execute(user);
  }
}

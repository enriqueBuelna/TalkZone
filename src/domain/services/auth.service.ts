import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { RegisterUser } from '../use_cases/user/register_user.usecase';
import { LoginUser } from '../use_cases/user/login_user.usecase';
import { CheckAvailability } from '../use_cases/user/checkAvailabilty_user.usercase';
import { VerifyCode } from '../use_cases/user/verifyCode_user.usecase';
import { SendVerificationCode } from '../use_cases/user/serdVerificationCode_user.usecase';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _registerUser: RegisterUser,
    private _loginUser: LoginUser,
    private _checkAvailability: CheckAvailability,
    private _verifyCode: VerifyCode,
    private _sendVerificationCode: SendVerificationCode
  ) {}

  register(user: User): Observable<User> {
    return this._registerUser.execute(user);
  }

  login(user: User): Observable<User> {
    return this._loginUser.execute(user);
  }

  checkAvailability(username: string, email: string): Observable<boolean> {
    return this._checkAvailability.execute(username, email);
  }
  
  verifyCode(code:string):Observable<boolean> {
    return this._verifyCode.execute(code);
  }

  sendVerificationCode(email:string): Observable<void> {
    return this._sendVerificationCode.execute(email);
  }
}

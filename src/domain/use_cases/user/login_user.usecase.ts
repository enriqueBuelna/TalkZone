import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../../repositories/user.repository';
import { LoginResponse } from '../../entities/users/LoginResponse.entitie';

@Injectable({
  providedIn: 'root'
})
export class LoginUser {
  constructor(private userRepository: UserRepository) {}

  execute(username:string, password:string): Observable<LoginResponse> {
    return this.userRepository.login(username, password);
  }
}
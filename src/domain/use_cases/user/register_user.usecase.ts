// src/app/core/use-cases/register-user.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserRepository } from '../../repositories/user.repository';

@Injectable({
  providedIn: 'root'
})
export class RegisterUser {
  constructor(private userRepository: UserRepository) {}

  execute(user: User): Observable<User> {
    return this.userRepository.register(user);
  }
}

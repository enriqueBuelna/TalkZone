// src/app/core/use-cases/register-user.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../../repositories/user.repository';
import { MessageResponse } from '../../entities/users/MessageResponse.entitie';

@Injectable({
  providedIn: 'root'
})
export class SendChangePasswordCode {
  constructor(private userRepository: UserRepository) {}

  execute(email:string): Observable<MessageResponse> {
    return this.userRepository.sendChangePasswordCode(email);
  }
}
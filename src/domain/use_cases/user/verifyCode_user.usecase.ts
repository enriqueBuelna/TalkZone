import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../../repositories/user.repository';
import { MessageResponse } from '../../entities/users/MessageResponse.entitie';

@Injectable({
  providedIn: 'root',
})
export class VerifyCode {
  constructor(private userRepository: UserRepository) {}

  execute(code: string, email: string): Observable<MessageResponse> {
    return this.userRepository.verifyCode(code, email);
  }
}

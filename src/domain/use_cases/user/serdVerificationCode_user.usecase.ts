import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../../repositories/user.repository';

@Injectable({
  providedIn: 'root',
})
export class SendVerificationCode {
  constructor(private userRepository: UserRepository) {}

  execute(email: string): Observable<void> {
    return this.userRepository.sendVerificationCode(email);
  }
}

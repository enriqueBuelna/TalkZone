import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../../repositories/user.repository';

@Injectable({
  providedIn: 'root',
})
export class VerifyCode {
  constructor(private userRepository: UserRepository) {}

  execute(code: string): Observable<boolean> {
    return this.userRepository.verifyCode(code);
  }
}

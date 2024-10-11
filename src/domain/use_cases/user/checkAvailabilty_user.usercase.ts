import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserRepository } from '../../repositories/user.repository';

@Injectable({
  providedIn: 'root',
})
export class CheckAvailability {
  constructor(private userRepository: UserRepository) {}

  execute(username: string, email: string): Observable<boolean> {
    return this.userRepository.checkAvailability(username, email);
  }
}

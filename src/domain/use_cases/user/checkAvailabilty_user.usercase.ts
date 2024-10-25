import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserRepository } from '../../repositories/user.repository';
import { MessageResponse } from '../../entities/users/MessageResponse.entitie';

@Injectable({
  providedIn: 'root',
})
export class CheckAvailability {
  constructor(private userRepository: UserRepository) {}

  execute(username: string, email: string): Observable<MessageResponse> {
    return this.userRepository.checkAvailability(username, email);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../../repositories/user.repository';

@Injectable({
  providedIn: 'root',
})
export class UnblockUser {
  constructor(private userRepository: UserRepository) {}

  execute(blocker_user_id:string, blocked_user_id:string): Observable<boolean> {
    return this.userRepository.unblockUser(blocker_user_id, blocked_user_id);
  }
}

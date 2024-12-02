import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../../repositories/user.repository';

@Injectable({
  providedIn: 'root',
})
export class AmFollowing {
  constructor(private userRepository: UserRepository) {}

  execute(user_id: string, other_user_id: string): Observable<boolean> {
    return this.userRepository.amFollowing(user_id, other_user_id);
  }
}

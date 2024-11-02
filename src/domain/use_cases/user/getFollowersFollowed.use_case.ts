import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../../repositories/user.repository';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class GetFollowersFollowed {
  constructor(private userRepository: UserRepository) {}

  execute(user_id: string):Observable<User[]> {
    return this.userRepository.getFollowersFollowed(user_id);
  }
}

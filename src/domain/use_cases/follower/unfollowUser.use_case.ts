import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FollowerRepository } from '../../repositories/follower.repository';

@Injectable({
  providedIn: 'root',
})
export class UnfollowUser {
  constructor(private followerRepository: FollowerRepository) {}

  execute(follower_id: string, followed_id: string): Observable<boolean> {
    return this.followerRepository.unfollowUser(follower_id, followed_id);
  }
}

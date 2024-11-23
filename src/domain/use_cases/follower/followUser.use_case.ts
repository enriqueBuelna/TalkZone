import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FollowerRepository } from '../../repositories/follower.repository';

@Injectable({
  providedIn: 'root',
})
export class FollowUser {
  constructor(private followerRepository: FollowerRepository) {}

  execute(follower_id: string, followed_id: string): Observable<boolean> {
    return this.followerRepository.followUser(follower_id, followed_id);
  }
}

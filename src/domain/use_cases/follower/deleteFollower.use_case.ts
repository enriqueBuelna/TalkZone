import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FollowerRepository } from '../../repositories/follower.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteFollower {
  constructor(private followerRepository: FollowerRepository) {}

  execute(user_id:string, user_follower:string):Observable<boolean>{
    return this.followerRepository.deleteFollower(user_id, user_follower);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FollowUser } from '../use_cases/follower/followUser.use_case';
import { UnfollowUser } from '../use_cases/follower/unfollowUser.use_case';
import { DeleteFollower } from '../use_cases/follower/deleteFollower.use_case';

@Injectable({
  providedIn: 'root',
})
export class FollowerService {
  constructor(
    private _followUser: FollowUser,
    private _unfollowUser: UnfollowUser,
    private _deleteFollower:DeleteFollower
  ) {}

  followUser(follower_id: string, followed_id: string): Observable<boolean> {
    return this._followUser.execute(follower_id, followed_id);
  }

  unfollowUser(follower_id: string, followed_id: string): Observable<boolean> {
    return this._unfollowUser.execute(follower_id, followed_id);
  }
  
  deleteFollower(user_id:string, user_follower:string):Observable<boolean>{
    return this._deleteFollower.execute(user_id, user_follower);
  }
}

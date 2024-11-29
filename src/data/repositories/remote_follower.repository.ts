import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { CommunitieRepository } from '../../domain/repositories/communitie.repository';
import { GroupPresentation } from '../../domain/models/group/presentation-group.model';
import { GroupComplete } from '../../domain/models/group/groupComplete.model';
import { CommunityMember } from '../../domain/models/communityMember.model';
import { UserDemo } from '../../domain/models/user-demo.model';
import { ApplyGroup } from '../../domain/models/group/apply_group.model';
import { FollowerRepository } from '../../domain/repositories/follower.repository';

@Injectable({
  providedIn: 'root',
})
export class RemoteFollowerRepository extends FollowerRepository {
  override deleteFollower(
    user_id: string,
    user_follower: string
  ): Observable<boolean> {
    const payload = {
      user_id,
      user_follower,
    };

    return this._http
      .post<boolean>(`${this.API_URL}/followers/deleteFollower`, payload)
      .pipe(map((el) => el));
  }
  private readonly API_URL = 'http://localhost:3000';
  private _http = inject(HttpClient);
  override followUser(
    follower_id: string,
    followed_id: string
  ): Observable<boolean> {
    const payload = {
      follower_id,
      followed_id,
    };

    return this._http
      .post<boolean>(`${this.API_URL}/followers/followUser`, payload)
      .pipe(map((el) => el));
  }
  override unfollowUser(
    follower_id: string,
    followed_id: string
  ): Observable<boolean> {
    const payload = {
      follower_id,
      followed_id,
    };

    return this._http
      .post<boolean>(`${this.API_URL}/followers/unfollowUser`, payload)
      .pipe(map((el) => el));
  }
}

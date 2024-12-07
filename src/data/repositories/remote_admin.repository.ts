import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PrincipalStats } from '../../domain/models/admin/PrincipalStats.model';
import { AdminRepository } from '../../domain/repositories/admin.repository';
import { DataUser } from '../../domain/models/admin/dataUser.model';
import { DetailUser } from '../../domain/models/admin/DetailUser.model';
import { UserPreference } from '../../domain/models/user_preference.model';

@Injectable({
  providedIn: 'root',
})
export class RemoteAdminRepository extends AdminRepository {
  private readonly API_URL = 'http://localhost:3000/admin';
  private _http = inject(HttpClient);

  override getDetailUser(user_id:string): Observable<DetailUser> {
    const params = new HttpParams().set('user_id', user_id);
    return this._http.get<DetailUser>(`${this.API_URL}/getDetailUser`, {params}).pipe(
      map(
        (el: any) =>
          new DetailUser(
            el.cant_posts,
            el.cant_comm,
            el.cant_followed,
            el.cant_followers,
            el.cant_vr,
            el.cant_likes_gived,
            el.cant_likes_gived,
            el.themes.map(
              (ele: any) =>
                new UserPreference(
                  ele.id,
                  ele.topic_id,
                  ele.type,
                  ele.topic.topic_name
                )
            ),
            el.username
          )
      )
    );
  }

  override getPrincipalStats(): Observable<PrincipalStats> {
    return this._http
      .get<PrincipalStats>(`${this.API_URL}/getPrincipalStats`)
      .pipe(
        map(
          (el: any) =>
            new PrincipalStats(
              el.cant_users,
              el.cant_post,
              el.cant_vr,
              el.cant_groups
            )
        )
      );
  }

  override getAllUsers(): Observable<DataUser[]> {
    return this._http
      .get<DataUser[]>(`${this.API_URL}/getAllUsers`)
      .pipe(
        map((users: any) =>
          users.map(
            (user: any) =>
              new DataUser(
                user.id,
                user.username,
                user.is_active,
                user.last_login,
                user.email,
                0
              )
          )
        )
      );
  }

  override getMostFollowed(): Observable<DataUser[]> {
    return this._http
      .get<DataUser[]>(`${this.API_URL}/getMostFollowed`)
      .pipe(
        map((users: any) =>
          users.map(
            (user: any) =>
              new DataUser(
                user.id,
                user.username,
                user.is_active,
                user.last_login,
                user.email,
                user.follower_count
              )
          )
        )
      );
  }
}

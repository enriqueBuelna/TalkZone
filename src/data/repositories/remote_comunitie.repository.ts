import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { CommunitieRepository } from '../../domain/repositories/communitie.repository';
import { GroupPresentation } from '../../domain/models/group/presentation-group.model';
import { GroupComplete } from '../../domain/models/group/groupComplete.model';
import { CommunityMember } from '../../domain/models/communityMember.model';
import { UserDemo } from '../../domain/models/user-demo.model';
import { ApplyGroup } from '../../domain/models/group/apply_group.model';

@Injectable({
  providedIn: 'root',
})
export class RemoteComunitieRepository extends CommunitieRepository {

  override editGroup(group_id: string, privacy: string,about_communitie:string, cover_picture: string, profile_picture: string): Observable<boolean> {
    const payload = {
      group_id, 
      privacy, 
      about_communitie,
      cover_picture, 
      profile_picture
    }

    return this._http.post<boolean>(`${this.API_URL}/communities/editGroup`, payload).pipe((map((el) => el)));
  }

  override responseApply(user_id: string, group_id: string, status: string): Observable<any> {
    const payload = {
      user_id, 
      group_id, 
      status
    }

    return this._http.post<boolean>(`${this.API_URL}/communities/responseApply`, payload).pipe((map((el) => el)))
  }

  override getPendingApplies(group_id: string): Observable<ApplyGroup[]> {
    const params = new HttpParams().set('group_id', group_id);
    return this._http
      .get<ApplyGroup[]>(`${this.API_URL}/communities/getPendingApplies`, {params})
      .pipe(
        map((groups: any[]) => {
          // Verifica si conversations es un array vacío
          if (!Array.isArray(groups) || groups.length === 0) {
            console.log("df")
            return []; // Devuelve un array vacío si no hay conversaciones
          }
          return groups.map(
            (group: any) =>
              new ApplyGroup(
                group.id,
                group.status,
                new UserDemo(
                  group.users.id,
                  group.users.username,
                  group.users.gender,
                  group.users.profile_picture
                )
              )
          );
        })
      );
  }
  override getInGroup(user_id: string, group_id: string): Observable<boolean> {
    const payload = {
      user_id,
      group_id,
    };

    return this._http
      .post<boolean>(`${this.API_URL}/communities/getInGroup`, payload)
      .pipe(map((el) => el));
  }

  override getPendingGroups(user_id: string): Observable<GroupPresentation[]> {
    const params = new HttpParams().set('user_id', user_id);
    return this._http
      .get<GroupPresentation[]>(`${this.API_URL}/communities/getGroupsNotIn`, {
        params,
      })
      .pipe(
        map((groups: any[]) => {
          // Verifica si conversations es un array vacío
          if (!Array.isArray(groups) || groups.length === 0) {
            return []; // Devuelve un array vacío si no hay conversaciones
          }
          return groups.map(
            (group: any) =>
              new GroupPresentation(
                group.id,
                group.communitie_name,
                group.is_private,
                group.userPreference.topic.topic_name,
                group.profile_picture,
                group.cover_picture
              )
          );
        })
      );
  }

  override wantToGetInGroup(
    group_id: string,
    user_id: string
  ): Observable<boolean> {
    const payload = {
      group_id,
      user_id,
    };

    return this._http
      .post<boolean>(`${this.API_URL}/communities/wantToGetIn`, payload)
      .pipe(map((el) => el));
  }

  override getGroupsFollowed(user_id: string): Observable<GroupPresentation[]> {
    const params = new HttpParams().set('user_id', user_id);
    return this._http
      .get<GroupComplete[]>(`${this.API_URL}/communities/getGroupsFollowed`, {
        params,
      })
      .pipe(
        map((groups: any[]) => {
          // Verifica si conversations es un array vacío
          if (!Array.isArray(groups) || groups.length === 0) {
            return []; // Devuelve un array vacío si no hay conversaciones
          }
          console.log(groups);
          return groups.map(
            (group: any) =>
              new GroupPresentation(
                group.id,
                group.communitie_name,
                group.is_private,
                group.userPreference.topic.topic_name,
                group.profile_picture,
                group.cover_picture
              )
          );
        })
      );
  }

  override discoverGroup(user_id: string): Observable<GroupPresentation[]> {
    const params = new HttpParams().set('user_id', user_id);
    return this._http
      .get<GroupComplete[]>(`${this.API_URL}/communities/discoverGroups`, {
        params,
      })
      .pipe(
        map((groups: any[]) => {
          // Verifica si conversations es un array vacío
          if (!Array.isArray(groups) || groups.length === 0) {
            return []; // Devuelve un array vacío si no hay conversaciones
          }
          console.log(groups);
          return groups.map(
            (group: any) =>
              new GroupPresentation(
                group.id,
                group.communitie_name,
                group.is_private,
                group.userPreference.topic.topic_name,
                group.profile_picture,
                group.cover_picture
              )
          );
        })
      );
  }

  override getGroupById(id: string): Observable<GroupComplete> {
    const params = new HttpParams().set('id', id);
    return this._http
      .get<GroupComplete>(`${this.API_URL}/communities/getGroupById`, {
        params,
      })
      .pipe(
        map((group: any) => {
          console.log(group);
          return new GroupComplete(
            group.id,
            group.communitie_name,
            group.is_private,
            group.userPreference.topic.topic_name,
            group.profile_picture,
            group.cover_picture,
            group.about_communitie,
            0,
            group.communityMembers.map(
              (cM: any) =>
                new CommunityMember(
                  new UserDemo(
                    cM.users.id,
                    cM.users.username,
                    cM.users.gender,
                    cM.users.profile_picture
                  ),
                  cM.type,
                  cM.role
                )
            ),
            group.creator_id,
            group.type,
            group.userPreference.id
          );
        })
      );
  }
  private readonly API_URL = 'http://localhost:3000';
  private _http = inject(HttpClient);

  override createGroup(
    communitie_name: string,
    type: string,
    creator_id: string,
    is_private: boolean,
    user_preference_id: number
  ): Observable<void> {
    const payload = {
      communitie_name,
      type,
      creator_id,
      is_private,
      user_preference_id,
    };
    return this._http.post<any>(`${this.API_URL}/communities`, payload);
  }

  override getMyGroupsCreated(
    creator_id: string
  ): Observable<GroupPresentation[]> {
    const params = new HttpParams().set('creator_id', creator_id);
    return this._http
      .get<GroupPresentation[]>(`${this.API_URL}/communities/getMyGroups`, {
        params,
      })
      .pipe(
        map((groups: any[]) => {
          // Verifica si conversations es un array vacío
          console.log(groups);
          if (!Array.isArray(groups) || groups.length === 0) {
            return []; // Devuelve un array vacío si no hay conversaciones
          }
          return groups.map(
            (group: any) =>
              new GroupPresentation(
                group.id,
                group.communitie_name,
                group.is_private,
                group.userPreference.topic.topic_name,
                group.profile_picture,
                group.cover_picture
              )
          );
        })
      );
  }
}

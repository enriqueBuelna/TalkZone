import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PrincipalStats } from '../../domain/models/admin/PrincipalStats.model';
import { AdminRepository } from '../../domain/repositories/admin.repository';
import { DataUser } from '../../domain/models/admin/dataUser.model';
import { DetailUser } from '../../domain/models/admin/DetailUser.model';
import { UserPreference } from '../../domain/models/user_preference.model';
import { ModerationReport } from '../../domain/models/admin/moderation_report.model';
import { Post } from '../../domain/models/post.model';
import { UserDemo } from '../../domain/models/user-demo.model';
import { Tag } from '../../domain/models/tag.model';
import { Comment } from '../../domain/models/comment.model';
import { VoiceRoom } from '../../domain/models/voice_room.model';
import { Message } from '../../domain/models/message.model';
import { GroupView } from '../../domain/models/admin/groupView.model';
import { DetailGroup } from '../../domain/models/admin/DetailGroup.model';
import { CuriosStats } from '../../domain/models/admin/CuriosStats.model';
import { CountTopic } from '../../domain/models/admin/topicPost.model';
import { TopHosts } from '../../domain/models/admin/TopHost.model';
import { CountTag } from '../../domain/models/admin/tagPost.model';

@Injectable({
  providedIn: 'root',
})
export class RemoteAdminRepository extends AdminRepository {
  override getTopTags(): Observable<CountTag[]> {
    return this._http
      .get<CountTag[]>(`${this.API_URL}/getTopTags`)
      .pipe(
        map((ele: any) =>
          ele.map((el: any) => new CountTag(el.count, el.topic_name, el.tag_name))
        )
      );
  }

  override sendWarning(
    message: string,
    reported_user_id: string,
    id: string
  ): Observable<any> {
    const payload = {
      message,
      reported_user_id,
      id,
    };

    return this._http.post<any>(`${this.API_URL}/sendWarning`, payload);
  }

  override unverifyUser(user_id: string): Observable<boolean> {
    const payload = {
      user_id,
    };
    return this._http.post<boolean>(`${this.API_URL}/unverifyUser`, payload);
  }

  override verifyUser(user_id: string): Observable<boolean> {
    const payload = {
      user_id,
    };
    return this._http.post<boolean>(`${this.API_URL}/verifyUser`, payload);
  }

  override deleteContent(type: string, report_id: string): Observable<boolean> {
    const payload = {
      type,
      report_id,
    };
    return this._http.post<boolean>(`${this.API_URL}/deleteContent`, payload);
  }
  private readonly API_URL = 'http://localhost:3000/admin';
  private _http = inject(HttpClient);

  override getTopFiveHosts(): Observable<TopHosts[]> {
    return this._http
      .get<TopHosts[]>(`${this.API_URL}/getTopHost`)
      .pipe(
        map((ele: any) =>
          ele.map(
            (el: any) =>
              new TopHosts(
                new UserDemo(
                  el.users.id,
                  el.users.username,
                  el.users.gender,
                  el.users.profile_picture,
                  el.is_verified
                ),
                el.average_rating,
                el.total_ratings
              )
          )
        )
      );
  }

  override getTopFiveTopicTheme(): Observable<CountTopic[]> {
    return this._http
      .get<CountTopic>(`${this.API_URL}/getTopTopicsPost`)
      .pipe(
        map((ele: any) =>
          ele.map((el: any) => new CountTopic(el.count, el.topicName))
        )
      );
  }

  override getTopFiveTopicRoom(): Observable<CountTopic[]> {
    return this._http
      .get<CountTopic>(`${this.API_URL}/getTopTopicsRoom`)
      .pipe(
        map((ele: any) =>
          ele.map((el: any) => new CountTopic(el.count, el.topicName))
        )
      );
  }

  override getCuriosStats(): Observable<CuriosStats> {
    return this._http
      .get<CuriosStats>(`${this.API_URL}/getCuriosStats`)
      .pipe(
        map(
          (el: any) =>
            new CuriosStats(
              el.sevenPost,
              el.monthPost,
              el.sixMonthPost,
              el.sevenUser,
              el.monthUser,
              el.sixMonthUser,
              el.sevenRoom,
              el.monthRoom,
              el.sixMonthRoom,
              el.allUsers,
              el.allPost,
              el.allRoom
            )
        )
      );
  }

  // override getModerationReportById(id: number, type: string): Observable<any> {
  //   // const params = new HttpParams().set('id', id);
  //   //   return this._http.get<any>(`${this.API_URL}/admin/moderationReport/getById`,{params}).pipe(el => {
  //   //     if(type === 'post'){
  //   //       return new Post(el.id, el.)
  //   //     }
  //   //   })
  // }

  override getGroupStats(id: number): Observable<DetailGroup> {
    const params = new HttpParams().set('id', id);
    return this._http
      .get<DetailGroup>(`${this.API_URL}/getGroupsStats`, { params })
      .pipe(
        map(
          (el: any) =>
            new DetailGroup(
              el.id,
              el.members,
              el.topic_tags.userPreference.topic.topic_name,
              el.topic_tags.type,
              el.cantEtiquetas,
              el.topic_tags?.com_tag_id?.map(
                (ele: any) => new Tag(ele.tag_name, ele.id, ele.topic_id)
              ),
              el.posts,
              el.topic_tags.communitie_name
            )
        )
      );
  }

  override getMostPopular(): Observable<GroupView[]> {
    return this._http
      .get<GroupView[]>(`${this.API_URL}/getMostPopular`)
      .pipe(
        map((ele: any[]) =>
          ele.map(
            (el: any) =>
              new GroupView(
                el.id,
                el.communitie_name,
                el.member_count,
                el.userPreference.topic.topic_name,
                el.type,
                el.last_activity,
                el.status
              )
          )
        )
      );
  }

  override getAllGroups(): Observable<GroupView[]> {
    return this._http
      .get<GroupView[]>(`${this.API_URL}/getAllGroups`)
      .pipe(
        map((ele: any[]) =>
          ele.map(
            (el: any) =>
              new GroupView(
                el.id,
                el.communitie_name,
                el.member_count,
                el.userPreference.topic.topic_name,
                el.type,
                el.last_activity,
                el.status
              )
          )
        )
      );
  }

  override getModerationReportById(
    id: number,
    type: string
  ): Observable<number | Post | Comment | VoiceRoom | Message | any> {
    const params = new HttpParams().set('id', id);

    return this._http
      .get<number | Post | Comment | VoiceRoom | Message | any>(
        `${this.API_URL}/moderationReports/getById`,
        { params }
      )
      .pipe(
        map((el: any) => {
          if (el.type === 'ostia') {
            return [
              new Post(
                el.id,
                new UserDemo(
                  el.post_user.id,
                  el.post_user.username,
                  el.post_user.gender,
                  el.post_user.profile_picture,
                  el.post_user.is_verified
                ),
                el.content,
                0,
                0,
                'public',
                new UserPreference(
                  0,
                  el.post_user_preference.topic_id,
                  el.post_user_preference.type,
                  el.post_user_preference.topic.topic_name,
                  []
                ),
                '',
                el?.post_tagss.map(
                  (tag: any) =>
                    new Tag(
                      tag.post_tag_tag.tag_name,
                      tag.post_tag_tag.id,
                      tag.post_tag_tag.topic_id
                    )
                ),
                el.created_at
              ),
              el.action,
            ];
          } else if (type === 'post') {
            return new Post(
              el.id,
              new UserDemo(
                el.post_user.id,
                el.post_user.username,
                el.post_user.gender,
                el.post_user.profile_picture,
                el.post_user.is_verified
              ),
              el.content,
              0,
              0,
              'public',
              new UserPreference(
                0,
                el.post_user_preference.topic_id,
                el.post_user_preference.type,
                el.post_user_preference.topic.topic_name,
                []
              ),
              '',
              el?.post_tagss.map(
                (tag: any) =>
                  new Tag(
                    tag.post_tag_tag.tag_name,
                    tag.post_tag_tag.id,
                    tag.post_tag_tag.topic_id
                  )
              ),
              el.created_at
            );
          } else if (type === 'comment') {
            return new Comment(
              el.id,
              new UserDemo(
                el.userss.id,
                el.userss.username,
                el.userss.gender,
                el.userss.profile_picture,
                el.userss.is_verified
              ),
              el.content,
              0,
              0,
              undefined
            );
          } else if (type === 'room') {
            return new VoiceRoom(
              el.id,
              el.room_name,
              [],
              el.topic_id,
              el.topic.topic_name,
              [],
              el.host_user,
              0,
              0
            );
          } else if (type === 'message') {
            return new Message(
              el.id,
              el.sender_id,
              el.receiver_id,
              el.content,
              el.medial_url,
              el.sent_at
            );
          } else if (type === 'remove') {
            return el;
          }
          return 0;
        })
      );
  }

  override getAllModerationReport(): Observable<ModerationReport[]> {
    return this._http
      .get<ModerationReport[]>(`${this.API_URL}/moderationReports`)
      .pipe(
        map((ele: any) => {
          console.log(ele);
          return ele.map((el: any) => {
            return new ModerationReport(
              el.id,
              el.reporter.username,
              el.reported.username,
              el.status,
              el.reason,
              el.created_at,
              el.type,
              el.reporter_id,
              el.reported_user_id
            );
          });
        })
      );
  }

  override getDetailUser(user_id: string): Observable<DetailUser> {
    const params = new HttpParams().set('user_id', user_id);
    return this._http
      .get<DetailUser>(`${this.API_URL}/getDetailUser`, { params })
      .pipe(
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
              el.username,
              el.is_verified
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

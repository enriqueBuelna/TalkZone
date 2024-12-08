import { Observable } from 'rxjs';
import { PrincipalStats } from '../models/admin/PrincipalStats.model';
import { DataUser } from '../models/admin/dataUser.model';
import { DetailUser } from '../models/admin/DetailUser.model';
import { ModerationReport } from '../models/admin/moderation_report.model';
import { Post } from '../models/post.model';
import { VoiceRoom } from '../models/voice_room.model';
import { Message } from '../models/message.model';
import { Comment } from '../models/comment.model';
import { GroupView } from '../models/admin/groupView.model';
import { DetailGroup } from '../models/admin/DetailGroup.model';
import { CuriosStats } from '../models/admin/CuriosStats.model';
import { CountTopic } from '../models/admin/topicPost.model';
import { TopHosts } from '../models/admin/TopHost.model';
export abstract class AdminRepository {
  abstract getPrincipalStats(): Observable<PrincipalStats>;
  abstract getAllUsers(): Observable<DataUser[]>;
  abstract getMostFollowed(): Observable<DataUser[]>;
  abstract getDetailUser(user_id: string): Observable<DetailUser>;
  abstract getAllModerationReport(): Observable<ModerationReport[]>;
  abstract getModerationReportById(
    id: number,
    type: string
  ): Observable<number | Post | Comment | VoiceRoom | Message>;
  abstract getMostPopular(): Observable<GroupView[]>;
  abstract getAllGroups(): Observable<GroupView[]>;
  abstract getGroupStats(id: number): Observable<DetailGroup>;
  abstract getCuriosStats(): Observable<CuriosStats>;
  abstract getTopFiveTopicTheme():Observable<CountTopic[]>;
  abstract getTopFiveTopicRoom():Observable<CountTopic[]>;
  abstract getTopFiveHosts():Observable<TopHosts[]>;
}

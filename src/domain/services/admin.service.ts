import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetPrincipalStats } from '../use_cases/admin/getPrincipalStats.use_case';
import { PrincipalStats } from '../models/admin/PrincipalStats.model';
import { GetAllUsers } from '../use_cases/admin/getAllUsers.use_case';
import { DataUser } from '../models/admin/dataUser.model';
import { GetMostFollowed } from '../use_cases/admin/getMostFollowed.use_case';
import { GetDetailUser } from '../use_cases/admin/getDetailUser.use_case';
import { DetailUser } from '../models/admin/DetailUser.model';
import { GetAllModerationReport } from '../use_cases/admin/getAllModerationReport.use_case';
import { GetModerationReportById } from '../use_cases/admin/getModerationReportById.use_case';
import { ModerationReport } from '../models/admin/moderation_report.model';
import { Post } from '../models/post.model';
import { VoiceRoom } from '../models/voice_room.model';
import { Message } from '../models/message.model';
import { Comment } from '../models/comment.model';
import { GetAllGroups } from '../use_cases/admin/getAllGroups.use_case';
import { GetMostPopular } from '../use_cases/admin/getMostPopular.use_case';
import { GroupView } from '../models/admin/groupView.model';
import { GetGroupStats } from '../use_cases/admin/getGroupStats.use_case';
import { DetailGroup } from '../models/admin/DetailGroup.model';
import { GetCuriosStats } from '../use_cases/admin/getCuriosStats.use_case';
import { GetTopFiveTopicTheme } from '../use_cases/admin/getTopFiveTopicTheme.use_case';
import { GetTopFiveTopicRoom } from '../use_cases/admin/getTopFiveTopicsRoom.use_case';
import { GetTopFiveHosts } from '../use_cases/admin/getTopFiveHosts.use_case';
import { CuriosStats } from '../models/admin/CuriosStats.model';
import { CountTopic } from '../models/admin/topicPost.model';
import { TopHosts } from '../models/admin/TopHost.model';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private _getPrincipalStats: GetPrincipalStats,
    private _getAllUsers: GetAllUsers,
    private _getMostFollowed: GetMostFollowed,
    private _getDetailUser: GetDetailUser,
    private _getAllModerationReports: GetAllModerationReport,
    private _getModerationReportById: GetModerationReportById,
    private _getAllGroups: GetAllGroups,
    private _getMostPopular:GetMostPopular,
    private _getGroupStats: GetGroupStats,
    private _getCuriosStats: GetCuriosStats,
    private _getTopFiveTopicTheme:GetTopFiveTopicTheme,
    private _getTopFiveTopicRoom:GetTopFiveTopicRoom,
    private _getTopicFiveHosts:GetTopFiveHosts
  ) {}

  getCuriosStats():Observable<CuriosStats>{
    return this._getCuriosStats.execute();
  }

  getTopFiveTopicTheme():Observable<CountTopic[]>{
    return this._getTopFiveTopicTheme.execute();
  }

  getTopFiveHosts():Observable<TopHosts[]>{
    return this._getTopicFiveHosts.execute();
  }

  getTopFiveTopicRoom():Observable<CountTopic[]>{
    return this._getTopFiveTopicRoom.execute();
  }

  getGroupStats(id:number):Observable<DetailGroup>{
    return this._getGroupStats.execute(id);
  }

  getMostPopular():Observable<GroupView[]>{
    return this._getMostPopular.execute();
  }

  getAllGroups():Observable<GroupView[]>{
    return this._getAllGroups.execute();
  }

  getModerationReportById(id:number, type:string):Observable<number | Post | Comment | VoiceRoom | Message>{
    return this._getModerationReportById.execute(id, type);
  }

  getAllModerationReports():Observable<ModerationReport[]>{
    return this._getAllModerationReports.execute();
  }

  getDetailUser(user_id:string): Observable<DetailUser> {
    return this._getDetailUser.execute(user_id);
  }

  getMostFollowed(): Observable<DataUser[]> {
    return this._getMostFollowed.execute();
  }

  getPrincipalStats(): Observable<PrincipalStats> {
    return this._getPrincipalStats.execute();
  }

  getAllUsers(): Observable<DataUser[]> {
    return this._getAllUsers.execute();
  }
}

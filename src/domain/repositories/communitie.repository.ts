import { Observable } from 'rxjs';
import { GroupPresentation } from '../models/group/presentation-group.model';
import { GroupComplete } from '../models/group/groupComplete.model';
import { ApplyGroup } from '../models/group/apply_group.model';

export abstract class CommunitieRepository {
  abstract createGroup(
    communitie_name: string,
    type: string,
    creator_id: string,
    is_private: boolean,
    topic_id: number
  ): Observable<void>;
  abstract getMyGroupsCreated(
    creator_id: string
  ): Observable<GroupPresentation[]>;
  abstract getGroupById(id: string): Observable<GroupComplete>;
  abstract discoverGroup(user_id: string): Observable<GroupPresentation[]>;
  abstract getGroupsFollowed(user_id: string): Observable<GroupPresentation[]>;
  abstract wantToGetInGroup(
    group_id: string,
    user_id: string
  ): Observable<boolean>;
  abstract getPendingGroups(user_id: string): Observable<GroupPresentation[]>;
  abstract getInGroup(user_id: string, group_id: string): Observable<boolean>;
  abstract getPendingApplies(group_id: string): Observable<ApplyGroup[]>;
  abstract responseApply(user_id:string, group_id:string, status:string):Observable<any>;
  abstract editGroup(group_id:string, privacy:string,about_communitie:string, cover_picture:string, profile_picture:string):Observable<boolean>;
  abstract viewIfOnePending(user_id:string, group_id:string):Observable<boolean>;
  abstract deleteApply(user_id:string, group_id:string):Observable<boolean>;
  abstract getOutGroup(user_id: string, group_id: string): Observable<boolean>;
  abstract searchGroup(group_name:string):Observable<GroupPresentation[]>;
}

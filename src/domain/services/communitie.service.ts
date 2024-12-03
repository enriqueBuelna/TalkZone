import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateGroup } from '../use_cases/comunities/createGroup.use_case';
import { GetMyGroupsCreated } from '../use_cases/comunities/getMyGroupsCreated.use_case';
import { GroupPresentation } from '../models/group/presentation-group.model';
import { GetGroupById } from '../use_cases/comunities/getGroupById.use_case';
import { GroupComplete } from '../models/group/groupComplete.model';
import { DiscoverGroup } from '../use_cases/comunities/discoverGroup.use_case';
import { GetGroupsFollowed } from '../use_cases/comunities/getGroupsFollowed.use_case';
import { WantToGetInGroup } from '../use_cases/comunities/wantToGetInGroup.use_case';
import { GetPendingGroups } from '../use_cases/comunities/getPendingGroups.use_case';
import { GetInGroup } from '../use_cases/comunities/getInGroup.use_case';
import { GetPendingApplies } from '../use_cases/comunities/getPendingApplies.use_case';
import { ApplyGroup } from '../models/group/apply_group.model';
import { ResponseApply } from '../use_cases/comunities/responseApply.use_case';
import { EditGroup } from '../use_cases/comunities/editGroup.use_case';
import { ViewIfOnePending } from '../use_cases/comunities/viewIfOnePending.use_case';
import { DeleteApply } from '../use_cases/comunities/deleteApply.use_case';
import { GetOutGroup } from '../use_cases/comunities/getOutGroup.use_case';

@Injectable({
  providedIn: 'root',
})
export class CommunitieService {
  constructor(
    private _createGroup: CreateGroup,
    private _getMyGroupsCreated: GetMyGroupsCreated,
    private _getGroupById: GetGroupById,
    private _discoverGroup: DiscoverGroup,
    private _getGroupsFollowed: GetGroupsFollowed,
    private _wantToGetInGroup: WantToGetInGroup,
    private _getPendingGroups: GetPendingGroups,
    private _getInGroup: GetInGroup,
    private _getPendingApplies: GetPendingApplies,
    private _responseApply: ResponseApply,
    private _editGroup: EditGroup,
    private _viewIfOnePending:ViewIfOnePending,
    private _deleteApply:DeleteApply,
    private _getOutGroup:GetOutGroup
  ) {}

  getOutGroup(user_id:string, group_id:string):Observable<boolean>{
    return this._getOutGroup.execute(user_id, group_id);
  }

  deleteApply(user_id:string, group_id:string):Observable<boolean>{
    return this._deleteApply.execute(user_id, group_id);
  }

  viewIfOnePending(user_id:string, group_id:string):Observable<boolean>{
    return this._viewIfOnePending.execute(user_id, group_id);
  }

  editGroup(
    group_id: string,
    privacy: string,
    about_communitie: string,
    cover_picture: string,
    profile_picture: string
  ): Observable<boolean> {
    return this._editGroup.execute(
      group_id,
      privacy,
      about_communitie,
      cover_picture,
      profile_picture
    );
  }

  responseApply(
    user_id: string,
    group_id: string,
    status: string
  ): Observable<boolean> {
    return this._responseApply.execute(user_id, group_id, status);
  }

  getPendingApplies(group_id: string): Observable<ApplyGroup[]> {
    return this._getPendingApplies.execute(group_id);
  }

  getInGroup(user_id: string, group_id: string) {
    return this._getInGroup.execute(user_id, group_id);
  }

  getPendingGroups(user_id: string): Observable<GroupPresentation[]> {
    return this._getPendingGroups.execute(user_id);
  }

  wantToGetInGroup(group_id: string, user_id: string): Observable<boolean> {
    return this._wantToGetInGroup.execute(group_id, user_id);
  }

  getGroupsFollowed(user_id: string): Observable<GroupPresentation[]> {
    return this._getGroupsFollowed.execute(user_id);
  }

  discoverGroup(user_id: string): Observable<GroupPresentation[]> {
    return this._discoverGroup.execute(user_id);
  }

  getGroupById(id: string): Observable<GroupComplete> {
    return this._getGroupById.execute(id);
  }

  createGroup(
    communitie_name: string,
    type: string,
    creator_id: string,
    is_private: boolean,
    topic_id: number
  ): Observable<any> {
    return this._createGroup.execute(
      communitie_name,
      type,
      creator_id,
      is_private,
      topic_id
    );
  }

  getMyGroupsCreated(creator_id: string): Observable<GroupPresentation[]> {
    return this._getMyGroupsCreated.execute(creator_id);
  }
}

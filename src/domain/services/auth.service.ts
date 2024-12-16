import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { RegisterUser } from '../use_cases/user/register_user.usecase';
import { LoginUser } from '../use_cases/user/login_user.usecase';
import { CheckAvailability } from '../use_cases/user/checkAvailabilty_user.usercase';
import { VerifyCode } from '../use_cases/user/verifyCode_user.usecase';
import { SendVerificationCode } from '../use_cases/user/serdVerificationCode_user.usecase';
import { MessageResponse } from '../entities/users/MessageResponse.entitie';
import { SendChangePasswordCode } from '../use_cases/user/sendPasswordCode_user.usercase';
import { LoginResponse } from '../entities/users/LoginResponse.entitie';
import { FinishProfile } from '../use_cases/user/finishProfile.use_case';
import { UserPreference } from '../models/user_preference.model';
import { GetFollowersFollowed } from '../use_cases/user/getFollowersFollowed.use_case';
import { GetBasicInfo } from '../use_cases/user/getBasicInfo.use_case';
import { UserDemo } from '../models/user-demo.model';
import { GetCompleteInformation } from '../use_cases/user/getCompleteInformation.use_case';
import { UserComplete } from '../models/user_complete_information.model';
import { EditProfile } from '../use_cases/user/editProfile.use_case';
import { CompleteProfile } from '../use_cases/user/completeProfile.use_case';
import { AmFollowing } from '../use_cases/user/amFollowing.use_case';
import { BlockUser } from '../use_cases/user/blockUser.use_case';
import { GetBlockUser } from '../use_cases/user/getBlockUser.use_case';
import { UnblockUser } from '../use_cases/user/unblockUser.use_case';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _registerUser: RegisterUser,
    private _loginUser: LoginUser,
    private _checkAvailability: CheckAvailability,
    private _verifyCode: VerifyCode,
    private _sendVerificationCode: SendVerificationCode,
    private _sendChangePasswordCode: SendChangePasswordCode,
    private _finishProfile: FinishProfile,
    private _getFollowersFollowed: GetFollowersFollowed,
    private _getBasicInfo: GetBasicInfo,
    private _getCompleteInformation: GetCompleteInformation,
    private _editProfile: EditProfile,
    private _completeProfile: CompleteProfile,
    private _amFollowing: AmFollowing,
    private _blockUser:BlockUser,
    private _getBlockUser:GetBlockUser,
    private _unblockUser:UnblockUser
  ) {}

  unblockUser(blocker_user_id:string, blocked_user_id:string):Observable<boolean>{
    return this._unblockUser.execute(blocker_user_id, blocked_user_id);
  }

  getBlockUser(user_id:string):Observable<UserDemo[]>{
    return this._getBlockUser.execute(user_id);
  }

  blockUser(blocker_user_id:string, blocked_user_id:string):Observable<boolean>{
    return this._blockUser.execute(blocker_user_id, blocked_user_id);
  }

  amFollowing(user_id: string, other_user_id: string): Observable<boolean> {
    return this._amFollowing.execute(user_id, other_user_id);
  }

  completeProfile(user_id: string) {
    return this._completeProfile.execute(user_id);
  }

  register(user: User): Observable<User> {
    return this._registerUser.execute(user);
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this._loginUser.execute(username, password);
  }

  checkAvailability(
    username: string,
    email: string
  ): Observable<MessageResponse> {
    return this._checkAvailability.execute(username, email);
  }

  verifyCode(code: string, email: string): Observable<MessageResponse> {
    return this._verifyCode.execute(code, email);
  }

  sendVerificationCode(email: string): Observable<void> {
    return this._sendVerificationCode.execute(email);
  }

  sendChangePasswordCode(email: string): Observable<MessageResponse> {
    return this._sendChangePasswordCode.execute(email);
  }

  finishProfile(
    user_id: string,
    about_me: string,
    profile_picture: string,
    user_preferences: UserPreference[]
  ) {
    return this._finishProfile.execute(
      user_id,
      about_me,
      profile_picture,
      user_preferences
    );
  }

  getFollowersFollowed(user_id: string): Observable<User[]> {
    return this._getFollowersFollowed.execute(user_id);
  }

  getBasicInfo(user_id: string): Observable<UserDemo> {
    return this._getBasicInfo.execute(user_id);
  }

  getCompleteInformation(user_id: string, myUserId: string): Observable<UserComplete> {
    return this._getCompleteInformation.execute(user_id, myUserId);
  }

  editProfile(
    user_id: string,
    username?: string,
    about_me?: string,
    profile_picture?: string,
    cover_picture?: string
  ): Observable<any> {
    return this._editProfile.execute(
      user_id,
      username,
      about_me,
      profile_picture,
      cover_picture
    );
  }
}

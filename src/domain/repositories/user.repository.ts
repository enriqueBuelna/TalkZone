// src/app/core/repositories/user.repository.ts
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { MessageResponse } from '../entities/users/MessageResponse.entitie';
import { LoginResponse } from '../entities/users/LoginResponse.entitie';
import { UserPreference } from '../models/user_preference.model';
import { UserDemo } from '../models/user-demo.model';
import { UserComplete } from '../models/user_complete_information.model';

export abstract class UserRepository {
  abstract register(user: User): Observable<LoginResponse>;
  abstract login(username: string, password: string): Observable<LoginResponse>;
  abstract checkAvailability(
    username: string,
    email: string
  ): Observable<MessageResponse>;
  abstract sendVerificationCode(email: string): Observable<void>;
  abstract verifyCode(code: string, email: string): Observable<MessageResponse>;
  abstract sendChangePasswordCode(email: string): Observable<MessageResponse>;
  abstract verifyChangePasswordCode(
    code: string,
    email: string
  ): Observable<MessageResponse>;
  abstract changePassword(password: string): Observable<void>;
  abstract finishProfile(
    user_id: string,
    about_me: string,
    profile_picture: string,
    user_preferences: UserPreference[]
  ): Observable<void>;
  abstract getFollowersFollowed(user_id: string): Observable<User[]>; //
  abstract getBasicInfo(user_id: string): Observable<UserDemo>;
  abstract getCompleteInformation(user_id: string, myUserId: string): Observable<UserComplete>;
  abstract editProfile(
    user_id: string,
    username?: string,
    about_me?: string,
    profile_picture?: string,
    cover_picture?: string
  ): Observable<any>;
  abstract completeProfile(user_id:string):Observable<any>;
  abstract amFollowing(user_id:string, other_user_id:string):Observable<boolean>;
  abstract blockUser(blocker_user_id:string, blocked_user_id:string):Observable<boolean>;
  abstract unblockUser(blocker_user_id:string, blocked_user_id:string):Observable<boolean>;
  abstract getBlockUser(user_id:string):Observable<UserDemo[]>;
}

import { Observable } from 'rxjs';
import { UserPreferences } from '../entities/user_preferences/user_preference.interface';
import { UserPreference } from '../models/user_preference.model';
import { ITopic } from '../entities/topics/topic.interface';

export abstract class UserPreferenceRepository {
  abstract getUsersByPreferences(
    user_id: string
  ): Observable<UserPreferences[]>;
  abstract getMyUserPreferences(user_id: string): Observable<UserPreference[]>;
  abstract getUserByPreferencesFiltered(
    user_id: string,
    topicsMentores?: ITopic[],
    topicsExploradores?: ITopic[],
    topicsEntusiastas?: ITopic[],
    gender?: string,
    connect?: string,
    onlyMentores?: string,
    onlyExploradores?: string,
    onlyEntusiastas?: string
  ): Observable<UserPreferences[]>;
  abstract addUserPreferences(
    user_id:string,
    userPreferences: UserPreference
  ): Observable<UserPreference>;
  abstract deleteUserPreference(user_preference_id:number):Observable<any>;
  abstract searchConnect(search:string, user_id: string):Observable<UserPreferences[]>;
}

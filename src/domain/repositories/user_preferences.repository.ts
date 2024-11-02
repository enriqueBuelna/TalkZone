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
    user_id:string,
    topicsKnow?: ITopic[],
    topicsLearn?: ITopic[],
    gender?: string,
    connect?: string
  ): Observable<UserPreferences[]>;
}

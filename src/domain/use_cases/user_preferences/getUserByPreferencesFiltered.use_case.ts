import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPreferenceRepository } from '../../repositories/user_preferences.repository';
import { ITopic } from '../../entities/topics/topic.interface';
import { UserPreferences } from '../../entities/user_preferences/user_preference.interface';

@Injectable({
  providedIn: 'root',
})
export class GetMyUserPreferencesFiltered {
  constructor(private UserPreferenceRepository: UserPreferenceRepository) {}

  execute(
    user_id:string,
    topicsMentores?: ITopic[],
    topicsExploradores?: ITopic[],
    topicsEntusiastas?:ITopic[],
    gender?: string,
    connect?: string,
    onlyMentores?:string,
    onlyExploradores?:string,
    onlyEntusiastas?:string
  ): Observable<UserPreferences[]> {
    return this.UserPreferenceRepository.getUserByPreferencesFiltered(
      user_id,
      topicsMentores, 
      topicsExploradores,
      topicsEntusiastas,
      gender,
      connect,
      onlyMentores,
      onlyEntusiastas, 
      onlyExploradores
    );
  }
}

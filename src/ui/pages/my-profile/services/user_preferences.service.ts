import { Injectable, signal } from '@angular/core';
import { UserPreference } from '../../../../domain/models/user_preference.model';
import { Tag } from '../../../../domain/models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class UserPreferenceSignalService {
  private userPreferences = signal<UserPreference[]>([]);

  constructor() {}
  //las llamadas hacia mis servicio, como el

  createUserPreference(
    id: number,
    topic_id: number,
    tags: Tag[],
    type: string,
    topic_name: string
  ) {
    this.userPreferences().push(
      new UserPreference(id, topic_id, type, topic_name, tags)
    );
  }

  deleteUserPreference(topic_name: string) {
    this.userPreferences.update((user_preference) =>
      user_preference.filter((el) => el.getTopicName() !== topic_name)
    );
  }
  deleteUserPreferenceId(topic_id: number) {
    this.userPreferences.update((user_preference) =>
        user_preference.filter((el) => el.getId() !== topic_id)
    );
}

  verifyNotExist(id: number) {
    return this.userPreferences().some((el) => el.getTopicId() === id);
  }

  getUserPreferencesAll() {
    return this.userPreferences;
  }

  setUserPreferences(user_preferences: UserPreference[]) {
    this.userPreferences.set(user_preferences);
  }

  deleteUserNotPreference() {
    this.userPreferences.set(
      this.userPreferences().filter((el) => el.getId() !== 0)
    );
  }

  deleteUserPreferenceById(id:number){
    this.userPreferences.set(
      this.userPreferences().filter((el) => el.getId() !== id)
    );
  }

  addNewUserPreference(userPreference: UserPreference) {
    this.userPreferences.update((use) => [...use, userPreference]);
  }
}

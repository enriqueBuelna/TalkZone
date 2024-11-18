import { Injectable } from '@angular/core';
import { UserPreference } from '../../../../domain/models/user_preference.model';
import { Tag } from '../../../../domain/models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class UserPreferencesServices {
  private userPreferences: UserPreference[] = [];

  constructor() {}
  //las llamadas hacia mis servicio, como el

  createUserPreference(
    id:number, 
    topic_id: number,
    tags: Tag[],
    type: string,
    topic_name: string,
  ) {
    this.userPreferences.push(
      new UserPreference(id, topic_id, type, topic_name, tags)
    );
  }

  deleteUserPreference(topic_name: string) {
    this.userPreferences = this.userPreferences.filter(
      (el) => el.getTopicName() !== topic_name
    );
  }

  getUserPreferences(type: string) {
    return this.userPreferences.filter((el) => el.getType() === type);
  }

  verifyNotExist(id:number){
    return this.userPreferences.some((el) => el.getTopicId() === id);
  }

  getUserPreferencesAll() {
    return this.userPreferences;
  }
}

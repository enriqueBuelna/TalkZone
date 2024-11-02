import { UserPreference } from '../../models/user_preference.model';
import { UserPreferenceTag } from '../../models/user_preferences_tag.model';
import { UserResponseInformation } from '../voice_rooms/IHostUser.entitie';

export class UserPreferences {
  userPreference: UserPreference[];
  // userPreferenceTag?: UserPreferenceTag;
  userInformation?: UserResponseInformation;
  matchPercentage?: number;
  userId?: string;

  constructor(
    userPreference: UserPreference[],
    userInformation: UserResponseInformation,
    matchPercentage: number,
    userId: string
  ) {
    this.userPreference = userPreference;
    // this.userPreferenceTag = userPreferenceTag;
    this.userInformation = userInformation;
    this.matchPercentage = matchPercentage;
    this.userId = userId;
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../../repositories/user.repository';
import { LoginResponse } from '../../entities/users/LoginResponse.entitie';
import { UserPreference } from '../../models/user_preference.model';

@Injectable({
  providedIn: 'root',
})
export class FinishProfile {
  constructor(private userRepository: UserRepository) {}

  execute(
    user_id: string,
    about_me: string,
    profile_picture: string,
    user_preferences: UserPreference[]
  ): Observable<void> {
    return this.userRepository.finishProfile(
      user_id,
      about_me,
      profile_picture,
      user_preferences
    );
  }
}

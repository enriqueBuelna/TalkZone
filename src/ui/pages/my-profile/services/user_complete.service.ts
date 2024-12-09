import { Injectable, signal } from '@angular/core';
import { UserDemo } from '../../../../domain/models/user-demo.model';
import { UserComplete } from '../../../../domain/models/user_complete_information.model';
import { UserPreference } from '../../../../domain/models/user_preference.model';

@Injectable({
  providedIn: 'root',
})
export class UserCompleteProfile {
  myUser = signal<UserComplete>(
    new UserComplete(
      new UserDemo('', '', '', '', false),
      [new UserPreference(0, 0, '', '')],
      '',
      '',
      [],
      []
    )
    
  );

  setMyUserInformation(user: UserComplete) {
    this.myUser.set(user);
  }

  getMyUserInformation() {
    return this.myUser;
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../utils/header/header.component';
import { UserService } from '../auth/services/user.service';
import { AsideComponent } from '../../utils/aside/aside.component';
import { Observable } from 'rxjs';
import { AuthService } from '../../../domain/services/auth.service';
import { MyUserInformation } from '../my-feed/services/information_user.service';
import { UserDemo } from '../../../domain/models/user-demo.model';
import { ProfileInformationComponent } from './profile-information/profile-information.component';
import { PostProfileComponent } from './post-profile/post-profile.component';
import { InformationProfileComponent } from './information-profile/information-profile.component';
import { UserComplete } from '../../../domain/models/user_complete_information.model';
import { UserPreference } from '../../../domain/models/user_preference.model';
import { UserCompleteProfile } from './services/user_complete.service';
import { EditProfileComponent } from "./edit-profile/edit-profile.component";
import { UserPreferenceSignalService } from './services/user_preferences.service';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    AsideComponent,
    ProfileInformationComponent,
    PostProfileComponent,
    InformationProfileComponent,
    EditProfileComponent
],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css',
})
export class MyProfileComponent implements OnInit {
  myObservable!: Observable<any>;
  myUser = signal<UserComplete>(
    new UserComplete(
      new UserDemo('', '', '', '', ''),
      [new UserPreference(0, 0, '', '')],
      '',
      ''
    )
  );
  constructor(
    private _userService: AuthService,
    private _user: UserService,
    private _userInformation: UserCompleteProfile,
    private _userPreference: UserPreferenceSignalService
  ) {}

  ngOnInit() {
    this.myObservable = this._userService.getCompleteInformation(
      this._user.getUserId()
    );

    this.myObservable.subscribe((el) => {
      this._userInformation.setMyUserInformation(el);
      this.myUser = this._userInformation.getMyUserInformation();
      this._userPreference.setUserPreferences(this.myUser().getUserPreferences());
    });
  }
}

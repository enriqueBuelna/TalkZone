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
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserPreferenceSignalService } from './services/user_preferences.service';
import { ActivatedRoute } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    AsideComponent,
    ProfileInformationComponent,
    PostProfileComponent,
    InformationProfileComponent,
    SkeletonModule,
    ProgressSpinnerModule,
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
      '',
      [],
      []
    )
  );
  profileNotFound = false;
  userId = signal('');
  isPrimary = signal(false);
  userDemo!: UserDemo;
  yetNo = signal(true);
  constructor(
    private _userService: AuthService,
    private _user: UserService,
    private _userInformation: UserCompleteProfile,
    private _userPreference: UserPreferenceSignalService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._route.paramMap.subscribe((params) => {
      this.userId.set(params.get('user_id') || '');
      this.loadProfileData(); // Método para recargar la información
    });
  }

  loadProfileData() {
    if (this.userId() === this._user.getUserId()) {
      this.isPrimary.set(true);
    }else{
      this.isPrimary.set(false);
    }

    this.myObservable = this._userService.getCompleteInformation(this.userId());

    this.myObservable.subscribe({
      next: (el) => {
        this.yetNo.set(false);
        this._userInformation.setMyUserInformation(el);
        this.myUser = this._userInformation.getMyUserInformation();
        this._userPreference.setUserPreferences(
          this.myUser().getUserPreferences()
        );
      },
      error: (e) => {
        this.profileNotFound = true;
      }
    });
  }
}

import { Component, DestroyRef, Input, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../../utils/button/button.component';
import { UserPreference } from '../../../../domain/models/user_preference.model';
import { ChipModule } from 'primeng/chip';
import { UserComplete } from '../../../../domain/models/user_complete_information.model';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { UserPreferenceSignalService } from '../services/user_preferences.service';
import { DialogModule } from 'primeng/dialog';
import { GroupComplete } from '../../../../domain/models/group/groupComplete.model';
import { ModalPostGroupComponent } from '../../group/view-of-group/modal-post/modal-post.component';
import { CommunitieService } from '../../../../domain/services/communitie.service';
import { UserService } from '../../auth/services/user.service';
import { EditProfileGroupComponent } from '../../group/view-of-group/edit-profile/edit-profile.component';
import { ModalPostComponent } from '../../my-feed/create-post/modal-post/modal-post.component';
import { EditPreferencesComponent } from '../edit-preferences/edit-preferences.component';
import { TopicsTagsService } from '../../welcome/services/topics-tags.service';
import { AuthService } from '../../../../domain/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-information-profile',
  standalone: true,
  imports: [
    ChipModule,
    EditProfileComponent,
    DialogModule,
    ModalPostGroupComponent,
    EditProfileGroupComponent,
    ModalPostComponent,
    EditPreferencesComponent,
  ],
  templateUrl: './information-profile.component.html',
  styleUrl: './information-profile.component.css',
})
export class InformationProfileComponent implements OnInit {
  showModal() {
    throw new Error('Method not implemented.');
  }
  @Input() isPrimary = signal(false);
  create_post = signal(false);
  edit_profile = signal(false);
  userPreferences = signal<UserPreference[]>([]);
  @Input() type!: string;
  @Input() group!: GroupComplete;
  showModalPreference = signal(false);
  userPref!: UserPreference;
  @Input() user!: UserComplete;
  @Input() typeMember = signal('');
  showApply = signal(false);
  myUser: any;
  edit_preferences = signal(false);
  showApplies() {
    this.showApply.set(!this.showApply());
  }

  editPreferences() {
    this.edit_preferences.set(!this.edit_preferences());
  }

  createPost() {
    this.create_post.set(!this.create_post());
  }

  editProfile() {
    this.edit_profile.set(!this.edit_profile());
  }

  constructor(
    private _userPreference: UserPreferenceSignalService,
    private _communityService: CommunitieService,
    private _userService: UserService,
    public _TopicTagsService: TopicsTagsService,
    private _authService : AuthService,
    private _destroyRef : DestroyRef,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.userPreferences = this._userPreference.getUserPreferencesAll();
  }

  showInformation(userPref: UserPreference | null) {
    if (userPref) {
      this.userPref = userPref;
    }
    this.showModalPreference.set(!this.showModalPreference());
  }

  getInGroup() {
    this._communityService
      .getInGroup(this._userService.getUserId(), this.group.getId().toString())
      .subscribe((el) => {
        if (el) {
          this.typeMember.set('member');
        }
      });
  }

  leaveGroup() {
    this._communityService
      .getOutGroup(this._userService.getUserId(), this.group.getId().toString())
      .subscribe((el) => {
        if (el) {
          this.typeMember.set('no-member');
        }
      });
  }
  blockerUser = signal(false);
  blockUser(){
    this.blockerUser.set(!this.blockerUser());
  }


  blockForReal(){
    this._authService.blockUser(this._userService.getUserId(), this.user.getUserDemo().getUserId()).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: el => {
        this.blockUser();
        this._router.navigate(['/home/profile', this._userService.getUserId()]);
      },      
      error : error => {

      }   
    })
  }

  sendMessage(){
    this._router.navigate(['/home/messages', this.user.getUserDemo().getUserId()]);
  }
}

import { Component, Input, OnInit, signal } from '@angular/core';
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
import { EditProfileGroupComponent } from "../../group/view-of-group/edit-profile/edit-profile.component";
@Component({
  selector: 'app-information-profile',
  standalone: true,
  imports: [
    ButtonComponent,
    ChipModule,
    EditProfileComponent,
    DialogModule,
    ModalPostGroupComponent,
    EditProfileGroupComponent
],
  templateUrl: './information-profile.component.html',
  styleUrl: './information-profile.component.css',
})
export class InformationProfileComponent implements OnInit {
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
  showApplies(){
    this.showApply.set(!this.showApply());
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
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.userPreferences = this._userPreference.getUserPreferencesAll();
  }

  showInformation(userPref: UserPreference) {
    this.userPref = userPref;
    this.showModalPreference.set(true);
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
}

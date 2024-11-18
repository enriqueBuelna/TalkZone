import { Component, Input, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../../utils/button/button.component';
import { UserPreference } from '../../../../domain/models/user_preference.model';
import { ChipModule } from 'primeng/chip';
import { CreatePostComponent } from '../../my-feed/create-post/create-post.component';
import { UserComplete } from '../../../../domain/models/user_complete_information.model';
import { ModalPostComponent } from '../../my-feed/create-post/modal-post/modal-post.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { UserPreferenceSignalService } from '../services/user_preferences.service';
@Component({
  selector: 'app-information-profile',
  standalone: true,
  imports: [
    ButtonComponent,
    ChipModule,
    ModalPostComponent,
    EditProfileComponent,
  ],
  templateUrl: './information-profile.component.html',
  styleUrl: './information-profile.component.css',
})
export class InformationProfileComponent implements OnInit {
  create_post = signal(false);
  edit_profile = signal(false);
  userPreferences = signal<UserPreference[]>([]);
  @Input() user!: UserComplete;
  createPost() {
    this.create_post.set(!this.create_post());
  }

  editProfile() {
    this.edit_profile.set(!this.edit_profile());
  }

  constructor(private _userPreference: UserPreferenceSignalService) {}

  ngOnInit(): void {
    this.userPreferences = this._userPreference.getUserPreferencesAll();
  }
}

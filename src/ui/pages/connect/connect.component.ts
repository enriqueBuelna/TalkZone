import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { AsideComponent } from '../../utils/aside/aside.component';
import { HeaderComponent } from '../../utils/header/header.component';
import { ButtonComponent } from '../../utils/button/button.component';
import { CardComponent } from '../../utils/card/card.component';
import { ChipModule } from 'primeng/chip';
import { map, Observable } from 'rxjs';
import { UserPreferences } from '../../../domain/entities/user_preferences/user_preference.interface';
import { UserPreferenceService } from '../../../domain/services/user_preference.service';
import { UserService } from '../auth/services/user.service';
import { UserPreference } from '../../../domain/models/user_preference.model';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { atLeastOneFieldRequired } from './validators/atLeastOne.validator';
interface FilterTopic {
  topic_id: number;
  topic_name: string;
}
interface Gender {
  name: string;
  type: string;
}
@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [
    AsideComponent,
    HeaderComponent,
    ButtonComponent,
    CardComponent,
    ChipModule,
    CommonModule,
    DialogModule,
    DropdownModule,
    CheckboxModule,
    ReactiveFormsModule,
    MultiSelectModule,
  ],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.css',
})
export class ConnectComponent implements OnInit {
  filterForm!: FormGroup;
  responseUserPreference$?: Observable<UserPreferences[]>;
  responseMyUserPreferences$?: Observable<UserPreference[]>;
  myUserPreference?: UserPreference[];
  allUserPreferences: UserPreferences[] = [];
  showInfo = signal(false);
  userPreferenceInformation?: UserPreferences;
  visible = signal(false);
  buttonFilter = signal(false);
  topicsLearn: FilterTopic[] = [];
  topicsKnow: FilterTopic[] = [];
  genders: Gender[] = [
    {
      name: 'Hombre',
      type: 'male',
    },
    {
      name: 'Mujer',
      type: 'female',
    },
  ];

  constructor(
    private _userPreferenceService: UserPreferenceService,
    private _userService: UserService,
    private formBuilder: FormBuilder,
    private _destroyRef: DestroyRef
  ) {
    this.filterForm = this.formBuilder.group(
      {
        topicsKnow: [''],
        topicsLearn: [''],
        gender: [''],
        connect: [''],
      },
      {
        validators: atLeastOneFieldRequired([
          'topicsKnow',
          'topicsLearn',
          'gender',
          'connect',
        ]),
      }
    );
  }

  ngOnInit(): void {
    this.responseMyUserPreferences$ =
      this._userPreferenceService.getMyUserPreferences(
        this._userService.getUserId()
      );

    this.responseUserPreference$ =
      this._userPreferenceService.getUsersByPreferences(
        this._userService.getUserId()
      );

    //aqui
    this.responseUserPreference$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((el) => {
        this.allUserPreferences = el;
      });

    this.responseMyUserPreferences$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((el) => {
        this.myUserPreference = el;
        el.forEach((ele) => {
          const topic: FilterTopic = {
            topic_id: ele.getTopicId(),
            topic_name: ele.getTopicName(),
          };
          if (ele.getType() === 'know') {
            this.topicsKnow.push(topic);
          } else if (ele.getType() === 'learn') {
            this.topicsKnow.push(topic);
          }
        });
      });
  }

  selectCard(userPreference: UserPreferences) {
    this.showInfo.set(true);
    this.userPreferenceInformation = userPreference;
  }

  showDialog() {
    this.visible.set(true);
  }

  filterApply() {
    const { topicsKnow, topicsLearn, gender, connect } = this.filterForm.value;

    this.responseUserPreference$ =
      this._userPreferenceService.getUserByPreferencesFiltered(
        this._userService.getUserId(),
        topicsKnow,
        topicsLearn,
        gender,
        connect
      );

    this.responseUserPreference$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((el) => {
        this.visible.set(false);
        this.allUserPreferences = el;
      });
  }
}

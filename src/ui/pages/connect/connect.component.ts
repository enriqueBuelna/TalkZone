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
import { FollowerService } from '../../../domain/services/follower.service';
import { Router } from '@angular/router';
interface FilterTopic {
  topic_id: number;
  topic_name: string;
  type: string;
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
  isTopicsMentor = signal(false);
  isTopicsEntusiasta = signal(false);
  isTopicsExplorador = signal(false);
  topicsMentor: FilterTopic[] = [];
  topicsExplorador: FilterTopic[] = [];
  topicsEntusiasta: FilterTopic[] = [];
  modalShowInfo = signal(false);
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
  textFollow = 'Seguir';
  constructor(
    private _userPreferenceService: UserPreferenceService,
    private _userService: UserService,
    private formBuilder: FormBuilder,
    private _destroyRef: DestroyRef,
    private _followService: FollowerService,
    private _router: Router
  ) {
    this.filterForm = this.formBuilder.group(
      {
        topicsMentores: [''],
        topicsExploradores: [''],
        topicsEntusiastas: [''],
        gender: [''],
        connect: [''],
        onlyMentores: [''],
        onlyEntusiastas: [''],
        onlyExploradores: [''],
      }
      // {
      //   validators: atLeastOneFieldRequired([
      //     'topicsKnow',
      //     'topicsLearn',
      //     'gender',
      //     'connect',
      //   ]),
      // }
    );
  }

  ngOnInit(): void {
    this.filterForm.get('topicsMentores')?.valueChanges.subscribe((value) => {
      if (value.length > 0) {
        this.isTopicsMentor.set(true);
      } else {
        this.isTopicsMentor.set(false);
      }
    });
    this.filterForm
      .get('topicsExploradores')
      ?.valueChanges.subscribe((value) => {
        if (value.length > 0) {
          this.isTopicsExplorador.set(true);
        } else {
          this.isTopicsExplorador.set(false);
        }
      });
    this.filterForm
      .get('topicsEntusiastas')
      ?.valueChanges.subscribe((value) => {
        if (value.length > 0) {
          this.isTopicsEntusiasta.set(true);
        } else {
          this.isTopicsEntusiasta.set(false);
        }
      });
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
        console.log(el);
        this.allUserPreferences = el;
      });

    this.responseMyUserPreferences$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((el) => {
        console.log(el);
        this.myUserPreference = el;
        el.forEach((ele) => {
          const topic: FilterTopic = {
            topic_id: ele.getTopicId(),
            topic_name: ele.getTopicName(),
            type: '',
          };
          if (ele.getType() === 'entusiasta') {
            topic.type = 'entusiasta';
            this.topicsEntusiasta.push(topic);
          } else if (ele.getType() === 'explorador') {
            topic.type = 'explorador';
            this.topicsExplorador.push(topic);
          } else if (ele.getType() === 'mentor') {
            topic.type = 'mentor';
            this.topicsMentor.push(topic);
          }
        });
      });
  }

  selectCard(userPreference: UserPreferences) {
    console.log(userPreference);
    this.showInfo.set(true);
    this.userPreferenceInformation = userPreference;
  }

  showDialog() {
    this.visible.set(true);
  }

  filterApply() {
    const {
      topicsMentores,
      topicsEntusiastas,
      topicsExploradores,
      onlyMentores,
      gender,
      connect,
      onlyEntusiastas,
      onlyExploradores,
    } = this.filterForm.value;

    console.log(topicsMentores, topicsEntusiastas, topicsExploradores);
    this.responseUserPreference$ =
      this._userPreferenceService.getUserByPreferencesFiltered(
        this._userService.getUserId(),
        topicsMentores,
        topicsExploradores,
        topicsEntusiastas,
        gender,
        connect,
        onlyMentores,
        onlyExploradores,
        onlyEntusiastas
      );

    this.responseUserPreference$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((el) => {
        this.showInfo.set(false);
        this.visible.set(false);
        this.allUserPreferences = el;
      });
  }

  onBlur() {
    console.log('El campo de entrada ha perdido el foco');
    // Aquí puedes agregar la lógica de validación que necesites
  }

  followUser(id: string | undefined) {
    console.log(id);
    if (id) {
      console.log('HOLA');
      if (this.textFollow === 'Seguir') {
        this._followService
          .followUser(this._userService.getUserId(), id.toString())
          .subscribe((el) => {
            if (el) {
              this.textFollow = 'Dejar de seguir';
            }
          });
      } else if (this.textFollow === 'Dejar de seguir') {
        this._followService
          .unfollowUser(this._userService.getUserId(), id.toString())
          .subscribe((el) => {
            if (el) {
              this.textFollow = 'Seguir';
            }
          });
      }
    }
  }

  goToProfile(id: string | undefined) {
    if (id === ''){
      id = this._userService.getUserId();
    }
    if (id) {
      this._router.navigate(['home', 'profile', id]);
    }
  }

  sendMessage(id: string | undefined) {
    if (id) {
      this._router.navigate(['home', 'messages', id]);
    }
  }

  showDialogType(){
    this.modalShowInfo.set(!this.modalShowInfo());
  }
}

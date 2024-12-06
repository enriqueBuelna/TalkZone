import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../utils/header/header.component';
import { AsideComponent } from '../../utils/aside/aside.component';
import { ButtonComponent } from '../../utils/button/button.component';
import { ChipModule } from 'primeng/chip';
import { UserService } from '../auth/services/user.service';
import { VoiceRoomService } from '../../../domain/services/voice_room.service';
import { Observable } from 'rxjs';
import { VoiceRoom } from '../../../domain/models/voice_room.model';
import { CommonModule } from '@angular/common';
import { OrderListModule } from 'primeng/orderlist';
import { UserOfVoiceRoom } from '../../../domain/entities/voice_rooms/UserOfVoiceRoom.entitie';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ScrollerModule } from 'primeng/scroller';
import { SkeletonModule } from 'primeng/skeleton';
import { CheckboxModule } from 'primeng/checkbox';
import { RatingModule } from 'primeng/rating';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CreateFormVRComponent } from './create-form-vr/create-form-vr.component';
import { UserPreference } from '../../../domain/models/user_preference.model';
import { UserPreferenceService } from '../../../domain/services/user_preference.service';
import { MultiSelectModule } from 'primeng/multiselect';
@Component({
  selector: 'app-voice-room',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    AsideComponent,
    ButtonComponent,
    ChipModule,
    OrderListModule,
    ScrollerModule,
    DialogModule,
    ReactiveFormsModule,
    CreateFormVRComponent,
    ReactiveFormsModule,
    MultiSelectModule,
    CheckboxModule,
    RatingModule,
    FormsModule,
    SkeletonModule
  ],
  templateUrl: './voice-room.component.html',
  styleUrl: './voice-room.component.css',
})
export class VoiceRoomComponent implements OnInit {
  responseAllVoiceRoom$?: Observable<VoiceRoom[]>;
  allVoiceRooms: VoiceRoom[] = [];
  ifVrChoosen: boolean = false;
  vrChoosen?: VoiceRoom;
  integrantsVr: UserOfVoiceRoom[] = [];
  formCreateVR!: FormGroup;
  modalCreate = signal(false);
  filterForm!: FormGroup;
  myUserPreference = signal<UserPreference[]>([]);
  filterApplies = signal(false);
  page = signal(1);
  yetNo = signal(true);
  categories: any[] = [
    { name: 'Explorador', key: 'explorador' },
    { name: 'Entusiasta', key: 'entusiasta' },
    { name: 'Mentor', key: 'mentor' },
  ];

  constructor(
    private _userService: UserService,
    private _voiceRoomService: VoiceRoomService,
    private _destroyRef: DestroyRef,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _userPreferenceService: UserPreferenceService
  ) {
    this.formCreateVR = this._formBuilder.group({
      room_name: ['', [Validators.required]],
      topic_id: ['', [Validators.required]],
    });

    this.filterForm = this._formBuilder.group({
      all_topics: [''],
      type: [''],
    });
  }

  ngOnInit() {
    this._userPreferenceService
      .getMyUserPreferences(this._userService.getUserId())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((el) => {
        this.myUserPreference.set(el);
        this.loadVr();
      });
  }

  siFunciona(vr: VoiceRoom) {
    this.vrChoosen = vr;
    this.integrantsVr = this.vrChoosen.getUsers();
  }

  createVoiceRoom() {}

  openDialog() {
    this.modalCreate.set(true);
  }

  joinRoom(room_id: number) {
    this._router.navigate(['/voice_room', room_id]);
  }

  modalFilter = signal(false);
  showModal() {
    this.modalFilter.set(true);
  }

  filterApply() {
    let { all_topics, type } = this.filterForm.value;
    console.log(type);
    if (all_topics.length > 0 || type.length > 0) {
      let auxTopicId, auxType;
      if (all_topics.length > 0) {
        auxTopicId = all_topics.map((el: any) => el.topic_id);
      }
      const payload = {
        topicsId: auxTopicId,
        type,
      };

      this.responseAllVoiceRoom$ = this._voiceRoomService.getVoiceRoom(
        this._userService.getUserId(),
        payload,
        this.page()
      );

      this.responseAllVoiceRoom$
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((el) => {
          this.yetNo.set(false);
          this.allVoiceRooms = el;
          if (this.allVoiceRooms.length === 0) {
            this.filterApplies.set(true);
          } else {
            this.filterApplies.set(false);
          }
          this.modalFilter.set(false);
        });
    }
  }

  hasMoreVr = signal(true);

  loadMoreVr() {
    this.page.update((el) => el + 1);
    console.log(this.page());
    this.loadVr();
  }

  loadVr() {
    this.responseAllVoiceRoom$ = this._voiceRoomService.getVoiceRoom(
      this._userService.getUserId(),
      null,
      this.page()
    );

    this.responseAllVoiceRoom$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((el) => {
        this.yetNo.set(false);
        if (el.length === 10) {
          this.hasMoreVr.set(true);
        } else {
          this.hasMoreVr.set(false);
        }
        if (this.allVoiceRooms.length > 0) {
          el.forEach((ele) => {
            this.allVoiceRooms.push(ele);
          });
        } else {
          this.allVoiceRooms = el;
        }
      });
  }

  closeModal() {
    this.modalCreate.set(false);
  }
}

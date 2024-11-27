import { Component, DestroyRef, EventEmitter, Output, signal } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { UserPreference } from '../../../../domain/models/user_preference.model';
import { CommunitieService } from '../../../../domain/services/communitie.service';
import { UserPreferenceService } from '../../../../domain/services/user_preference.service';
import { UserService } from '../../auth/services/user.service';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonComponent } from '../../../utils/button/button.component';
import { VoiceRoomService } from '../../../../domain/services/voice_room.service';
import { Route, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-create-form-vr',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, ButtonComponent],
  templateUrl: './create-form-vr.component.html',
  styleUrl: './create-form-vr.component.css',
})
export class CreateFormVRComponent {
  observable!: Observable<any>;
  firtStep = signal(false);
  mentoryTopics!: UserPreference[];
  exploradorTopics!: UserPreference[];
  entusiastaTopics!: UserPreference[];
  topicPrincipalList!: UserPreference[];
  formCreateGroup!: FormGroup;
  onClick() {
    throw new Error('Method not implemented.');
  }
  saveChanges() {
    let form = this.formCreateGroup.valid;

    if (form) {
      let { name, topic_id, type } = this.formCreateGroup.value;
      console.log(topic_id);
      this._voiceRoomService
        .createVoiceRoom(name, this._userService.getUserId(), topic_id.topic_id, type)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((el) => {
          this._router.navigate(['/voice_room', el.id]);
        });
    }
  }
  constructor(
    private _userService: UserService,
    private _userPreferences: UserPreferenceService,
    private _formBuilder: FormBuilder,
    private _voiceRoomService: VoiceRoomService,
    private _router: Router,
    private _destroyRef: DestroyRef
  ) {
    this.formCreateGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      topic_id: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    //para el dropdown , algo asi:
    this.formCreateGroup.get('type')?.valueChanges.subscribe((value) => {
      if (value.length > 0) {
        this.firtStep.set(true);
      } else {
        this.firtStep.set(false);
      }
      if (value === 'mentor') {
        this.topicPrincipalList = this.mentoryTopics;
      } else if (value === 'entusiasta') {
        this.topicPrincipalList = this.entusiastaTopics;
      } else {
        this.topicPrincipalList = this.exploradorTopics;
      }
    });

    this.observable = this._userPreferences.getMyUserPreferences(
      this._userService.getUserId()
    );

    this.observable.subscribe((el) => {
      this.mentoryTopics = el.filter((ele: any) => ele.type === 'mentor');
      this.exploradorTopics = el.filter(
        (ele: any) => ele.type === 'explorador'
      );
      this.entusiastaTopics = el.filter(
        (ele: any) => ele.type === 'entusiasta'
      );
    });
  }
  @Output() clickEvent = new EventEmitter<void>(); // Evento de clic
  close(){
    this.clickEvent.emit();
  }
}

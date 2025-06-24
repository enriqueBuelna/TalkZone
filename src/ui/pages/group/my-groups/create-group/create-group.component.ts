import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { ButtonComponent } from '../../../../utils/button/button.component';
import { UserService } from '../../../auth/services/user.service';
import { UserPreferenceService } from '../../../../../domain/services/user_preference.service';
import { Observable } from 'rxjs';
import { UserPreference } from '../../../../../domain/models/user_preference.model';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CommunitieService } from '../../../../../domain/services/communitie.service';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBar, ProgressBarModule } from 'primeng/progressbar';
@Component({
  selector: 'app-create-group',
  standalone: true,
  imports: [
    ButtonComponent,
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
    ProgressBarModule
  ],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css',
})
export class CreateGroupComponent implements OnInit {
  observable!: Observable<any>;
  firtStep = signal(false);
  mentoryTopics!: UserPreference[];
  otherTopics!: UserPreference[];
  topicPrincipalList!: UserPreference[];
  formCreateGroup!: FormGroup;
  progressBar = signal(false);
  constructor(
    private _userService: UserService,
    private _userPreferences: UserPreferenceService,
    private _formBuilder: FormBuilder,
    private _comunitieService: CommunitieService,
    private _router: Router
  ) {
    this.formCreateGroup = this._formBuilder.group({
      group_name: ['', [Validators.required, Validators.minLength(8)]],
      type: ['', [Validators.required]],
      topic_id: ['', [Validators.required]],
      privacy: ['', [Validators.required]],
    });
  }
  @Output() clickEvent = new EventEmitter<void>(); // Evento de clic
  onClick() {
    this.clickEvent.emit();
  }
  saveChanges() {
    let form = this.formCreateGroup.valid;

    if (form) {
      this.progressBar.set(true);
      let { group_name, privacy, topic_id, type } = this.formCreateGroup.value;
      if (type === 'other') {
        type = 'entusiasta';
      }
      let privacyB = privacy === 'public' ? false : true;
      this._comunitieService
        .createGroup(
          group_name,
          type,
          this._userService.getUserId(),
          privacyB,
          topic_id.id
        )
        .subscribe((el) => {
          this._router.navigate(['home', 'groups', el.id]);
        });
    }
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
      } else if (value === 'other') {
        this.topicPrincipalList = this.otherTopics;
      }
    });

    this.observable = this._userPreferences.getMyUserPreferences(
      this._userService.getUserId()
    );

    this.observable.subscribe((el) => {
      this.mentoryTopics = el.filter((ele: any) => ele.type === 'mentor');
      this.otherTopics = el.filter((ele: any) => ele.type !== 'mentor');
    });
  }
}

import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { StepperModule } from 'primeng/stepper';
import { DropdownModule } from 'primeng/dropdown';
import { ChipModule } from 'primeng/chip';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Subject, Observable, takeUntil } from 'rxjs';
import { Tag } from '../../../../domain/models/tag.model';
import { Topic } from '../../../../domain/models/topic.model';
import { AuthService } from '../../../../domain/services/auth.service';
import { TagService } from '../../../../domain/services/tag.service';
import { TopicService } from '../../../../domain/services/topic.service';
import { UserService } from '../../auth/services/user.service';
import { TopicsTagsService } from '../../welcome/services/topics-tags.service';
import { UserPreferencesServices } from '../../welcome/services/userPreferenceService.service';
import { ButtonComponent } from '../../../utils/button/button.component';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { UserPreferenceSignalService } from '../services/user_preferences.service';
import { UserPreferenceService } from '../../../../domain/services/user_preference.service';
import { UserPreference } from '../../../../domain/models/user_preference.model';
@Component({
  selector: 'app-modal-user-preferences',
  standalone: true,
  imports: [
    DialogModule,
    StepperModule,
    DropdownModule,
    ChipModule,
    ReactiveFormsModule,
    ButtonComponent,
    CommonModule,
    AutoCompleteModule,
  ],
  templateUrl: './modal-user-preferences.component.html',
  styleUrl: './modal-user-preferences.component.css',
})
export class ModalUserPreferencesComponent {
  private destroy$: Subject<void> = new Subject<void>();
  stepOne: boolean = false; //aqui
  visible: boolean = false; //aqui
  activeStep = signal(0); //aqui
  responseFinishProfile$?: Observable<void>; //aqui
  responseTopicPrincipal$?: Observable<Topic[]>; //aqui
  responseTopicSecond$?: Observable<Topic[]>; //aqui
  responseTags$?: Observable<Tag[]>; //aqui
  formTopics!: FormGroup; //aqui
  formDescription!: FormGroup; //aqui
  filteredTags!: Tag[]; //aqui
  responseAddTag$?: Observable<Tag>; //aqui
  @Input() type!: string;
  indexUserPreference: number = 0;
  topicExiste = signal(false);
  @Output() clickEvent = new EventEmitter<void>(); // Evento de clic
  constructor(
    private _topicService: TopicService,
    private formBuilder: FormBuilder,
    private _tagService: TagService,
    private _userService: UserService,
    private _authService: AuthService,
    private _TopicTagsService: TopicsTagsService,
    private _UserPreferenceService: UserPreferencesServices,
    private _userPreferencesSignal: UserPreferenceSignalService,
    private _remoteUserPreferenceService: UserPreferenceService
  ) {
    this.formTopics = this.formBuilder.group({
      firstTopic: ['', [Validators.required]],
      secondTopic: [''],
      tag: [''],
    });

    this.formDescription = this.formBuilder.group({
      about_me: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.responseTopicPrincipal$ = this._topicService.getPrincipalTopic();
  }

  changeStep() {
    this.stepOne = true;
  }

  showDialog(n: number, type: string) {
    this.visible = true;
    this.type = type;
  }

  next() {
    if (this.activeStep() === 0) {
      if (
        this.markFieldsAsTouchedAndValidate(this.formTopics, ['firstTopic'])
      ) {
        let { firstTopic } = this.formTopics.value;
        this.responseTopicSecond$ = this._topicService.getSecondTopic(
          firstTopic.id
        );
        this.responseTopicSecond$
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: Topic[]) => {
            this._TopicTagsService.setTopicSecondList(data);
            this.activeStep.set(1);
          });
      }
    } else if (this.activeStep() === 1) {
      let { secondTopic } = this.formTopics.value;
      let id = secondTopic.id ? secondTopic : this.formTopics.value.firstTopic;
      //ocupo verificar que no se repitar mi preferencia con otras que ya tenga
      if (!this._userPreferencesSignal.verifyNotExist(id.id)) {
        this.topicExiste.set(false);
        this.responseTags$ = this._tagService.getAllTag(id.id);
        this.responseTags$
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: Tag[]) => {
            this._TopicTagsService.setTagList(data);
            this.activeStep.set(2);
          });
      } else {
        this.topicExiste.set(true);
      }
    } else if (this.activeStep() === 2) {
      let { firstTopic, secondTopic } = this.formTopics.value;
      const chosenTopic = secondTopic || firstTopic;
      let userPreference = new UserPreference(
        0,
        chosenTopic.id,
        this.type,
        chosenTopic.topic_name,
        this._TopicTagsService.getTagAdded()
      );
      this.activeStep.set(3);

      this._remoteUserPreferenceService
        .addUserPreferences(this._userService.getUserId(), userPreference)
        .subscribe((el) => {
          this._userPreferencesSignal.createUserPreference(
            el.getId(),
            el.getTopicId(),
            el.getTags() || [],
            el.getType(),
            el.getTopicName()
          );
        });

      this.cleanAll();
    }
  }

  markFieldsAsTouchedAndValidate(form: FormGroup, fields: string[]): boolean {
    // Recorre los campos proporcionados
    fields.forEach((field) => {
      const control = form.get(field);
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });

    // Retorna true si todos los campos son válidos
    return fields.every((field) => form.get(field)?.valid);
  }

  filterTags(event: AutoCompleteCompleteEvent) {
    let filtered: Tag[] = [];
    let query = event.query;
    let tagList = this._TopicTagsService.getTagList();
    for (let i = 0; i < tagList.length; i++) {
      let tag = tagList[i];
      if (tag.getTagName().toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(tag);
      }
    }

    this.filteredTags = filtered;
  }

  addTag() {
    const allFieldsValid = this.markFieldsAsTouchedAndValidate(
      this.formTopics,
      ['tag']
    );
    if (allFieldsValid) {
      let { tag, secondTopic, firstTopic } = this.formTopics.value;
      let topicId = secondTopic?.id || firstTopic.id;
      let existingTag = false;
      if (!(tag instanceof Object) && tag != '' && tag != null) {
        existingTag = this._TopicTagsService.findTag(tag);
      }
      if (tag != '' && tag != null) {
        if (!existingTag && !(tag instanceof Object)) {
          //aqui es que no este
          let newTag: Tag = new Tag(tag, 0, topicId);
          this.responseAddTag$ = this._tagService.addTag(newTag);
          this.responseAddTag$
            .pipe(takeUntil(this.destroy$))
            .subscribe((data: Tag) => {
              this._TopicTagsService.addTagAdded(data);
              this._TopicTagsService.addTagList(data);
              this.formTopics.get('tag')?.reset();
            });
        } else if (tag instanceof Object) {
          if (!this._TopicTagsService.findTagAdded(tag)) {
            this._TopicTagsService.addTagAdded(tag);
            this.formTopics.get('tag')?.reset();
          } else {
            this.formTopics.get('tag')?.reset();
          }
        } else {
          let newTag = this._TopicTagsService.tagInList(tag);
          if (newTag && !this._TopicTagsService.findTagAdded(newTag)) {
            this._TopicTagsService.addTagAdded(newTag);
            this.formTopics.get('tag')?.reset();
          } else {
            this.formTopics.get('tag')?.reset();
          }
        }
      }
    }
  }

  tagRemove(tag_name: number) {
    this._TopicTagsService.tagRemove(tag_name);
  }

  cleanAll() {
    this.indexUserPreference++;
    this.responseTopicSecond$ = undefined;
    this.responseAddTag$ = undefined;
    this.visible = false;
    this.activeStep.set(0);
    this._TopicTagsService.cleanAll();
    this.type = '';
    this.formTopics.reset(
      {
        firstTopic: '',
        secondTopic: '',
        tag: '',
      },
      { emitEvent: false }
    );
    this.clickEvent.emit();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  uploadedImage: string = '';

  onImageUpload(event: any) {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.uploadedImage = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  removeImage() {
    this.uploadedImage = ''; // Elimina la imagen
  }

  getTopicTags() {
    return this._TopicTagsService;
  }

  getUserPreferences(type: string) {
    return this._UserPreferenceService.getUserPreferences(type);
  }

  deleteUserPreference(topic_name: string) {
    return this._UserPreferenceService.deleteUserPreference(topic_name);
  }

  close() {
    // this.clickEvent.emit();
    return true;
  }
}

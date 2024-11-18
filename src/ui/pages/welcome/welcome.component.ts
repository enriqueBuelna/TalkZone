import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { NavbarApp } from '../../utils/navbar/navbar.component';
import { AsideComponent } from '../../utils/aside/aside.component';
import { HeaderComponent } from '../../utils/header/header.component';
import { ButtonComponent } from '../../utils/button/button.component';
import { DialogModule } from 'primeng/dialog';
import { StepperModule } from 'primeng/stepper';
import { DropdownModule } from 'primeng/dropdown';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FileUploadModule } from 'primeng/fileupload';
import { ChipModule } from 'primeng/chip';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TopicService } from '../../../domain/services/topic.service';
import { Topic } from '../../../domain/models/topic.model';
import { first, Observable, Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Tag } from '../../../domain/models/tag.model';
import { TagService } from '../../../domain/services/tag.service';
import { UserPreference } from '../../../domain/models/user_preference.model';
import { UserService } from '../auth/services/user.service';
import { AuthService } from '../../../domain/services/auth.service';
import { TopicsTagsService } from './services/topics-tags.service';
import { UserPreferencesServices } from './services/userPreferenceService.service';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

class TopicDOM {
  public topic_name: string;
  public topic_id: number;
  constructor() {
    this.topic_id = 0;
    this.topic_name = '';
  }
}

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CommonModule,
    AsideComponent,
    HeaderComponent,
    ButtonComponent,
    DialogModule,
    StepperModule,
    DropdownModule,
    AvatarModule,
    FileUploadModule,
    ReactiveFormsModule,
    AutoCompleteModule,
    ChipModule,
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements OnInit {
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
  type: string = '';
  indexUserPreference: number = 0;
  topicExiste = signal(false);
  constructor(
    private _topicService: TopicService,
    private formBuilder: FormBuilder,
    private _tagService: TagService,
    private _userService: UserService,
    private _authService: AuthService,
    private _TopicTagsService: TopicsTagsService,
    private _UserPreferenceService: UserPreferencesServices
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
      if (!this._UserPreferenceService.verifyNotExist(id.id)) {
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
      console.log(
        chosenTopic.id,
        this._TopicTagsService.getTagAdded(),
        this.type,
        chosenTopic.topic_name
      );
      this._UserPreferenceService.createUserPreference(
        0,
        chosenTopic.id,
        this._TopicTagsService.getTagAdded(),
        this.type,
        chosenTopic.topic_name
      );

      console.log(this._UserPreferenceService.getUserPreferences('explorador'));

      this.activeStep.set(3);

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
    console.log(tagList);
    for (let i = 0; i < tagList.length; i++) {
      let tag = tagList[i];
      console.log(tag.getTagName());
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
      console.log(tag);
      if (tag != '' && tag != null) {
        if (!existingTag && !(tag instanceof Object)) {
          //aqui es que no este
          console.log(topicId);
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

  uploadInformation() {
    //tengo que recojer mi descripcion, tengo que recojer mis preferencias, mi imagen , primero subir la imagen
    //a firestore, que eso me de la url y esa tenerla, luego conseguir mi usuario y mi token, lo voy a hacer
    //sin firestore de momento
    let { about_me } = this.formDescription.value;
    //llamar al servicio para que haga esta cosa

    let id  = this._userService.getUserId();
    this.responseFinishProfile$ = this._authService.finishProfile(
      id,
      about_me,
      this.uploadedImage,
      this._UserPreferenceService.getUserPreferencesAll()
    );

    this.responseFinishProfile$.subscribe((data) => {
      console.log(data);
    });
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
}

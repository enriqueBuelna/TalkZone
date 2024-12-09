import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  Output,
  EventEmitter,
  signal,
  Input,
  DestroyRef,
  SimpleChanges,
} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { UserComplete } from '../../../../../domain/models/user_complete_information.model';
import { UserPreference } from '../../../../../domain/models/user_preference.model';
import { uploadFile } from '../../../../../firestore/firestore';
import { ButtonComponent } from '../../../../utils/button/button.component';
import { ModalUserPreferencesComponent } from '../../../my-profile/modal-user-preferences/modal-user-preferences.component';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserCompleteProfile } from '../../../my-profile/services/user_complete.service';
import { UserPreferenceSignalService } from '../../../my-profile/services/user_preferences.service';
import { GroupComplete } from '../../../../../domain/models/group/groupComplete.model';
import { CommunitieService } from '../../../../../domain/services/communitie.service';
import { TopicsTagsService } from '../../../welcome/services/topics-tags.service';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { Observable } from 'rxjs';
import { Tag } from '../../../../../domain/models/tag.model';
import { TagService } from '../../../../../domain/services/tag.service';
import { ProgressSpinner, ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
@Component({
  selector: 'app-edit-group',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChipModule,
    ButtonComponent,
    ModalUserPreferencesComponent,
    AutoCompleteModule,
    ProgressSpinnerModule,
    ProgressBarModule
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileGroupComponent implements OnInit, OnDestroy, OnChanges {
  formEditProfile!: FormGroup;
  formTopics!: FormGroup;
  @Output() clickEvent = new EventEmitter<void>(); // Evento de clic
  modalShow = signal(false);
  type: string = '';
  @Input() user!: UserComplete;
  @Input() group!: GroupComplete;
  userPreferences = signal<UserPreference[]>([]);
  userPreferencesDeleted: number[] = [];
  // Método para manejar el clic
  onClick() {
    // Previene el clic si el botón está deshabilitado
    this.clickEvent.emit();
  }
  //IMAGENES
  // Variables para almacenar las URLs de las imágenes
  coverPhotoPreview: string = 'images/teemo.jpeg'; // Ruta inicial
  profilePhotoPreview: string = 'images/images.jpeg'; // Ruta inicial
  photoFile: File | null = null;
  coverFile: File | null = null;
  // Método para manejar los cambios en los inputs
  // Método para manejar los cambios en los inputs
  responseTags$?: Observable<Tag[]>; //aqui
  responseAddTag$?: Observable<Tag>; //aqui
  editTagModal = signal(false);
  filteredTags!: Tag[]; //aqui
  onImageSelected(event: Event, type: 'cover' | 'profile'): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        // Actualiza la URL de vista previa según el tipo
        if (type === 'cover') {
          this.coverPhotoPreview = e.target?.result as string;
          this.coverFile = file;
        } else {
          this.profilePhotoPreview = e.target?.result as string;
          this.photoFile = file;
        }
      };

      reader.readAsDataURL(file); // Convierte el archivo en Base64
    }
  }

  constructor(
    private _userPreference: UserPreferenceSignalService,
    private _formBuilder: FormBuilder,
    private _communityService: CommunitieService,
    public _TopicTagsService: TopicsTagsService,
    private _tagService: TagService,
    private _destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    console.log(this.group.getStatus());
    this.profilePhotoPreview = this.group.getProfilePicture();
    this.coverPhotoPreview = this.group.getCoverPicture();
    this.formEditProfile = this._formBuilder.group({
      profile_picture: [''],
      cover_picture: [''],
      privacy: [this.group.getPrivacy() ? 'private' : 'public'],
      about_communitie: [this.group.getDescription()],
      status: [this.group.getStatus()]
    });
    this.formTopics = this._formBuilder.group({
      tag: [''],
    });
  }

  //yo aqui:
  showModal(type: string) {
    this.type = type;
    this.modalShow.set(true);
  }

  quitModal() {
    this.modalShow.set(false);
  }

  async saveChanges() {
    let userPreferencesNotSave = this.userPreferences().filter(
      (el) => el.getId() === 0
    );
    let completedCount = 0;
    let total =
      userPreferencesNotSave.length + this.userPreferencesDeleted.length;

    let { privacy, about_communitie, cover_picture, profile_picture, status } =
      this.formEditProfile.value;
    if (
      cover_picture.length > 0 ||
      profile_picture.length > 0 ||
      privacy.length > 0 ||
      about_communitie > 0
    ) {
      this.submit.set(true);
      let cover_picture$ = '',
        profile_picture$ = '';
      if (this.coverFile) {
        cover_picture$ = await uploadFile(this.coverFile);
      }
      if (this.photoFile) {
        profile_picture$ = await uploadFile(this.photoFile);
      }
      if (privacy === 'private') {
        privacy = true;
      } else {
        privacy = false;
      }
      this._communityService
        .editGroup(
          this.group.getId().toString(),
          privacy,
          about_communitie,
          cover_picture$,
          profile_picture$,
          status
        )
        .subscribe((el) => {
          if (el) {
            this.group.editGroup(
              privacy,
              about_communitie,
              cover_picture$,
              profile_picture$,
              status
            );
            this.onClick();
          }
        });
    }
  }

  ngOnDestroy() {
    console.log('HOLAAAAAAA');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      this.profilePhotoPreview = this.user.getUserDemo().getProfilePic();
      this.coverPhotoPreview = this.user.getCoverPicture();
    }
  }

  tagAdd = signal(false);
  addTags() {
    this.tagAdd.set(!this.tagAdd());
    this.editPreference();
  }

  userPreferenceEdit = '';
  editPreference() {
    let userPreference = this.group.getTags();
    if (userPreference) {
      userPreference.forEach((el) => {
        this._TopicTagsService.addTagAdded(el);
      });
      console.log('HOLA', this.group.getTopicId());
      this.responseTags$ = this._tagService.getAllTag(
        parseInt(this.group.getTopicId())
      );
      this.responseTags$
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((data: Tag[]) => {
          this._TopicTagsService.setTagList(data);
          // this.editTagModal.set(!this.editTagModal());
          this.userPreferenceEdit = this.group.getTopicId();
        });
    }
    // else {
    //   this.editTagModal.set(!this.editTagModal());
    //   this._TopicTagsService.cleanAll();
    // }
  }

  filterTags(event: AutoCompleteCompleteEvent) {
    let filtered: Tag[] = [];
    let query = event.query;
    let tagList = this._TopicTagsService.getTagList();
    console.log(tagList);
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
      let { tag } = this.formTopics.value;
      let topicId = parseInt(this.userPreferenceEdit);
      let existingTag = false;
      if (!(tag instanceof Object) && tag != '' && tag != null) {
        existingTag = this._TopicTagsService.findTag(tag);
      }
      if (tag != '' && tag != null) {
        if (!existingTag && !(tag instanceof Object)) {
          //aqui es que no este
          console.log(topicId);
          let newTag: Tag = new Tag(tag, 0, topicId);
          this.responseAddTag$ = this._tagService.addTag(newTag);
          this.responseAddTag$
            .pipe(takeUntilDestroyed(this._destroyRef))
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
  submit = signal(false);
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

  saveTags() {
    this._tagService
      .submitTagGroup(
        this.group.getId().toString(),
        this._TopicTagsService.getTagAdded(),
        this.tagsEliminated
      )
      .subscribe((el) => {
        if (this._TopicTagsService.getTagAdded()) {
          this._TopicTagsService.getTagAdded().forEach((ele) => {
            this.group.addNewTags(ele);
          });
        }
        if (this.tagsEliminated.length > 0) {
          this.group.removeTagsByIds(this.tagsEliminated);
        }
        this._TopicTagsService.cleanAll();
        this.tagAdd.set(!this.tagAdd());
      });
  }
  tagsEliminated: number[] = [];
  tagRemoveFull(id: number) {
    let idEliminated = this._TopicTagsService.tagRemove(id);
    if (idEliminated?.getId() !== 0) {
      this.tagsEliminated.push(idEliminated?.getId() || 0);
    }
    console.log(this.tagsEliminated);
  }

  closeModal() {
    this.tagAdd.set(false);
    this._TopicTagsService.cleanAll();
  }
}

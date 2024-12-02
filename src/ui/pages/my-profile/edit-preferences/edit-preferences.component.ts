import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { Observable } from 'rxjs';
import { Tag } from '../../../../domain/models/tag.model';
import { UserComplete } from '../../../../domain/models/user_complete_information.model';
import { UserPreference } from '../../../../domain/models/user_preference.model';
import { AuthService } from '../../../../domain/services/auth.service';
import { TagService } from '../../../../domain/services/tag.service';
import { UserPreferenceService } from '../../../../domain/services/user_preference.service';
import { uploadFile } from '../../../../firestore/firestore';
import { TopicsTagsService } from '../../welcome/services/topics-tags.service';
import { UserCompleteProfile } from '../services/user_complete.service';
import { UserPreferenceSignalService } from '../services/user_preferences.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../utils/button/button.component';
import { ModalUserPreferencesComponent } from '../modal-user-preferences/modal-user-preferences.component';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-edit-preferences',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    ModalUserPreferencesComponent,
    ChipModule,
    AutoCompleteModule,
  ],
  templateUrl: './edit-preferences.component.html',
  styleUrl: './edit-preferences.component.css',
})
export class EditPreferencesComponent {
  formEditProfile!: FormGroup;
  formTopics!: FormGroup; //aqui
  @Output() clickEvent = new EventEmitter<void>(); // Evento de clic
  modalShow = signal(false);
  type: string = '';
  @Input() user!: UserComplete;
  userPreferences = signal<UserPreference[]>([]);
  userPreferencesDeleted: number[] = [];
  deletePreference = signal(false);
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
  //
  responseTags$?: Observable<Tag[]>; //aqui
  responseAddTag$?: Observable<Tag>; //aqui
  editTagModal = signal(false);
  filteredTags!: Tag[]; //aqui
  // Método para manejar los cambios en los inputs
  // Método para manejar los cambios en los inputs
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
    private _userPreferenceService: UserPreferenceService,
    private _userService: AuthService,
    private _userCompleteInformation: UserCompleteProfile,
    private _destroyRef: DestroyRef,
    public _TopicTagsService: TopicsTagsService,
    private _tagService: TagService
  ) {
    this.formEditProfile = this._formBuilder.group({
      profile_picture: [''],
      cover_picture: [''],
      username: [''],
      about_me: [''],
    });
    this.formTopics = this._formBuilder.group({
      tag: [''],
    });
  }

  ngOnInit(): void {
    this.userPreferences = this._userPreference.getUserPreferencesAll();
  }

  preferenceDeleted !:number;
  deleteUserPreference(id: number) {
    this.deletePreference.set(!this.deletePreference());
    if(id !== 0){
      this.preferenceDeleted = id;
    }
  }

  deleteForReal(){
    if(this.preferenceDeleted){
      this._userPreferenceService.deleteUserPreference(this.preferenceDeleted).subscribe(el => {
        this._userPreference.deleteUserPreferenceId(this.preferenceDeleted);
        this.preferenceDeleted = 0;
        this.deletePreference.set(!this.deletePreference());
        
      })
    }
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

    let { username, about_me, cover_picture, profile_picture } =
      this.formEditProfile.value;
    if (
      username.length > 0 ||
      about_me.length > 0 ||
      cover_picture.length > 0 ||
      profile_picture.length > 0
    ) {
      total++;
      let cover_picture$ = '',
        profile_picture$ = '';
      if (this.coverFile) {
        cover_picture$ = await uploadFile(this.coverFile);
      }
      if (this.photoFile) {
        profile_picture$ = await uploadFile(this.photoFile);
      }
      this._userService
        .editProfile(
          this.user.getUserDemo().getUserId(),
          username,
          about_me,
          profile_picture$,
          cover_picture$
        )
        .subscribe((el) => {
          if (username.length > 0) {
            this._userCompleteInformation
              .myUser()
              .getUserDemo()
              .setUsername(username);
          }

          if (this.photoFile) {
            this._userCompleteInformation
              .myUser()
              .getUserDemo()
              .setProfilePic(profile_picture$);
          }

          if (this.coverFile) {
            this._userCompleteInformation
              .myUser()
              .setCoverPicture(cover_picture$);
          }

          if (about_me.length > 0) {
            this._userCompleteInformation.myUser().setAboutMe(about_me);
          }
          completedCount++;
          if (completedCount === total) {
            this.onClick();
          }
        });
    }
    if (userPreferencesNotSave.length > 0) {
      this._userPreference.deleteUserNotPreference();

      userPreferencesNotSave.forEach((el) => {
        this._userPreferenceService
          .addUserPreferences(this.user.getUserDemo().getUserId(), el)
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe((result) => {
            this._userPreference.addNewUserPreference(result);
            completedCount++;

            // // Verificar si todas las suscripciones han terminado
            if (completedCount === total) {
              this.onClick();
            }
          });
      });
    }

    if (this.userPreferencesDeleted.length > 0) {
      this.userPreferencesDeleted.forEach((el) => {
        this._userPreferenceService
          .deleteUserPreference(el)
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe((ele) => {
            this._userPreference.deleteUserPreferenceById(el);
            completedCount++;
            if (completedCount === total) {
              this.onClick();
            }
          });
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

  userPreferenceEdit!: UserPreference;
  editPreference(userPreference: UserPreference | null) {
    console.log(userPreference);
    if (userPreference) {
      if (userPreference.getTags()) {
        userPreference.getTags()?.forEach((el) => {
          console.log(el);
          this._TopicTagsService.addTagAdded(el);
        });
      }
      this.responseTags$ = this._tagService.getAllTag(
        userPreference.getTopicId()
      );
      this.responseTags$
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((data: Tag[]) => {
          this._TopicTagsService.setTagList(data);
          this.editTagModal.set(!this.editTagModal());
          this.userPreferenceEdit = userPreference;
        });
    } else {
      this.editTagModal.set(!this.editTagModal());
      this._TopicTagsService.cleanAll();
    }
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
      let topicId = this.userPreferenceEdit.getTopicId();
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
      .submitTagPreferences(
        this.userPreferenceEdit.getId().toString(),
        this._TopicTagsService.getTagAdded(),
        this.tagsEliminated
      )
      .subscribe((el) => {
        if (this._TopicTagsService.getTagAdded()) {
          this._TopicTagsService.getTagAdded().forEach((el) => {
            this.userPreferenceEdit.addNewTags(el);
          });
        }
        if (this.tagsEliminated.length > 0) {
          this.userPreferenceEdit.removeTagsByIds(this.tagsEliminated);
        }
        this._TopicTagsService.cleanAll();
        this.editTagModal.set(!this.editTagModal());
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
}

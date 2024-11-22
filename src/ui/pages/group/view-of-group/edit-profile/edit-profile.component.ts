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
import { UserCompleteProfile } from '../../../my-profile/services/user_complete.service';
import { UserPreferenceSignalService } from '../../../my-profile/services/user_preferences.service';
import { GroupComplete } from '../../../../../domain/models/group/groupComplete.model';
import { CommunitieService } from '../../../../../domain/services/communitie.service';

@Component({
  selector: 'app-edit-group',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChipModule,
    ButtonComponent,
    ModalUserPreferencesComponent,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileGroupComponent implements OnInit, OnDestroy, OnChanges {
  formEditProfile!: FormGroup;
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
    private _communityService: CommunitieService
  ) {}

  ngOnInit(): void {
    this.profilePhotoPreview = this.group.getProfilePicture();
    this.coverPhotoPreview = this.group.getCoverPicture();
    this.formEditProfile = this._formBuilder.group({
      profile_picture: [''],
      cover_picture: [''],
      privacy: [this.group.getPrivacy() ? 'private' : 'public'],
      about_communitie: [this.group.getDescription()],
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

    let { privacy, about_communitie, cover_picture, profile_picture,  } =
      this.formEditProfile.value;
    if (
      cover_picture.length > 0 ||
      profile_picture.length > 0 ||
      privacy.length > 0 ||
      about_communitie > 0
    ) {
      let cover_picture$ = '',
        profile_picture$ = '';
      if (this.coverFile) {
        cover_picture$ = await uploadFile(this.coverFile);
      }
      if (this.photoFile) {
        profile_picture$ = await uploadFile(this.photoFile);
      }

      this._communityService
        .editGroup(
          this.group.getId().toString(),
          privacy,
          about_communitie,
          cover_picture$,
          profile_picture$
        )
        .subscribe((el) => console.log(el));
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
}

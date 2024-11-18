import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Chip, ChipModule } from 'primeng/chip';
import { UserComplete } from '../../../../domain/models/user_complete_information.model';
import { UserPreferenceSignalService } from '../services/user_preferences.service';
import { UserPreference } from '../../../../domain/models/user_preference.model';
import { ButtonComponent } from '../../../utils/button/button.component';
import { ModalUserPreferencesComponent } from '../modal-user-preferences/modal-user-preferences.component';
import { UserPreferenceService } from '../../../../domain/services/user_preference.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { uploadFile } from '../../../../firestore/firestore';
import { AuthService } from '../../../../domain/services/auth.service';
import { UserCompleteProfile } from '../services/user_complete.service';
@Component({
  selector: 'app-edit-profile',
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
export class EditProfileComponent implements OnInit, OnDestroy, OnChanges {
  formEditProfile!: FormGroup;
  @Output() clickEvent = new EventEmitter<void>(); // Evento de clic
  modalShow = signal(false);
  type: string = '';
  @Input() user!: UserComplete;
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
    private _userPreferenceService: UserPreferenceService,
    private _userService: AuthService,
    private _userCompleteInformation: UserCompleteProfile,
    private _destroyRef: DestroyRef
  ) {
    this.formEditProfile = this._formBuilder.group({
      profile_picture: [''],
      cover_picture: [''],
      username: [''],
      about_me: [''],
    });
  }

  ngOnInit(): void {
    this.userPreferences = this._userPreference.getUserPreferencesAll();
  }

  deleteUserPreference(id: number) {
    console.log(id);
    this.userPreferencesDeleted.push(id);
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
}

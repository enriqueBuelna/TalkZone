import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
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
export class EditProfileComponent implements OnInit, OnDestroy {
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
         } else {
           this.profilePhotoPreview = e.target?.result as string;
         }
       };
 
       reader.readAsDataURL(file); // Convierte el archivo en Base64
       console.log("Hola")
     }
   }

  constructor(
    private _userPreference: UserPreferenceSignalService,
    private _formBuilder: FormBuilder,
    private _userPreferenceService: UserPreferenceService,
    private _destroyRef: DestroyRef
  ) {
    this.formEditProfile = this._formBuilder.group({
      profile_picture: [''],
      cover_photo: [''],
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

  saveChanges() {
    let userPreferencesNotSave = this.userPreferences().filter(
      (el) => el.getId() === 0
    );
    let completedCount = 0;
    let total =
      userPreferencesNotSave.length + this.userPreferencesDeleted.length;
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
}

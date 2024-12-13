import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { UserDemo } from '../../../../../domain/models/user-demo.model';
import { UserPreferenceService } from '../../../../../domain/services/user_preference.service';
import { Observable } from 'rxjs';
import { UserPreference } from '../../../../../domain/models/user_preference.model';
import { SelectButtonModule } from 'primeng/selectbutton';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../../../domain/services/post.service';
import { IPost } from '../../../../../domain/entities/post/post.entitie';
import { uploadFile } from '../../../../../firestore/firestore';
import { PostCService } from '../../../my-feed/services/post.service';
import { AuthService } from '../../../../../domain/services/auth.service';
import { UserService } from '../../../auth/services/user.service';
import { GroupComplete } from '../../../../../domain/models/group/groupComplete.model';
import { CommunitieService } from '../../../../../domain/services/communitie.service';
import { ActivatedRoute } from '@angular/router';
import { ApplyGroup } from '../../../../../domain/models/group/apply_group.model';
import { ProgressBarModule } from 'primeng/progressbar';
import { GoogleGeminiProService } from '../../../../../gemini/gemini.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-modal-post-group',
  standalone: true,
  imports: [
    DialogModule,
    DropdownModule,
    SelectButtonModule,
    ReactiveFormsModule,
    CommonModule,
    ProgressBarModule,
    ToastModule
  ],
  templateUrl: './modal-post.component.html',
  styleUrl: './modal-post.component.css',
  providers: [MessageService]
})
export class ModalPostGroupComponent implements OnInit {
  @Input() group!: GroupComplete;
  formPost!: FormGroup;
  @Output() clickEvent = new EventEmitter<void>(); // Evento de clic
  userInformation!: UserDemo;
  addPost$!: Observable<any>;
  @Input() type!: string;
  userPreferences!: UserPreference[];
  paymentOptions!: any[];
  //foto
  photoFile: File | null = null;
  myObservable!: Observable<any>;
  @Input() applies = signal(false);
  applyGroups = signal<ApplyGroup[]>([]);
  constructor(
    private _userPreferences: UserPreferenceService,
    private _postService: PostService,
    private _formBuilder: FormBuilder,
    private _postCService: PostCService,
    private _userService: AuthService,
    private _user: UserService,
    private _communityService: CommunitieService,
    private _route: ActivatedRoute,
    private _geminiService: GoogleGeminiProService,
        private _messageService: MessageService
  ) {
    this.formPost = this._formBuilder.group({
      content: ['', [Validators.required]],
      visibility: ['', [Validators.required]],
      tags: [''],
    });
  }
  showTagsInput = false;

  toggleTagsInput() {
    this.showTagsInput = !this.showTagsInput;
    if (!this.showTagsInput) {
      // Limpiar las etiquetas cuando se oculta
      this.formPost.get('tags')?.setValue('');
    }
  }

  removeTag(index: number) {
    const tagsControl = this.formPost.get('tags');
    const currentTags = tagsControl?.value.split(',');
    currentTags.splice(index, 1);
    tagsControl?.setValue(currentTags.join(','));
  }
  ngOnInit(): void {
    if (this.applies()) {
      const roomId = this._route.snapshot.paramMap.get('id') ?? '';
      this._communityService.getPendingApplies(roomId).subscribe((el) => {
        this.applyGroups.set(el);
      });
    } else {
      this.myObservable = this._userService.getBasicInfo(
        this._user.getUserId()
      );

      this.myObservable.subscribe((el) => {
        this.userInformation = el;
      });

      if (this.type === 'mentor') {
        this.paymentOptions = [
          { name: 'Preguntas y respuestas', value: 'questions' },
          { name: 'Recursos academicos', value: 'resources-academic' },
          { name: 'Experiencias', value: 'experiences' },
        ];
      } else {
        this.paymentOptions = [
          { name: 'Opiniones', value: 'opinions' },
          { name: 'Recursos externos', value: 'resources-external' },
          { name: 'Experiencias', value: 'experiences' },
        ];
      }
    }
  }

  // Método para manejar el clic
  onClick() {
    // Previene el clic si el botón está deshabilitado
    this.clickEvent.emit();
  }
  submitEnter= signal(false);
  async addPost() {
    if (this.formPost.valid) {
      this.submitEnter.set(true);
      let { content, visibility } = this.formPost.value;
      let aux2 = visibility.value;
      let downloadURL;
      if (this.photoFile) {
        downloadURL = await uploadFile(this.photoFile);
      }
      let noMore;
        if (Array.isArray(this.formPost.get('tags')?.value)) {
          noMore = this.formPost.get('tags')?.value.join(',');
        } else {
          noMore = this.formPost.get('tags')?.value;
        }
        const rawTags = noMore; // Obtener el valor del campo
        const cleanedTags = rawTags
          .split(',') // Separar por comas
          .map((tag: any) => tag.trim()) // Eliminar espacios al inicio y al final de cada elemento
          .filter((tag: any) => tag !== ''); // Eliminar valores vacíos si los hay
      let payload: IPost = {
        user_id: this.userInformation.getUserId(),
        content,
        visibility: 'public',
        user_preference_id: parseInt(this.group.getUserPreferenceId()),
        media_url: downloadURL,
        community_id: this.group.getId().toString(),
        type_community: aux2,
        tags: cleanedTags,
      };

      if(this.type === 'mentor' && aux2 === 'questions'){
        this._geminiService
        .verifyIfQuestionsRight(this.group.getTopicName(), content)
        .then((response: any) => {
          if (
            response === 'Sí' ||
            response === 'SÍ' ||
            response === 'sí' ||
            response === 'Si' ||
            response === 'SI' ||
            response === 'si'
          ) {
            this._postService.newPost(payload).subscribe((el) => {
              el.setNameCommunity(this.group.getGroupName());
              el.setCoverPicture(this.group.getCoverPicture());
              this._postCService.addNewPost(el);
              this.onClick();
            });
          } else {
            this.submitEnter.set(false);
            this._messageService.add({
              severity: 'error',
              summary: 'Algo salio mal',
              detail:
                'Verifica que la publicacion, tenga que ver con el tipo de publicacion que estas haciendo',
            });
          }
        });
      }else {
        this._postService.newPost(payload).subscribe((el) => {
          el.setNameCommunity(this.group.getGroupName());
          el.setCoverPicture(this.group.getCoverPicture());
          this._postCService.addNewPost(el);
          this.onClick();
        });
      }
    }
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.photoFile = file; // Guardar el archivo en la propiedad
      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const previewUrl = e.target?.result as string;
        console.log('Vista previa de la imagen:', previewUrl); // Para mostrar una previsualización si lo deseas
      };

      reader.readAsDataURL(file); // Convierte el archivo a Base64 para la previsualización (opcional)
    }
  }
  formatTags(tags: any): string[] {
    if (Array.isArray(tags)) {
      // If it's already an array, return it as is
      return tags.map((tag) =>
        typeof tag === 'object' && tag.getTagName ? tag.getTagName() : tag
      );
    }
    if (typeof tags === 'string') {
      // If it's a string, split it
      return tags.split(',');
    }
    // If it's neither an array nor a string, return an empty array
    return [];
  }
  onEnter(event: any): void {
    event.preventDefault(); // Previene que el formulario se envíe o se cierre
  }

  responseApply(option: string, id: string) {
    const roomId = this._route.snapshot.paramMap.get('id') ?? '';
    this._communityService.responseApply(id, roomId, option).subscribe((el) => {
      console.log(el, 'hola');
      this.applyGroups.set(
        this.applyGroups().filter((el) => el.getUserDemo().getUserId() !== id)
      );
    });
  }
}

import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
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
import { PostCService } from '../../services/post.service';
import { uploadFile } from '../../../../../firestore/firestore';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../auth/services/user.service';
import { CommentsCService } from '../../services/comment.service';
import { Comment } from '../../../../../domain/models/comment.model';
import { Post } from '../../../../../domain/models/post.model';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
@Component({
  selector: 'app-modal-post',
  standalone: true,
  imports: [
    DialogModule,
    DropdownModule,
    SelectButtonModule,
    ReactiveFormsModule,
    CommonModule,
    PickerComponent,
  ],
  templateUrl: './modal-post.component.html',
  styleUrl: './modal-post.component.css',
})
export class ModalPostComponent implements OnInit {
  formPost!: FormGroup;
  @Output() clickEvent = new EventEmitter<void>(); // Evento de clic
  @Input() myUser!: UserDemo;
  @Input() editable = false;
  @Input() postContent!: Post;
  userPreferences$!: Observable<any>;
  addPost$!: Observable<any>;
  userPreferences!: UserPreference[];
  @Input() type!: string;
  paymentOptions: any[] = [
    { name: 'Publico', value: 'public' },
    { name: 'Privado', value: 'private' },
  ];
  constructor(
    private _userPreferences: UserPreferenceService,
    private _postService: PostService,
    private _formBuilder: FormBuilder,
    private _postCService: PostCService,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _commentService: CommentsCService
  ) {
    this.formPost = this._formBuilder.group({
      content: ['', [Validators.required]],
      topic_id: ['', [Validators.required]],
      visibility: ['public', [Validators.required]],
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
    if (this.type !== 'comment' && this.type !== 'post') {
      if (
        this.postContent.getUserPreference()?.getType() === 'mentor' &&
        this.type === 'group'
      ) {
        this.paymentOptions = [
          { name: 'Preguntas y respuestas', value: 'questions' },
          { name: 'Recursos academicos', value: 'resources-academic' },
          { name: 'Experiencias', value: 'experiences' },
        ];
      } else if (
        this.postContent.getUserPreference()?.getType() === 'entusiasta' &&
        this.type === 'group'
      ) {
        this.paymentOptions = [
          { name: 'Opiniones', value: 'opinions' },
          { name: 'Recursos externos', value: 'resources-external' },
          { name: 'Experiencias', value: 'experiences' },
        ];
      }
    }
    this.userPreferences$ = this._userPreferences.getMyUserPreferences(
      this.myUser.getUserId()
    );

    this.userPreferences$.subscribe((el) => {
      this.userPreferences = el;
    });

    if (this.postContent) {
      // console.log(this.postContent.getPrivacy());
      // this.formPost.patchValue({

      // });

      let option = {
        name: '',
        value: '',
      };

      if (this.type !== 'group') {
        if (this.postContent.getPrivacy() === 'public') {
          (option.name = 'Publico'), (option.value = 'public');
        } else if (this.postContent.getPrivacy() === 'private') {
          (option.name = 'Privado'), (option.value = 'private');
        }
      } else {
        if (this.postContent.getTypeCommunity() === 'questions') {
          (option.name = 'Preguntas y respuestas'),
            (option.value = 'questions');
        } else if (
          this.postContent.getTypeCommunity() === 'resources-academic'
        ) {
          (option.name = 'Recursos academicos'),
            (option.value = 'resources-academic');
        } else if (this.postContent.getTypeCommunity() === 'experiences') {
          (option.name = 'Experiencias'), (option.value = 'experiences');
        } else if (this.postContent.getTypeCommunity() === 'opinions') {
          (option.name = 'Opiniones'), (option.value = 'opinions');
        } else if (
          this.postContent.getTypeCommunity() === 'resources-external'
        ) {
          (option.name = 'Recursos externos'),
            (option.value = 'resources-external');
        }
      }

      let aux: string[] = [];
      if (this.postContent.getTags().length > 0) {
        this.postContent.getTags().forEach((el) => aux.push(el.getTagName()));
      }
      this.formPost.patchValue({
        content: this.postContent.getContent(),
        topic_id: this.postContent.getUserPreference(),
        visibility: option,
        tags: aux,
      });

      if (this.postContent.getTags().length > 0) {
        this.showTagsInput = true;
      }
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

  // Método para manejar el clic
  onClick() {
    // Previene el clic si el botón está deshabilitado
    this.clickEvent.emit();
  }

  async addPost() {
    if (this.type === 'post') {
      if (this.formPost.valid) {
        let { content, visibility, topic_id, tags } = this.formPost.value;
        let aux = topic_id.id;
        let aux2 = visibility.value;
        let downloadURL = '';
        if (this.photoFile) {
          downloadURL = await uploadFile(this.photoFile);
        }
        let noMore; 
        if(Array.isArray(this.formPost.get('tags')?.value)){
          noMore = this.formPost.get('tags')?.value.join(",");
        }else{
          noMore = this.formPost.get('tags')?.value;
        }

        const rawTags = noMore; // Obtener el valor del campo
        const cleanedTags = rawTags
          .split(',') // Separar por comas
          .map((tag: any) => tag.trim()) // Eliminar espacios al inicio y al final de cada elemento
          .filter((tag: any) => tag !== ''); // Eliminar valores vacíos si los hay
        let payload: IPost = {
          user_id: this.myUser.getUserId(),
          content,
          visibility: aux2,
          user_preference_id: aux,
          media_url: downloadURL,
          tags: cleanedTags,
        };

        if (this.postContent) {
          this._postService
            .updatePost(
              this.postContent.getId(),
              content,
              downloadURL + '',
              aux2,
              aux,
              cleanedTags
            )
            .subscribe((el) => {
              this._postCService.findPost(
                this.postContent.getId(),
                content,
                downloadURL,
                aux2,
                topic_id,
                el
              );
            });
          this.onClick();
        } else {
          this._postService.newPost(payload).subscribe((el) => {
            this._postCService.addNewPost(el);
            this.onClick();
          });
        }
      }
    } else if (this.type === 'group') {
      let { content, visibility } = this.formPost.value;
      let downloadURL = '';
      if (this.photoFile) {
        downloadURL = await uploadFile(this.photoFile);
      }
      if (content && visibility) {
        this._postService
          .updatePostGroup(
            this.postContent.getId(),
            content,
            downloadURL,
            visibility.value
          )
          .subscribe((el) => {
            console.log(el);
            this._postCService.findPostGroup(
              this.postContent.getId(),
              content,
              downloadURL,
              visibility.value
            );
            this.onClick();
          });
      }
    } else {
      const roomId = this._route.snapshot.paramMap.get('id') ?? 'defaultRoomId';
      let { content } = this.formPost.value;
      if (content) {
        this._postService
          .createComment(this._userService.getUserId(), roomId, content)
          .subscribe((el) => {
            this._commentService.addComment(
              new Comment(
                el.comment.id,
                new UserDemo(
                  el.comment.userss.id,
                  el.comment.userss.username,
                  el.comment.userss.gender,
                  el.comment.userss.profile_picture
                ),
                el.comment.content,
                el.comment.likes_count
              )
            );
            this.onClick();
          });
      }
    }
  }

  photoFile: File | null = null;
  imagePreviewUrl: string | null = null;

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];

      // Validar que sea una imagen
      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
      ];
      if (!allowedTypes.includes(file.type)) {
        alert('Por favor, sube solo imágenes (JPEG, PNG, GIF, WEBP)');
        fileInput.value = ''; // Limpiar el input
        return;
      }

      // Validar tamaño de imagen (opcional, ejemplo: máximo 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert('La imagen no debe superar los 5MB');
        fileInput.value = '';
        return;
      }

      this.photoFile = file;

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imagePreviewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.photoFile = null;
    this.imagePreviewUrl = null;

    // Limpiar el input de archivo
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger',
  ];
  set = 'twitter';
  emojiButtonElement: ElementRef | null = null;

  @ViewChild('emojiButton', { static: true })
  set setEmojiButtonElement(element: ElementRef) {
    this.emojiButtonElement = element;
  }

  emojiPickerContainerElement: ElementRef | null = null;

  @ViewChild('emojiPickerContainer', { static: true })
  set setEmojiPickerContainerElement(element: ElementRef) {
    this.emojiPickerContainerElement = element;
  }
  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;

    // Obtener la posición del botón de emoji
    const emojiButtonRect =
      this.emojiButtonElement?.nativeElement.getBoundingClientRect();

    // Establecer la posición del selector de emojis
    this.emojiPickerContainerElement!.nativeElement.style.left = `${emojiButtonRect.left}px`;
    this.emojiPickerContainerElement!.nativeElement.style.top = `${
      emojiButtonRect.bottom + 10
    }px`;
  }
  message = '';
  addEmoji(event: any) {
    console.log(this.message);
    const { message } = this;
    console.log(message);
    console.log(`${event.emoji.native}`);
    const text = `${message}${event.emoji.native}`;

    this.message = text;
    // this.showEmojiPicker = false;
  }
  onEnter(event: any): void {
    event.preventDefault(); // Previene que el formulario se envíe o se cierre
  }
}

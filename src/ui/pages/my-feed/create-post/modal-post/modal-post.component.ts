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
import { PostCService } from '../../services/post.service';

@Component({
  selector: 'app-modal-post',
  standalone: true,
  imports: [
    DialogModule,
    DropdownModule,
    SelectButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './modal-post.component.html',
  styleUrl: './modal-post.component.css',
})
export class ModalPostComponent implements OnInit {
  formPost!: FormGroup;
  @Output() clickEvent = new EventEmitter<void>(); // Evento de clic
  @Input() myUser!: UserDemo;
  userPreferences$!: Observable<any>;
  addPost$!: Observable<any>;
  userPreferences!: UserPreference[];
  paymentOptions: any[] = [
    { name: 'Publico', value: 'public' },
    { name: 'Solo amigos', value: 'friends' },
    { name: 'Privado', value: 'private' },
  ];
  //
  constructor(
    private _userPreferences: UserPreferenceService,
    private _postService: PostService,
    private _formBuilder: FormBuilder,
    private _postCService: PostCService
  ) {
    this.formPost = this._formBuilder.group({
      content: ['', [Validators.required]],
      topic_id: ['', [Validators.required]],
      visibility: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.userPreferences$ = this._userPreferences.getMyUserPreferences(
      this.myUser.getUserId()
    );

    this.userPreferences$.subscribe((el) => {
      this.userPreferences = el;
    });
  }

  // Método para manejar el clic
  onClick() {
    // Previene el clic si el botón está deshabilitado
    this.clickEvent.emit();
  }

  addPost() {
    if (this.formPost.valid) {
      let { content, visibility, topic_id } = this.formPost.value;
      let aux = topic_id.id;
      let aux2 = visibility.value;
      let payload: IPost = {
        user_id: this.myUser.getUserId(),
        content,
        visibility: aux2,
        user_preference_id: aux,
      };

      this._postService.newPost(payload).subscribe((el) => {
        this._postCService.addNewPost(el);
        this.onClick();
      });
    }
  }
}

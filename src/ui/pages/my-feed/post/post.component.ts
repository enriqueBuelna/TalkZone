import { Component, DestroyRef, EventEmitter, HostListener, Input, OnInit, Output, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Post } from '../../../../domain/models/post.model';
import { UserService } from '../../auth/services/user.service';
import { PostService } from '../../../../domain/services/post.service';
import { CommonModule } from '@angular/common';
import { ModalPostComponent } from '../create-post/modal-post/modal-post.component';
import { UserDemo } from '../../../../domain/models/user-demo.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PostCService } from '../services/post.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink, CommonModule, ModalPostComponent, ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  @Input() postContent!: Post;
  @Input() userDemo!: UserDemo;
  userId: string = '';
  isOptionsMenuOpen = false;
  formReport !: FormGroup;
  @Input() type = '';
  @Input() amHost = false;
  constructor(
    private _userService: UserService,
    private _postService: PostService,
    private _router: Router,
    private _formBuilder:FormBuilder,
    private _destroyRef: DestroyRef,
    private _postCService: PostCService,
  ) {
    this.formReport = this._formBuilder.group({
      reason: ['', [Validators.required]],
      details: ['', []]
    })
  }
  giveLike() {
    //conseguir el post_id, el user_id,
    this._postService
      .giveLike(this._userService.getUserId(), this.postContent.getId())
      .subscribe((el) => {
        this.postContent.setLiked();
        if (el) {
          this.postContent.oneLikeMore();
        } else {
          this.postContent.oneLikeLess();
        }
      });
  }

  ngOnInit(): void {
    this.userId = this._userService.getUserId();
  }

  giveComment() {
  }

  goProfile() {
    this._router.navigate([
      'home',
      'profile',
      this.postContent.getUserInfo().getUserId(),
    ]);
  }

  goToPost() {
    this._router.navigate([
      'home',
      'posts',
      'detail_post',
      this.postContent.getId(),
    ]);
  }

  // Listener para clicks globales
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    // Verificar si el click NO está dentro del menú de opciones
    const optionsButton = event.target as HTMLElement;
    const optionsMenu = document.querySelector('.options-dropdown');

    if (
      this.isOptionsMenuOpen &&
      !optionsButton.closest('.options-menu-container') &&
      !optionsMenu?.contains(event.target as Node)
    ) {
      this.isOptionsMenuOpen = false;
    }
  }

  toggleOptionsMenu(event: Event) {
    event.stopPropagation(); // Prevenir propagación
    this.isOptionsMenuOpen = !this.isOptionsMenuOpen;
  }

  publicationEdit = signal(false);
  editPublication() {
    this.publicationEdit.set(!this.publicationEdit());
  }

  publicationDelete = signal(false);

  deletePublication(){
    this.publicationDelete.set(!this.publicationDelete());
  }
  @Output() clickEvent = new EventEmitter<void>(); // Evento de clic

  deleteForReal(){
    this._postService.deletePost(parseInt(this.postContent.getId())).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: el => {
        if(el){
          this._postCService.removePost(this.postContent.getId());
          this.clickEvent.emit();
        }
      },
      error: error => {

      }
    })
  }

  publicationReport = signal(false);
  reportPublication(){
    this.publicationReport.set(!this.publicationReport());
  }

  sendReport(){
    if(this.formReport.valid){
      let {reason, details} = this.formReport.value;
      let reported_user_id = this.postContent.getUserInfo().getUserId();
      let reporter_id = this._userService.getUserId();
      let post_id = this.postContent.getId();

      this._postService.reportPost(reason, details, reported_user_id, reporter_id, post_id).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
        next: el => {
          if(el){
            this.clickEvent.emit();
            this.reportPublication();
          }
        }, 
        error: error => {

        }
      })
    }
  }
}

import { Component, HostListener, Input, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Post } from '../../../../domain/models/post.model';
import { UserService } from '../../auth/services/user.service';
import { PostService } from '../../../../domain/services/post.service';
import { CommonModule } from '@angular/common';
import { ModalPostComponent } from '../create-post/modal-post/modal-post.component';
import { UserDemo } from '../../../../domain/models/user-demo.model';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink, CommonModule, ModalPostComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  @Input() postContent!: Post;
  @Input() userDemo!: UserDemo;
  userId: string = '';
  isOptionsMenuOpen = false;
  @Input() type = '';
  @Input() amHost = false;
  constructor(
    private _userService: UserService,
    private _postService: PostService,
    private _router: Router
  ) {}
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
    console.log(this.postContent.getTypeCommunity());
  }

  giveComment() {
    console.log('LIKE');
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
}

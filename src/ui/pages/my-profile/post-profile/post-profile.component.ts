import { Component, Input, signal } from '@angular/core';
import { PostService } from '../../../../domain/services/post.service';
import { Post } from '../../../../domain/models/post.model';
import { Observable } from 'rxjs';
import { PostCService } from '../../my-feed/services/post.service';
import { UserService } from '../../auth/services/user.service';
import { PostComponent } from '../../my-feed/post/post.component';
import { UserDemo } from '../../../../domain/models/user-demo.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../utils/button/button.component';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-post-profile',
  standalone: true,
  imports: [
    PostComponent,
    CommonModule,
    ButtonComponent,
    SkeletonModule,
    ToastModule,
  ],
  templateUrl: './post-profile.component.html',
  providers: [MessageService],
  styleUrl: './post-profile.component.css',
})
export class PostProfileComponent {
  @Input() myUser!: UserDemo;
  allPost = signal<Post[]>([]);
  postObservableAll!: Observable<any>;
  hasMorePosts = true;
  forAll = signal(false);
  @Input() user_id!: string;
  @Input() access!: boolean;
  page: number = 1;
  rule = 'all';
  yetNo = signal(true);
  constructor(
    private _postService: PostService,
    private _postCService: PostCService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _messageService: MessageService
  ) {}
  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      this.firstThing();
    });
  }

  firstThing() {
    this._postCService.setPost([]);
    this.allPost = this._postCService.getPosts();
    this.loadPosts();
  }

  loadPosts() {
    if (this.forAll() && this.rule === 'like') {
      this._postCService.setPost([]);
    } else if (!this.forAll() && this.rule === 'all') {
      this._postCService.setPost([]);
    }
    if (this.forAll()) {
      this.postObservableAll = this._postService.getPostLike(
        this._userService.getUserId(),
        this.page
      );

      this.postObservableAll.subscribe((posts) => {
        this.yetNo.set(false);
        if (posts.length === 10) {
          this.hasMorePosts = true;
        } else {
          this.hasMorePosts = false;
        }
        if (posts.length > 0) {
          this._postCService.addPosts(posts);
        } else {
          this.hasMorePosts = false; // No hay más publicaciones
        }
      });
    } else {
      const roomId =
        this._route.snapshot.paramMap.get('user_id') ?? 'defaultRoomId';
      this.postObservableAll = this._postService.getYourPost(
        roomId,
        this.page,
        this._userService.getUserId()
      );

      this.postObservableAll.subscribe((posts) => {
        this.yetNo.set(false);
        if (posts.length === 10) {
          this.hasMorePosts = true;
        } else {
          this.hasMorePosts = false;
        }
        if (posts.length > 0) {
          this._postCService.addPosts(posts);
        } else {
          this.hasMorePosts = false; // No hay más publicaciones
        }
      });
    }
  }
  loadMore() {
    this.page += 1;
    this.loadPosts();
  }

  changePublication(opt: string) {
    this.rule = opt;
    this.forAll.set(!this.forAll());
    this.page = 1;
    this.loadPosts();
  }

  showMessage() {
    this._messageService.add({
      severity: 'success',
      summary: 'Exito',
      detail: 'La publicacion se ha elminiado correctamente',
    });
  }
}

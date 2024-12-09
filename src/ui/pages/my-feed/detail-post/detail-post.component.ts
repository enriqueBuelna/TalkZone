import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../../utils/header/header.component';
import { PostComponent } from '../post/post.component';
import { CommentComponent } from './comment/comment.component';
import { CreatePostComponent } from '../create-post/create-post.component';
import { Observable } from 'rxjs';
import { Post } from '../../../../domain/models/post.model';
import { UserDemo } from '../../../../domain/models/user-demo.model';
import { PostService } from '../../../../domain/services/post.service';
import { UserService } from '../../auth/services/user.service';
import { MyUserInformation } from '../services/information_user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsCService } from '../services/comment.service';
import { Comment } from '../../../../domain/models/comment.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
@Component({
  selector: 'app-detail-post',
  standalone: true,
  imports: [
    HeaderComponent,
    PostComponent,
    CommentComponent,
    CreatePostComponent,
    ProgressSpinnerModule
  ],
  templateUrl: './detail-post.component.html',
  styleUrl: './detail-post.component.css',
})
export class DetailPostComponent implements OnInit {
  myUserInformation = signal<UserDemo>(new UserDemo('', '', '', ''));
  postObservable!: Observable<any>;
  post!: Post;
  comments = signal<Comment[]>([]);

  constructor(
    private _myUserInformation: MyUserInformation,
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _userService: UserService,
    public _commentService: CommentsCService,
    private _router: Router
  ) {}
  yetNo = signal(true);
  postNotFound = signal(false);
  ngOnInit(): void {
    this.myUserInformation = this._myUserInformation.getMyUserInformation();
    const postId = this._route.snapshot.paramMap.get('id') ?? 'defaultRoomId';
    this.postObservable = this._postService.getPostById(
      postId,
      this._userService.getUserId()
    );

    this.postObservable.subscribe({
      next: (el) => {
        if (el) {
          this.yetNo.set(false);
          this.postNotFound.set(false);
          this.post = el;
          this._commentService.setComment(this.post.getComment());
        }else{
          this.postNotFound.set(true);
          this.yetNo.set(false);
        }
      },
      error: (error) => {},
    });
  }

  goToHome() {
    this._router.navigate(['home', 'posts']);
  }
}

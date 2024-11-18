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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-post',
  standalone: true,
  imports: [
    HeaderComponent,
    PostComponent,
    CommentComponent,
    CreatePostComponent,
  ],
  templateUrl: './detail-post.component.html',
  styleUrl: './detail-post.component.css',
})
export class DetailPostComponent implements OnInit {
  myUserInformation = signal<UserDemo>(new UserDemo('', '', '', ''));
  postObservable!: Observable<any>;
  post!: Post;

  constructor(
    private _myUserInformation: MyUserInformation,
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this.myUserInformation = this._myUserInformation.getMyUserInformation();

    const postId = this._route.snapshot.paramMap.get('id') ?? 'defaultRoomId';
    this.postObservable = this._postService.getPostById(postId);

    this.postObservable.subscribe((el) => {
      this.post = el;
    });
  }
}

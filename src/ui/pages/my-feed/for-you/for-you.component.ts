import { Component, OnInit, signal } from '@angular/core';
import { ChoosePostComponent } from '../choose-post/choose-post.component';
import { HeaderComponent } from '../../../utils/header/header.component';
import { CreatePostComponent } from '../create-post/create-post.component';
import { PostComponent } from '../post/post.component';
import { UserDemo } from '../../../../domain/models/user-demo.model';
import { MyUserInformation } from '../services/information_user.service';
import { PostService } from '../../../../domain/services/post.service';
import { Observable } from 'rxjs';
import { Post } from '../../../../domain/models/post.model';
import { UserService } from '../../auth/services/user.service';
import { PostCService } from '../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-for-you',
  standalone: true,
  imports: [
    ChoosePostComponent,
    HeaderComponent,
    CreatePostComponent,
    PostComponent,
  ],
  templateUrl: './for-you.component.html',
  styleUrl: './for-you.component.css',
})
export class ForYouComponent implements OnInit {
  myUserInformation = signal<UserDemo>(new UserDemo('', '', '', ''));
  postObservableAll!: Observable<any>;
  postObservableFriends!: Observable<any>;
  allPost = signal<Post[]>([]);
  forAll = signal(true);
  page: number = 1;
  hasMorePosts: boolean = true;
  constructor(
    private _myUserInformation: MyUserInformation,
    private _postService: PostService,
    private _userService: UserService,
    private _postCService: PostCService,
    private _router: Router
  ) {
    this.myUserInformation = this._myUserInformation.getMyUserInformation();
  }

  ngOnInit(): void {
    this._postCService.setPost([]);
    this.allPost = this._postCService.getPosts();
    this.loadPosts();
  }

  loadPosts() {
    if (this.forAll()) {
      this.postObservableAll = this._postService.getForYouPost(
        this._userService.getUserId(),
        this.page,
        this._userService.getUserId()
      );

      this.postObservableAll.subscribe((posts) => {
        console.log(posts);
        if (posts.length > 0) {
          this._postCService.addPosts(posts);
        } else {
          this.hasMorePosts = false; // No hay más publicaciones
        }
      });
    } else {
      this.postObservableAll = this._postService.getPostFriends(
        this._userService.getUserId(),
        this.page
      );

      this.postObservableAll.subscribe((posts) => {
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

  changePost(option: boolean) {
    this.forAll.set(option);
    this.page = 1;
    this._postCService.setPost([]);
    this.hasMorePosts = true;
    this.loadPosts();
  }

  goToProfile() {
    this._router.navigate(['home', 'profile', this._userService.getUserId()]);
  }

  goToConnect() {
    this._router.navigate(['home', 'connect']);
  }
}

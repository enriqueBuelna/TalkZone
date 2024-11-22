import { Component, signal } from '@angular/core';
import { HeaderComponent } from "../../../utils/header/header.component";
import { Observable } from 'rxjs';
import { Post } from '../../../../domain/models/post.model';
import { UserDemo } from '../../../../domain/models/user-demo.model';
import { PostService } from '../../../../domain/services/post.service';
import { UserService } from '../../auth/services/user.service';
import { MyUserInformation } from '../../my-feed/services/information_user.service';
import { PostCService } from '../../my-feed/services/post.service';
import { PostComponent } from "../../my-feed/post/post.component";

@Component({
  selector: 'app-my-feed',
  standalone: true,
  imports: [HeaderComponent, PostComponent],
  templateUrl: './my-feed.component.html',
  styleUrl: './my-feed.component.css'
})
export class MyFeedGroupComponent {
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
    private _postCService: PostCService
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
      this.postObservableAll = this._postService.getAllPostGroup(
        this._userService.getUserId(),
        this.page
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
    this._postCService.setPost([])
    this.hasMorePosts = true;
    this.loadPosts();
  }
}

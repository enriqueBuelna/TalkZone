import { Component, Input, signal } from '@angular/core';
import { PostService } from '../../../../domain/services/post.service';
import { Post } from '../../../../domain/models/post.model';
import { Observable } from 'rxjs';
import { PostCService } from '../../my-feed/services/post.service';
import { UserService } from '../../auth/services/user.service';
import { PostComponent } from "../../my-feed/post/post.component";
import { UserDemo } from '../../../../domain/models/user-demo.model';

@Component({
  selector: 'app-post-profile',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './post-profile.component.html',
  styleUrl: './post-profile.component.css',
})
export class PostProfileComponent {
  allPost = signal<Post[]>([]);
  postObservableAll!: Observable<any>;
  hasMorePosts = true;
  forAll = signal(true);
  page: number = 1;
  constructor(
    private _postService: PostService,
    private _postCService: PostCService,
    private _userService: UserService
  ) {}
  ngOnInit(): void {
    this._postCService.setPost([]);
    this.allPost = this._postCService.getPosts();
    this.loadPosts();
  }

  loadPosts() {
    if (this.forAll()) {
      this.postObservableAll = this._postService.getForYouPost(
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
}

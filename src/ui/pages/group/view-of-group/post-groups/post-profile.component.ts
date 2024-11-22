import { Component, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../../../../domain/models/post.model';
import { PostService } from '../../../../../domain/services/post.service';
import { UserService } from '../../../auth/services/user.service';
import { PostComponent } from '../../../my-feed/post/post.component';
import { PostCService } from '../../../my-feed/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-profile-group',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './post-profile.component.html',
  styleUrl: './post-profile.component.css',
})
export class PostProfileGroupComponent {
  allPost = signal<Post[]>([]);
  postObservableAll!: Observable<any>;
  hasMorePosts = true;
  forAll = signal(true);
  page: number = 1;
  constructor(
    private _postService: PostService,
    private _postCService: PostCService,
    private _userService: UserService,
    private _route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._postCService.setPost([]);
    this.allPost = this._postCService.getPosts();
    this.loadPosts();
  }

  loadPosts() {
    console.log('Chivones');
    const roomId = this._route.snapshot.paramMap.get('id') ?? 'defaultRoomId';
    if (this.forAll()) {
      this.postObservableAll = this._postService.getPostGroup(
        roomId,
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
    }
  }
  loadMore() {
    this.page += 1;
    this.loadPosts();
  }
}

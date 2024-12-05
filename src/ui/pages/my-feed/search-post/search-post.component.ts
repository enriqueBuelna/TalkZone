import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../../utils/header/header.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PostCService } from '../services/post.service';
import { Observable } from 'rxjs';
import { Post } from '../../../../domain/models/post.model';
import { PostService } from '../../../../domain/services/post.service';
import { UserService } from '../../auth/services/user.service';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-search-post',
  standalone: true,
  imports: [HeaderComponent, PostComponent],
  templateUrl: './search-post.component.html',
  styleUrl: './search-post.component.css',
})
export class SearchPostComponent implements OnInit {
  constructor(
    private _router: Router,
    private _postCService: PostCService,
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute
  ) {}
  postObservableAll!: Observable<any>;
  postObservableFriends!: Observable<any>;
  allPost = signal<Post[]>([]);
  goToHome() {
    this._router.navigate(['home', 'posts']);
  }

  page = 1;
  post_content = signal('');
  ngOnInit(): void {
    this.allPost = this._postCService.getPosts();
    this._route.paramMap.subscribe((params) => {
      this.post_content.set(params.get('post_content') || '');
      this.loadPosts();
      this._postCService.setPost([]);
    });
  }
  hasMorePosts = true;
  loadPosts() {
    this.postObservableAll = this._postService.searchPost(
      this._userService.getUserId(),
      this.page,
      this.post_content()
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

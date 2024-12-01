import { Component, Input, signal } from '@angular/core';
import { PostService } from '../../../../domain/services/post.service';
import { Post } from '../../../../domain/models/post.model';
import { Observable } from 'rxjs';
import { PostCService } from '../../my-feed/services/post.service';
import { UserService } from '../../auth/services/user.service';
import { PostComponent } from "../../my-feed/post/post.component";
import { UserDemo } from '../../../../domain/models/user-demo.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-profile',
  standalone: true,
  imports: [PostComponent,CommonModule],
  templateUrl: './post-profile.component.html',
  styleUrl: './post-profile.component.css',
})
export class PostProfileComponent {
  @Input() myUser!: UserDemo;
  allPost = signal<Post[]>([]);
  postObservableAll!: Observable<any>;
  hasMorePosts = true;
  forAll = signal(true);
  @Input() user_id !:string;
  page: number = 1;
  rule = 'all';
  constructor(
    private _postService: PostService,
    private _postCService: PostCService,
    private _userService: UserService,
    private _route:ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._postCService.setPost([]);
    this.allPost = this._postCService.getPosts();
    this.loadPosts();
  }

  loadPosts() {
    const roomId =
      this._route.snapshot.paramMap.get('user_id') ?? 'defaultRoomId';
    if(this.user_id){
      this.forAll.set(false);
    }
    if (this.forAll()) {
      this.postObservableAll = this._postService.getForYouPost(
        this._userService.getUserId(),
        this.page,
        this._userService.getUserId()
      );

      this.postObservableAll.subscribe((posts) => {
        
        if (posts.length > 0) {
          this._postCService.addPosts(posts);
        } else {
          this.hasMorePosts = false; // No hay más publicaciones
        }
      });
    }else{
      this.postObservableAll = this._postService.getYourPost(
        roomId,
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
    }
  }
  loadMore() {
    this.page += 1;
    this.loadPosts();
  }

  changePublication(opt:string){
    this.rule = opt;
  }
}

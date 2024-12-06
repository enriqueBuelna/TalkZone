import { Component, Input, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../../../../domain/models/post.model';
import { PostService } from '../../../../../domain/services/post.service';
import { UserService } from '../../../auth/services/user.service';
import { PostComponent } from '../../../my-feed/post/post.component';
import { PostCService } from '../../../my-feed/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDemo } from '../../../../../domain/models/user-demo.model';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonComponent } from "../../../../utils/button/button.component";

@Component({
  selector: 'app-post-profile-group',
  standalone: true,
  imports: [PostComponent, SkeletonModule, ButtonComponent],
  templateUrl: './post-profile.component.html',
  styleUrl: './post-profile.component.css',
})
export class PostProfileGroupComponent {
  allPost = signal<Post[]>([]);
  postObservableAll!: Observable<any>;
  @Input() userDemo!:UserDemo;
  hasMorePosts = true;
  forAll = signal(true);
  page: number = 1;
  @Input() hostGroupMember!:string;
  imHost = false;
  yetNo = signal(true);
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
    if(this.hostGroupMember === this._userService.getUserId()){
      this.imHost = true;
    }
  }

  loadPosts() {
    const roomId = this._route.snapshot.paramMap.get('id') ?? 'defaultRoomId';
    if (this.forAll()) {
      this.postObservableAll = this._postService.getPostGroup(
        roomId,
        this.page,
        this._userService.getUserId()
      );

      this.postObservableAll.subscribe((posts) => {
        this.yetNo.set(false);
        if(posts.length === 10){
          this.hasMorePosts = true;
        }else{
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
}

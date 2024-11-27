import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Post } from '../../../../domain/models/post.model';
import { UserService } from '../../auth/services/user.service';
import { PostService } from '../../../../domain/services/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit{
  @Input() postContent!: Post;
  userId : string = '';
  constructor(
    private _userService: UserService,
    private _postService: PostService,
    private _router: Router
  ) {}
  giveLike() {
    //conseguir el post_id, el user_id,
    this._postService
      .giveLike(this._userService.getUserId(), this.postContent.getId())
      .subscribe((el) => {
        this.postContent.setLiked();
        if (el) {
          this.postContent.oneLikeMore();
        } else {
          this.postContent.oneLikeLess();
        }
      });
  }

  ngOnInit(): void {
    this.userId = this._userService.getUserId();
  }

  giveComment() {
    console.log('LIKE');
  }

  goProfile() {
    this._router.navigate([
      'home',
      'profile',
      this.postContent.getUserInfo().getUserId(),
    ]);
  }

  goToPost() {
    this._router.navigate([
      'home',
      'posts',
      'detail_post',
      this.postContent.getId(),
    ]);
  }
}

import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../../../domain/models/post.model';
import { UserService } from '../../auth/services/user.service';
import { PostService } from '../../../../domain/services/post.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  @Input() postContent!: Post;

  constructor(
    private _userService: UserService,
    private _postService: PostService
  ) {}
  giveLike() {
    //conseguir el post_id, el user_id,
    this._postService
      .giveLike(this._userService.getUserId(), this.postContent.getId())
      .subscribe((el) => console.log(el));
  }

  giveComment() {
    console.log('LIKE');
  }
}

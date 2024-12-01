import { Injectable, signal } from '@angular/core';
import { Post } from '../../../../domain/models/post.model';
import { Comment } from '../../../../domain/models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentsCService {
  Comments = signal<Comment[]>([]);

  setComment(m: Comment[] | undefined) {
    if (m) {
      this.Comments.set(m);
    }else{
        this.Comments.set([]);
    }
  }

  getComments() {
    return this.Comments();
  }

  addNewComment(m: Comment) {
    this.Comments.update((a) => [m, ...a]);
  }

  addComment(Comment: Comment) {
    this.Comments.update((pst) => [...pst, Comment]);
  }
}

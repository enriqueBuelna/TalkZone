import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRepository } from '../../repositories/post.repository';

@Injectable({
  providedIn: 'root',
})
export class GiveLike {
  constructor(private postRepository: PostRepository) {}

  execute(
    user_id: string,
    post_id: string,
    comment_id?: string
  ): Observable<boolean> {
    return this.postRepository.giveLike(user_id, post_id, comment_id);
  }
}

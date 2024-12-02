import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRepository } from '../../repositories/post.repository';
import { IPost } from '../../entities/post/post.entitie';
import { Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class GetPostLike {
  constructor(private postRepository: PostRepository) {}

  execute(user_id: string, page: number): Observable<Post[]> {
    return this.postRepository.getPostLike(user_id, page);
  }
}

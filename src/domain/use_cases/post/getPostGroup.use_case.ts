import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRepository } from '../../repositories/post.repository';
import { Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class GetPostGroup {
  constructor(private postRepository: PostRepository) {}

  execute(community_id: string, page:number, user_id: string): Observable<Post[]> {
    return this.postRepository.getPostGroup(community_id, page, user_id);
  }
}

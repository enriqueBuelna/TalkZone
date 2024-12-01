import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRepository } from '../../repositories/post.repository';
import { IPost } from '../../entities/post/post.entitie';
import { Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class UpdatePostGroup {
  constructor(private postRepository: PostRepository) {}

  execute(
    id: string,
    content: string,
    media_url: string,
    visibility: string,
  ): Observable<boolean> {
    return this.postRepository.updatePostGroup(
      id,
      content,
      media_url,
      visibility,
    );
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRepository } from '../../repositories/post.repository';
import { IPost } from '../../entities/post/post.entitie';
import { Post } from '../../models/post.model';
import { Tag } from '../../models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class UpdatePost {
  constructor(private postRepository: PostRepository) {}

  execute(
    id: string,
    content: string,
    media_url: string,
    visibility: string,
    topic_id: string,
    tags:string[]
  ): Observable<Tag[]> {
    return this.postRepository.updatePost(
      id,
      content,
      media_url,
      visibility,
      topic_id,
      tags
    );
  }
}

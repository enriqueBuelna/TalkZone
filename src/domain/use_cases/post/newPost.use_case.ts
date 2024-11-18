import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRepository } from '../../repositories/post.repository';
import { IPost } from '../../entities/post/post.entitie';
import { Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class NewPost {
  constructor(private postRepository:PostRepository) {}

  execute(info:IPost): Observable<Post> {
    return this.postRepository.newPost(info);
  }
}

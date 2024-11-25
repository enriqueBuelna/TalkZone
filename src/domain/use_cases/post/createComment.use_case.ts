import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRepository } from '../../repositories/post.repository';
import { IPost } from '../../entities/post/post.entitie';
import { Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class CreateComment {
  constructor(private postRepository: PostRepository) {}

  execute(user_id:string, post_id:string, content: string):Observable<any>{
    return this.postRepository.createComment(user_id, post_id, content);
  }
}
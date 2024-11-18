import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRepository } from '../../repositories/post.repository';
import { IPost } from '../../entities/post/post.entitie';
import { Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class GetPostById {
  constructor(private postRepository:PostRepository) {}

  execute(id:string):Observable<Post>{
    return this.postRepository.getPostById(id);
  }
}

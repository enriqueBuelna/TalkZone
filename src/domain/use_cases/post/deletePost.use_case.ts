import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRepository } from '../../repositories/post.repository';

@Injectable({
  providedIn: 'root',
})
export class DeletePost {
  constructor(private postRepository: PostRepository) {}

  execute(id:number):Observable<boolean>{
    return this.postRepository.deletePost(id);
  }
}
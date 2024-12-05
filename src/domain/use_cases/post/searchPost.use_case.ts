import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRepository } from '../../repositories/post.repository';
import { IPost } from '../../entities/post/post.entitie';
import { Post } from '../../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class SearchPost {
  constructor(private postRepository:PostRepository) {}

  execute(user_id:string, page:number, post_content:string):Observable<Post[]>{
    return this.postRepository.searchPost(user_id, page, post_content);
  }
}

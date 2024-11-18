import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewPost } from '../use_cases/post/newPost.use_case';
import { IPost } from '../entities/post/post.entitie';
import { Post } from '../models/post.model';
import { GetForYouPost } from '../use_cases/post/getForYouPost.use_case';
import { GetPostById } from '../use_cases/post/getPostById.use_case';
import { GetPostFriends } from '../use_cases/post/getPostFriends.use_case';
import { GetYourPost } from '../use_cases/post/getMyPost.use_case';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private _newPost: NewPost,
    private _getForYouPost: GetForYouPost,
    private _getPostById: GetPostById,
    private _getPostFriends: GetPostFriends,
    private _getYourPost: GetYourPost
  ) {}

  newPost(infoPost: IPost): Observable<Post> {
    return this._newPost.execute(infoPost);
  }

  getForYouPost(user_id: string, page: number): Observable<Post[]> {
    return this._getForYouPost.execute(user_id, page);
  }

  getPostById(id: string): Observable<Post> {
    return this._getPostById.execute(id);
  }

  getPostFriends(user_id: string, page: number): Observable<Post[]> {
    return this._getPostFriends.execute(user_id, page);
  }

  getYourPost(user_id: string, page: number): Observable<Post[]> {
    return this._getYourPost.execute(user_id, page);
  }
}

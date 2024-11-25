import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewPost } from '../use_cases/post/newPost.use_case';
import { IPost } from '../entities/post/post.entitie';
import { Post } from '../models/post.model';
import { GetForYouPost } from '../use_cases/post/getForYouPost.use_case';
import { GetPostById } from '../use_cases/post/getPostById.use_case';
import { GetPostFriends } from '../use_cases/post/getPostFriends.use_case';
import { GetYourPost } from '../use_cases/post/getMyPost.use_case';
import { GiveLike } from '../use_cases/post/giveLike.use_case';
import { GetPostGroup } from '../use_cases/post/getPostGroup.use_case';
import { GetAllPostGroup } from '../use_cases/post/getAllPostGroup.use_case';
import { CreateComment } from '../use_cases/post/createComment.use_case';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private _newPost: NewPost,
    private _getForYouPost: GetForYouPost,
    private _getPostById: GetPostById,
    private _getPostFriends: GetPostFriends,
    private _getYourPost: GetYourPost,
    private _giveLike: GiveLike,
    private _getPostGroup: GetPostGroup,
    private _getAllPostGroup: GetAllPostGroup,
    private _createComment:CreateComment
  ) {}

  getAllPostGroup(user_id: string, page: number): Observable<Post[]> {
    return this._getAllPostGroup.execute(user_id, page);
  }

  getPostGroup(community_id: string, page: number): Observable<Post[]> {
    return this._getPostGroup.execute(community_id, page);
  }

  newPost(infoPost: IPost): Observable<Post> {
    return this._newPost.execute(infoPost);
  }

  getForYouPost(user_id: string, page: number): Observable<Post[]> {
    return this._getForYouPost.execute(user_id, page);
  }

  getPostById(id: string, user_id:string): Observable<Post> {
    return this._getPostById.execute(id, user_id);
  }

  getPostFriends(user_id: string, page: number): Observable<Post[]> {
    return this._getPostFriends.execute(user_id, page);
  }

  getYourPost(user_id: string, page: number): Observable<Post[]> {
    return this._getYourPost.execute(user_id, page);
  }

  giveLike(
    user_id: string,
    post_id: string,
    comment_id?: string
  ): Observable<boolean> {
    return this._giveLike.execute(user_id, post_id, comment_id);
  }

  createComment(user_id:string, post_id:string, content:string):Observable<any>{
    return this._createComment.execute(user_id, post_id, content);
  }
}
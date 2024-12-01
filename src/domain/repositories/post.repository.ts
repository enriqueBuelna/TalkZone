import { Observable } from 'rxjs';
import { IPost } from '../entities/post/post.entitie';
import { Post } from '../models/post.model';
export abstract class PostRepository {
  abstract newPost(info: IPost): Observable<Post>;
  abstract getForYouPost(user_id: string, page: number, other_user_id:string): Observable<Post[]>;
  abstract getPostById(id: string, user_id: string): Observable<Post>;
  abstract getPostFriends(user_id: string, page: number): Observable<Post[]>;
  abstract getYourPost(user_id: string, page: number, other_user_id:string): Observable<Post[]>;
  abstract giveLike(
    user_id: string,
    post_id: string,
    comment_id?: string
  ): Observable<boolean>;
  abstract getPostGroup(community_id: string, page: number, user_id:string): Observable<Post[]>;
  abstract getAllPostGroup(user_id: string, page: number): Observable<Post[]>;
  abstract createComment(
    user_id: string,
    post_id: string,
    content: string
  ): Observable<any>;
  abstract updatePost(
    id: string,
    content: string,
    media_url: string,
    visibility: string,
    topic_id: string
  ): Observable<boolean>;
  abstract updatePostGroup(
    id:string, 
    content:string,
    media_url:string,
    visibility:string
  ):Observable<boolean>;
}

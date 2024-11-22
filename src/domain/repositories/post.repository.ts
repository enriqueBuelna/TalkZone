import { Observable } from 'rxjs';
import { IPost } from '../entities/post/post.entitie';
import { Post } from '../models/post.model';
export abstract class PostRepository {
  abstract newPost(info: IPost): Observable<Post>;
  abstract getForYouPost(user_id: string, page: number): Observable<Post[]>;
  abstract getPostById(id: string): Observable<Post>;
  abstract getPostFriends(user_id: string, page: number): Observable<Post[]>;
  abstract getYourPost(user_id: string, page: number): Observable<Post[]>;
  abstract giveLike(
    user_id: string,
    post_id: string,
    comment_id?: string
  ): Observable<boolean>;
  abstract getPostGroup(community_id:string, page:number):Observable<Post[]>;
  abstract getAllPostGroup(user_id:string, page:number):Observable<Post[]>;
}

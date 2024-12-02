import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PostRepository } from '../../domain/repositories/post.repository';
import { IPost } from '../../domain/entities/post/post.entitie';
import { Post } from '../../domain/models/post.model';
import { UserDemo } from '../../domain/models/user-demo.model';
import { UserPreference } from '../../domain/models/user_preference.model';
import { Comment } from '../../domain/models/comment.model';

@Injectable({
  providedIn: 'root',
})
export class RemotePostRespository extends PostRepository {
  override updatePostGroup(
    id: string,
    content: string,
    media_url: string,
    visibility: string
  ): Observable<boolean> {
    const payload = {
      id,
      content,
      media_url,
      visibility,
    };
    return this._http
      .post<boolean>(`${this.API_URL}/posts/updatePostGroup`, payload)
      .pipe(map((el) => el));
  }
  override updatePost(
    id: string,
    content: string,
    media_url: string,
    visibility: string,
    topic_id: string
  ): Observable<boolean> {
    const payload = {
      id,
      content,
      media_url,
      visibility,
      topic_id,
    };

    return this._http
      .post<boolean>(`${this.API_URL}/posts/updatePost`, payload)
      .pipe(map((el) => el));
  }
  override createComment(
    user_id: string,
    post_id: string,
    content: string
  ): Observable<any> {
    const payload = {
      user_id,
      post_id,
      content,
    };
    return this._http
      .post<any>(`${this.API_URL}/comments/createComment`, payload)
      .pipe(map((el) => el));
  }

  getAllPostGroup(user_id: string, page: number): Observable<Post[]> {
    const params = new HttpParams().set('user_id', user_id).set('page', page);
    return this._http
      .get<Post[]>(`${this.API_URL}/communities/getAllPost`, { params })
      .pipe(
        map((posts: any[]) => {
          if (!Array.isArray(posts) || posts.length === 0) {
            return []; // Devuelve un array vacío si no hay publicaciones
          }
          return posts.map((post) => {
            console.log(post);
            return new Post(
              post.id,
              new UserDemo(
                post.post_user.id, // Accede usando los nombres completos de las propiedades en la respuesta
                post.post_user.username,
                post.post_user.gender,
                post.post_user.profile_picture,
                ''
              ),
              post.content,
              post.likes_count,
              post.comments_count,
              post.visibility,
              new UserPreference(
                post.user_preference_id, // Corregido
                post.post_user_preference.topic_id, // Accede usando el nombre completo
                post.post_user_preference.type,
                post.post_user_preference.topic.topic_name
              ),
              post.media_url,
              undefined,
              post.community_id,
              post.type_community,
              post.post_liked,
              post.community_name.communitie_name,
              post.community_name.profile_picture
            );
          });
        })
      );
  }
  getPostGroup(
    community_id: string,
    page: number,
    user_id: string
  ): Observable<Post[]> {
    const params = new HttpParams()
      .set('community_id', community_id)
      .set('page', page)
      .set('user_id', user_id);
    return this._http
      .get<Post[]>(`${this.API_URL}/posts/getPostGroup`, { params })
      .pipe(
        map((posts: any[]) => {
          if (!Array.isArray(posts) || posts.length === 0) {
            return []; // Devuelve un array vacío si no hay publicaciones
          }
          return posts.map((post) => {
            console.log(post);
            return new Post(
              post.id,
              new UserDemo(
                post.post_user.id, // Accede usando los nombres completos de las propiedades en la respuesta
                post.post_user.username,
                post.post_user.gender,
                post.post_user.profile_picture,
                ''
              ),
              post.content,
              post.likes_count,
              post.comments_count,
              post.visibility,
              new UserPreference(
                post.user_preference_id, // Corregido
                post.post_user_preference.topic_id, // Accede usando el nombre completo
                post.post_user_preference.type,
                post.post_user_preference.topic.topic_name
              ),
              post.media_url,
              undefined,
              post.community_id,
              post.type_community,
              post.post_liked
            );
          });
        })
      );
  }
  // override getForYouPost(user_id: string): Observable<Post[]> {
  //   throw new Error('Method not implemented.');
  // }
  private readonly API_URL = 'http://localhost:3000';
  private _http = inject(HttpClient);

  newPost(infoPost: IPost): Observable<Post> {
    return this._http
      .post<Post>(`${this.API_URL}/posts/newPost`, infoPost)
      .pipe(
        map((post: any) => {
          console.log(post);
          return new Post(
            post.id,
            new UserDemo(
              post.post_user.id,
              post.post_user.username,
              post.post_user.gender,
              post.post_user.profile_picture,
              ''
            ),
            post.content,
            post.likes_count,
            post.comments_count,
            post.visibility,
            post.post_user_preference && post.post_user_preference.id
              ? new UserPreference(
                  post.user_preference_id,
                  post.post_user_preference.topic_id,
                  post.post_user_preference.type,
                  post.post_user_preference.topic.topic_name
                )
              : null, // Si es null, se asigna null
            post.media_url,
            undefined,
            post.community_id,
            post.type_community,
            undefined
          );
        })
      );
  }

  getForYouPost(
    user_id: string,
    page: number,
    other_user_id: string
  ): Observable<Post[]> {
    const params = new HttpParams()
      .set('user_id', user_id)
      .set('page', page)
      .set('other_user_id', other_user_id);
    return this._http
      .get<any[]>(`${this.API_URL}/posts/getForYou`, { params })
      .pipe(
        map((posts: any[]) => {
          if (!Array.isArray(posts) || posts.length === 0) {
            return []; // Devuelve un array vacío si no hay publicaciones
          }
          return posts.map((post) => {
            return new Post(
              post.id,
              new UserDemo(
                post.post_user.id, // Accede usando los nombres completos de las propiedades en la respuesta
                post.post_user.username,
                post.post_user.gender,
                post.post_user.profile_picture,
                ''
              ),
              post.content,
              post.likes_count,
              post.comments_count,
              post.visibility,
              new UserPreference(
                post.user_preference_id, // Corregido
                post.post_user_preference.topic_id, // Accede usando el nombre completo
                post.post_user_preference.type,
                post.post_user_preference.topic.topic_name
              ),
              post.media_url,
              undefined,
              undefined,
              undefined,
              post.post_liked
            );
          });
        })
      );
  }

  getPostById(id: string, user_id: string): Observable<Post> {
    const params = new HttpParams().set('id', id).set('user_id', user_id);
    return this._http
      .get<any>(`${this.API_URL}/posts/getPostById`, { params })
      .pipe(
        map((post) => {
          console.log(post);
          return new Post(
            post.id,
            new UserDemo(
              post.post_user.id,
              post.post_user.username,
              post.post_user.gender,
              post.post_user.profile_picture,
              ''
            ),
            post.content,
            post.likes_count,
            post.comments_count,
            post.visibility,
            new UserPreference(
              post.user_preference_id,
              post.post_user_preference.topic_id,
              post.post_user_preference.type,
              post.post_user_preference.topic.topic_name
            ),
            post.media_url,
            (post.comments || []).map(
              (coment: any) =>
                new Comment(
                  coment.id,
                  new UserDemo(
                    coment.userss.id,
                    coment.userss.username,
                    coment.userss.gender,
                    coment.userss.profile_picture,
                    ''
                  ),
                  coment.content,
                  coment.likes_count
                )
            ),
            post.community_id,
            post.type_community,
            post.post_liked,
            post.community_name.communitie_name || '',
            post.community_name.profile_picture || ''
          );
        })
      );
  }

  getPostFriends(user_id: string, page: number): Observable<Post[]> {
    const params = new HttpParams().set('user_id', user_id).set('page', page);
    // Convierte también el userId a string
    return this._http
      .get<any[]>(`${this.API_URL}/posts/getPostFriends`, { params })
      .pipe(
        map((posts: any[]) => {
          if (!Array.isArray(posts) || posts.length === 0) {
            return []; // Devuelve un array vacío si no hay publicaciones
          }
          return posts.map((post) => {
            return new Post(
              post.id,
              new UserDemo(
                post.post_user.id, // Accede usando los nombres completos de las propiedades en la respuesta
                post.post_user.username,
                post.post_user.gender,
                post.post_user.profile_picture,
                ''
              ),
              post.content,
              post.likes_count,
              post.comments_count,
              post.visibility,
              new UserPreference(
                post.user_preference_id, // Corregido
                post.post_user_preference.topic_id, // Accede usando el nombre completo
                post.post_user_preference.type,
                post.post_user_preference.topic.topic_name
              ),
              post.media_url,
              undefined,
              undefined,
              undefined,
              post.post_liked
            );
          });
        })
      );
  }

  getYourPost(
    user_id: string,
    page: number,
    other_user_id: string
  ): Observable<Post[]> {
    const params = new HttpParams()
      .set('user_id', user_id)
      .set('page', page)
      .set('other_user_id', other_user_id);
    return this._http
      .get<Post[]>(`${this.API_URL}/posts/getYourPost`, { params })
      .pipe(
        map((posts: any[]) => {
          if (!Array.isArray(posts) || posts.length === 0) {
            return []; // Devuelve un array vacío si no hay publicaciones
          }
          return posts.map((post) => {
            return new Post(
              post.id,
              new UserDemo(
                post.post_user.id, // Accede usando los nombres completos de las propiedades en la respuesta
                post.post_user.username,
                post.post_user.gender,
                post.post_user.profile_picture,
                ''
              ),
              post.content,
              post.likes_count,
              post.comments_count,
              post.visibility,
              new UserPreference(
                post.user_preference_id, // Corregido
                post.post_user_preference.topic_id, // Accede usando el nombre completo
                post.post_user_preference.type,
                post.post_user_preference.topic.topic_name
              ),
              post.media_url,
              undefined,
              undefined,
              undefined,
              post.post_liked,
              undefined,
              undefined
            );
          });
        })
      );
  }

  giveLike(
    user_id: string,
    post_id: string,
    comment_id?: string
  ): Observable<boolean> {
    const payload = {
      user_id,
      post_id,
      comment_id,
    };
    return this._http.post<boolean>(`${this.API_URL}/like/addLike`, payload);
  }

  override getPostLike(user_id: string, page: number): Observable<Post[]> {
    const params = new HttpParams().set('user_id', user_id).set('page', page);
    return this._http
      .get<any[]>(`${this.API_URL}/posts/getLikePost`, { params })
      .pipe(
        map((posts: any[]) => {
          if (!Array.isArray(posts) || posts.length === 0) {
            return []; // Devuelve un array vacío si no hay publicaciones
          }
          return posts.map((post) => {
            return new Post(
              post.id,
              new UserDemo(
                post.post_user.id, // Accede usando los nombres completos de las propiedades en la respuesta
                post.post_user.username,
                post.post_user.gender,
                post.post_user.profile_picture,
                ''
              ),
              post.content,
              post.likes_count,
              post.comments_count,
              post.visibility,
              new UserPreference(
                post.user_preference_id, // Corregido
                post.post_user_preference.topic_id, // Accede usando el nombre completo
                post.post_user_preference.type,
                post.post_user_preference.topic.topic_name
              ),
              post.media_url,
              undefined,
              undefined,
              undefined,
              post.post_liked,
              undefined,
              undefined
            );
          });
        })
      );
  }
}

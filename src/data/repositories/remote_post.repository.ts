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
  // override getForYouPost(user_id: string): Observable<Post[]> {
  //   throw new Error('Method not implemented.');
  // }
  private readonly API_URL = 'http://localhost:3000/posts';
  private _http = inject(HttpClient);

  newPost(infoPost: IPost): Observable<Post> {
    return this._http.post<Post>(`${this.API_URL}/newPost`, infoPost).pipe(
      map(
        (post: any) =>
          new Post(
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
            post.media_url
          )
      )
    );
  }

  getForYouPost(user_id: string, page: number): Observable<Post[]> {
    const params = new HttpParams().set('user_id', user_id).set('page', page);
    return this._http.get<any[]>(`${this.API_URL}/getForYou`, { params }).pipe(
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
            post.media_url
          );
        });
      })
    );
  }

  getPostById(id: string): Observable<Post> {
    const params = new HttpParams().set('id', id);
    return this._http.get<any>(`${this.API_URL}/getPostById`, { params }).pipe(
      map(
        (post) =>
          new Post(
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
            )
          )
      )
    );
  }

  getPostFriends(user_id: string, page: number): Observable<Post[]> {
    const params = new HttpParams().set('user_id', user_id).set('page', page);
    // Convierte también el userId a string
    return this._http
      .get<any[]>(`${this.API_URL}/getPostFriends`, { params })
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
              post.media_url
            );
          });
        })
      );
  }

  getYourPost(user_id:string, page:number):Observable<Post[]>{
    const params = new HttpParams().set('user_id', user_id).set('page', page);
    return this._http
      .get<any[]>(`${this.API_URL}/getYourPost`, { params })
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
              post.media_url
            );
          });
        })
      );
  }
}

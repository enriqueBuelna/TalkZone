import { Injectable, signal } from '@angular/core';
import { Post } from '../../../../domain/models/post.model';
import { UserPreference } from '../../../../domain/models/user_preference.model';
import { Tag } from '../../../../domain/models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class PostCService {
  posts = signal<Post[]>([]);

  setPost(post: Post[]) {
    this.posts.set(post);
  }

  getPosts() {
    return this.posts;
  }

  addNewPost(post: Post) {
    this.posts.update((pst) => [post, ...pst]);
  }

  addPosts(post: Post[]) {
    this.posts.update((pst) => [...pst, ...post]);
  }

  findPost(post_id: string, content:string, media_url:string = '', visibility:string, topic_id:UserPreference, tags:Tag[]){
    this.posts().find(el => {
      if(el.getId() === post_id){
        el.setContent(content);
        el.setPrivacy(visibility);
        el.setTopic(topic_id);
        if(media_url){
          
        }
        el.setTags(tags);
      }
    })
  }

  findPostGroup(post_id:string, content:string, media_url:string = '', visibility:string){
    this.posts().find(el => {
      if(el.getId() === post_id){
        el.setContent(content);
        el.setTypeCommunity(visibility);

      }
    })
  }
}
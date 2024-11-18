import { Injectable, signal } from '@angular/core';
import { Post } from '../../../../domain/models/post.model';

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
}

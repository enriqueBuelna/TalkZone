import { UserPreference } from '../user_preference.model';

export class DetailUser {
  private cant_posts = 0;
  private cant_comm = 0;
  private cant_followed = 0;
  private cant_followers = 0;
  private cant_vr = 0;
  private cant_likes_gived = 0;
  private cant_likes_received = 0;
  private themes: UserPreference[] = [];
  private username = '';

  constructor(
    cant_posts: number,
    cant_comm: number,
    cant_followed: number,
    cant_followers: number,
    cant_vr: number,
    cant_likes_gived: number,
    cant_likes_received: number,
    themes: UserPreference[],
    username: ''
  ) {
    this.cant_posts = cant_posts;
    this.cant_comm = cant_comm;
    this.cant_followers = cant_followers;
    this.cant_likes_gived = cant_likes_gived;
    this.cant_vr = cant_vr;
    this.cant_followed = cant_followed;
    this.cant_likes_received = cant_likes_received;
    this.themes = themes;
    this.username = username;
  }

  getCantVr(){
    return this.cant_vr;
  }

  getUsername(){
    return this.username;
  }

  getThemes(){
    return this.themes;
  }

  getLikesReceived(){
    return this.cant_likes_received;
  }

  getLikesGived(){
    return this.cant_likes_gived;
  }

  getFollowed(){
    return this.cant_followed;
  }

  getFollowers(){
    return this.cant_followers;
  }

  getPosts(){
    return this.cant_posts;
  }

  getComments(){
    return this.cant_comm;
  }
}

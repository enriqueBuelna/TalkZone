import { ITopic } from '../entities/topics/topic.interface';
import { Message } from './message.model';
import { UserDemo } from './user-demo.model';
import { UserPreference } from './user_preference.model';

export class Comment {
  private id: number;
  private userInfo: UserDemo;
  private content: string;
  private cant_likes: number;
  private cant_comm?: number;
  private media_url?: string;

  constructor(
    id: number,
    userInfo: UserDemo,
    content: string,
    cant_likes: number,
    cant_comm?: number,
    media_url?: string
  ) {
    this.id = id;
    this.userInfo = userInfo;
    this.content = content;
    this.cant_likes = cant_likes;
    this.cant_comm = cant_comm;
    this.media_url = media_url;
  }

  getId(){
    return this.id;
  }
  
  getUserInfo(){
    return this.userInfo;
  }

  getContent(){
    return this.content;
  }

  getCantLikes(){
    return this.cant_likes;
  }

  getCantComments(){
    return this.cant_comm;
  }

  getMediaUrl(){
    return this.media_url;
  }
}
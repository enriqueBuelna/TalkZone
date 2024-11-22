import { UserDemo } from './user-demo.model';
import { UserPreference } from './user_preference.model';
import { Comment } from './comment.model';
export class Post {
  private id: string;
  private userInfo: UserDemo;
  private content: string;
  private cant_likes: number;
  private cant_comm: number;
  private privacy: string;
  private userPreference: UserPreference | null;
  private media_url: string;
  private comments?: Comment[];
  private commnuity_id?: string;
  private type_community?: string;

  constructor(
    id: string,
    userInfo: UserDemo,
    content: string,
    cant_likes: number,
    cant_comm: number,
    privacy: string,
    userPreference: UserPreference | null,
    media_url: string,
    comments?: Comment[],
    community_id?: string,
    type_community?: string
  ) {
    this.id = id;
    this.userInfo = userInfo;
    this.content = content;
    this.cant_likes = cant_likes;
    this.cant_comm = cant_comm;
    this.privacy = privacy;
    this.userPreference = userPreference;
    this.media_url = media_url;
    this.comments = comments;
    this.commnuity_id = community_id;
    this.type_community = type_community;
  }
  
  getCommunityId(){
    return this.commnuity_id;
  }

  getTypeCommunity(){
    return this.type_community;
  }

  getId() {
    return this.id;
  }

  getUserInfo() {
    return this.userInfo;
  }

  getContent() {
    return this.content;
  }

  getCantLikes() {
    return this.cant_likes;
  }

  getCantComments() {
    return this.cant_comm;
  }

  getUserPreference() {
    return this.userPreference;
  }

  getMediaUrl() {
    return this.media_url;
  }

  getComment() {
    return this.comments;
  }

  
}
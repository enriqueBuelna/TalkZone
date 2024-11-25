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
  private is_liked:boolean = false;
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
    type_community?: string,
    is_liked?:any
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

    if(!comments){
      this.comments = [];
    }
    if(is_liked){
      if(is_liked.length > 0){
        this.is_liked = true;
      }
    }
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

  oneLikeMore(){
    this.cant_likes++;
  }

  oneCommentMore(){
    this.cant_comm++;
  }

  oneLikeLess(){
    this.cant_likes--;
  }

  oneCommentLess(){
    this.cant_comm--;
  }

  isLiked(){
    return this.is_liked;
  }

  setLiked(){
    this.is_liked = !this.is_liked;
  }
}
import { UserDemo } from './user-demo.model';
import { UserPreference } from './user_preference.model';
import { Comment } from './comment.model';
import { Tag } from './tag.model';
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
  private name_community?:string;
  private cover_picture?:string;
  private tags:Tag[] = [];
  private created_at:Date;
  constructor(
    id: string,
    userInfo: UserDemo,
    content: string,
    cant_likes: number,
    cant_comm: number,
    privacy: string,
    userPreference: UserPreference | null,
    media_url: string,
    tags:Tag[],
    created_at:Date,
    comments?: Comment[],
    community_id?: string,
    type_community?: string,
    is_liked?:any,
    name_community?:string,
    cover_picture?:string,
  ) {
    this.created_at = created_at;
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
    this.name_community = name_community;
    this.cover_picture = cover_picture;
    this.tags = tags;

    if(!comments){
      this.comments = [];
    }
    if(is_liked){
      if(is_liked.length > 0){
        this.is_liked = true;
      }
    }
  }

  getCreatedAt(){
    return this.created_at;
  }

  getNameComunity(){
    return this.name_community;
  }

  getCoverPicture(){
    return this.cover_picture;
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

  getPrivacy(){
    return this.privacy;
  }

  setContent(content:string){
    this.content = content;
  }

  setPrivacy(privacy:string){
    this.privacy = privacy;
  }

  setTopic(user_preference:UserPreference){
    this.userPreference?.setPreference(user_preference);
  }

  setTypeCommunity(type :string){
    this.type_community = type;
  }

  getTags(){
    return this.tags;
  }

  setTags(tags: Tag[]){
    this.tags = tags;
  }

  setNameCommunity(name:string){
    this.name_community = name;
  }

  setCoverPicture(pic:string){
    this.cover_picture = pic;
  }
}
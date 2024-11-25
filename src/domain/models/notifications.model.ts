import { Like } from './like.model';
import { UserDemo } from './user-demo.model';

export class Notification {
  private id: number;
  private userDemo: UserDemo;
  private related_message_id!: string;
  private related_comment_id!: string;
  private related_post_id!: string;
  private related_like_id!: string;
  private related_room_open_id!: string;
  private message!: string;
  private action!: string;
  private like?: Like;
  private type:string;
  constructor(
    id: number,
    type:string,
    userDemo: UserDemo,
    related_message_id: string,
    related_comment_id: string,
    related_post_id: string,
    related_room_open_id: string,
    related_like_id: string,
    like?: Like
  ) {
    this.id = id;
    this.userDemo = userDemo;
    this.related_comment_id = related_comment_id;
    this.related_like_id = related_like_id;
    this.related_post_id = related_post_id;
    this.related_message_id = related_message_id;
    this.related_room_open_id = related_room_open_id;
    this.type = type;
    this.like = like;
    if (this.related_comment_id) {
      this.message = `ha hecho un comentario en tu publicacion`;
      this.action = 'Ven a echarle un vistazo';
    } else if (this.related_like_id) {
      if (this.like?.getCommentId()) {
        this.message = ' ha dado un me gusta a tu comentario';
      } else if (this.like?.getPostId()) {
        this.message = ' ha dado un me gusta en tu publicacion';
      }
      this.action = 'Ven a echarle un vistazo';
    } else if (this.related_room_open_id) {
      this.message = `ha abierto una sala!`;
      this.action = 'Unirse a la sala';
    } else {
      this.message = '';
      this.action = '';
    }
  }
  getId() {
    return this.id;
  }

  getUserDemo() {
    return this.userDemo;
  }

  getAction() {
    return this.action;
  }

  getMessage() {
    return this.message;
  }

  getPost() {
    return this.related_post_id;
  }

  getLike() {
    return this.related_like_id;
  }

  getVoiceRoom() {
    return this.related_room_open_id;
  }

  getLikeLike(){
    return this.like;
  }
  
  getType(){
    return this.type;
  }
}

// import { IHostUser } from '../entities/voice_rooms/IHostUser.entitie';
// import { User } from './user.model';
// export class VoiceRoom {
//   private room_name: string;
//   private host_id: string;
//   private users: User[];
//   private topic_id: number;
//   private topic_name: string;
//   private host_user: IHostUser;
//   private id: number;

import { UserResponseInformation } from '../entities/voice_rooms/IHostUser.entitie';
import { UserOfVoiceRoom } from '../entities/voice_rooms/UserOfVoiceRoom.entitie';
import { VoiceRoomToVoiceRoomTag } from '../entities/voice_rooms/VoiceRoomToVoiceRoomTag.entitie';

//   constructor(
//     room_name: string,
//     host_id: string,
//     users: User[],
//     topic_id: number,
//     topic_name: string,
//     host_user: IHostUser,
//     id: number
//   ) {
//     this.room_name = room_name;
//     this.host_id = host_id;
//     this.users = users;
//     this.topic_id = topic_id;
//     this.topic_name = topic_name;
//     this.host_user = host_user;
//     this.id = id;
//   }

//   // Getters
//   getTopicName(): string {
//     return this.topic_name;
//   }

//   getUsers(): User[] {
//     return this.users;
//   }

//   getVoiceRoomName(): string {
//     return this.room_name;
//   }

//   getNameHost(): string {
//     return this.host_user.username;
//   }

//   getPictureHost(): string {
//     return this.host_user.profile_picture;
//   }

//   getVoiceRoomId(): number {
//     return this.id;
//   }

//   getHostID(): string {
//     return this.host_id;
//   }

//   getTopicID():number{
//     return this.topic_id;
//   }

//   getHostUser():IHostUser{
//     return this.host_user;
//   }

//   // Setters
//   setTopicName(topic_name: string) {
//     this.topic_name = topic_name;
//   }

//   setUsers(users: User[]): void {
//     this.users = users;
//   }

//   setVoiceRoomName(room_name: string): void {
//     this.room_name = room_name;
//   }

//   setNameHost(host_user: IHostUser): void {
//     this.host_user = host_user;
//   }

//   setPictureHost(profile_picture: string): void {
//     this.host_user.profile_picture = profile_picture;
//   }

//   setVoiceRoomId(id: number): void {
//     this.id = id;
//   }
// }

export class VoiceRoom {
  private id: number;
  private room_name: string;
  private topic_id: number;
  private users_of_voice_room: UserOfVoiceRoom[];
  private topic_name: string;
  private voice_room_to_voice_room_tag: VoiceRoomToVoiceRoomTag[];
  private host_user: UserResponseInformation;
  private rating: number = 0;
  private total_rating:number = 0;

  constructor(
    id: number,
    room_name: string,
    users_of_voice_room: UserOfVoiceRoom[],
    topic_id: number,
    topic_name: string,
    voice_room_to_voice_room_tag: VoiceRoomToVoiceRoomTag[],
    host_user: UserResponseInformation,
    rating: number,
    total_rating:number
  ) {
    this.id = id;
    this.room_name = room_name;
    this.users_of_voice_room = users_of_voice_room;
    this.topic_id = topic_id;
    this.topic_name = topic_name;
    this.voice_room_to_voice_room_tag = voice_room_to_voice_room_tag;
    this.host_user = host_user;
    this.rating = rating;
    this.total_rating = total_rating;
  }

  getRatingValid(){
    if(this.total_rating){
      if(this.total_rating > 49){
        return true
      }
    }
    return false
  }

  getNumberMembers():number{
    return this.users_of_voice_room.length;
  }

  // Getters
  getTopicName(): string {
    return this.topic_name;
  }

  getUsers(): UserOfVoiceRoom[] {
    return this.users_of_voice_room;
  }

  getVoiceRoomName(): string {
    return this.room_name;
  }

  getNameHost(): string {
    return this.host_user.username;
  }

  getPictureHost(): string | null {
    return this.host_user.profile_picture || null;
  }

  getVoiceRoomId(): number {
    return this.id;
  }

  getTopicID(): number {
    return this.topic_id;
  }

  getVoiceRoomTags(): VoiceRoomToVoiceRoomTag[] {
    return this.voice_room_to_voice_room_tag;
  }

  // Setters
  setTopicName(topic_name: string) {
    this.topic_name = topic_name;
  }

  setUsers(users: UserOfVoiceRoom[]): void {
    this.users_of_voice_room = users;
  }

  setVoiceRoomName(room_name: string): void {
    this.room_name = room_name;
  }

  setVoiceRoomId(id: number): void {
    this.id = id;
  }

  getRating() {
    return this.rating;
  }

  isVerify(){
    return this.host_user.is_verified;
  }
}

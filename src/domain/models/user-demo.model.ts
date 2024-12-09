// src/app/core/domain/user.ts
export class UserDemo {
  private id: string;
  private username: string;
  private gender: string;
  private profile_pic: string;
  private type?:string;
  private is_verified:boolean;
  constructor(
    id: string,
    username: string,
    gender: string,
    profile_pic: string,
    is_verified:boolean,
    type?:string,
  ) {
    this.id = id;
    this.username = username;
    this.gender = gender;
    this.profile_pic = profile_pic;
    this.type = type;
    this.is_verified = is_verified;
  }
  
  isVerify(){
    return this.is_verified;
  }

  getUsername() {
    return this.username;
  }

  getProfilePic() {
    return this.profile_pic;
  }

  getUserId() {
    return this.id;
  }

  getType(){
    return this.type;
  }

  setUsername(username:string){
    this.username = username;
  }

  setProfilePic(profile_picture:string){
    this.profile_pic = profile_picture;
  }
}
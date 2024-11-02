// src/app/core/domain/user.ts
export class UserDemo {
  private id: string;
  private username: string;
  private gender: string;
  private profile_pic: string;
  constructor(
    id: string,
    username: string,
    gender: string,
    profile_pic: string
  ) {
    this.id = id;
    this.username = username;
    this.gender = gender;
    this.profile_pic = profile_pic;
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
}

// src/app/core/domain/user.ts
export class UserInVoiceRoom {
  private id: string;
  private username: string;
  private profile_pic: string;
  private type: string;
  private in_stage: boolean;
  constructor(id: string, username: string, profile_pic: string, type: string, in_stage:boolean) {
    this.id = id;
    this.username = username;
    this.profile_pic = profile_pic;
    this.type = type;
    this.in_stage = in_stage;
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

  getType() {
    return this.type;
  }

  getInStage() {
    return this.in_stage;
  }

  goToStage() {
    this.in_stage = true;
  }

  backFromStage() {
    this.in_stage = false;
  }
}

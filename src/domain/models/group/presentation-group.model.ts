export class GroupPresentation {
  private id: number;
  private group_name: string;
  private privacy: boolean;
  private topic_name: string;
  private profile_picture: string;
  private cover_picture: string;
  constructor(
    id: number,
    group_name: string,
    privacy: boolean,
    topic_name: string,
    profile_picture: string,
    cover_picture: string
  ) {
    this.id = id;
    this.group_name = group_name;
    this.privacy = privacy;
    this.topic_name = topic_name;
    this.profile_picture = profile_picture;
    this.cover_picture = cover_picture;
  }

  getProfilePicture() {
    return this.profile_picture;
  }

  getCoverPicture() {
    return this.cover_picture;
  }
  getTopicName() {
    return this.topic_name;
  }

  getGroupName() {
    return this.group_name;
  }

  getPrivacy() {
    return this.privacy;
  }

  getId() {
    return this.id;
  }

  setPrivacy(privacy: boolean) {
    this.privacy = privacy;
  }

  setCoverPicture(pic: string) {
    this.cover_picture = pic;
  }
  setProfilePicture(pic:string){
    this.profile_picture = pic;
  }
}

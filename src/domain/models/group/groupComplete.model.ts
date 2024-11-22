import { CommunityMember } from '../communityMember.model';
import { GroupPresentation } from './presentation-group.model';

export class GroupComplete extends GroupPresentation {
  private description: string;
  private members_count: number;
  private all_member: CommunityMember[];
  private admin_user:string;
  private type:string;
  private user_preference_id:string;
  constructor(
    id: number,
    group_name: string,
    privacy: boolean,
    topic_name: string,
    profile_picture: string,
    cover_picture: string,
    description: string,
    members_count: number,
    all_member: CommunityMember[],
    admin_user:string,
    type:string,
    user_preference_id:string
  ) {
    // Llama al constructor de la clase base
    super(id, group_name, privacy, topic_name, profile_picture, cover_picture);
    this.description = description;
    this.members_count = members_count;
    this.all_member = all_member;
    this.admin_user = admin_user;
    this.type = type;
    this.user_preference_id = user_preference_id;
  }

  getUserPreferenceId(){
    return this.user_preference_id;
  }

  getAdminUser(){
    return this.admin_user;
  }

  getAllMembers() {
    return this.all_member;
  }

  getDescription() {
    return this.description;
  }

  getMembersCount() {
    return this.members_count;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setMembersCount(count: number) {
    this.members_count = count;
  }

  getType(){
    return this.type;
  }
}

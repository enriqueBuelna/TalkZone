import { TableState } from 'primeng/api';
import { CommunityMember } from '../communityMember.model';
import { Tag } from '../tag.model';
import { GroupPresentation } from './presentation-group.model';

export class GroupComplete extends GroupPresentation {
  private description: string;
  private members_count: number;
  private all_member: CommunityMember[];
  private admin_user: string;
  private type: string;
  private user_preference_id: string;
  private status: string;
  private tags!: Tag[];
  private topic_id!: string;
  constructor(
    id: number,
    status:string,
    group_name: string,
    privacy: boolean,
    topic_name: string,
    profile_picture: string,
    cover_picture: string,
    description: string,
    members_count: number,
    all_member: CommunityMember[],
    admin_user: string,
    type: string,
    user_preference_id: string,
    tags: Tag[],
    topic_id: string
  ) {
    // Llama al constructor de la clase base
    super(id, group_name, privacy, topic_name, profile_picture, cover_picture);
    this.description = description;
    this.members_count = members_count;
    this.all_member = all_member;
    this.admin_user = admin_user;
    this.type = type;
    this.user_preference_id = user_preference_id;
    this.tags = tags;
    this.topic_id = topic_id;
    this.status = status;
  }

  getStatus(){
    return this.status;
  }

  getTopicId() {
    return this.topic_id;
  }

  getTags() {
    return this.tags;
  }

  getUserPreferenceId() {
    return this.user_preference_id;
  }

  getAdminUser() {
    return this.admin_user;
  }

  getAllMembers() {
    return this.all_member;
  }

  getDescription() {
    return this.description;
  }

  getMembersCount() {
    return this.all_member.length;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setMembersCount(count: number) {
    this.members_count = count;
  }

  getType() {
    return this.type;
  }

  deleteMember(id: string) {
    this.all_member = this.all_member.filter(
      (el) => el.getUserDemo().getUserId() !== id
    );
    this.members_count--;
  }

  addNewTags(tag: Tag) {
    // Verificar si el tag ya existe en el arreglo
    const exists = this.tags?.some(
      (existingTag) => existingTag.getId() === tag.getId()
    );

    if (!exists) {
      this.tags?.push(tag); // Solo agregar si no existe
    }
  }
  removeTagsByIds(ids: number[]) {
    // Filtrar los tags que se van a eliminar
    const removedTags =
      this.tags?.filter((existingTag) => ids.includes(existingTag.getId())) ||
      [];

    // Actualizar el arreglo excluyendo los tags eliminados
    this.tags =
      this.tags?.filter((existingTag) => !ids.includes(existingTag.getId())) ||
      [];
  }
}

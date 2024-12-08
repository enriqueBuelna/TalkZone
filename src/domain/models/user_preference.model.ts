import { Tag } from './tag.model';

export class UserPreference {
  private topic_id: number;
  private type: string;
  private tag: Tag[] = [];
  private topic_name: string;
  private id: number;
  constructor(
    id: number,
    topic_id: number,
    type: string,
    topic_name: string,
    tag: Tag[] = []
  ) {
    this.topic_id = topic_id;
    this.type = type;
    this.tag = tag;
    this.topic_name = topic_name;
    this.id = id;
  }

  getType(): string {
    return this.type;
  }

  getTopicName(): string {
    return this.topic_name;
  }

  // getIndex(): number | undefined {
  //   return this.index;
  // }

  getTopicId(): number {
    return this.topic_id;
  }

  getTags(): Tag[] {
    return this.tag;
  }

  getId() {
    return this.id;
  }

  setPreference(userPreference: UserPreference) {
    this.id = userPreference.getId();
    this.topic_id = userPreference.getTopicId();
    this.type = userPreference.getType();
    this.topic_name = userPreference.getTopicName();
  }

  addNewTags(tag: Tag) {
    // Verificar si el tag ya existe en el arreglo
    const exists = this.tag?.some(
      (existingTag) => existingTag.getId() === tag.getId()
    );

    if (!exists) {
      this.tag?.push(tag); // Solo agregar si no existe
    }
  }

  removeTagsByIds(ids: number[]) {
    // Filtrar los tags que se van a eliminar
    const removedTags =
      this.tag?.filter((existingTag) => ids.includes(existingTag.getId())) ||
      [];

    // Actualizar el arreglo excluyendo los tags eliminados
    this.tag =
      this.tag?.filter((existingTag) => !ids.includes(existingTag.getId())) ||
      [];

  }
}

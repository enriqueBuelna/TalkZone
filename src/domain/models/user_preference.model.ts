import { Tag } from './tag.model';

export class UserPreference {
  private topic_id: number;
  private type: string;
  private tag?: Tag[];
  private topic_name: string;
  private id: number;
  constructor(
    id:number,
    topic_id: number,
    type: string,
    topic_name: string,
    tag?: Tag[],
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

  getTags(): Tag[] | undefined {
    return this.tag;
  }

  getId(){
    return this.id;
  }

  setPreference(userPreference:UserPreference){
    this.id = userPreference.getId();
    this.topic_id = userPreference.getTopicId();
    this.type = userPreference.getType();
    this.topic_name = userPreference.getTopicName();
  }
}

import { Tag } from './tag.model';

export class UserPreference {
  private topic_id: number;
  private type: string;
  private tag: Tag[];
  private topic_name: string;
  private index: number;
  constructor(
    topic_id: number,
    type: string,
    tag: Tag[],
    topic_name: string,
    index: number
  ) {
    this.topic_id = topic_id;
    this.type = type;
    this.tag = tag;
    this.topic_name = topic_name;
    this.index = index;
  }

  getType(): string {
    return this.type;
  }

  getTopicName(): string {
    return this.topic_name;
  }

  getIndex(): number {
    return this.index;
  }
}

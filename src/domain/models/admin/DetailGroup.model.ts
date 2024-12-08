import { Tag } from '../tag.model';

export class DetailGroup {
  private id: number;
  private member_count: number;
  private topic_name: string;
  private type: string;
  private cant_tags: number;
  private tags: Tag[];
  private post_count: number;
  private name:string;
  constructor(
    id: number,
    member_count: number,
    topic_name: string,
    type: string,
    cant_tags: number,
    tags: Tag[],
    post_count: number,
    name:string
  ) {
    this.name = name;
    this.id = id;
    this.member_count = member_count;
    this.topic_name = topic_name;
    this.type = type;
    this.cant_tags = cant_tags;
    this.tags = tags;
    this.post_count = post_count;
  }

  getName(){
    return this.name;
  }

  getPostCount() {
    return this.post_count;
  }

  getId() {
    return this.id;
  }

  getMemberCount() {
    return this.member_count;
  }

  getTopicName() {
    return this.topic_name;
  }
  getType() {
    return this.type;
  }

  getCantTags() {
    return this.cant_tags;
  }

  getTags() {
    return this.tags;
  }
}

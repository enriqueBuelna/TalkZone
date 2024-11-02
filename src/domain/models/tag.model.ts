export class Tag {
  private tag_name: string;
  private id: number;
  private topic_id: number;
  constructor(tag_name: string, id: number, topic_id: number) {
    this.tag_name = tag_name;
    this.id = id;
    this.topic_id = topic_id;
  }

  getTagName(): string {
    return this.tag_name;
  }

  getId(): number {
    return this.id;
  }

  getTopicId():number {
    return this.topic_id;
  }

  // public getTopicId() {
  //   return this.topic_id;
  // }

  // public getId() {
  //   return this.id;
  // }
}

export class CountTopic {
  private count: number;
  private topic_name: string;

  constructor(count: number, topic_name: string) {
    this.count = count;
    this.topic_name = topic_name;
  }

  getCount() {
    return this.count;
  }

  getTopicName() {
    return this.topic_name;
  }
}

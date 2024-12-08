export class GroupView {
  private id: number;
  private group_name: string;
  private member_count: number;
  private topic_name: string;
  private type: string;
  private last_activity?: Date;
  private status?: string;
  constructor(
    id: number,
    group_name: string,
    member_count: number,
    topic_name: string,
    type: string,
    last_activity?: Date,
    status?:string
  ) {
    this.id = id;
    this.group_name = group_name;
    this.member_count = member_count;
    this.topic_name = topic_name;
    this.type = type;
    this.last_activity = last_activity;
    this.status = status;
  }

  getStatus(){
    return this.status;
  }

  getLastActivity() {
    return this.last_activity;
  }

  getType() {
    return this.type;
  }

  getId() {
    return this.id;
  }

  getGroupName() {
    return this.group_name;
  }

  getMemberCount() {
    return this.member_count;
  }

  getTopicName() {
    return this.topic_name;
  }
}

export class CountTag {
    private count: number;
    private topic_name: string;
    private tag_name: string;
  
    constructor(count: number, topic_name: string, tag_name:string) {
      this.count = count;
      this.topic_name = topic_name;
      this.tag_name = tag_name;
    }

    getTagName(){
        return this.tag_name;
    }
  
    getCount() {
      return this.count;
    }
  
    getTopicName() {
      return this.topic_name;
    }
  }
  
import { Injectable } from '@angular/core';
import { Topic } from '../../../../domain/models/topic.model';
import { Tag } from '../../../../domain/models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class TopicsTagsService {
  private topicSecondList: Topic[] = [];
  private tagList: Tag[] = [];
  private tagAdded: Tag[] = [];

  constructor() {}
  //las llamadas hacia mis servicio, como el

  getTopicSecondList(): Topic[] {
    return this.topicSecondList;
  }

  setTopicSecondList(topics: Topic[]) {
    this.topicSecondList = topics;
  }

  getTagList(): Tag[] {
    return this.tagList;
  }

  setTagList(tags: Tag[]) {
    this.tagList = tags;
  }

  findTag(tag_name: string): boolean {
    return this.tagList.some(
      (el) => el.tag_name.toLowerCase() === tag_name.toLowerCase()
    );
  }

  cleanAll(){
    this.topicSecondList = [];
    this.tagList = [];
    this.tagAdded = [];
  }
  

  getTagAdded(): Tag[] {
    return this.tagAdded;
  }

  addTagList(tag: Tag) {
    this.tagList.push(tag);
  }

  addTagAdded(tag: Tag) {
    this.tagAdded.push(tag);
  }

  findTagAdded(tag:Tag):boolean{
    console.log(this.tagAdded);
    return this.tagAdded.some((el) => el.tag_name.toLowerCase() === tag.tag_name.toLowerCase());
  }

  tagRemove(tag_id:number){
    this.tagAdded = this.tagAdded.filter((el) => el.id !== tag_id);
    console.log(this.tagAdded);
  }

  
}

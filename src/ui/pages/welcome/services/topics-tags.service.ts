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
      (el) => el.getTagName().toLowerCase() === tag_name.toLowerCase()
    );
  }

  cleanAll() {
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

  tagInList(tag:string){
    console.log(tag);
    return this.tagList.find(el => el.getTagName().toLowerCase() === tag.toLowerCase())
  }

  findTagAdded(tag:Tag): boolean {
    return this.tagAdded.some(
      (el) => el.getTagName().toLowerCase() === tag.getTagName().toLowerCase()
    );
  }

  tagRemove(tag_id: number){
    // Encontrar el tag que será eliminado
    const removedTag = this.tagAdded.find((el) => el.getId() === tag_id);
  
    // Filtrar el arreglo para eliminar el tag
    this.tagAdded = this.tagAdded.filter((el) => el.getId() !== tag_id);
  
    // Retornar el tag eliminado o undefined si no se encontró
    return removedTag;
  }
}

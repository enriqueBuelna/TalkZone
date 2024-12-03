import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TagRepository } from '../../repositories/tag.repository';
import { Tag } from '../../models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class SubmitTagsGroup {
  constructor(private tagRespository: TagRepository) {}

  execute(group_id:string, tag:Tag[], tagsEliminated:number[]):Observable<any>{
    return this.tagRespository.submitTagsGroup(group_id, tag, tagsEliminated);
  }
}
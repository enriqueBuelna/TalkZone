import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TagRepository } from '../../repositories/tag.repository';
import { Tag } from '../../models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class SubmitTagsPreferences {
  constructor(private tagRespository: TagRepository) {}

  execute(user_preference_id:string, tag:Tag[], tagsEliminated:number[]):Observable<any>{
    return this.tagRespository.submitTagsPreferences(user_preference_id, tag, tagsEliminated);
  }
}
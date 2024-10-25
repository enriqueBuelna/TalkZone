import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TagRepository } from '../../repositories/tag.repository';
import { Tag } from '../../models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class AddTag {
  constructor(private tagRespository: TagRepository) {}

  execute(tag:Tag): Observable<Tag> {
    return this.tagRespository.addTag(tag);
  }
}
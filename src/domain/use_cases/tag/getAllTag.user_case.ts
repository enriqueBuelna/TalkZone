import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TagRepository } from '../../repositories/tag.repository';
import { Tag } from '../../models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class GetAllTag {
  constructor(private tagRespository: TagRepository) {}

  execute(id: number): Observable<Tag[]> {
    return this.tagRespository.getAllTag(id);
  }
}
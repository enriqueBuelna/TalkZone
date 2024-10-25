import { Injectable } from '@angular/core';
import { TagRepository } from '../repositories/tag.repository';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag.model';
import { GetAllTag } from '../use_cases/tag/getAllTag.user_case';
import { AddTag } from '../use_cases/tag/addTag.use_case';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private _getAllTag: GetAllTag, private _addTag: AddTag) {}

  getAllTag(id: number): Observable<Tag[]> {
    return this._getAllTag.execute(id);
  }

  addTag(tag: Tag): Observable<Tag> {
    return this._addTag.execute(tag);
  }
}

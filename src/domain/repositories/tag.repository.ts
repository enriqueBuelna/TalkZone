import { Observable } from 'rxjs';
import { Tag } from '../models/tag.model';
export abstract class TagRepository {
  abstract getAllTag(id:number): Observable<Tag[]>;
  abstract addTag(tag:Tag): Observable<Tag>;
}

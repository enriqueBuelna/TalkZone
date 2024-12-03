import { Observable } from 'rxjs';
import { Tag } from '../models/tag.model';
export abstract class TagRepository {
  abstract getAllTag(id:number): Observable<Tag[]>;
  abstract addTag(tag:Tag): Observable<Tag>;
  abstract submitTagsPreferences(user_preference_id:string, tag:Tag[], tagsEliminated:number[]):Observable<any>;
  abstract submitTagsGroup(group_id:string, tag:Tag[], tagsEliminated:number[]):Observable<any>;
}

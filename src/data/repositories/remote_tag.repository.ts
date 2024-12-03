import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TagRepository } from '../../domain/repositories/tag.repository';
import { Tag } from '../../domain/models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class RemoteTagRespository extends TagRepository {
  override submitTagsGroup(group_id: string, tag: Tag[], tagsEliminated: number[]): Observable<any> {
    const payload = {
      group_id,
      tag,
      tagsEliminated
    }
    return this._http.post<any>(`${this.API_URL}/preferencesGroups/createTags`, payload);
  }

  

  override submitTagsPreferences(user_preference_id: string, tag: Tag[], tagsEliminated:number[]): Observable<any> {
    const payload = {
      user_preference_id,
      tag,
      tagsEliminated
    }
    return this._http.post<any>(`${this.API_URL}/preferencesTags/createTags`, payload);
  }
  private readonly API_URL = 'http://localhost:3000';
  private _http = inject(HttpClient);

  getAllTag(id: number): Observable<Tag[]> {
    const params = new HttpParams().set('topic_id', id.toString()); // Convierte el ID a string
    return this._http
      .get<Tag[]>(`${this.API_URL}/tags/getAllTag`, { params })
      .pipe(
        map((tags: any) =>
          tags.map((tag: any) => new Tag(tag.tag_name, tag.id, tag.topic_id))
        )
      );
  }

  addTag(tag: Tag): Observable<Tag> {
    const payload = {
      topic_id: tag.getTopicId(),
      tag_name: tag.getTagName(),
    };

    return this._http
      .post<Tag>(`${this.API_URL}/tags/addTag`, payload)
      .pipe(map((tag: any) => new Tag(tag.tag_name, tag.id, tag.topic_id)));
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TagRepository } from '../../domain/repositories/tag.repository';
import { Tag } from '../../domain/models/tag.model';

@Injectable({
  providedIn: 'root',
})
export class RemoteTagRespository extends TagRepository {
  private readonly API_URL = 'http://localhost:3000/tags';
  private _http = inject(HttpClient);

  getAllTag(id: number): Observable<Tag[]> {
    const params = new HttpParams().set('topic_id', id.toString()); // Convierte el ID a string
    return this._http.get<Tag[]>(`${this.API_URL}/getAllTag`, { params });
  }

  addTag(tag: Tag): Observable<Tag> {
    const payload = {
      topic_id: tag.getTopicId(),
      tag_name: tag.getTagName(),
    };

    return this._http.post<Tag>(`${this.API_URL}/addTag`, payload);
  }
}

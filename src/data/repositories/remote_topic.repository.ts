import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TopicRepository } from '../../domain/repositories/topic.repository';
import { map, Observable } from 'rxjs';
import { Topic } from '../../domain/models/topic.model';

@Injectable({
  providedIn: 'root',
})
export class RemoteTopicRepository extends TopicRepository {
  private readonly API_URL = 'https://api-talkzone.onrender.com/topics';
  private _http = inject(HttpClient);
  getPrincipalTopic(): Observable<Topic[]> {
    return this._http
      .get<Topic[]>(`${this.API_URL}/getPrincipalTopic`)
      .pipe
      // map((response) => {
      //   return response;
      // })
      ();
  }

  getSecondTopic(id: number): Observable<Topic[]> {
    const params = new HttpParams().set('topic_id', id.toString()); // Convierte el ID a string
    return this._http.get<Topic[]>(`${this.API_URL}/getSecondTopic`, {params});
  }
}

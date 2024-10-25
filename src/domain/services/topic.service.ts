import { Injectable } from '@angular/core';
import { GetPrincipalTopic } from '../use_cases/topic/getPrincipalTopic.use_case';
import { Observable } from 'rxjs';
import { Topic } from '../models/topic.model';
import { GetSecondlTopic } from '../use_cases/topic/getSecondTopic.use_case';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  constructor(
    private _getPrincipalTopic: GetPrincipalTopic,
    private _getSecondTopic: GetSecondlTopic
  ) {}

  getPrincipalTopic(): Observable<Topic[]> {
    return this._getPrincipalTopic.execute();
  }

  getSecondTopic(id: number): Observable<Topic[]> {
    return this._getSecondTopic.execute(id);
  }
}
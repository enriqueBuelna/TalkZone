import { Observable } from 'rxjs';
import { Topic } from '../models/topic.model';

export abstract class TopicRepository {
  abstract getPrincipalTopic(): Observable<Topic[]>;
  abstract getSecondTopic(id:number): Observable<Topic[]>;
}

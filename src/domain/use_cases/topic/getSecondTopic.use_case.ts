import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../../models/topic.model';
import { TopicRepository } from '../../repositories/topic.repository';

@Injectable({
  providedIn: 'root',
})
export class GetSecondlTopic {
  constructor(private topicRepository: TopicRepository) {}

  execute(id: number): Observable<Topic[]> {
    return this.topicRepository.getSecondTopic(id);
  }
}

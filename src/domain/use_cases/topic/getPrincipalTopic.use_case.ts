import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../../models/topic.model';
import { TopicRepository } from '../../repositories/topic.repository';

@Injectable({
  providedIn: 'root',
})
export class GetPrincipalTopic {
  constructor(private topicRepository: TopicRepository) {}

  execute(): Observable<Topic[]> {
    return this.topicRepository.getPrincipalTopic();
  }
}

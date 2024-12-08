import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminRepository } from '../../repositories/admin.repository';
import { CountTopic } from '../../models/admin/topicPost.model';
@Injectable({
  providedIn: 'root',
})
export class GetTopFiveTopicTheme {
  constructor(private adminRepository: AdminRepository) {}

  execute(): Observable<CountTopic[]> {
    return this.adminRepository.getTopFiveTopicTheme();
  }
}

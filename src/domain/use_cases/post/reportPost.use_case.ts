import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRepository } from '../../repositories/post.repository';

@Injectable({
  providedIn: 'root',
})
export class ReportPost {
  constructor(private postRepository: PostRepository) {}

  execute(
    reason: string,
    details: string,
    reported_user_id: string,
    reporter_id: string,
    post_id: string
  ): Observable<boolean> {
    return this.postRepository.reportPost(
      reason,
      details,
      reported_user_id,
      reporter_id,
      post_id
    );
  }
}

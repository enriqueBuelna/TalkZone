import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunitieRepository } from '../../repositories/communitie.repository';

@Injectable({
  providedIn: 'root',
})
export class CreateGroup {
  constructor(private communitieRepository: CommunitieRepository) {}

  execute(
    communitie_name: string,
    type: string,
    creator_id: string,
    is_private: boolean,
    topic_id: number
  ): Observable<any> {
    return this.communitieRepository.createGroup(
      communitie_name,
      type,
      creator_id,
      is_private,
      topic_id
    );
  }
}

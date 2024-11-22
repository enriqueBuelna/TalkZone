import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunitieRepository } from '../../repositories/communitie.repository';

@Injectable({
  providedIn: 'root',
})
export class WantToGetInGroup {
  constructor(private communitieRepository: CommunitieRepository) {}

  execute(group_id: string, user_id: string): Observable<boolean> {
    return this.communitieRepository.wantToGetInGroup(group_id, user_id);
  }
}

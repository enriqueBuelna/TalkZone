import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunitieRepository } from '../../repositories/communitie.repository';
import { ApplyGroup } from '../../models/group/apply_group.model';

@Injectable({
  providedIn: 'root',
})
export class ResponseApply {
  constructor(private communitieRepository: CommunitieRepository) {}

  execute(
    user_id: string,
    group_id: string,
    status: string
  ): Observable<boolean> {
    return this.communitieRepository.responseApply(user_id, group_id, status);
  }
}

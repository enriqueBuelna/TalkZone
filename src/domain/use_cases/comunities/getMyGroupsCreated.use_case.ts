import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunitieRepository } from '../../repositories/communitie.repository';
import { GroupPresentation } from '../../models/group/presentation-group.model';

@Injectable({
  providedIn: 'root',
})
export class GetMyGroupsCreated {
  constructor(private communitieRepository: CommunitieRepository) {}

  execute(creator_id: string): Observable<GroupPresentation[]> {
    return this.communitieRepository.getMyGroupsCreated(creator_id);
  }
}

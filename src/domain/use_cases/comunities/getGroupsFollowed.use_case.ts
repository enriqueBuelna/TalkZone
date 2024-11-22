import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunitieRepository } from '../../repositories/communitie.repository';
import { GroupComplete } from '../../models/group/groupComplete.model';
import { GroupPresentation } from '../../models/group/presentation-group.model';

@Injectable({
  providedIn: 'root',
})
export class GetGroupsFollowed {
  constructor(private communitieRepository: CommunitieRepository) {}
  execute(user_id: string): Observable<GroupPresentation[]> {
    return this.communitieRepository.getGroupsFollowed(user_id);
  }
}
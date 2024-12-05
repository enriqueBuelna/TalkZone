import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunitieRepository } from '../../repositories/communitie.repository';
import { GroupPresentation } from '../../models/group/presentation-group.model';

@Injectable({
  providedIn: 'root',
})
export class SearchGroup {
  constructor(private communitieRepository: CommunitieRepository) {}

  execute(group_name: string): Observable<GroupPresentation[]> {
    return this.communitieRepository.searchGroup(group_name);
  }
}

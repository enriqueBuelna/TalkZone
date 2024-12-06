import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunitieRepository } from '../../repositories/communitie.repository';
import { GroupPresentation } from '../../models/group/presentation-group.model';

@Injectable({
  providedIn: 'root',
})
export class DiscoverGroup {
  constructor(private communitieRepository: CommunitieRepository) {}

  execute(user_id: string, page:number): Observable<GroupPresentation[]> {
    return this.communitieRepository.discoverGroup(user_id, page);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunitieRepository } from '../../repositories/communitie.repository';
import { ApplyGroup } from '../../models/group/apply_group.model';

@Injectable({
  providedIn: 'root',
})
export class GetPendingApplies {
  constructor(private communitieRepository: CommunitieRepository) {}

  execute(group_id:string):Observable<ApplyGroup[]>{
    return this.communitieRepository.getPendingApplies(group_id);
  }
}

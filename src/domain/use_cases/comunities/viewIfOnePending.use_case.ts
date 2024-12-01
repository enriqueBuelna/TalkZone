import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunitieRepository } from '../../repositories/communitie.repository';
import { GroupComplete } from '../../models/group/groupComplete.model';
import { GroupPresentation } from '../../models/group/presentation-group.model';

@Injectable({
  providedIn: 'root',
})
export class ViewIfOnePending {
  constructor(private communitieRepository: CommunitieRepository) {}
  execute(user_id: string, group_id:string): Observable<boolean> {
    return this.communitieRepository.viewIfOnePending(user_id, group_id);
  }
}
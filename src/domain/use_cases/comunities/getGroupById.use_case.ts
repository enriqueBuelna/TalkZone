import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunitieRepository } from '../../repositories/communitie.repository';
import { GroupComplete } from '../../models/group/groupComplete.model';

@Injectable({
  providedIn: 'root',
})
export class GetGroupById {
  constructor(private communitieRepository: CommunitieRepository) {}

  execute(id: string): Observable<GroupComplete> {
    return this.communitieRepository.getGroupById(id);
  }
}

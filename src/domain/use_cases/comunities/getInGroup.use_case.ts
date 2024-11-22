import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunitieRepository } from '../../repositories/communitie.repository';

@Injectable({
  providedIn: 'root',
})
export class GetInGroup {
  constructor(private communitieRepository: CommunitieRepository) {}

  execute(user_id:string, group_id:string):Observable<boolean>{
    return this.communitieRepository.getInGroup(user_id, group_id);
  }
}

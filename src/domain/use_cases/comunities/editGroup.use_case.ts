import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunitieRepository } from '../../repositories/communitie.repository';

@Injectable({
  providedIn: 'root',
})
export class EditGroup {
  constructor(private communitieRepository: CommunitieRepository) {}

  execute(group_id:string, privacy:string,about_communitie:string,cover_picture:string, profile_picture:string):Observable<boolean>{
    return this.communitieRepository.editGroup(group_id, privacy,about_communitie, cover_picture, profile_picture);
  }
}

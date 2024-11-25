import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserRepository } from '../../repositories/user.repository';
import { MessageResponse } from '../../entities/users/MessageResponse.entitie';

@Injectable({
  providedIn: 'root',
})
export class CompleteProfile {
  constructor(private userRepository: UserRepository) {}

  execute(user_id:string):Observable<any>{
    return this.userRepository.completeProfile(user_id);
  }
}

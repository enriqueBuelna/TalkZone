import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../../repositories/user.repository';
import { UserDemo } from '../../models/user-demo.model';
import { UserComplete } from '../../models/user_complete_information.model';

@Injectable({
  providedIn: 'root',
})
export class GetCompleteInformation {
  constructor(private userRepository: UserRepository) {}

  execute(user_id: string):Observable<UserComplete> {
    return this.userRepository.getCompleteInformation(user_id);
  }
}
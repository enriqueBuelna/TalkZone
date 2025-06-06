import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../../repositories/user.repository';
import { UserDemo } from '../../models/user-demo.model';

@Injectable({
  providedIn: 'root',
})
export class GetBasicInfo {
  constructor(private userRepository: UserRepository) {}

  execute(user_id: string):Observable<UserDemo> {
    return this.userRepository.getBasicInfo(user_id);
  }
}
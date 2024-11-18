import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserRepository } from '../../repositories/user.repository';
import { MessageResponse } from '../../entities/users/MessageResponse.entitie';

@Injectable({
  providedIn: 'root',
})
export class EditProfile {
  constructor(private userRepository: UserRepository) {}

  execute(
    user_id: string,
    username?: string,
    about_me?: string,
    profile_picture?: string,
    cover_picture?: string
  ): Observable<any> {
    return this.userRepository.editProfile(
      user_id,
      username,
      about_me,
      profile_picture,
      cover_picture
    );
  }
}

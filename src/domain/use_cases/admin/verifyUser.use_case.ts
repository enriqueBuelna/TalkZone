import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminRepository } from '../../repositories/admin.repository';
import { CountTopic } from '../../models/admin/topicPost.model';
@Injectable({
  providedIn: 'root',
})
export class VerifyUser {
  constructor(private adminRepository: AdminRepository) {}

  execute(user_id:string): Observable<boolean> {
    return this.adminRepository.verifyUser(user_id);
  }
}

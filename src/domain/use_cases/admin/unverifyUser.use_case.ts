import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminRepository } from '../../repositories/admin.repository';
import { CountTopic } from '../../models/admin/topicPost.model';
@Injectable({
  providedIn: 'root',
})
export class UnverifyUser {
  constructor(private adminRepository: AdminRepository) {}

  execute(user_id:string): Observable<boolean> {
    return this.adminRepository.unverifyUser(user_id);
  }
}

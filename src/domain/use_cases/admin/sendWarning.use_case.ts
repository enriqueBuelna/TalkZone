import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminRepository } from '../../repositories/admin.repository';
import { CountTopic } from '../../models/admin/topicPost.model';
@Injectable({
  providedIn: 'root',
})
export class SendWarning {
  constructor(private adminRepository: AdminRepository) {}

  execute(message:string, reported_user_id:string, id:string): Observable<any> {
    return this.adminRepository.sendWarning(message, reported_user_id, id);
  }
}

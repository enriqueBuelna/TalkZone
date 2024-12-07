import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminRepository } from '../../repositories/admin.repository';
import { DataUser } from '../../models/admin/dataUser.model';
import { DetailUser } from '../../models/admin/DetailUser.model';
@Injectable({
  providedIn: 'root',
})
export class GetDetailUser {
  constructor(private adminRepository: AdminRepository) {}

  execute(user_id:string): Observable<DetailUser> {
    return this.adminRepository.getDetailUser(user_id);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminRepository } from '../../repositories/admin.repository';
import { DataUser } from '../../models/admin/dataUser.model';
@Injectable({
  providedIn: 'root',
})
export class GetMostFollowed {
  constructor(private adminRepository: AdminRepository) {}

  execute(): Observable<DataUser[]> {
    return this.adminRepository.getMostFollowed();
  }
}

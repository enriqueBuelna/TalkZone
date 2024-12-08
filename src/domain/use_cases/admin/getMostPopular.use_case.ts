import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminRepository } from '../../repositories/admin.repository';
import { DataUser } from '../../models/admin/dataUser.model';
import { GroupView } from '../../models/admin/groupView.model';
@Injectable({
  providedIn: 'root',
})
export class GetMostPopular {
  constructor(private adminRepository: AdminRepository) {}

  execute():Observable<GroupView[]>{
    return this.adminRepository.getMostPopular();
  }
}

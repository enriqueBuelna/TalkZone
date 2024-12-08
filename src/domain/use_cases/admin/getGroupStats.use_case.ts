import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminRepository } from '../../repositories/admin.repository';
import { DataUser } from '../../models/admin/dataUser.model';
import { GroupView } from '../../models/admin/groupView.model';
import { DetailGroup } from '../../models/admin/DetailGroup.model';
@Injectable({
  providedIn: 'root',
})
export class GetGroupStats {
  constructor(private adminRepository: AdminRepository) {}

  execute(id:number):Observable<DetailGroup>{
    return this.adminRepository.getGroupStats(id);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminRepository } from '../../repositories/admin.repository';
import { DataUser } from '../../models/admin/dataUser.model';
import { ModerationReport } from '../../models/admin/moderation_report.model';
@Injectable({
  providedIn: 'root',
})
export class GetAllModerationReport {
  constructor(private adminRepository: AdminRepository) {}

  execute():Observable<ModerationReport[]>{
    return this.adminRepository.getAllModerationReport();
  }
}

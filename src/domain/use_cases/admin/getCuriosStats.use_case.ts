import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminRepository } from '../../repositories/admin.repository';
import { CuriosStats } from '../../models/admin/CuriosStats.model';
@Injectable({
  providedIn: 'root',
})
export class GetCuriosStats {
  constructor(private adminRepository: AdminRepository) {}

  execute(): Observable<CuriosStats> {
    return this.adminRepository.getCuriosStats();
  }
}

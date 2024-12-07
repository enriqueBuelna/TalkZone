import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminRepository } from '../../repositories/admin.repository';
import { PrincipalStats } from '../../models/admin/PrincipalStats.model';
@Injectable({
  providedIn: 'root',
})
export class GetPrincipalStats {
  constructor(private adminRepository: AdminRepository) {}

  execute(): Observable<PrincipalStats> {
    return this.adminRepository.getPrincipalStats();
  }
}

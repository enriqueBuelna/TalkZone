import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminRepository } from '../../repositories/admin.repository';
import { TopHosts } from '../../models/admin/TopHost.model';
@Injectable({
  providedIn: 'root',
})
export class GetTopFiveHosts {
  constructor(private adminRepository: AdminRepository) {}

  execute(): Observable<TopHosts[]> {
    return this.adminRepository.getTopFiveHosts();
  }
}

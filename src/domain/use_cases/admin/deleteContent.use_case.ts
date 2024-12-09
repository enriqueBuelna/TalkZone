import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminRepository } from '../../repositories/admin.repository';
@Injectable({
  providedIn: 'root',
})
export class DeleteContent {
  constructor(private adminRepository: AdminRepository) {}

  execute(
    type: string,
    report_id: string
  ): Observable<boolean> {
    return this.adminRepository.deleteContent(type, report_id);
  }
}

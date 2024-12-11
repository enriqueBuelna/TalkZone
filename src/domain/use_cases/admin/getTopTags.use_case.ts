import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminRepository } from '../../repositories/admin.repository';
import { CountTag } from '../../models/admin/tagPost.model';
@Injectable({
  providedIn: 'root',
})
export class GetTopTags {
  constructor(private adminRepository: AdminRepository) {}

  execute(): Observable<CountTag[]> {
    return this.adminRepository.getTopTags();
  }
}
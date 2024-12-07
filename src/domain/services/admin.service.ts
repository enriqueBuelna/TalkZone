import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetPrincipalStats } from '../use_cases/admin/getPrincipalStats.use_case';
import { PrincipalStats } from '../models/admin/PrincipalStats.model';
import { GetAllUsers } from '../use_cases/admin/getAllUsers.use_case';
import { DataUser } from '../models/admin/dataUser.model';
import { GetMostFollowed } from '../use_cases/admin/getMostFollowed.use_case';
import { GetDetailUser } from '../use_cases/admin/getDetailUser.use_case';
import { DetailUser } from '../models/admin/DetailUser.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private _getPrincipalStats: GetPrincipalStats,
    private _getAllUsers: GetAllUsers,
    private _getMostFollowed: GetMostFollowed,
    private _getDetailUser: GetDetailUser
  ) {}

  getDetailUser(user_id:string): Observable<DetailUser> {
    return this._getDetailUser.execute(user_id);
  }

  getMostFollowed(): Observable<DataUser[]> {
    return this._getMostFollowed.execute();
  }

  getPrincipalStats(): Observable<PrincipalStats> {
    return this._getPrincipalStats.execute();
  }

  getAllUsers(): Observable<DataUser[]> {
    return this._getAllUsers.execute();
  }
}

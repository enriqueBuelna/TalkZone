import { Observable } from "rxjs";
import { PrincipalStats } from "../models/admin/PrincipalStats.model";
import { DataUser } from "../models/admin/dataUser.model";
import { DetailUser } from "../models/admin/DetailUser.model";
export abstract class AdminRepository {
    abstract getPrincipalStats():Observable<PrincipalStats>;
    abstract getAllUsers():Observable<DataUser[]>;
    abstract getMostFollowed():Observable<DataUser[]>;
    abstract getDetailUser(user_id:string):Observable<DetailUser>;
}
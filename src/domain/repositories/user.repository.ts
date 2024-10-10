// src/app/core/repositories/user.repository.ts
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

export abstract class UserRepository {
  abstract register(user: User): Observable<User>;
  abstract login(user:User): Observable<User>;
}

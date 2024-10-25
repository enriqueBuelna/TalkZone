// src/app/core/domain/user.ts
export class User {
    constructor(
      public id: string,
      public username: string | null,
      public email: string | null,
      public password: string | null,  // Solo para registro, nunca debe ser expuesto en el frontend
      public date_of_birth: string | null,
      public gender: string | null,
      public is_profile_complete: boolean
    ) {}
  }
  
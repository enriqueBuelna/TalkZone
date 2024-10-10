// src/app/core/domain/user.ts
export class User {
    constructor(
      public id: number | null,
      public username: string,
      public email: string,
      public password: string,  // Solo para registro, nunca debe ser expuesto en el frontend
      public dateOfBirth: Date,
      public gender: string,
    ) {}
  }
  
import { Injectable } from '@angular/core';
import { User } from '../../../../domain/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser!: User;
  private tokenKey: string = 'authToken'; // Clave para almacenar el token en localStorage

  constructor() {}

  // Método para guardar el token en localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getUserId(): string {
    return this.currentUser.id;
  }

  //newUser
  isNewUser(): boolean {
    console.log(this.currentUser.is_profile_complete);
    return this.currentUser.is_profile_complete;
  }

  // Método para obtener el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Método para eliminar el token y los datos del usuario al cerrar sesión
  clearAuthData(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUser = {
      id: '',
      username: null,
      email: null,
      date_of_birth: null,
      password: null,
      gender: null,
      is_profile_complete: false,
    };
  }

  // Método para guardar los datos del usuario en memoria
  setUser(user: User): void {
    this.currentUser = user;
  }

  // Método para obtener los datos del usuario
  getUser(): User {
    return this.currentUser;
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken(); // Retorna true si hay un token, de lo contrario false
  }
}

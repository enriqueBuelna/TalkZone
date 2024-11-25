import { Injectable } from '@angular/core';
import { User } from '../../../../domain/models/user.model';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUser!: User;
  private tokenKey: string = 'authToken'; // Clave para almacenar el token en localStorage
  private user_id: string = '';

  constructor() {
    this.loadUserFromToken();
  }

  // Método para guardar el token en localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  isProfileComplete() {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.user_id = decodedToken.id;
      return decodedToken.is_profile_complete;
    }
  }
  //newUser
  isNewUser(): boolean {
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
      profile_pic: null,
    };
  }

  // Método para guardar los datos del usuario en memoria
  setUser(user: User): void {
    this.currentUser = user;
    this.user_id = user.id;
  }

  // Método para obtener los datos del usuario
  getUser(): User {
    return this.currentUser;
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken(); // Retorna true si hay un token, de lo contrario false
  }

  loadUserFromToken(): void {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.user_id = decodedToken.id;
    } else {
      console.log('hola');
    }
  }

  getUserId(): string {
    return this.user_id;
  }
}

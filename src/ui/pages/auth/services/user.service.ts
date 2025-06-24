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

  whatType() {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.user_role === 'admin') {
        return true;
      }
      return false;
    }
    return false;
  }

  isBanned(){
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.is_banned) {
        return true;
      }
      return false;
    }
    return false;
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
      is_banned: false
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
    }
  }

  setProfileComplete(complete: boolean): void {
    this.currentUser.is_profile_complete = complete;

    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      decodedToken.is_profile_complete = complete;

      // Re-encode the token with the updated value
      const updatedToken = btoa(JSON.stringify(decodedToken)); // Simulating token encoding
      this.setToken(updatedToken);
    }
  }

  getUserId(): string {
    return this.user_id;
  }
}

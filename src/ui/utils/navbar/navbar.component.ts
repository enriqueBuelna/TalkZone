import { Component, EventEmitter, Output } from '@angular/core';
import { List_itemApp } from './list_item/list_item.component';
import { UserService } from '../../pages/auth/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [List_itemApp],
  styleUrl: './navbar.component.css',
})
export class NavbarApp {
  options: any;

  constructor(private _userService: UserService) {
    this.options = [
      {
        name: 'Inicio',
        where: '/home/posts',
        icon: 'pi pi-home',
        badge: false,
      },
      {
        name: 'Salas de voz',
        where: '/home/voice_room',
        icon: 'pi pi-microphone',
        badge: false,
      },
      {
        name: 'Mensajes',
        where: '/home/messages',
        icon: 'pi pi-envelope',
        badge: true,
      },
      {
        name: 'Conectar',
        where: '/home/connect',
        icon: 'pi pi-user-plus',
        badge: false,
      },
      { name: 'Grupos', where: '/groups', icon: 'pi pi-users', badge: false },
      {
        name: 'Notificaciones',
        where: '/notifications',
        icon: 'pi pi-bell',
        badge: true,
      },
      {
        name: 'Perfil',
        where: `/home/profile/${this._userService.getUserId()}`,
        icon: 'pi pi-user',
        badge: false,
      },
      {
        name: 'Configuración',
        where: '/configuration',
        icon: 'pi pi-cog',
        badge: false,
      },
    ];
  }
}

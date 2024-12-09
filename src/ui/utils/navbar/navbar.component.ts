import {
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { List_itemApp } from './list_item/list_item.component';
import { UserService } from '../../pages/auth/services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../domain/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserDemo } from '../../../domain/models/user-demo.model';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [List_itemApp, CommonModule],
  styleUrl: './navbar.component.css',
})
export class NavbarApp implements OnInit{
  goToHome() {
    this._router.navigate(['home','posts']);
  }
  options: any;

  constructor(
    private _userService: UserService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private _router: Router,
    private _authService : AuthService,
    private _destroyRef: DestroyRef
  ) {
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
      {
        name: 'Grupos',
        where: '/home/groups',
        icon: 'pi pi-users',
        badge: false,
      },
      {
        name: 'Notificaciones',
        where: '/home/notifications',
        icon: 'pi pi-bell text-3xl',
        badge: true,
      },
      {
        name: 'Perfil',
        where: `/home/profile/${this._userService.getUserId()}`,
        icon: 'pi pi-user',
        badge: false,
      },
      // {
      //   name: 'Configuración',
      //   where: '/home/configuration',
      //   icon: 'pi pi-cog',
      //   badge: false,
      // },
    ];
  }
  showTooltip = false;
  userDemo !: UserDemo;
  ngOnInit(): void {
    this._authService.getBasicInfo(this._userService.getUserId()).pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: el => { 
        this.userDemo = el;
      }
    })
  }

  toggleTooltip() {
    this.showTooltip = !this.showTooltip;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (
      this.showTooltip &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.renderer.setStyle(
        this.elementRef.nativeElement.querySelector('.tooltip'),
        'display',
        'none'
      );
      this.showTooltip = false;
    }
  }

  closeSesion() {
    this._userService.clearAuthData();
    this._router.navigate(['']);
  }
}

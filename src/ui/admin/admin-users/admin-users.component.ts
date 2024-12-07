import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [TableModule, CommonModule, RouterOutlet, RouterLink],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css',
})
export class AdminUsersComponent {
  modules = [
    {
      name: 'Listado de usuarios',
      icon: 'list',
      description: 'Vista completa de todos los usuarios registrados',
      where: 'all-users',
    },
    {
      name: 'Información de usuario',
      icon: 'user',
      description: 'Detalles completos de cada perfil',
      where: 'detail-user',
    },
    {
      name: 'Usuarios problemáticos',
      icon: 'alert-triangle',
      description: 'Gestión de usuarios con reportes o incidencias',
      where: 'user-problems',
    },
  ];

  constructor(private router:Router, private route:ActivatedRoute){

  }

  showDashboardModules = true;
  ngOnInit(): void {
    this.checkRoute();

    // Escuchar cambios de navegación para actualizar `showDashboardModules`
    this.router.events.subscribe(() => {
      this.checkRoute();
    });
  }

  private checkRoute(): void {
    // Verificar si la ruta es exactamente `admin/users`
    this.showDashboardModules = this.router.url === '/admin/users';
  }
}

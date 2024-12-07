import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { signal } from '@angular/core';
import { AdminService } from '../../../domain/services/admin.service';
import { PrincipalStats } from '../../../domain/models/admin/PrincipalStats.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
interface QuickStat {
  icon: string;
  title: string;
  value: number;
  change: number;
}

interface RecentActivity {
  type: string;
  description: string;
  timestamp: Date;
}
@Component({
  selector: 'app-principal-admin',
  standalone: true,
  imports: [CommonModule, ProgressSpinnerModule],
  templateUrl: './principal-admin.component.html',
  styleUrl: './principal-admin.component.css',
})
export class PrincipalAdminComponent {
  yetNo = signal(true);
  stats = signal<PrincipalStats>(new PrincipalStats(0, 0, 0, 0));

  reportedContent = [
    {
      id: 1,
      user: 'Juan Pérez',
      content: 'Comentario inapropiado en sala de Tecnología',
      date: '2024-02-15',
      reason: 'Lenguaje ofensivo',
    },
    {
      id: 2,
      user: 'María González',
      content: 'Publicación con contenido no relacionado',
      date: '2024-02-14',
      reason: 'Spam',
    },
  ];

  activeSoundRooms = [
    {
      id: 1,
      host: 'Carlos Ramírez',
      topic: 'Innovación Tecnológica',
      participants: 12,
      startTime: '14:30',
    },
    {
      id: 2,
      host: 'Laura Martínez',
      topic: 'Desarrollo Personal',
      participants: 8,
      startTime: '15:45',
    },
  ];

  ///

  // Platform Overview
  platformName = 'TalkZone';
  platformDescription =
    'Red social para conectar personas por intereses comunes';

  // Quick Stats
  quickStats: QuickStat[] = [
    {
      icon: 'users',
      title: 'Usuarios Totales',
      value: this.stats().getUsers(),
      change: 12.5, // Percentage increase
    },
    {
      icon: 'message-circle',
      title: 'Publicaciones totales',
      value: this.stats().getPost(),
      change: 8.3,
    },
    {
      icon: 'mic',
      title: 'Salas de Voz',
      value: this.stats().getVr(),
      change: 15.7,
    },
    {
      icon: 'globe',
      title: 'Grupos totales',
      value: this.stats().getGroups(),
      change: 5.2,
    },
  ];

  // Recent Activities
  recentActivities: RecentActivity[] = [
    {
      type: 'Nuevo Usuario',
      description: 'María Rodríguez se unió a la comunidad de Tecnología',
      timestamp: new Date(),
    },
    {
      type: 'Sala de Voz',
      description: 'Iniciada sala "Innovación en IA" con 45 participantes',
      timestamp: new Date(),
    },
    {
      type: 'Comunidad',
      description: 'Nueva comunidad creada: Desarrolladores Web',
      timestamp: new Date(),
    },
    {
      type: 'Publicación Destacada',
      description:
        'Publicación sobre Machine Learning alcanza 500 interacciones',
      timestamp: new Date(),
    },
  ];

  // Top Themes
  topThemes = [
    { name: 'Tecnología', users: 1245, growth: 18.5 },
    { name: 'Programación', users: 987, growth: 15.2 },
    { name: 'Diseño', users: 765, growth: 12.7 },
    { name: 'Música', users: 543, growth: 10.3 },
    { name: 'Ciencia', users: 432, growth: 9.1 },
  ];

  constructor(
    private _adminService: AdminService,
    private _destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this._adminService
      .getPrincipalStats()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (el) => {
          this.yetNo.set(false);
          this.stats.set(
            new PrincipalStats(
              el.getUsers(),
              el.getPost(),
              el.getVr(),
              el.getGroups()
            )
          );
        },
        error: (error) => {},
      });
  }

  // Helper method to format change percentage
  formatChangePercentage(change: number): string {
    return change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
  }
}

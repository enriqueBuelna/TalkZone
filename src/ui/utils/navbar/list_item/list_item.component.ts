import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { NotService } from '../../../pages/notifications/services/notifications.service';

@Component({
  selector: 'app-navbar_list-item',
  templateUrl: './list_item.component.html',
  standalone: true,
  imports: [RouterLink, CommonModule, BadgeModule],
  styleUrl: './list_item.component.css',
})
export class List_itemApp {
  @Input() label!: string;             // Etiqueta del item (ej: Home, Profile)
  @Input() link!: string;              // Enlace para el router
  @Input() notificationCount?: number; // Contador de notificaciones (opcional)
  @Input() icon?:string;
  @Input() badge?:boolean;
  constructor(public _notService:NotService){

  }
}

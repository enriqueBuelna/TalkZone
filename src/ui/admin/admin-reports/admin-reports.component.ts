import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface StatItem {
  name: string;
  count: number;
}
@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reports.component.html',
  styleUrl: './admin-reports.component.css',
})
export class AdminReportsComponent {
  // User Statistics
  totalUsers: number = 0;
  activeUsers: number = 0;

  // Recent Activity
  recentPublications: number = 0;
  recentRooms: number = 0;

  // Top Topics
  topTopics: StatItem[] = [];

  // Top Tags
  topTags: StatItem[] = [];

  // Voice Rooms
  openVoiceRooms: number = 0;
  voiceTopics: StatItem[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    // Mock data - replace with actual service call
    this.totalUsers = 5234;
    this.activeUsers = 1876;
    this.recentPublications = 342;
    this.recentRooms = 45;
    this.openVoiceRooms = 12;

    this.topTopics = [
      { name: 'Tecnología', count: 124 },
      { name: 'Música', count: 98 },
      { name: 'Deportes', count: 87 },
      { name: 'Cine', count: 76 },
      { name: 'Videojuegos', count: 65 },
    ];

    this.topTags = [
      { name: '#innovación', count: 56 },
      { name: '#startup', count: 42 },
      { name: '#desarrolladores', count: 38 },
      { name: '#ai', count: 33 },
      { name: '#tech', count: 29 },
    ];

    this.voiceTopics = [
      { name: 'Programación', count: 45 },
      { name: 'Diseño', count: 32 },
      { name: 'Emprendimiento', count: 28 },
      { name: 'Gaming', count: 25 },
      { name: 'Ciencia', count: 20 },
    ];
  }
}

import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../domain/services/admin.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CuriosStats } from '../../../domain/models/admin/CuriosStats.model';
import { CountTopic } from '../../../domain/models/admin/topicPost.model';
import { TopHosts } from '../../../domain/models/admin/TopHost.model';
interface StatItem {
  name: string;
  count: number;
}
@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, ProgressSpinnerModule],
  templateUrl: './admin-reports.component.html',
  styleUrl: './admin-reports.component.css',
})
export class AdminReportsComponent implements OnInit {
  // User Statistics
  constructor(
    private _adminService: AdminService,
    private _destroyRef: DestroyRef
  ) {}
  yetNoStats = signal(true);
  totalUsers: number = 0;
  activeUsers: number = 0;
  userTimePeriod = '7days';
  activityTimePeriod = '7days';
  voiceRoomTimePeriod = '7days';
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

  allCuriosStats!: CuriosStats;

  topFiveTopics = signal(true);
  topFiveRoom = signal(true);
  topFiveHost = signal(true);
  topicFiveTopicsTheme!: CountTopic[];
  topicFiveTopicsRoom!: CountTopic[];
  topFiveHosts!: TopHosts[];
  ngOnInit(): void {
    this.loadStatistics();
    this._adminService
      .getCuriosStats()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (el) => {
          this.yetNoStats.set(false);
          console.log(el);
          this.allCuriosStats = el;
        },
        error: (error) => {},
      });

    this._adminService
      .getTopFiveTopicTheme()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (el) => {
          this.topFiveTopics.set(false);
          this.topicFiveTopicsTheme = el;
        },
        error: (error) => {},
      });

    this._adminService
      .getTopFiveTopicRoom()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (el) => {
          this.topFiveRoom.set(false);
          this.topicFiveTopicsRoom = el;
        },
        error: (error) => {},
      });

    this._adminService.getTopFiveHosts().pipe(takeUntilDestroyed(this._destroyRef)).subscribe({
      next: el => {
        this.topFiveHost.set(false);
        this.topFiveHosts = el;
        console.log(el);
      }, 
      error: error => {
        console.log(error);
      }
    })
  }

  generateStars(stars: number): string[] {
    const fullStars = Array(stars).fill('★');
    const emptyStars = Array(5 - stars).fill('☆');
    return [...fullStars, ...emptyStars];
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

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ModerationReport {
  id: number;
  reporter_id: string;
  reported_user_id: string;
  post_id?: number;
  comment_id?: number;
  room_id?: number;
  message_id?: number;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  created_at: Date;
  resolved_at?: Date;
  reporter_username?: string;
  reported_username?: string;
}
@Component({
  selector: 'app-admin-user-problems',
  templateUrl: './admin-user-problems.component.html',
  styleUrls: ['./admin-user-problems.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ModerationReportsComponent implements OnInit {
  MOCK_MODERATION_REPORTS = [
    {
      id: 1,
      reporter_id: 'user123',
      reported_user_id: 'user456',
      reporter_username: 'Carlos Martínez',
      reported_username: 'Juan Pérez',
      post_id: 42,
      reason: 'Contenido ofensivo y lenguaje inapropiado',
      status: 'pending',
      created_at: new Date('2024-02-15T10:30:00'),
      resolved_at: null
    },
    {
      id: 2,
      reporter_id: 'user789',
      reported_user_id: 'user101',
      reporter_username: 'María García',
      reported_username: 'Luis Rodriguez',
      comment_id: 156,
      reason: 'Acoso y comentarios discriminatorios',
      status: 'pending',
      created_at: new Date('2024-02-14T15:45:00'),
      resolved_at: null
    },
    {
      id: 3,
      reporter_id: 'user202',
      reported_user_id: 'user303',
      reporter_username: 'Ana Sánchez',
      reported_username: 'Pedro Gómez',
      room_id: 22,
      reason: 'Comportamiento inapropiado en sala de voz',
      status: 'resolved',
      created_at: new Date('2024-02-10T09:15:00'),
      resolved_at: new Date('2024-02-12T11:20:00')
    },
    {
      id: 4,
      reporter_id: 'user404',
      reported_user_id: 'user505',
      reporter_username: 'Roberto Fernández',
      reported_username: 'Elena Torres',
      post_id: 67,
      reason: 'Spam y publicidad no autorizada',
      status: 'dismissed',
      created_at: new Date('2024-02-05T18:20:00'),
      resolved_at: new Date('2024-02-08T14:30:00')
    },
    {
      id: 5,
      reporter_id: 'user606',
      reported_user_id: 'user707',
      reporter_username: 'Laura Ruiz',
      reported_username: 'Diego Morales',
      comment_id: 189,
      reason: 'Información falsa y desinformación',
      status: 'pending',
      created_at: new Date('2024-02-12T20:10:00'),
      resolved_at: null
    },
    {
      id: 6,
      reporter_id: 'user808',
      reported_user_id: 'user909',
      reporter_username: 'Miguel Jiménez',
      reported_username: 'Sofía Navarro',
      room_id: 45,
      reason: 'Interrupciones continuas y falta de respeto',
      status: 'resolved',
      created_at: new Date('2024-02-08T16:55:00'),
      resolved_at: new Date('2024-02-11T10:40:00')
    }
  ];
  reports = this.MOCK_MODERATION_REPORTS;
  filteredReports:any = [];
  selectedReport: ModerationReport | null = null;

  // Filters
  statusFilter: string = 'all';
  searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.applyFilters();
  }

  fetchReports() {
    // // Simulate API call - replace with actual endpoint
    // this.http.get<ModerationReport[]>('/api/moderation-reports').subscribe({
    //   next: (data) => {
    //     this.reports = data;
    //     this.applyFilters();
    //   },
    //   error: (err) => {
    //     console.error('Error fetching reports', err);
    //   },
    // });
  }

  applyFilters() {
    this.filteredReports = this.reports.filter((report) => {
      // Status filter
      const statusMatch =
        this.statusFilter === 'all' || report.status === this.statusFilter;

      // Search term filter
      const searchMatch =
        !this.searchTerm ||
        report.reporter_username
          ?.toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        report.reported_username
          ?.toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        report.reason.toLowerCase().includes(this.searchTerm.toLowerCase());

      return statusMatch && searchMatch;
    });
  }

  updateReportStatus(
    report: ModerationReport,
    status: 'resolved' | 'dismissed'
  ) {
    // Simulate status update - replace with actual API call
    this.http
      .patch(`/api/moderation-reports/${report.id}`, { status })
      .subscribe({
        next: () => {
          report.status = status;
          report.resolved_at = new Date();
          this.applyFilters();
        },
        error: (err) => {
          console.error('Error updating report status', err);
        },
      });
  }

  viewReportDetails(report: ModerationReport) {
    this.selectedReport = report;
  }

  closeReportDetails() {
    this.selectedReport = null;
  }
}

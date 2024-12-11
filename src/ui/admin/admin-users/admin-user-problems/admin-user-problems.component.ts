import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdminService } from '../../../../domain/services/admin.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ModerationReport } from '../../../../domain/models/admin/moderation_report.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
// interface ModerationReport {
//   id: number;
//   reporter_id: string;
//   reported_user_id: string;
//   post_id?: number;
//   comment_id?: number;
//   room_id?: number;
//   message_id?: number;
//   reason: string;
//   status: 'pending' | 'resolved' | 'dismissed';
//   created_at: Date;
//   resolved_at?: Date;
//   reporter_username?: string;
//   reported_username?: string;
// }
@Component({
  selector: 'app-admin-user-problems',
  templateUrl: './admin-user-problems.component.html',
  styleUrls: ['./admin-user-problems.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
  ],
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
      resolved_at: null,
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
      resolved_at: null,
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
      resolved_at: new Date('2024-02-12T11:20:00'),
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
      resolved_at: new Date('2024-02-08T14:30:00'),
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
      resolved_at: null,
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
      resolved_at: new Date('2024-02-11T10:40:00'),
    },
  ];
  reports!: ModerationReport[];
  filteredReports: ModerationReport[] = [];
  selectedReport!: ModerationReport | null;

  // Filters
  statusFilter: string = 'all';
  searchTerm: string = '';
  yetNo = signal(true);
  constructor(
    private _adminService: AdminService,
    private _destroyRef: DestroyRef,
    private _formBuilder: FormBuilder
  ) {
    this.formMessage = this._formBuilder.group({
      message: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this._adminService
      .getAllModerationReports()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (el) => {
          this.yetNo.set(true);
          this.reports = el;
          this.applyFilters();
        },
        error: (error) => {
          console.log(error);
        },
      });
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
        this.statusFilter === 'all' || report.getStatus() === this.statusFilter;

      // Search term filter
      const searchMatch =
        !this.searchTerm ||
        report
          .getReporter()
          ?.toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        report
          .getReported()
          ?.toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        report
          .getReason()
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());

      return statusMatch && searchMatch;
    });
  }
  type = '';
  yetNoDetails = signal(true);
  publicationReported: any;
  contentRemove = signal(false);
  messageRead = signal(false);
  viewReportDetails(id: number, type: string, report: any) {
    this.messageRead.set(false);
    this.selectedReport = report;
    this.type = type;
    if (this.type === null) {
      type = 'remove';
      this.type = 'remove';
    }
    this._adminService
      .getModerationReportById(id, type)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (el) => {
          if (el.length === 2) {
            this.messageRead.set(true);
            console.log(el[0]);
            this.contentRemove.set(true);
            this.publicationReported = el[0];
            this.publicationReported
            this.yetNoDetails.set(false);
            this.yeah.set(true);
          } else {
            if (el.action) {
              this.contentRemove.set(true);
            } else {
              this.publicationReported = el;
            }
            this.yetNoDetails.set(false);
            this.yeah.set(true);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  yeah = signal(false);

  closeReportDetails() {
    this.yeah.set(false);
    this.publicationReported = null;
    this.selectedReport = null;
    this.yetNoDetails.set(true);
    this.type = '';
  }
  resolveProblemo = signal(false);
  resolveProblem(id: ModerationReport | undefined) {
    if (id) {
      this.moderationReport = id;
    } else {
      this.moderationReport = undefined;
    }
    this.resolveProblemo.set(!this.resolveProblemo());
  }
  moderationReport!: ModerationReport | undefined;
  deleteContent() {
    let type = this.moderationReport?.getType() || '';
    let id = this.moderationReport?.getId() || 0;

    this._adminService
      .deleteContent(type, id.toString())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (el) => {
          if (el) {
            this.resolveProblemo.set(!this.resolveProblemo());
            this.moderationReport?.setStatus();
          }
        },
      });
  }
  sendDm = signal(false);
  sendMessage() {
    this.sendDm.set(!this.sendDm());
  }

  bannedUser = signal(false);
  bannUser(){
    this.bannedUser.set(!this.bannedUser());
  }
  rejReport = signal(false);
  rejectReport(){ 
    this.rejReport.set(!this.rejReport());
  }
  formMessage!: FormGroup;

  sendWarning() {
    if (this.formMessage.valid) {
      let { message } = this.formMessage.value;
      let report_user_id = this.moderationReport?.getReportedId() || '';
      let id = this.moderationReport?.getId() || 0;
      this._adminService
        .sendWarning(message, report_user_id, id.toString())
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({
          next: (el) => {
            this.resolveProblemo.set(!this.resolveProblemo());
            this.moderationReport?.setStatus();
          },
        });
    }
  }
}

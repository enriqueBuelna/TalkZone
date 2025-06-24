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

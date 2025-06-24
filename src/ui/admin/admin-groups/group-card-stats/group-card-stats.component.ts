import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { DetailUser } from '../../../../domain/models/admin/DetailUser.model';
import { AdminService } from '../../../../domain/services/admin.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DetailGroup } from '../../../../domain/models/admin/DetailGroup.model';

@Component({
  selector: 'app-group-card-stats',
  standalone: true,
  imports: [ProgressSpinnerModule],
  templateUrl: './group-card-stats.component.html',
  styleUrl: './group-card-stats.component.css'
})
export class GroupCardStatsComponent implements OnInit{
  constructor(
    private _route: ActivatedRoute,
    private _adminService: AdminService,
    private _destroyRef: DestroyRef
  ) {}
  user!: DetailGroup;
  notFound = signal(false);
  userId = signal('');
  yetNo = signal(true);

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      this.yetNo.set(true);
      this.userId.set(params.get('detail-group') || '');
      if (this.userId().length) {
        this.loadProfileData(); // Método para recargar la información
      } else {
        this.yetNo.set(false);
        this.notFound.set(true);
      }
    });
  }

  loadProfileData() {
    this._adminService
      .getGroupStats(parseInt(this.userId()))
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (el) => {
          this.yetNo.set(false);
          this.notFound.set(false);
          this.user = el;
        },
        error: (error) => {
        },
      });
  }
}

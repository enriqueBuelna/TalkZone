import { Component, DestroyRef, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DetailUser } from '../../../../../domain/models/admin/DetailUser.model';
import { AdminService } from '../../../../../domain/services/admin.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-card-stats',
  standalone: true,
  imports: [ProgressSpinnerModule],
  templateUrl: './user-card-stats.component.html',
  styleUrl: './user-card-stats.component.css',
})
export class UserCardStatsComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _adminService: AdminService,
    private _destroyRef: DestroyRef
  ) {}
  user!: DetailUser;
  notFound = signal(false);
  userId = signal('');
  yetNo = signal(true);

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      this.yetNo.set(true);
      this.userId.set(params.get('user_id') || '');
      if (this.userId().length === 36) {
        this.loadProfileData(); // Método para recargar la información
      } else {
        this.yetNo.set(false);
        this.notFound.set(true);
      }
    });
  }

  loadProfileData() {
    this._adminService
      .getDetailUser(this.userId())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (el) => {
          this.yetNo.set(false);
          this.notFound.set(false);
          this.user = el;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}

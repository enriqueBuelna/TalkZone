import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { AdminService } from '../../../../domain/services/admin.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-admin-all-users',
  standalone: true,
  imports: [TableModule, SkeletonModule, CommonModule],
  templateUrl: './admin-all-users.component.html',
  styleUrl: './admin-all-users.component.css',
})
export class AdminAllUsersComponent implements OnInit {
  constructor(
    private _adminService: AdminService,
    private _destroyRef: DestroyRef
  ) {}
  yetNo = signal(true);
  ngOnInit(): void {
    this.onChange();
  }
  toggleTopFollowed() {
    this.showTopFollowed = !this.showTopFollowed;
    this.yetNo.set(true);
    this.onChange();
  }

  onChange() {
    if (!this.showTopFollowed) {
      this._adminService
        .getAllUsers()
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({
          next: (el) => {
            this.yetNo.set(false);
            this.users = el;
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      this._adminService
        .getMostFollowed()
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe({
          next: (el) => {
            this.yetNo.set(false);
            this.users = el;
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
  showTopFollowed = false;
  users: any = [];
}

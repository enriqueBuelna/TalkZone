import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { AdminService } from '../../../../domain/services/admin.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../../../utils/button/button.component";
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-all-users',
  standalone: true,
  imports: [TableModule, SkeletonModule, CommonModule, ButtonComponent],
  templateUrl: './admin-all-users.component.html',
  styleUrl: './admin-all-users.component.css',
})
export class AdminAllUsersComponent implements OnInit {
  constructor(
    private _adminService: AdminService,
    private _destroyRef: DestroyRef,
    private _router:Router
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
          },
        });
    }
  }
  showTopFollowed = false;
  users: any = [];

  goToUser(id:string){
    this._router.navigate(['/admin/users/detail-user', id]);
  }
}

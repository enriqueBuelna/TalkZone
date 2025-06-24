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
      if (this.userId()) {
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
        },
      });
  }

  verifyUser() {
    this._adminService
      .verifyUser(this.userId())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (el) => {
          this._adminService
            .sendWarning(
              `¡Felicidades! 🎉
Tu excelente desempeño y compromiso han sido reconocidos oficialmente. Acabas de ser verificado, lo que demuestra el alto nivel de calidad y confiabilidad que has demostrado constantemente.✅

Ahora puedes hacer salas de voz privadas, proximamente tendras mas beneficios

Gracias por seguir destacando y mantener los más altos estándares. ¡Sigue así! 💪✨`,
              this.userId(),
              ''
            )
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe({
              next: (el) => {
                this.user.setVerify(true);
              },
            });
        },
        error: (error) => {},
      });
  }

  unverifyUser() {
    this._adminService
      .unverifyUser(this.userId())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (el) => {
          this.user.setVerify(false);
        },
        error: (error) => {},
      });
  }
}

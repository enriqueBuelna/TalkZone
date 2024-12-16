import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../../utils/header/header.component';
import { UserDemo } from '../../../../domain/models/user-demo.model';
import { UserService } from '../../auth/services/user.service';
import { AuthService } from '../../../../domain/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-accesibility',
  standalone: true,
  imports: [HeaderComponent, ProgressSpinnerModule, ProgressBarModule],
  templateUrl: './accesibility.component.html',
  styleUrl: './accesibility.component.css',
})
export class AccesibilityComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _destroyRef: DestroyRef
  ) {}
  where = 'home';
  title = 'Privacidad';
  active = signal(false);
  blocked!: UserDemo[];
  ngOnInit(): void {
    this._authService
      .getBlockUser(this._userService.getUserId())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (el) => {
          if (el.length > 0) {
            this.empty.set(false);
            this.blocked = el;
          }
        },
        error: (error) => {},
      });
  }
  goTo(option: string) {
    this.active.set(true);
    this.where = option;
    this.title = option;
  }

  goToHome() {
    this.title = 'Privacidad';
    this.where = 'home';
    this.active.set(!this.active());
  }
  empty = signal(true);
  unblockUser = signal(false);
  user_id = '';
  unblock(user_id: string) {
    this.user_id = user_id;
    this.unblockUser.set(!this.unblockUser());
  }
  onGoing = signal(false);
  unblockForReal() {
    this.onGoing.set(true);
    this._authService
      .unblockUser(this._userService.getUserId(), this.user_id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (el) => {
          this.onGoing.set(false);
          this.blocked = this.blocked.filter(el => el.getUserId() !== this.user_id);
          if(this.blocked.length === 0){
            this.empty.set(true);
          }
          this.unblock('');
        },
        error: (error) => {

        },
      });
  }
}

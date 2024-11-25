import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../ui/pages/auth/services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService = inject(UserService);
  const router = inject(Router);
  if (_authService.getToken()) {
    return true
  } else {
    router.navigateByUrl('');
    return false;
  }
};
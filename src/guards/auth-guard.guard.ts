import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../ui/pages/auth/services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService = inject(UserService);
  const router = inject(Router);
  if (_authService.getToken()) {
    if(_authService.isBanned()){
      router.navigateByUrl('banned');
      return false;
    }
    if (_authService.whatType()) {
      router.navigateByUrl('');
      return false;
    }
    return true;
  } else {
    router.navigateByUrl('');
    return false;
  }
};

export const adminGuard: CanActivateFn = (route, state) => {
  const _authService = inject(UserService);
  const router = inject(Router);
  if (_authService.whatType()) {
    return true;
  } else {
    router.navigateByUrl('');
    return false;
  }
};

export const isVerify: CanActivateFn = (route, state) => {
  const _authService = inject(UserService);
  const router = inject(Router);
  if (_authService.getToken()) {
    if (_authService.whatType()) {
      router.navigateByUrl('/admin');
    } else {
      router.navigateByUrl('/home/posts');
    }
    return false;
  } else {
    return true;
  }
};

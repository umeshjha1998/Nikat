import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('nikat_token');
  const userJson = localStorage.getItem('nikat_user');

  if (!token || !userJson) {
    router.navigate(['/admin-login']);
    return false;
  }

  try {
    const user = JSON.parse(userJson);
    if (user.role === 'ADMIN') {
      return true;
    }
  } catch {
    // Invalid JSON in localStorage
  }

  // Authenticated but not admin — redirect to homepage
  router.navigate(['/']);
  return false;
};

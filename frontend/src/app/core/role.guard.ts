import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * A flexible guard factory or function to check for specific user roles or conditions.
 * Usage in app.routes.ts: 
 * { path: 'shop-dashboard', canActivate: [roleGuard], data: { expectedRole: 'SHOP_OWNER' } }
 */
export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  const token = localStorage.getItem('nikat_token');
  const user = authService.currentUser;

  // 1. Basic check: Must be logged in
  if (!token || !user) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  // 2. Role check based on route data
  const expectedRole = route.data['expectedRole'];
  const expectedCondition = route.data['expectedCondition']; // e.g., 'isShopOwner' or 'isServiceProvider'

  if (expectedRole && user.role !== expectedRole) {
    console.warn(`Access denied: Expected role ${expectedRole}, but user has ${user.role}`);
    router.navigate(['/']);
    return false;
  }

  if (expectedCondition) {
    if (expectedCondition === 'isShopOwner' && !user.isShopOwner) {
      router.navigate(['/']);
      return false;
    }
    if (expectedCondition === 'isServiceProvider' && !user.isServiceProvider) {
      router.navigate(['/']);
      return false;
    }
  }

  return true;
};

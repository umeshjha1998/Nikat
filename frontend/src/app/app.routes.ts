import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  // Public Pages
  { path: '', loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent) },
  { path: 'browse', loadComponent: () => import('./features/shops/browse/browse.component').then(c => c.BrowseComponent) },
  { path: 'shop/:id', loadComponent: () => import('./features/shops/detail/shop-detail.component').then(c => c.ShopDetailComponent) },
  { path: 'services', loadComponent: () => import('./features/services/services.component').then(c => c.ServicesComponent) },
  { path: 'book-service', loadComponent: () => import('./features/services/booking/service-booking.component').then(c => c.ServiceBookingComponent) },
  { path: 'book-service/:id', loadComponent: () => import('./features/services/booking/service-booking.component').then(c => c.ServiceBookingComponent) },
  { path: 'community', loadComponent: () => import('./features/community/community.component').then(c => c.CommunityComponent) },
  { path: 'reviews', loadComponent: () => import('./features/reviews/reviews.component').then(c => c.ReviewsComponent) },
  { path: 'search', loadComponent: () => import('./features/search/search-results.component').then(c => c.SearchResultsComponent) },

  // Auth Pages
  { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(c => c.LoginComponent) },
  { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(c => c.RegisterComponent) },
  { path: 'forgot-password', loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent) },
  { path: 'reset-password', loadComponent: () => import('./features/auth/reset-password/reset-password.component').then(c => c.ResetPasswordComponent) },
  { path: 'verify-otp', loadComponent: () => import('./features/auth/otp-verification/otp-verification.component').then(c => c.OtpVerificationComponent) },
  { path: 'admin-login', loadComponent: () => import('./features/auth/admin-login/admin-login.component').then(c => c.AdminLoginComponent) },

  // Protected — Dashboards
  { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./features/dashboard/dashboard.component').then(c => c.DashboardComponent) },
  { path: 'shop-dashboard', canActivate: [authGuard], loadComponent: () => import('./features/dashboard/shop-owner/shop-owner-dashboard.component').then(c => c.ShopOwnerDashboardComponent) },
  { path: 'provider-dashboard', canActivate: [authGuard], loadComponent: () => import('./features/dashboard/service-provider/service-provider-dashboard.component').then(c => c.ServiceProviderDashboardComponent) },

  // Checkout Flow
  { path: 'checkout/cart', loadComponent: () => import('./features/checkout/cart/cart.component').then(c => c.CartComponent) },
  { path: 'checkout/shipping', canActivate: [authGuard], loadComponent: () => import('./features/checkout/shipping/shipping.component').then(c => c.ShippingComponent) },
  { path: 'checkout/payment', canActivate: [authGuard], loadComponent: () => import('./features/checkout/payment/payment.component').then(c => c.PaymentComponent) },

  // Admin Panel
  { path: 'admin', canActivate: [authGuard], loadComponent: () => import('./features/admin/admin-dashboard.component').then(c => c.AdminDashboardComponent) },
  { path: 'admin/users', canActivate: [authGuard], loadComponent: () => import('./features/admin/users/admin-users.component').then(c => c.AdminUsersComponent) },
  { path: 'admin/shops', canActivate: [authGuard], loadComponent: () => import('./features/admin/shops/admin-shops.component').then(c => c.AdminShopsComponent) },
  { path: 'admin/services', canActivate: [authGuard], loadComponent: () => import('./features/admin/services/admin-services.component').then(c => c.AdminServicesComponent) },
  { path: 'admin/categories', canActivate: [authGuard], loadComponent: () => import('./features/admin/categories/admin-categories.component').then(c => c.AdminCategoriesComponent) },
  { path: 'admin/reviews', canActivate: [authGuard], loadComponent: () => import('./features/admin/reviews/admin-reviews.component').then(c => c.AdminReviewsComponent) },
  { path: 'admin/reports', canActivate: [authGuard], loadComponent: () => import('./features/admin/reports/admin-reports.component').then(c => c.AdminReportsComponent) },
  { path: 'admin/settings', canActivate: [authGuard], loadComponent: () => import('./features/admin/settings/admin-settings.component').then(c => c.AdminSettingsComponent) },

  // Help
  { path: 'help', loadComponent: () => import('./features/help/help.component').then(c => c.HelpComponent) },

  // Wildcard
  { path: '**', redirectTo: '' }
];

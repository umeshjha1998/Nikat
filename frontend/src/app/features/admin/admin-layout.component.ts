import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ThemeService } from '../../core/theme.service';
import { AuthService } from '../../core/auth.service';
import { ThemeToggleComponent } from '../../core/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeToggleComponent],
  template: `
    <div class="admin-layout">
      <aside class="admin-sidebar">
        <div class="admin-brand">
          <a routerLink="/" class="logo">Nikat</a>
          <span class="admin-tag">Admin</span>
        </div>
        <nav class="sidebar-nav">
          <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item"><span class="material-icons">space_dashboard</span> Dashboard</a>
          <a routerLink="/admin/users" routerLinkActive="active" class="nav-item"><span class="material-icons">people</span> Users</a>
          <a routerLink="/admin/shops" routerLinkActive="active" class="nav-item"><span class="material-icons">storefront</span> Shops</a>
          <a routerLink="/admin/services" routerLinkActive="active" class="nav-item"><span class="material-icons">design_services</span> Services</a>
          <a routerLink="/admin/community-hub" routerLinkActive="active" class="nav-item"><span class="material-icons">groups</span> Community Hub</a>
          <a routerLink="/admin/approvals" routerLinkActive="active" class="nav-item"><span class="material-icons">verified</span> Approvals</a>
          <a routerLink="/admin/advertisements" routerLinkActive="active" class="nav-item"><span class="material-icons">campaign</span> Advertisements</a>
          <a routerLink="/admin/stats" routerLinkActive="active" class="nav-item"><span class="material-icons">analytics</span> Platform Stats</a>
          <a routerLink="/admin/security" routerLinkActive="active" class="nav-item"><span class="material-icons">security</span> Security Logs</a>
          <a routerLink="/admin/categories" routerLinkActive="active" class="nav-item"><span class="material-icons">category</span> Categories</a>
          <a routerLink="/admin/reviews" routerLinkActive="active" class="nav-item"><span class="material-icons">rate_review</span> Reviews</a>
          <a routerLink="/admin/reports" routerLinkActive="active" class="nav-item"><span class="material-icons">assessment</span> Reports</a>
          <a routerLink="/admin/settings" routerLinkActive="active" class="nav-item"><span class="material-icons">settings</span> Settings</a>
        </nav>
        <div class="sidebar-footer">
          <app-theme-toggle></app-theme-toggle>
        </div>
      </aside>

      <main class="admin-main">
        <!-- Admin Top Bar -->
        <div class="admin-topbar">
          <div class="topbar-left">
            <h2 class="topbar-title">Admin Panel</h2>
          </div>
          <div class="topbar-right">
            <div class="admin-user-info">
              <div class="admin-avatar">{{ adminInitial }}</div>
              <span class="admin-name">{{ adminDisplayName }}</span>
            </div>
            <button class="admin-logout-btn" (click)="logout()" title="Logout">
              <span class="material-icons">logout</span>
              Logout
            </button>
          </div>
        </div>

        <div class="admin-content">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styleUrls: ['./admin-shared.css']
})
export class AdminLayoutComponent {
  private readonly themeService = inject(ThemeService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly isDarkMode = this.themeService.isDarkMode;

  get adminInitial(): string {
    const user = this.authService.currentUser;
    if (user?.firstName) return user.firstName.charAt(0).toUpperCase();
    return 'A';
  }

  get adminDisplayName(): string {
    const user = this.authService.currentUser;
    if (user) return `${user.firstName} ${user.lastName}`;
    return 'Administrator';
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/admin-login']);
  }
}

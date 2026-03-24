import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
          <button class="theme-toggle-admin" (click)="toggleTheme()">
            <span class="material-icons">{{ isDarkMode() ? 'light_mode' : 'dark_mode' }}</span>
            {{ isDarkMode() ? 'Light Mode' : 'Dark Mode' }}
          </button>
        </div>
      </aside>

      <main class="admin-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrls: ['./admin-shared.css']
})
export class AdminLayoutComponent {
  private readonly themeService = inject(ThemeService);
  protected readonly isDarkMode = this.themeService.isDarkMode;

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-platform-stats',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-layout">
      <aside class="admin-sidebar">
        <div class="admin-brand"><a routerLink="/" class="logo">Nikat</a><span class="admin-tag">Admin</span></div>
        <nav class="sidebar-nav">
          <a routerLink="/admin" class="nav-item"><span class="material-icons">space_dashboard</span> Dashboard</a>
          <a routerLink="/admin/users" class="nav-item"><span class="material-icons">people</span> Users</a>
          <a routerLink="/admin/shops" class="nav-item"><span class="material-icons">storefront</span> Shops</a>
          <a routerLink="/admin/services" class="nav-item"><span class="material-icons">design_services</span> Services</a>
          <a routerLink="/admin/community-hub" class="nav-item"><span class="material-icons">groups</span> Community Hub</a>
          <a routerLink="/admin/approvals" class="nav-item"><span class="material-icons">verified</span> Approvals</a>
          <a routerLink="/admin/advertisements" class="nav-item"><span class="material-icons">campaign</span> Advertisements</a>
          <a routerLink="/admin/stats" class="nav-item active"><span class="material-icons">analytics</span> Platform Stats</a>
          <a routerLink="/admin/security" class="nav-item"><span class="material-icons">security</span> Security Logs</a>
          <a routerLink="/admin/categories" class="nav-item"><span class="material-icons">category</span> Categories</a>
          <a routerLink="/admin/reviews" class="nav-item"><span class="material-icons">rate_review</span> Reviews</a>
          <a routerLink="/admin/reports" class="nav-item"><span class="material-icons">assessment</span> Reports</a>
        </nav>
      </aside>

      <main class="admin-main">
        <div class="page-header">
          <h1>Platform Stats</h1>
          <div class="header-actions">
            <button class="outline-btn"><span class="material-icons">download</span> Export Report</button>
          </div>
        </div>

        <div class="stats-grid mt-4">
          <div class="stat-card" style="border-left: 4px solid #6bfe9c;">
            <p class="stat-title uppercase">Total Users</p>
            <div class="stat-value-row">
              <span class="stat-number">1,247</span>
              <span class="stat-change text-secondary">+23 <span class="material-icons">trending_up</span></span>
            </div>
          </div>
          <div class="stat-card" style="border-left: 4px solid #5eb4ff;">
            <p class="stat-title uppercase">Gross Transaction Value</p>
            <div class="stat-value-row">
              <span class="stat-number">₹12.4L</span>
              <span class="stat-change text-primary">+14% <span class="material-icons">trending_up</span></span>
            </div>
          </div>
          <div class="stat-card" style="border-left: 4px solid #ffb3f9;">
            <p class="stat-title uppercase">Conversion Rate</p>
            <div class="stat-value-row">
              <span class="stat-number">8.4%</span>
              <span class="stat-change text-secondary">+1.2% <span class="material-icons">trending_up</span></span>
            </div>
          </div>
          <div class="stat-card" style="border-left: 4px solid #ff716c;">
            <p class="stat-title uppercase">Server Load Avg</p>
            <div class="stat-value-row">
              <span class="stat-number">42%</span>
              <span class="stat-change text-error"><span class="material-icons">trending_flat</span></span>
            </div>
          </div>
        </div>

        <div class="grid-2 mt-4 gap-4">
          <div class="content-section">
             <h3>User Registration Trend</h3>
             <div class="placeholder-chart mt-3" style="height: 250px;">
                <span class="material-icons" style="font-size: 60px; color: #a3a8d5;">show_chart</span>
                <p class="muted mt-2 uppercase tracking-widest text-xs">Visualizing Registration Flow</p>
             </div>
          </div>
          <div class="content-section">
             <h3>Revenue Breakdown</h3>
             <div class="placeholder-chart mt-3" style="height: 250px;">
                <span class="material-icons" style="font-size: 60px; color: #a3a8d5;">pie_chart</span>
                <p class="muted mt-2 uppercase tracking-widest text-xs">Services vs Ad Revenue</p>
             </div>
          </div>
        </div>

      </main>
    </div>
  `,
  styleUrls: ['../community-hub/community-hub.css']
})
export class PlatformStats {}

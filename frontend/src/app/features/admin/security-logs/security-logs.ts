import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-security-logs',
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
          <a routerLink="/admin/stats" class="nav-item"><span class="material-icons">analytics</span> Platform Stats</a>
          <a routerLink="/admin/security" class="nav-item active"><span class="material-icons">security</span> Security Logs</a>
          <a routerLink="/admin/categories" class="nav-item"><span class="material-icons">category</span> Categories</a>
          <a routerLink="/admin/reviews" class="nav-item"><span class="material-icons">rate_review</span> Reviews</a>
          <a routerLink="/admin/reports" class="nav-item"><span class="material-icons">assessment</span> Reports</a>
        </nav>
      </aside>

      <main class="admin-main">
        <div class="page-header">
          <h1>Security & Access Logs</h1>
          <div class="header-actions">
            <button class="outline-btn"><span class="material-icons">download</span> Export Logs</button>
            <div class="search-box"><span class="material-icons">search</span><input type="text" placeholder="Search IP, User, Action..."></div>
          </div>
        </div>

        <div class="stats-grid mt-4">
          <div class="stat-card" style="border-left: 4px solid #ff716c;">
            <p class="stat-title uppercase">Failed Logins</p>
            <div class="stat-value-row">
              <span class="stat-number">42</span>
              <span class="stat-change text-error">+12 <span class="material-icons">trending_up</span></span>
            </div>
          </div>
          <div class="stat-card" style="border-left: 4px solid #c084fc;">
            <p class="stat-title uppercase">Suspicious Activities</p>
            <div class="stat-value-row">
              <span class="stat-number">3</span>
              <span class="stat-change text-secondary">-2 <span class="material-icons">trending_down</span></span>
            </div>
          </div>
          <div class="stat-card" style="border-left: 4px solid #6bfe9c;">
            <p class="stat-title uppercase">System Uptime</p>
            <div class="stat-value-row">
              <span class="stat-number">99.9%</span>
            </div>
          </div>
        </div>

        <div class="content-section mt-4">
          <div class="section-header space-between">
            <h2>Recent Activity Logs</h2>
          </div>

          <table class="data-table mt-4">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>User / IP</th>
                <th>Action</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><p class="muted sm">Oct 24, 2024</p><p class="bold">14:02:45</p></td>
                <td>
                  <p class="bold">admin@nikat.com</p>
                  <p class="muted sm">IP: 192.168.1.4</p>
                </td>
                <td><span class="badge badge-outline">Login</span></td>
                <td><span class="badge badge-active">Success</span></td>
                <td><p class="muted sm">Chrome on Windows 11</p></td>
              </tr>
              <tr>
                <td><p class="muted sm">Oct 24, 2024</p><p class="bold">13:45:12</p></td>
                <td>
                  <p class="bold">Unknown</p>
                  <p class="muted sm">IP: 45.33.12.89</p>
                </td>
                <td><span class="badge badge-outline">Login</span></td>
                <td><span class="badge badge-error">Failed</span></td>
                <td><p class="muted sm">Invalid Password (3 attempts)</p></td>
              </tr>
              <tr>
                <td><p class="muted sm">Oct 24, 2024</p><p class="bold">12:30:00</p></td>
                <td>
                  <p class="bold">System</p>
                  <p class="muted sm">IP: Localhost</p>
                </td>
                <td><span class="badge" style="background: rgba(192,132,252,0.1); color: #c084fc;">Backup</span></td>
                <td><span class="badge badge-active">Success</span></td>
                <td><p class="muted sm">Automated Database Backup Completed</p></td>
              </tr>
            </tbody>
          </table>
          <div class="pagination flex-between mt-3 px-2">
            <span class="muted text-sm">Showing 1-3 of 5,024</span>
            <div class="pagination-controls">
              <button>&lt;</button>
              <button class="active">1</button>
              <button>2</button>
              <button>&gt;</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styleUrls: ['../community-hub/community-hub.css']
})
export class SecurityLogs {}

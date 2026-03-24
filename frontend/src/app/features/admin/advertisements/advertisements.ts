import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-advertisements',
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
          <a routerLink="/admin/advertisements" class="nav-item active"><span class="material-icons">campaign</span> Advertisements</a>
          <a routerLink="/admin/stats" class="nav-item"><span class="material-icons">analytics</span> Platform Stats</a>
          <a routerLink="/admin/security" class="nav-item"><span class="material-icons">security</span> Security Logs</a>
          <a routerLink="/admin/categories" class="nav-item"><span class="material-icons">category</span> Categories</a>
          <a routerLink="/admin/reviews" class="nav-item"><span class="material-icons">rate_review</span> Reviews</a>
          <a routerLink="/admin/reports" class="nav-item"><span class="material-icons">assessment</span> Reports</a>
        </nav>
      </aside>

      <main class="admin-main">
        <div class="page-header">
          <h1>Manage Advertisements</h1>
          <div class="header-actions">
            <button class="outline-btn" style="background: rgba(94, 180, 255, 0.2); border-color: #5eb4ff; color: #5eb4ff;"><span class="material-icons">add</span> New Campaign</button>
            <div class="search-box"><span class="material-icons">search</span><input type="text" placeholder="Search campaigns..."></div>
          </div>
        </div>

        <div class="stats-grid mt-4">
          <div class="stat-card" style="border-left: 4px solid #5eb4ff;">
            <p class="stat-title uppercase">Active Campaigns</p>
            <div class="stat-value-row">
              <span class="stat-number">12</span>
            </div>
          </div>
          <div class="stat-card" style="border-left: 4px solid #c084fc;">
            <p class="stat-title uppercase">Avg. CTR</p>
            <div class="stat-value-row">
              <span class="stat-number">4.2%</span>
              <span class="stat-change text-secondary">+0.8% <span class="material-icons">trending_up</span></span>
            </div>
          </div>
          <div class="stat-card" style="border-left: 4px solid #ffb347;">
            <p class="stat-title uppercase">Ad Revenue (MTD)</p>
            <div class="stat-value-row">
              <span class="stat-number">₹1.8L</span>
              <span class="stat-change text-primary">+15% <span class="material-icons">trending_up</span></span>
            </div>
          </div>
        </div>

        <div class="content-section mt-4">
          <div class="section-header space-between">
            <h2>Live Campaigns</h2>
          </div>

          <table class="data-table mt-4">
            <thead>
              <tr>
                <th>Campaign Name</th>
                <th>Sponsor</th>
                <th>Placement</th>
                <th>Performance</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p class="bold">Diwali Special Discounts</p>
                  <p class="muted sm">Ends in 5 days</p>
                </td>
                <td><div class="user-row">Golden Crust Bakery</div></td>
                <td><span class="badge badge-outline">Featured Shop</span></td>
                <td><span class="muted text-sm">CTR: 5.1%</span><br><span class="muted text-sm">Impressions: 12k</span></td>
                <td><span class="badge badge-active">Active</span></td>
                <td>
                  <button class="icon-btn text-primary"><span class="material-icons">edit</span></button>
                  <button class="icon-btn text-error"><span class="material-icons">pause_circle</span></button>
                </td>
              </tr>
              <tr>
                <td>
                  <p class="bold">Premium Hair Spa Package</p>
                  <p class="muted sm">Ends in 12 days</p>
                </td>
                <td><div class="user-row">Urban Style Salon</div></td>
                <td><span class="badge badge-outline">Search Banner</span></td>
                <td><span class="muted text-sm">CTR: 3.8%</span><br><span class="muted text-sm">Impressions: 4k</span></td>
                <td><span class="badge badge-active">Active</span></td>
                <td>
                  <button class="icon-btn text-primary"><span class="material-icons">edit</span></button>
                  <button class="icon-btn text-error"><span class="material-icons">pause_circle</span></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  `,
  styleUrls: ['../community-hub/community-hub.css']
})
export class Advertisements {}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-community-hub',
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
          <a routerLink="/admin/community-hub" class="nav-item active"><span class="material-icons">groups</span> Community Hub</a>
          <a routerLink="/admin/approvals" class="nav-item"><span class="material-icons">verified</span> Approvals</a>
          <a routerLink="/admin/advertisements" class="nav-item"><span class="material-icons">campaign</span> Advertisements</a>
          <a routerLink="/admin/stats" class="nav-item"><span class="material-icons">analytics</span> Platform Stats</a>
          <a routerLink="/admin/security" class="nav-item"><span class="material-icons">security</span> Security Logs</a>
          <a routerLink="/admin/categories" class="nav-item"><span class="material-icons">category</span> Categories</a>
          <a routerLink="/admin/reviews" class="nav-item"><span class="material-icons">rate_review</span> Reviews</a>
          <a routerLink="/admin/reports" class="nav-item"><span class="material-icons">assessment</span> Reports</a>
        </nav>
      </aside>

      <main class="admin-main">
        <div class="page-header">
          <h1>Community Hub</h1>
          <div class="header-actions">
            <div class="search-box"><span class="material-icons">search</span><input type="text" placeholder="Search activities, hosts, reports..."></div>
          </div>
        </div>

        <div class="stats-grid mt-4">
          <div class="stat-card" style="border-left: 4px solid #5eb4ff;">
            <p class="stat-title uppercase">Active Cab Pools</p>
            <div class="stat-value-row">
              <span class="stat-number">142</span>
              <span class="stat-change text-secondary">+12% <span class="material-icons">trending_up</span></span>
            </div>
          </div>
          <div class="stat-card" style="border-left: 4px solid #ffb3f9;">
            <p class="stat-title uppercase">Reported Items</p>
            <div class="stat-value-row">
              <span class="stat-number">24</span>
              <span class="stat-change text-error">+4 <span class="material-icons">warning</span></span>
            </div>
          </div>
          <div class="stat-card" style="border-left: 4px solid #6bfe9c;">
            <p class="stat-title uppercase">Completed Goals</p>
            <div class="stat-value-row">
              <span class="stat-number">892</span>
              <span class="stat-change text-secondary">94% <span class="material-icons">check_circle</span></span>
            </div>
          </div>
          <div class="stat-card" style="border-left: 4px solid #2aa7ff;">
            <p class="stat-title uppercase">New Listings</p>
            <div class="stat-value-row">
              <span class="stat-number">56</span>
              <span class="stat-change text-primary" style="background: rgba(42, 167, 255, 0.1);">Today</span>
            </div>
          </div>
        </div>

        <div class="content-section mt-4">
          <div class="section-header space-between">
            <div>
              <h2>Community Activities</h2>
              <p class="subtitle mt-1">Manage and moderate all active community engagements</p>
            </div>
            <div class="action-btns">
               <button class="outline-btn"><span class="material-icons">filter_list</span> Filters</button>
               <button class="outline-btn"><span class="material-icons">download</span> Export Logs</button>
            </div>
          </div>

          <!-- Tabs -->
          <div class="tabs mt-2">
            <button class="tab active">All Activities</button>
            <button class="tab">Cab Pools</button>
            <button class="tab">Games Together</button>
            <button class="tab">Marketplace</button>
            <button class="tab">Reviews</button>
          </div>

          <table class="data-table mt-4">
            <thead>
              <tr>
                <th>Activity / Category</th>
                <th>Purpose / Title</th>
                <th>Host / Creator</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="activity-cell">
                    <div class="icon-box color-primary"><span class="material-icons">directions_car</span></div>
                    <div>
                      <p class="bold">Cab Pool</p>
                      <p class="muted sm">ID: #CP-9021</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p>Morning commute to Tech Park</p>
                  <span class="badge badge-outline">Recurring</span>
                </td>
                <td><div class="user-row"><div class="avatar">A</div> Alex Rivera</div></td>
                <td><span class="badge badge-active">Active</span></td>
                <td>
                  <button class="icon-btn text-secondary"><span class="material-icons">check_circle</span></button>
                  <button class="icon-btn text-error"><span class="material-icons">block</span></button>
                  <button class="icon-btn"><span class="material-icons">delete</span></button>
                </td>
              </tr>

              <tr>
                <td>
                  <div class="activity-cell">
                    <div class="icon-box color-tertiary"><span class="material-icons">storefront</span></div>
                    <div>
                      <p class="bold">Marketplace</p>
                      <p class="muted sm">ID: #MP-4412</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p>Mechanical Keyboard - Blue</p>
                  <span class="badge badge-error ml-0"><span class="material-icons" style="font-size: 12px">report</span> Suspicious</span>
                </td>
                <td><div class="user-row"><div class="avatar">J</div> Jordan Smith</div></td>
                <td><span class="badge badge-error-soft">Reported</span></td>
                <td>
                  <button class="icon-btn text-secondary"><span class="material-icons">check_circle</span></button>
                  <button class="icon-btn text-error"><span class="material-icons">block</span></button>
                  <button class="icon-btn"><span class="material-icons">delete</span></button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination flex-between mt-3 px-2">
            <span class="muted text-sm">Showing 1-2 of 1,244</span>
            <div class="pagination-controls">
              <button>&lt;</button>
              <button class="active">1</button>
              <button>2</button>
              <button>&gt;</button>
            </div>
          </div>
        </div>

        <div class="grid-2 mt-4 gap-4">
          <div class="content-section">
             <h3>Moderation Heatmap</h3>
             <div class="placeholder-chart mt-3">
                <span class="material-icons" style="font-size: 40px; color: #a3a8d5;">analytics</span>
                <p class="muted mt-2 uppercase tracking-widest text-xs">Visualizing Report Density</p>
             </div>
          </div>
          <div class="content-section">
             <h3>Recent Escalations</h3>
             <div class="escalation-list mt-3">
                <div class="escalation-item">
                  <div class="dot dot-error"></div>
                  <div>
                    <h4 class="bold">Marketplace Spam</h4>
                    <p class="muted sm mt-1">Listing #MP-8821 flagged multiple times.</p>
                    <button class="link-btn mt-1 text-primary">REVIEW NOW</button>
                  </div>
                </div>
                <div class="escalation-item mt-3">
                  <div class="dot dot-tertiary"></div>
                  <div>
                    <h4 class="bold">Review Dispute</h4>
                    <p class="muted sm mt-1">Host "Café Horizon" disputing 1-star review.</p>
                    <button class="link-btn mt-1 text-primary">OPEN TICKET</button>
                  </div>
                </div>
             </div>
          </div>
        </div>

      </main>
    </div>
  `,
  styleUrls: ['./community-hub.css']
})
export class CommunityHub {}

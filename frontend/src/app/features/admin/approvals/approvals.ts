import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-approvals',
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
          <a routerLink="/admin/approvals" class="nav-item active"><span class="material-icons">verified</span> Approvals</a>
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
          <h1>Approvals Pipeline</h1>
          <div class="header-actions">
            <div class="search-box"><span class="material-icons">search</span><input type="text" placeholder="Search approvals by Name, ID, category..."></div>
          </div>
        </div>

        <div class="stats-grid mt-4">
          <div class="stat-card" style="border-left: 4px solid #ffb347;">
            <p class="stat-title uppercase">Total Pending</p>
            <div class="stat-value-row">
              <span class="stat-number">48</span>
              <span class="stat-change text-warning"><span class="material-icons">error_outline</span> Needs Review</span>
            </div>
          </div>
          <div class="stat-card" style="border-left: 4px solid #6bfe9c;">
            <p class="stat-title uppercase">Approved (24h)</p>
            <div class="stat-value-row">
              <span class="stat-number">12</span>
            </div>
          </div>
          <div class="stat-card" style="border-left: 4px solid #ff716c;">
            <p class="stat-title uppercase">Rejected (24h)</p>
            <div class="stat-value-row">
              <span class="stat-number">3</span>
            </div>
          </div>
        </div>

        <div class="content-section mt-4">
          <div class="section-header space-between">
            <div>
              <h2>Entities Awaiting Approval</h2>
            </div>
          </div>
          <div class="tabs mt-2">
            <button class="tab active">All (48)</button>
            <button class="tab">Shops (15)</button>
            <button class="tab">Services (30)</button>
            <button class="tab">Reviews (3)</button>
          </div>

          <table class="data-table mt-4">
            <thead>
              <tr>
                <th>Entity Details</th>
                <th>Type</th>
                <th>Submitted By</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="activity-cell">
                    <div>
                      <p class="bold">Urban Style Salon</p>
                      <p class="muted sm">Requested: 2 hrs ago</p>
                    </div>
                  </div>
                </td>
                <td><span class="badge" style="background: rgba(107, 254, 156, 0.1); color: #6bfe9c;">Shop</span></td>
                <td><div class="user-row"><div class="avatar">R</div> Rahul K.</div></td>
                <td><span class="badge badge-warning-soft">Pending Verification</span></td>
                <td>
                  <button class="icon-btn text-secondary"><span class="material-icons">check_circle</span></button>
                  <button class="icon-btn text-error"><span class="material-icons">cancel</span></button>
                  <button class="icon-btn"><span class="material-icons">visibility</span></button>
                </td>
              </tr>
              <tr>
                <td>
                  <div class="activity-cell">
                    <div>
                      <p class="bold">Deep Tissue Massage</p>
                      <p class="muted sm">Requested: 5 hrs ago</p>
                    </div>
                  </div>
                </td>
                <td><span class="badge" style="background: rgba(192, 132, 252, 0.1); color: #c084fc;">Service</span></td>
                <td><div class="user-row"><div class="avatar">P</div> Priya S.</div></td>
                <td><span class="badge badge-warning-soft">Under Review</span></td>
                <td>
                  <button class="icon-btn text-secondary"><span class="material-icons">check_circle</span></button>
                  <button class="icon-btn text-error"><span class="material-icons">cancel</span></button>
                  <button class="icon-btn"><span class="material-icons">visibility</span></button>
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
export class Approvals {}

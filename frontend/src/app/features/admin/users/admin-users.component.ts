import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-layout">
      <aside class="admin-sidebar">
        <div class="admin-brand"><a routerLink="/" class="logo">Nikat</a><span class="admin-tag">Admin</span></div>
        <nav class="sidebar-nav">
          <a routerLink="/admin" class="nav-item"><span class="material-icons">space_dashboard</span> Dashboard</a>
          <a routerLink="/admin/users" class="nav-item active"><span class="material-icons">people</span> Users</a>
          <a routerLink="/admin/shops" class="nav-item"><span class="material-icons">storefront</span> Shops</a>
          <a routerLink="/admin/services" class="nav-item"><span class="material-icons">design_services</span> Services</a>
          <a routerLink="/admin/categories" class="nav-item"><span class="material-icons">category</span> Categories</a>
          <a routerLink="/admin/reviews" class="nav-item"><span class="material-icons">rate_review</span> Reviews</a>
          <a routerLink="/admin/reports" class="nav-item"><span class="material-icons">assessment</span> Reports</a>
          <a routerLink="/admin/settings" class="nav-item"><span class="material-icons">settings</span> Settings</a>
        </nav>
      </aside>
      <main class="admin-main">
        <div class="page-header">
          <h1>User Management</h1>
          <div class="header-actions">
            <div class="search-box"><span class="material-icons">search</span><input type="text" placeholder="Search users..."></div>
          </div>
        </div>
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th><th>Actions</th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let u of users">
                <td class="user-cell"><div class="user-avatar">{{u.initials}}</div><span>{{u.name}}</span></td>
                <td>{{u.email}}</td>
                <td><span class="role-badge" [class]="u.role">{{u.role}}</span></td>
                <td><span class="status-dot" [class]="u.status"></span>{{u.status}}</td>
                <td class="muted">{{u.joined}}</td>
                <td><button class="icon-btn"><span class="material-icons">more_vert</span></button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .admin-layout { display: flex; min-height: 100vh; background: #05092f; }
    .admin-sidebar { width: 240px; background: #080e38; border-right: 1px solid rgba(255,255,255,0.05); padding: 1.5rem 0; flex-shrink: 0; }
    .admin-brand { display: flex; align-items: center; gap: 0.5rem; padding: 0 1.25rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 1rem; }
    .logo { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.35rem; font-weight: 800; background: linear-gradient(135deg, #5eb4ff, #2aa7ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-decoration: none; }
    .admin-tag { background: rgba(255,179,71,0.15); color: #ffb347; font-size: 0.6rem; font-weight: 700; padding: 0.15rem 0.4rem; border-radius: 0.2rem; text-transform: uppercase; }
    .sidebar-nav { display: flex; flex-direction: column; gap: 0.15rem; padding: 0 0.5rem; }
    .nav-item { display: flex; align-items: center; gap: 0.65rem; padding: 0.7rem 0.75rem; color: #a3a8d5; text-decoration: none; border-radius: 0.5rem; font-size: 0.85rem; cursor: pointer; transition: all 0.15s; }
    .nav-item:hover { background: rgba(255,255,255,0.03); }
    .nav-item.active { background: rgba(255,179,71,0.08); color: #ffb347; }
    .nav-item .material-icons { font-size: 1.15rem; }
    .admin-main { flex: 1; padding: 2rem; overflow-y: auto; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .page-header h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; color: #e2e3ff; }
    .search-box { display: flex; align-items: center; gap: 0.5rem; background: #0e1442; border: 1px solid #40456c; border-radius: 0.5rem; padding: 0.5rem 0.75rem; }
    .search-box .material-icons { color: #6e739d; font-size: 1.15rem; }
    .search-box input { background: transparent; border: none; color: #e2e3ff; outline: none; font-size: 0.85rem; font-family: 'Manrope', sans-serif; width: 200px; }
    .table-container { background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; overflow: hidden; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { text-align: left; padding: 0.85rem 1rem; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #6e739d; background: rgba(0,0,0,0.15); }
    .data-table td { padding: 0.85rem 1rem; font-size: 0.875rem; color: #a3a8d5; border-bottom: 1px solid rgba(255,255,255,0.03); }
    .user-cell { display: flex; align-items: center; gap: 0.75rem; color: #e2e3ff; font-weight: 600; }
    .user-avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg,#5eb4ff,#2aa7ff); color: #003151; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; flex-shrink: 0; }
    .role-badge { padding: 0.15rem 0.5rem; border-radius: 2rem; font-size: 0.7rem; font-weight: 600; text-transform: capitalize; }
    .role-badge.admin { background: rgba(255,179,71,0.1); color: #ffb347; }
    .role-badge.user { background: rgba(94,180,255,0.1); color: #5eb4ff; }
    .role-badge.owner { background: rgba(107,254,156,0.1); color: #6bfe9c; }
    .role-badge.provider { background: rgba(192,132,252,0.1); color: #c084fc; }
    .status-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; margin-right: 0.4rem; }
    .status-dot.active { background: #6bfe9c; }
    .status-dot.inactive { background: #6e739d; }
    .muted { color: #6e739d; }
    .icon-btn { background: none; border: none; color: #6e739d; cursor: pointer; padding: 0.25rem; }
    .icon-btn:hover { color: #e2e3ff; }
    @media (max-width: 768px) { .admin-layout { flex-direction: column; } .admin-sidebar { width: 100%; } .sidebar-nav { flex-direction: row; overflow-x: auto; } }
  `]
})
export class AdminUsersComponent implements OnInit {
  users = [
    { name: 'Priya Sharma', initials: 'PS', email: 'priya@email.com', role: 'admin', status: 'active', joined: 'Jan 15, 2024' },
    { name: 'Rahul Kumar', initials: 'RK', email: 'rahul@email.com', role: 'owner', status: 'active', joined: 'Feb 3, 2024' },
    { name: 'Anita Menon', initials: 'AM', email: 'anita@email.com', role: 'provider', status: 'active', joined: 'Mar 12, 2024' },
    { name: 'Dev Patel', initials: 'DP', email: 'dev@email.com', role: 'user', status: 'inactive', joined: 'Apr 1, 2024' },
    { name: 'Meera Joshi', initials: 'MJ', email: 'meera@email.com', role: 'user', status: 'active', joined: 'Apr 20, 2024' }
  ];
  ngOnInit() {}
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
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
          <a routerLink="/admin" class="nav-item active"><span class="material-icons">space_dashboard</span> Dashboard</a>
          <a routerLink="/admin/users" class="nav-item"><span class="material-icons">people</span> Users</a>
          <a routerLink="/admin/shops" class="nav-item"><span class="material-icons">storefront</span> Shops</a>
          <a routerLink="/admin/services" class="nav-item"><span class="material-icons">design_services</span> Services</a>
          <a routerLink="/admin/community-hub" class="nav-item"><span class="material-icons">groups</span> Community Hub</a>
          <a routerLink="/admin/approvals" class="nav-item"><span class="material-icons">verified</span> Approvals</a>
          <a routerLink="/admin/advertisements" class="nav-item"><span class="material-icons">campaign</span> Advertisements</a>
          <a routerLink="/admin/stats" class="nav-item"><span class="material-icons">analytics</span> Platform Stats</a>
          <a routerLink="/admin/security" class="nav-item"><span class="material-icons">security</span> Security Logs</a>
          <a routerLink="/admin/categories" class="nav-item"><span class="material-icons">category</span> Categories</a>
          <a routerLink="/admin/reviews" class="nav-item"><span class="material-icons">rate_review</span> Reviews</a>
          <a routerLink="/admin/reports" class="nav-item"><span class="material-icons">assessment</span> Reports</a>
          <a routerLink="/admin/settings" class="nav-item"><span class="material-icons">settings</span> Settings</a>
        </nav>
      </aside>

      <main class="admin-main">
        <header class="admin-header">
          <h1>Admin Dashboard</h1>
          <p class="subtitle">Platform overview and management</p>
        </header>

        <div class="stats-grid">
          <div class="stat-card" *ngFor="let stat of platformStats">
            <div class="stat-icon" [style.background]="stat.bg" [style.color]="stat.color">
              <span class="material-icons">{{stat.icon}}</span>
            </div>
            <div class="stat-content">
              <span class="stat-label">{{stat.label}}</span>
              <span class="stat-value">{{stat.value}}</span>
              <span class="stat-change" *ngIf="stat.change">{{stat.change}}</span>
            </div>
          </div>
        </div>

        <!-- Pending Approvals -->
        <section class="admin-section">
          <div class="section-header">
            <h2><span class="material-icons">pending_actions</span> Pending Approvals</h2>
            <span class="badge-count">{{pendingItems.length}}</span>
          </div>
          <div class="approval-list">
            <div class="approval-item" *ngFor="let item of pendingItems">
              <div class="item-info">
                <span class="item-type" [class]="item.type">{{item.type}}</span>
                <div>
                  <h4>{{item.name}}</h4>
                  <p>Submitted by {{item.submittedBy}} · {{item.date}}</p>
                </div>
              </div>
              <div class="action-btns">
                <button class="btn approve"><span class="material-icons">check</span></button>
                <button class="btn reject"><span class="material-icons">close</span></button>
              </div>
            </div>
          </div>
        </section>

        <!-- Recent Activity -->
        <section class="admin-section">
          <div class="section-header">
            <h2><span class="material-icons">history</span> Recent Activity</h2>
          </div>
          <div class="activity-list">
            <div class="activity-item" *ngFor="let act of recentActivity">
              <div class="activity-dot" [style.background]="act.color"></div>
              <div class="activity-content">
                <p>{{act.message}}</p>
                <span class="activity-time">{{act.time}}</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .admin-layout { display: flex; min-height: 100vh; background: #05092f; }

    .admin-sidebar { width: 260px; background: #080e38; border-right: 1px solid rgba(255,255,255,0.05); padding: 2rem 0; flex-shrink: 0; display: flex; flex-direction: column; }
    .admin-brand { display: flex; align-items: center; gap: 0.75rem; padding: 0 1.5rem 2rem; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 1.5rem; }
    .logo { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; background: linear-gradient(135deg, #5eb4ff, #2aa7ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-decoration: none; }
    .admin-tag { background: rgba(255,179,71,0.15); color: #ffb347; font-size: 0.65rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 0.25rem; text-transform: uppercase; letter-spacing: 0.05em; }

    .sidebar-nav { display: flex; flex-direction: column; gap: 0.25rem; padding: 0 0.75rem; }
    .nav-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.85rem 1rem; color: #a3a8d5; text-decoration: none; border-radius: 0.75rem; font-size: 0.9rem; font-weight: 500; cursor: pointer; transition: all 0.2s; }
    .nav-item:hover { background: rgba(255,255,255,0.04); color: #e2e3ff; }
    .nav-item.active { background: rgba(255,179,71,0.08); color: #ffb347; }
    .nav-item .material-icons { font-size: 1.25rem; }

    .admin-main { flex: 1; padding: 2.5rem; overflow-y: auto; }

    .admin-header { margin-bottom: 2rem; }
    .admin-header h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.75rem; font-weight: 700; color: #e2e3ff; }
    .subtitle { font-size: 0.9rem; color: #6e739d; margin-top: 0.25rem; }

    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 2rem; }
    .stat-card { background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; padding: 1.25rem; display: flex; align-items: center; gap: 1rem; transition: all 0.2s; }
    .stat-card:hover { border-color: #40456c; }
    .stat-icon { width: 50px; height: 50px; border-radius: 0.75rem; display: flex; align-items: center; justify-content: center; }
    .stat-icon .material-icons { font-size: 1.5rem; }
    .stat-content { display: flex; flex-direction: column; }
    .stat-label { font-size: 0.8rem; color: #6e739d; }
    .stat-value { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; color: #e2e3ff; }
    .stat-change { font-size: 0.75rem; color: #6bfe9c; }

    .admin-section { background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; padding: 1.5rem; margin-bottom: 1.5rem; }
    .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
    .section-header h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.15rem; color: #e2e3ff; display: flex; align-items: center; gap: 0.5rem; }
    .section-header h2 .material-icons { font-size: 1.25rem; color: #ffb347; }
    .badge-count { background: rgba(255,107,107,0.15); color: #ff716c; font-size: 0.8rem; font-weight: 700; padding: 0.15rem 0.6rem; border-radius: 2rem; }

    .approval-list { display: flex; flex-direction: column; gap: 0.75rem; }
    .approval-item { display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid rgba(255,255,255,0.03); border-radius: 0.75rem; transition: background 0.2s; }
    .approval-item:hover { background: rgba(255,255,255,0.02); }
    .item-info { display: flex; align-items: center; gap: 1rem; }
    .item-type { padding: 0.2rem 0.5rem; border-radius: 0.25rem; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
    .item-type.shop { background: rgba(107,254,156,0.1); color: #6bfe9c; }
    .item-type.service { background: rgba(192,132,252,0.1); color: #c084fc; }
    .item-type.review { background: rgba(245,158,11,0.1); color: #F59E0B; }
    .item-info h4 { font-size: 0.95rem; color: #e2e3ff; }
    .item-info p { font-size: 0.8rem; color: #6e739d; }
    .action-btns { display: flex; gap: 0.5rem; }
    .btn { width: 36px; height: 36px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
    .btn .material-icons { font-size: 1.1rem; }
    .btn.approve { color: #6bfe9c; }
    .btn.approve:hover { background: rgba(107,254,156,0.1); border-color: #6bfe9c; }
    .btn.reject { color: #ff716c; }
    .btn.reject:hover { background: rgba(255,107,107,0.1); border-color: #ff716c; }

    .activity-list { display: flex; flex-direction: column; gap: 1rem; }
    .activity-item { display: flex; align-items: flex-start; gap: 1rem; }
    .activity-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 0.4rem; flex-shrink: 0; }
    .activity-content p { font-size: 0.9rem; color: #a3a8d5; }
    .activity-time { font-size: 0.75rem; color: #6e739d; }

    @media (max-width: 768px) {
      .admin-layout { flex-direction: column; }
      .admin-sidebar { width: 100%; }
      .sidebar-nav { flex-direction: row; overflow-x: auto; }
    }
  `]
})
export class AdminDashboardComponent {
  platformStats = [
    { label: 'Total Users', value: '1,247', icon: 'people', bg: 'rgba(94,180,255,0.1)', color: '#5eb4ff', change: '+23 this week' },
    { label: 'Active Shops', value: '86', icon: 'storefront', bg: 'rgba(107,254,156,0.1)', color: '#6bfe9c', change: '+5 new' },
    { label: 'Services', value: '124', icon: 'design_services', bg: 'rgba(192,132,252,0.1)', color: '#c084fc', change: '+12 new' },
    { label: 'Revenue (MTD)', value: '₹2.4L', icon: 'account_balance', bg: 'rgba(255,179,71,0.1)', color: '#ffb347', change: '+18.2%' }
  ];

  pendingItems = [
    { name: 'Urban Style Salon', type: 'shop', submittedBy: 'Rahul K.', date: '2 hrs ago' },
    { name: 'Deep Tissue Massage', type: 'service', submittedBy: 'Priya S.', date: '5 hrs ago' },
    { name: 'Reported review — Golden Crust', type: 'review', submittedBy: 'Auto-flagged', date: '1 day ago' }
  ];

  recentActivity = [
    { message: 'New shop "Fresh Bites Cafe" was approved', time: '10 min ago', color: '#6bfe9c' },
    { message: 'User Amit S. registered as service provider', time: '45 min ago', color: '#5eb4ff' },
    { message: 'Review flagged for "Classic Cuts & Shaves"', time: '2 hrs ago', color: '#ff716c' },
    { message: 'Category "Fitness & Yoga" added', time: '5 hrs ago', color: '#c084fc' }
  ];
}

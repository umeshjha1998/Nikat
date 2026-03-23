import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-reports',
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
          <a routerLink="/admin/categories" class="nav-item"><span class="material-icons">category</span> Categories</a>
          <a routerLink="/admin/reviews" class="nav-item"><span class="material-icons">rate_review</span> Reviews</a>
          <a routerLink="/admin/reports" class="nav-item active"><span class="material-icons">assessment</span> Reports</a>
          <a routerLink="/admin/settings" class="nav-item"><span class="material-icons">settings</span> Settings</a>
        </nav>
      </aside>
      <main class="admin-main">
        <div class="page-header">
          <h1>Reports & Analytics</h1>
          <div class="header-actions">
            <button class="export-btn"><span class="material-icons">download</span> Export</button>
          </div>
        </div>

        <div class="stats-row">
          <div class="stat-card" *ngFor="let s of stats">
            <span class="stat-label">{{s.label}}</span>
            <span class="stat-value" [style.color]="s.color">{{s.value}}</span>
            <span class="stat-change" [style.color]="s.changeColor">{{s.change}}</span>
          </div>
        </div>

        <section class="chart-section">
          <div class="section-header">
            <h2><span class="material-icons">trending_up</span> Revenue Trend (Last 6 months)</h2>
          </div>
          <div class="chart-placeholder">
            <div class="bar-chart">
              <div class="bar" *ngFor="let m of months" [style.height]="m.height">
                <span class="bar-value">{{m.value}}</span>
                <span class="bar-label">{{m.label}}</span>
              </div>
            </div>
          </div>
        </section>

        <section class="chart-section">
          <div class="section-header">
            <h2><span class="material-icons">pie_chart</span> Top Categories by Revenue</h2>
          </div>
          <div class="category-breakdown">
            <div class="cat-row" *ngFor="let cat of topCategories">
              <span class="cat-name">{{cat.name}}</span>
              <div class="cat-bar-container">
                <div class="cat-bar" [style.width]="cat.pct + '%'" [style.background]="cat.color"></div>
              </div>
              <span class="cat-value">{{cat.revenue}}</span>
            </div>
          </div>
        </section>
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
    .export-btn { display: flex; align-items: center; gap: 0.5rem; background: linear-gradient(135deg, #5eb4ff, #2aa7ff); border: none; color: #fff; padding: 0.6rem 1.2rem; border-radius: 0.5rem; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: opacity 0.2s; }
    .export-btn:hover { opacity: 0.85; }
    .export-btn .material-icons { font-size: 1.1rem; }

    .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 2rem; }
    .stat-card { background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.25rem; }
    .stat-label { font-size: 0.75rem; color: #6e739d; text-transform: uppercase; letter-spacing: 0.04em; }
    .stat-value { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; }
    .stat-change { font-size: 0.75rem; }

    .chart-section { background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; padding: 1.5rem; margin-bottom: 1.5rem; }
    .section-header { margin-bottom: 1.5rem; }
    .section-header h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.1rem; color: #e2e3ff; display: flex; align-items: center; gap: 0.5rem; }
    .section-header h2 .material-icons { font-size: 1.2rem; color: #ffb347; }

    .bar-chart { display: flex; align-items: flex-end; gap: 1rem; height: 200px; padding: 0 1rem; }
    .bar { flex: 1; background: linear-gradient(180deg, #5eb4ff 0%, rgba(94,180,255,0.2) 100%); border-radius: 0.5rem 0.5rem 0 0; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding-top: 0.5rem; min-width: 40px; position: relative; transition: all 0.3s; }
    .bar:hover { background: linear-gradient(180deg, #ffb347 0%, rgba(255,179,71,0.2) 100%); }
    .bar-value { font-size: 0.7rem; font-weight: 700; color: #e2e3ff; }
    .bar-label { position: absolute; bottom: -1.75rem; font-size: 0.7rem; color: #6e739d; white-space: nowrap; }

    .category-breakdown { display: flex; flex-direction: column; gap: 1rem; }
    .cat-row { display: flex; align-items: center; gap: 1rem; }
    .cat-name { width: 140px; font-size: 0.85rem; color: #a3a8d5; flex-shrink: 0; }
    .cat-bar-container { flex: 1; height: 10px; background: rgba(255,255,255,0.03); border-radius: 5px; overflow: hidden; }
    .cat-bar { height: 100%; border-radius: 5px; transition: width 0.5s ease; }
    .cat-value { font-size: 0.8rem; color: #e2e3ff; font-weight: 600; width: 80px; text-align: right; flex-shrink: 0; }

    @media (max-width: 768px) { .admin-layout { flex-direction: column; } .admin-sidebar { width: 100%; } .sidebar-nav { flex-direction: row; overflow-x: auto; } }
  `]
})
export class AdminReportsComponent {
  stats = [
    { label: 'Total Revenue', value: '₹4.8L', color: '#6bfe9c', change: '↑ 24% vs last month', changeColor: '#6bfe9c' },
    { label: 'Total Orders', value: '1,842', color: '#5eb4ff', change: '↑ 12%', changeColor: '#6bfe9c' },
    { label: 'Avg Order Value', value: '₹260', color: '#c084fc', change: '↑ 5%', changeColor: '#6bfe9c' },
    { label: 'Refund Rate', value: '2.1%', color: '#ffb347', change: '↓ 0.3%', changeColor: '#6bfe9c' }
  ];

  months = [
    { label: 'Oct', value: '₹52K', height: '45%' },
    { label: 'Nov', value: '₹68K', height: '58%' },
    { label: 'Dec', value: '₹95K', height: '80%' },
    { label: 'Jan', value: '₹78K', height: '65%' },
    { label: 'Feb', value: '₹88K', height: '74%' },
    { label: 'Mar', value: '₹1.1L', height: '95%' }
  ];

  topCategories = [
    { name: 'Restaurants', revenue: '₹1.6L', pct: 85, color: '#5eb4ff' },
    { name: 'Salons', revenue: '₹1.1L', pct: 62, color: '#c084fc' },
    { name: 'Fitness', revenue: '₹78K', pct: 44, color: '#6bfe9c' },
    { name: 'Home Services', revenue: '₹52K', pct: 30, color: '#ffb347' },
    { name: 'Wellness', revenue: '₹38K', pct: 22, color: '#ff716c' }
  ];
}

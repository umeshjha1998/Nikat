import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-platform-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header"><h1>Platform Statistics</h1></div>

    <div class="stats-grid">
      <div class="stat-card" *ngFor="let s of stats">
        <div class="stat-icon" [style.background]="s.bg" [style.color]="s.color"><span class="material-icons">{{s.icon}}</span></div>
        <div class="stat-content"><span class="stat-label">{{s.label}}</span><span class="stat-value">{{s.value}}</span><span class="stat-change">{{s.change}}</span></div>
      </div>
    </div>

    <div class="grid-2" style="gap:1.5rem;margin-bottom:1.5rem">
      <section class="chart-section">
        <h2 style="margin-bottom:1rem;font-family:'Plus Jakarta Sans',sans-serif;color:var(--on-surface)">User Growth (Monthly)</h2>
        <div class="bar-chart">
          <div class="bar" *ngFor="let b of userGrowth" [style.height.%]="b.pct"><span class="bar-value">{{b.value}}</span><span class="bar-label">{{b.month}}</span></div>
        </div>
      </section>
      <section class="chart-section">
        <h2 style="margin-bottom:1rem;font-family:'Plus Jakarta Sans',sans-serif;color:var(--on-surface)">Top Categories</h2>
        <div class="category-breakdown">
          <div class="cat-row" *ngFor="let c of categories">
            <span class="cat-name">{{c.name}}</span>
            <div class="cat-bar-container"><div class="cat-bar" [style.width.%]="c.pct" [style.background]="c.color"></div></div>
            <span class="cat-value">{{c.value}}</span>
          </div>
        </div>
      </section>
    </div>

    <section class="admin-section">
      <div class="section-header"><h2><span class="material-icons">devices</span> Traffic by Device</h2></div>
      <div class="table-container">
        <table class="data-table">
          <thead><tr><th>Device</th><th>Sessions</th><th>Users</th><th>Bounce Rate</th></tr></thead>
          <tbody>
            <tr *ngFor="let d of deviceStats">
              <td class="name-cell">{{d.device}}</td><td>{{d.sessions}}</td><td>{{d.users}}</td><td>{{d.bounce}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  styleUrls: ['../admin-shared.css']
})
export class PlatformStats {
  stats = [
    { label: 'Daily Active Users', value: '847', icon: 'trending_up', bg: 'rgba(94,180,255,0.1)', color: '#5eb4ff', change: '+12% vs last week' },
    { label: 'Page Views', value: '23.4K', icon: 'visibility', bg: 'rgba(107,254,156,0.1)', color: '#6bfe9c', change: '+8.3%' },
    { label: 'Avg Session Duration', value: '4m 32s', icon: 'timer', bg: 'rgba(192,132,252,0.1)', color: '#c084fc', change: '+15s' },
    { label: 'API Uptime', value: '99.98%', icon: 'cloud_done', bg: 'rgba(255,179,71,0.1)', color: '#ffb347', change: '' }
  ];
  userGrowth = [
    { month: 'Oct', value: '620', pct: 50 }, { month: 'Nov', value: '780', pct: 63 },
    { month: 'Dec', value: '920', pct: 74 }, { month: 'Jan', value: '1.0K', pct: 81 },
    { month: 'Feb', value: '1.1K', pct: 89 }, { month: 'Mar', value: '1.2K', pct: 100 }
  ];
  categories = [
    { name: 'Salon & Grooming', value: '42 shops', pct: 100, color: '#5eb4ff' },
    { name: 'Restaurant', value: '31 shops', pct: 74, color: '#6bfe9c' },
    { name: 'Home Services', value: '28 listings', pct: 67, color: '#c084fc' },
    { name: 'Wellness', value: '15 listings', pct: 36, color: '#ffb347' }
  ];
  deviceStats = [
    { device: 'Mobile', sessions: '14.2K', users: '8.1K', bounce: '32%' },
    { device: 'Desktop', sessions: '7.8K', users: '4.3K', bounce: '28%' },
    { device: 'Tablet', sessions: '1.4K', users: '840', bounce: '36%' }
  ];
}

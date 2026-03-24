import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <h1>Reports & Analytics</h1>
      <button class="export-btn"><span class="material-icons">file_download</span> Export CSV</button>
    </div>

    <div class="stats-row">
      <div class="stat-card" *ngFor="let s of kpis">
        <div class="stat-icon" [style.background]="s.bg" [style.color]="s.color"><span class="material-icons">{{s.icon}}</span></div>
        <div class="stat-content"><span class="stat-label">{{s.label}}</span><span class="stat-value">{{s.value}}</span></div>
      </div>
    </div>

    <section class="chart-section">
      <h2 style="margin-bottom:1rem;font-family:'Plus Jakarta Sans',sans-serif;color:var(--on-surface)">Revenue Trend (Last 6 Months)</h2>
      <div class="bar-chart">
        <div class="bar" *ngFor="let b of revenueData" [style.height.%]="b.pct"><span class="bar-value">₹{{b.value}}</span><span class="bar-label">{{b.month}}</span></div>
      </div>
    </section>

    <section class="chart-section">
      <h2 style="margin-bottom:1rem;font-family:'Plus Jakarta Sans',sans-serif;color:var(--on-surface)">Category Breakdown</h2>
      <div class="category-breakdown">
        <div class="cat-row" *ngFor="let c of catBreakdown">
          <span class="cat-name">{{c.name}}</span>
          <div class="cat-bar-container"><div class="cat-bar" [style.width.%]="c.pct" [style.background]="c.color"></div></div>
          <span class="cat-value">{{c.count}} listings</span>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['../admin-shared.css']
})
export class AdminReportsComponent {
  kpis = [
    { label: 'Bookings (MTD)', value: '823', icon: 'event_available', bg: 'rgba(94,180,255,0.1)', color: '#5eb4ff' },
    { label: 'Revenue (MTD)', value: '₹2.4L', icon: 'account_balance', bg: 'rgba(107,254,156,0.1)', color: '#6bfe9c' },
    { label: 'New Users', value: '194', icon: 'person_add', bg: 'rgba(192,132,252,0.1)', color: '#c084fc' },
    { label: 'Avg Rating', value: '4.6★', icon: 'grade', bg: 'rgba(255,179,71,0.1)', color: '#ffb347' }
  ];
  revenueData = [
    { month: 'Oct', value: '1.2L', pct: 50 }, { month: 'Nov', value: '1.5L', pct: 63 },
    { month: 'Dec', value: '1.8L', pct: 75 }, { month: 'Jan', value: '2.0L', pct: 83 },
    { month: 'Feb', value: '2.1L', pct: 88 }, { month: 'Mar', value: '2.4L', pct: 100 }
  ];
  catBreakdown = [
    { name: 'Salon & Grooming', count: 42, pct: 100, color: '#5eb4ff' },
    { name: 'Restaurant', count: 31, pct: 74, color: '#6bfe9c' },
    { name: 'Home Services', count: 28, pct: 67, color: '#c084fc' },
    { name: 'Wellness & Spa', count: 15, pct: 36, color: '#ffb347' },
    { name: 'Fitness', count: 8, pct: 19, color: '#F59E0B' }
  ];
}

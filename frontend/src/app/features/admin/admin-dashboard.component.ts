import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
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
  `,
  styleUrls: ['./admin-shared.css']
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

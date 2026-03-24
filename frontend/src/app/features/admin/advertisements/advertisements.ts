import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advertisements',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <h1>Advertisement Management</h1>
      <button class="btn-add"><span class="material-icons">add</span> New Campaign</button>
    </div>

    <div class="stats-grid" style="margin-bottom:1.5rem">
      <div class="stat-card" *ngFor="let s of adStats">
        <div class="stat-icon" [style.background]="s.bg" [style.color]="s.color"><span class="material-icons">{{s.icon}}</span></div>
        <div class="stat-content"><span class="stat-label">{{s.label}}</span><span class="stat-value">{{s.value}}</span></div>
      </div>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead><tr><th>Campaign</th><th>Advertiser</th><th>Type</th><th>Impressions</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          <tr *ngFor="let a of ads">
            <td class="name-cell">{{a.name}}</td>
            <td>{{a.advertiser}}</td>
            <td><span class="badge badge-outline">{{a.type}}</span></td>
            <td>{{a.impressions}}</td>
            <td><span class="badge" [class]="'badge-' + a.badge">{{a.status}}</span></td>
            <td>
              <button class="icon-btn"><span class="material-icons">edit</span></button>
              <button class="icon-btn danger"><span class="material-icons">delete</span></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['../admin-shared.css']
})
export class Advertisements {
  adStats = [
    { label: 'Active Campaigns', value: '12', icon: 'campaign', bg: 'rgba(94,180,255,0.1)', color: '#5eb4ff' },
    { label: 'Total Spend (MTD)', value: '₹48K', icon: 'payments', bg: 'rgba(107,254,156,0.1)', color: '#6bfe9c' },
    { label: 'Avg CTR', value: '3.2%', icon: 'ads_click', bg: 'rgba(255,179,71,0.1)', color: '#ffb347' }
  ];
  ads = [
    { name: 'Summer Sale — Golden Crust', advertiser: 'Priya S.', type: 'Banner', impressions: '12.4K', status: 'Active', badge: 'active' },
    { name: 'New Salon Opening', advertiser: 'Rahul K.', type: 'Popup', impressions: '3.2K', status: 'Pending', badge: 'warning-soft' },
    { name: 'Wellness Month Promo', advertiser: 'Zen Spa', type: 'Featured', impressions: '8.7K', status: 'Active', badge: 'active' },
    { name: 'Festive Discount — Home Services', advertiser: 'Amit D.', type: 'Banner', impressions: '1.1K', status: 'Expired', badge: 'error-soft' }
  ];
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-settings',
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
          <a routerLink="/admin/reports" class="nav-item"><span class="material-icons">assessment</span> Reports</a>
          <a routerLink="/admin/settings" class="nav-item active"><span class="material-icons">settings</span> Settings</a>
        </nav>
      </aside>
      <main class="admin-main">
        <div class="page-header">
          <h1>Platform Settings</h1>
        </div>

        <section class="settings-section" *ngFor="let section of sections">
          <h2><span class="material-icons" [style.color]="section.iconColor">{{section.icon}}</span> {{section.title}}</h2>
          <div class="settings-card">
            <div class="setting-row" *ngFor="let s of section.settings">
              <div class="setting-info">
                <h4>{{s.label}}</h4>
                <p>{{s.description}}</p>
              </div>
              <div class="setting-control">
                <label class="toggle" *ngIf="s.type === 'toggle'">
                  <input type="checkbox" [checked]="s.value" (change)="s.value = !s.value">
                  <span class="slider"></span>
                </label>
                <input *ngIf="s.type === 'text'" type="text" class="text-input" [value]="s.value">
                <select *ngIf="s.type === 'select'" class="select-input">
                  <option *ngFor="let o of s.options" [selected]="o === s.value">{{o}}</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <div class="save-bar">
          <button class="save-btn"><span class="material-icons">save</span> Save Changes</button>
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

    .page-header { margin-bottom: 2rem; }
    .page-header h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; color: #e2e3ff; }

    .settings-section { margin-bottom: 2rem; }
    .settings-section h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.1rem; color: #e2e3ff; display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; }
    .settings-section h2 .material-icons { font-size: 1.2rem; }

    .settings-card { background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; overflow: hidden; }
    .setting-row { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.03); }
    .setting-row:last-child { border-bottom: none; }
    .setting-info h4 { font-size: 0.9rem; color: #e2e3ff; margin-bottom: 0.2rem; }
    .setting-info p { font-size: 0.8rem; color: #6e739d; }

    .toggle { position: relative; display: inline-block; width: 44px; height: 24px; }
    .toggle input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background: #3d4270; border-radius: 24px; transition: 0.3s; }
    .slider:before { content: ''; position: absolute; height: 18px; width: 18px; left: 3px; bottom: 3px; background: #a3a8d5; border-radius: 50%; transition: 0.3s; }
    .toggle input:checked + .slider { background: #5eb4ff; }
    .toggle input:checked + .slider:before { transform: translateX(20px); background: #fff; }

    .text-input { background: #0e1442; border: 1px solid #40456c; border-radius: 0.5rem; padding: 0.5rem 0.75rem; color: #e2e3ff; font-size: 0.85rem; font-family: 'Manrope', sans-serif; width: 200px; outline: none; }
    .text-input:focus { border-color: #5eb4ff; }

    .select-input { background: #0e1442; border: 1px solid #40456c; border-radius: 0.5rem; padding: 0.5rem 0.75rem; color: #e2e3ff; font-size: 0.85rem; font-family: 'Manrope', sans-serif; outline: none; cursor: pointer; }
    .select-input:focus { border-color: #5eb4ff; }

    .save-bar { display: flex; justify-content: flex-end; padding-top: 1rem; }
    .save-btn { display: flex; align-items: center; gap: 0.5rem; background: linear-gradient(135deg, #6bfe9c, #2aa7ff); border: none; color: #003151; padding: 0.75rem 1.5rem; border-radius: 0.75rem; font-size: 0.9rem; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
    .save-btn:hover { opacity: 0.85; }
    .save-btn .material-icons { font-size: 1.1rem; }

    @media (max-width: 768px) { .admin-layout { flex-direction: column; } .admin-sidebar { width: 100%; } .sidebar-nav { flex-direction: row; overflow-x: auto; } }
  `]
})
export class AdminSettingsComponent {
  sections = [
    {
      title: 'General', icon: 'tune', iconColor: '#5eb4ff',
      settings: [
        { label: 'Platform Name', description: 'Display name shown across the platform', type: 'text', value: 'Nikat' },
        { label: 'Default Currency', description: 'Currency for all transactions', type: 'select', value: 'INR (₹)', options: ['INR (₹)', 'USD ($)', 'EUR (€)'] },
        { label: 'Maintenance Mode', description: 'Temporarily disable the platform for users', type: 'toggle', value: false }
      ]
    },
    {
      title: 'Notifications', icon: 'notifications', iconColor: '#ffb347',
      settings: [
        { label: 'Email Notifications', description: 'Send admin alerts via email', type: 'toggle', value: true },
        { label: 'New Registration Alerts', description: 'Notify when new users or shops register', type: 'toggle', value: true },
        { label: 'Review Flag Alerts', description: 'Notify when reviews are flagged', type: 'toggle', value: true }
      ]
    },
    {
      title: 'Security', icon: 'shield', iconColor: '#6bfe9c',
      settings: [
        { label: 'Two-Factor Authentication', description: 'Require 2FA for admin login', type: 'toggle', value: false },
        { label: 'Session Timeout', description: 'Auto-logout after inactivity', type: 'select', value: '30 minutes', options: ['15 minutes', '30 minutes', '1 hour', '4 hours'] },
        { label: 'IP Allowlist', description: 'Restrict admin access to specific IPs', type: 'toggle', value: false }
      ]
    }
  ];
}

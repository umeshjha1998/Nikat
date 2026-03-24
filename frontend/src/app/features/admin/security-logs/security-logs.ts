import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-security-logs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <h1>Security Logs</h1>
      <div class="header-actions">
        <div class="search-box"><span class="material-icons">search</span><input placeholder="Search logs..."></div>
        <button class="export-btn"><span class="material-icons">file_download</span> Export</button>
      </div>
    </div>

    <div class="stats-grid" style="margin-bottom:1.5rem">
      <div class="stat-card" *ngFor="let s of secStats">
        <div class="stat-icon" [style.background]="s.bg" [style.color]="s.color"><span class="material-icons">{{s.icon}}</span></div>
        <div class="stat-content"><span class="stat-label">{{s.label}}</span><span class="stat-value">{{s.value}}</span></div>
      </div>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead><tr><th>Event</th><th>User</th><th>IP Address</th><th>Time</th><th>Severity</th></tr></thead>
        <tbody>
          <tr *ngFor="let log of logs">
            <td class="name-cell">{{log.event}}</td>
            <td><div class="user-row"><div class="avatar">{{log.initials}}</div><span>{{log.user}}</span></div></td>
            <td class="muted">{{log.ip}}</td>
            <td class="muted">{{log.time}}</td>
            <td><span class="badge" [class]="'badge-' + log.badge">{{log.severity}}</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <section class="admin-section" style="margin-top:1.5rem">
      <div class="section-header"><h2><span class="material-icons">warning</span> Active Alerts</h2></div>
      <div class="escalation-list">
        <div class="escalation-item" *ngFor="let a of alerts">
          <div class="dot" [class]="a.dotClass"></div>
          <div>
            <p style="font-size:0.9rem;color:var(--on-surface-variant)">{{a.message}}</p>
            <p class="text-xs muted mt-1">{{a.time}}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['../admin-shared.css']
})
export class SecurityLogs {
  secStats = [
    { label: 'Login Attempts (24h)', value: '1,247', icon: 'login', bg: 'rgba(94,180,255,0.1)', color: '#5eb4ff' },
    { label: 'Failed Logins', value: '23', icon: 'block', bg: 'rgba(255,113,108,0.1)', color: '#ff716c' },
    { label: 'Active Sessions', value: '342', icon: 'devices', bg: 'rgba(107,254,156,0.1)', color: '#6bfe9c' },
    { label: 'Threats Blocked', value: '7', icon: 'gpp_bad', bg: 'rgba(255,179,71,0.1)', color: '#ffb347' }
  ];
  logs = [
    { event: 'Admin login', user: 'Priya S.', initials: 'PS', ip: '192.168.1.45', time: '2 min ago', severity: 'Info', badge: 'active' },
    { event: 'Failed login attempt (3x)', user: 'unknown', initials: '??', ip: '45.33.12.87', time: '15 min ago', severity: 'Warning', badge: 'warning-soft' },
    { event: 'Password changed', user: 'Rahul K.', initials: 'RK', ip: '192.168.1.22', time: '1 hr ago', severity: 'Info', badge: 'active' },
    { event: 'Suspicious API call', user: 'Bot', initials: 'BT', ip: '103.89.12.2', time: '2 hrs ago', severity: 'Critical', badge: 'error-soft' },
    { event: 'User disabled by admin', user: 'Dev P.', initials: 'DP', ip: '192.168.1.45', time: '5 hrs ago', severity: 'Warning', badge: 'warning-soft' }
  ];
  alerts = [
    { message: 'Multiple failed login attempts from IP 45.33.12.87 — consider blocking', time: '15 min ago', dotClass: 'dot-error' },
    { message: 'Unusual API traffic spike detected — monitoring', time: '2 hrs ago', dotClass: 'dot-tertiary' }
  ];
}

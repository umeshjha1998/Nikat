import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  template: `
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
  `,
  styleUrls: ['../admin-shared.css']
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

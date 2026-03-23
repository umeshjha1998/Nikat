import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-services',
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
          <a routerLink="/admin/services" class="nav-item active"><span class="material-icons">design_services</span> Services</a>
          <a routerLink="/admin/categories" class="nav-item"><span class="material-icons">category</span> Categories</a>
          <a routerLink="/admin/reviews" class="nav-item"><span class="material-icons">rate_review</span> Reviews</a>
          <a routerLink="/admin/reports" class="nav-item"><span class="material-icons">assessment</span> Reports</a>
          <a routerLink="/admin/settings" class="nav-item"><span class="material-icons">settings</span> Settings</a>
        </nav>
      </aside>
      <main class="admin-main">
        <div class="page-header"><h1>Service Management</h1></div>
        <div class="table-container">
          <table class="data-table">
            <thead><tr><th>Service</th><th>Provider</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              <tr *ngFor="let s of services">
                <td class="name-cell">{{s.name}}</td>
                <td>{{s.provider}}</td>
                <td>{{s.category}}</td>
                <td class="price-cell">₹{{s.price}}</td>
                <td><span class="status-badge" [class]="s.status">{{s.status}}</span></td>
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
    .admin-main { flex: 1; padding: 2rem; }
    .page-header { margin-bottom: 1.5rem; }
    .page-header h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; color: #e2e3ff; }
    .table-container { background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; overflow: hidden; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { text-align: left; padding: 0.85rem 1rem; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #6e739d; background: rgba(0,0,0,0.15); }
    .data-table td { padding: 0.85rem 1rem; font-size: 0.875rem; color: #a3a8d5; border-bottom: 1px solid rgba(255,255,255,0.03); }
    .name-cell { color: #e2e3ff; font-weight: 600; }
    .price-cell { color: #6bfe9c; font-weight: 700; }
    .status-badge { padding: 0.15rem 0.5rem; border-radius: 2rem; font-size: 0.7rem; font-weight: 600; text-transform: capitalize; }
    .status-badge.approved { background: rgba(107,254,156,0.1); color: #6bfe9c; }
    .status-badge.pending { background: rgba(255,179,71,0.1); color: #ffb347; }
    .icon-btn { background: none; border: none; color: #6e739d; cursor: pointer; }
    .icon-btn:hover { color: #e2e3ff; }
    @media (max-width: 768px) { .admin-layout { flex-direction: column; } .admin-sidebar { width: 100%; } }
  `]
})
export class AdminServicesComponent {
  services = [
    { name: 'Classic Haircut', provider: 'Vikram R.', category: 'Grooming', price: '350', status: 'approved' },
    { name: 'Deep Tissue Massage', provider: 'Priya S.', category: 'Wellness', price: '1,200', status: 'pending' },
    { name: 'Home Cleaning', provider: 'Amit D.', category: 'Home', price: '800', status: 'approved' },
    { name: 'AC Repair', provider: 'Raj P.', category: 'Repair', price: '500', status: 'approved' }
  ];
}

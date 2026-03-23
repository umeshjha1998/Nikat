import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-categories',
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
          <a routerLink="/admin/categories" class="nav-item active"><span class="material-icons">category</span> Categories</a>
          <a routerLink="/admin/reviews" class="nav-item"><span class="material-icons">rate_review</span> Reviews</a>
          <a routerLink="/admin/reports" class="nav-item"><span class="material-icons">assessment</span> Reports</a>
          <a routerLink="/admin/settings" class="nav-item"><span class="material-icons">settings</span> Settings</a>
        </nav>
      </aside>
      <main class="admin-main">
        <div class="page-header">
          <h1>Category Management</h1>
          <button class="btn-add"><span class="material-icons">add</span> Add Category</button>
        </div>
        <div class="cat-grid">
          <div class="cat-card" *ngFor="let c of categories">
            <div class="cat-icon" [style.background]="c.bg"><span class="material-icons" [style.color]="c.color">{{c.icon}}</span></div>
            <div class="cat-info">
              <h3>{{c.name}}</h3>
              <p>{{c.count}} listings · {{c.type}}</p>
            </div>
            <div class="cat-actions">
              <button class="icon-btn"><span class="material-icons">edit</span></button>
              <button class="icon-btn danger"><span class="material-icons">delete</span></button>
            </div>
          </div>
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
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .page-header h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; color: #e2e3ff; }
    .btn-add { display: flex; align-items: center; gap: 0.4rem; background: linear-gradient(135deg,#ffb347,#ff9500); border: none; color: #3d2000; font-weight: 700; padding: 0.6rem 1.25rem; border-radius: 2rem; cursor: pointer; font-size: 0.85rem; }
    .btn-add .material-icons { font-size: 1rem; }
    .cat-grid { display: flex; flex-direction: column; gap: 0.75rem; }
    .cat-card { display: flex; align-items: center; gap: 1rem; background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 0.75rem; padding: 1rem 1.25rem; transition: all 0.2s; }
    .cat-card:hover { border-color: #40456c; }
    .cat-icon { width: 44px; height: 44px; border-radius: 0.6rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .cat-icon .material-icons { font-size: 1.35rem; }
    .cat-info { flex: 1; }
    .cat-info h3 { font-size: 1rem; color: #e2e3ff; }
    .cat-info p { font-size: 0.8rem; color: #6e739d; }
    .cat-actions { display: flex; gap: 0.25rem; }
    .icon-btn { background: none; border: none; color: #6e739d; cursor: pointer; padding: 0.4rem; border-radius: 0.4rem; transition: all 0.15s; }
    .icon-btn:hover { color: #e2e3ff; background: rgba(255,255,255,0.05); }
    .icon-btn.danger:hover { color: #ff716c; }
    @media (max-width: 768px) { .admin-layout { flex-direction: column; } .admin-sidebar { width: 100%; } }
  `]
})
export class AdminCategoriesComponent {
  categories = [
    { name: 'Barbershop & Salon', icon: 'content_cut', count: 24, type: 'Shop', bg: 'rgba(94,180,255,0.1)', color: '#5eb4ff' },
    { name: 'Restaurant & Cafe', icon: 'restaurant', count: 18, type: 'Shop', bg: 'rgba(107,254,156,0.1)', color: '#6bfe9c' },
    { name: 'Wellness & Spa', icon: 'spa', count: 12, type: 'Both', bg: 'rgba(192,132,252,0.1)', color: '#c084fc' },
    { name: 'Home Services', icon: 'home_repair_service', count: 31, type: 'Service', bg: 'rgba(255,179,71,0.1)', color: '#ffb347' },
    { name: 'Fitness & Yoga', icon: 'fitness_center', count: 8, type: 'Service', bg: 'rgba(245,158,11,0.1)', color: '#F59E0B' }
  ];
}

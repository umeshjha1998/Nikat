import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-shops',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-layout">
      <aside class="admin-sidebar">
        <div class="admin-brand"><a routerLink="/" class="logo">Nikat</a><span class="admin-tag">Admin</span></div>
        <nav class="sidebar-nav">
          <a routerLink="/admin" class="nav-item"><span class="material-icons">space_dashboard</span> Dashboard</a>
          <a routerLink="/admin/users" class="nav-item"><span class="material-icons">people</span> Users</a>
          <a routerLink="/admin/shops" class="nav-item active"><span class="material-icons">storefront</span> Shops</a>
          <a routerLink="/admin/services" class="nav-item"><span class="material-icons">design_services</span> Services</a>
          <a routerLink="/admin/categories" class="nav-item"><span class="material-icons">category</span> Categories</a>
          <a routerLink="/admin/reviews" class="nav-item"><span class="material-icons">rate_review</span> Reviews</a>
          <a routerLink="/admin/reports" class="nav-item"><span class="material-icons">assessment</span> Reports</a>
          <a routerLink="/admin/settings" class="nav-item"><span class="material-icons">settings</span> Settings</a>
        </nav>
      </aside>
      <main class="admin-main">
        <div class="page-header"><h1>Shop Management</h1></div>
        <div class="cards-grid">
          <div class="shop-mgmt-card" *ngFor="let s of shops">
            <div class="card-img" [style.backgroundImage]="'url(' + s.image + ')'">
              <span class="card-status" [class]="s.status">{{s.status}}</span>
            </div>
            <div class="card-body">
              <h3>{{s.name}}</h3>
              <p>{{s.owner}} · {{s.category}}</p>
              <div class="card-actions">
                <button class="btn-sm approve" *ngIf="s.status==='pending'"><span class="material-icons">check</span> Approve</button>
                <button class="btn-sm"><span class="material-icons">edit</span></button>
                <button class="btn-sm danger"><span class="material-icons">delete</span></button>
              </div>
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
    .page-header { margin-bottom: 1.5rem; }
    .page-header h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; color: #e2e3ff; }
    .cards-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }
    .shop-mgmt-card { background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; overflow: hidden; transition: all 0.2s; }
    .shop-mgmt-card:hover { border-color: #40456c; }
    .card-img { height: 150px; background-size: cover; background-position: center; position: relative; }
    .card-status { position: absolute; top: 0.75rem; right: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 2rem; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
    .card-status.approved { background: rgba(107,254,156,0.15); color: #6bfe9c; }
    .card-status.pending { background: rgba(255,179,71,0.15); color: #ffb347; }
    .card-status.rejected { background: rgba(255,107,107,0.15); color: #ff716c; }
    .card-body { padding: 1rem; }
    .card-body h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; color: #e2e3ff; margin-bottom: 0.25rem; }
    .card-body p { font-size: 0.8rem; color: #6e739d; margin-bottom: 0.75rem; }
    .card-actions { display: flex; gap: 0.5rem; }
    .btn-sm { display: flex; align-items: center; gap: 0.3rem; background: transparent; border: 1px solid #40456c; color: #a3a8d5; padding: 0.35rem 0.6rem; border-radius: 0.4rem; cursor: pointer; font-size: 0.75rem; font-weight: 600; transition: all 0.2s; }
    .btn-sm:hover { border-color: #a3a8d5; color: #e2e3ff; }
    .btn-sm .material-icons { font-size: 0.9rem; }
    .btn-sm.approve { border-color: #6bfe9c; color: #6bfe9c; }
    .btn-sm.approve:hover { background: rgba(107,254,156,0.1); }
    .btn-sm.danger:hover { border-color: #ff716c; color: #ff716c; }
    @media (max-width: 768px) { .admin-layout { flex-direction: column; } .admin-sidebar { width: 100%; } }
  `]
})
export class AdminShopsComponent {
  shops = [
    { name: 'The Golden Crust', owner: 'Priya S.', category: 'Bakery', status: 'approved', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80' },
    { name: 'Urban Style Salon', owner: 'Rahul K.', category: 'Salon', status: 'pending', image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&q=80' },
    { name: 'Fresh Bites Cafe', owner: 'Neha M.', category: 'Restaurant', status: 'approved', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80' },
    { name: 'Zen Wellness Spa', owner: 'Amit D.', category: 'Spa', status: 'rejected', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=400&q=80' }
  ];
}

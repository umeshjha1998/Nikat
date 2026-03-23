import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-shop-owner-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-layout">
      <aside class="dashboard-sidebar">
        <div class="user-profile-summary">
          <div class="avatar shop-owner"><span class="material-icons">storefront</span></div>
          <div class="user-info">
            <h3>Shop Owner</h3>
            <p>Management Portal</p>
          </div>
        </div>
        <nav class="sidebar-nav">
          <a class="nav-item active"><span class="material-icons">space_dashboard</span> Overview</a>
          <a class="nav-item"><span class="material-icons">inventory_2</span> Products</a>
          <a class="nav-item"><span class="material-icons">shopping_cart</span> Orders</a>
          <a class="nav-item"><span class="material-icons">star</span> Reviews</a>
          <a class="nav-item"><span class="material-icons">bar_chart</span> Analytics</a>
          <a class="nav-item"><span class="material-icons">settings</span> Settings</a>
        </nav>
      </aside>

      <main class="dashboard-main">
        <header class="dashboard-header">
          <div>
            <h1>Shop Dashboard</h1>
            <p class="subtitle">Manage your storefront and track performance</p>
          </div>
          <button class="btn-glow"><span class="material-icons">add</span> Add Product</button>
        </header>

        <!-- Stats -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon revenue"><span class="material-icons">payments</span></div>
            <div class="stat-content">
              <span class="stat-label">Total Revenue</span>
              <span class="stat-value">₹48,250</span>
              <span class="stat-change positive">+12.5% from last month</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon orders"><span class="material-icons">shopping_bag</span></div>
            <div class="stat-content">
              <span class="stat-label">Orders</span>
              <span class="stat-value">156</span>
              <span class="stat-change positive">+8.2% from last month</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon products"><span class="material-icons">inventory</span></div>
            <div class="stat-content">
              <span class="stat-label">Products Listed</span>
              <span class="stat-value">42</span>
              <span class="stat-change">3 pending approval</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon rating"><span class="material-icons">star</span></div>
            <div class="stat-content">
              <span class="stat-label">Average Rating</span>
              <span class="stat-value">4.7</span>
              <span class="stat-change positive">Based on 89 reviews</span>
            </div>
          </div>
        </div>

        <!-- Recent Orders -->
        <section class="dashboard-section">
          <div class="section-header">
            <h2>Recent Orders</h2>
            <a class="view-all">View All <span class="material-icons">arrow_forward</span></a>
          </div>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Item</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let order of recentOrders">
                  <td class="order-id">#{{order.id}}</td>
                  <td>{{order.customer}}</td>
                  <td>{{order.item}}</td>
                  <td class="amount">₹{{order.amount}}</td>
                  <td><span class="status-badge" [class]="order.status">{{order.status}}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Top Products -->
        <section class="dashboard-section">
          <div class="section-header">
            <h2>Top Products</h2>
          </div>
          <div class="product-list">
            <div class="product-item" *ngFor="let p of topProducts; let i = index">
              <span class="rank">#{{i + 1}}</span>
              <div class="product-img" [style.backgroundImage]="'url(' + p.image + ')'"></div>
              <div class="product-details">
                <h4>{{p.name}}</h4>
                <p>{{p.sold}} sold · ₹{{p.revenue}} revenue</p>
              </div>
              <div class="product-rating"><span class="material-icons">star</span> {{p.rating}}</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-layout { display: flex; min-height: 100vh; background: #05092f; }

    .dashboard-sidebar { width: 270px; background: #080e38; border-right: 1px solid rgba(255,255,255,0.05); padding: 2rem 0; flex-shrink: 0; }
    .user-profile-summary { display: flex; align-items: center; gap: 1rem; padding: 0 1.5rem 2rem; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 1.5rem; }
    .avatar { width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    .avatar.shop-owner { background: linear-gradient(135deg, #6bfe9c, #3ddc84); color: #003d20; }
    .avatar .material-icons { font-size: 1.5rem; }
    .user-info h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.1rem; font-weight: 700; color: #e2e3ff; }
    .user-info p { font-size: 0.8rem; color: #6e739d; }

    .sidebar-nav { display: flex; flex-direction: column; gap: 0.25rem; padding: 0 0.75rem; }
    .nav-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.85rem 1rem; color: #a3a8d5; text-decoration: none; border-radius: 0.75rem; font-size: 0.9rem; font-weight: 500; cursor: pointer; transition: all 0.2s; }
    .nav-item:hover { background: rgba(255,255,255,0.04); color: #e2e3ff; }
    .nav-item.active { background: rgba(107,254,156,0.08); color: #6bfe9c; }
    .nav-item .material-icons { font-size: 1.25rem; }

    .dashboard-main { flex: 1; padding: 2.5rem; overflow-y: auto; }

    .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .dashboard-header h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.75rem; font-weight: 700; color: #e2e3ff; }
    .subtitle { font-size: 0.9rem; color: #6e739d; margin-top: 0.25rem; }
    .btn-glow { display: flex; align-items: center; gap: 0.5rem; background: linear-gradient(135deg, #6bfe9c, #3ddc84); border: none; color: #003d20; font-weight: 700; padding: 0.75rem 1.5rem; border-radius: 2rem; cursor: pointer; font-size: 0.9rem; transition: all 0.2s; }
    .btn-glow:hover { box-shadow: 0 6px 20px rgba(107,254,156,0.3); }
    .btn-glow .material-icons { font-size: 1.1rem; }

    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 1.25rem; margin-bottom: 2rem; }
    .stat-card { background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; padding: 1.25rem; display: flex; align-items: center; gap: 1rem; transition: all 0.2s; }
    .stat-card:hover { border-color: #40456c; transform: translateY(-2px); }
    .stat-icon { width: 50px; height: 50px; border-radius: 0.75rem; display: flex; align-items: center; justify-content: center; }
    .stat-icon.revenue { background: rgba(107,254,156,0.1); color: #6bfe9c; }
    .stat-icon.orders { background: rgba(94,180,255,0.1); color: #5eb4ff; }
    .stat-icon.products { background: rgba(255,179,71,0.1); color: #ffb347; }
    .stat-icon.rating { background: rgba(245,158,11,0.1); color: #F59E0B; }
    .stat-icon .material-icons { font-size: 1.5rem; }
    .stat-content { display: flex; flex-direction: column; }
    .stat-label { font-size: 0.8rem; color: #6e739d; }
    .stat-value { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; color: #e2e3ff; }
    .stat-change { font-size: 0.75rem; color: #6e739d; }
    .stat-change.positive { color: #6bfe9c; }

    .dashboard-section { background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; padding: 1.5rem; margin-bottom: 1.5rem; }
    .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; }
    .section-header h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.2rem; color: #e2e3ff; }
    .view-all { display: flex; align-items: center; gap: 0.25rem; font-size: 0.85rem; color: #5eb4ff; cursor: pointer; font-weight: 600; text-decoration: none; }
    .view-all .material-icons { font-size: 1rem; }

    .table-container { overflow-x: auto; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th { text-align: left; padding: 0.75rem 1rem; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #6e739d; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .data-table td { padding: 0.85rem 1rem; font-size: 0.9rem; color: #a3a8d5; border-bottom: 1px solid rgba(255,255,255,0.03); }
    .order-id { color: #5eb4ff; font-weight: 600; }
    .amount { font-weight: 700; color: #e2e3ff; }
    .status-badge { padding: 0.25rem 0.75rem; border-radius: 2rem; font-size: 0.75rem; font-weight: 600; text-transform: capitalize; }
    .status-badge.delivered { background: rgba(107,254,156,0.1); color: #6bfe9c; }
    .status-badge.pending { background: rgba(255,179,71,0.1); color: #ffb347; }
    .status-badge.processing { background: rgba(94,180,255,0.1); color: #5eb4ff; }

    .product-list { display: flex; flex-direction: column; gap: 0.75rem; }
    .product-item { display: flex; align-items: center; gap: 1rem; padding: 0.75rem; border-radius: 0.75rem; transition: background 0.2s; }
    .product-item:hover { background: rgba(255,255,255,0.02); }
    .rank { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; font-weight: 800; color: #40456c; width: 30px; }
    .product-img { width: 48px; height: 48px; border-radius: 0.5rem; background-size: cover; background-position: center; flex-shrink: 0; }
    .product-details { flex: 1; }
    .product-details h4 { font-size: 0.95rem; color: #e2e3ff; }
    .product-details p { font-size: 0.8rem; color: #6e739d; }
    .product-rating { display: flex; align-items: center; gap: 0.2rem; font-size: 0.9rem; font-weight: 700; color: #F59E0B; }
    .product-rating .material-icons { font-size: 1rem; }

    @media (max-width: 768px) {
      .dashboard-layout { flex-direction: column; }
      .dashboard-sidebar { width: 100%; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.05); }
      .sidebar-nav { flex-direction: row; overflow-x: auto; }
      .dashboard-main { padding: 1.5rem; }
    }
  `]
})
export class ShopOwnerDashboardComponent implements OnInit {
  recentOrders = [
    { id: '1024', customer: 'Priya S.', item: 'Sourdough Loaf × 2', amount: '850', status: 'delivered' },
    { id: '1023', customer: 'Rahul K.', item: 'Cinnamon Rolls × 4', amount: '680', status: 'processing' },
    { id: '1022', customer: 'Anita M.', item: 'Espresso Beans 500g', amount: '450', status: 'pending' },
    { id: '1021', customer: 'Dev P.', item: 'Avocado Toast × 1', amount: '240', status: 'delivered' }
  ];

  topProducts = [
    { name: 'Sourdough Loaf', sold: 124, revenue: '10,540', rating: 4.9, image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=100&q=80' },
    { name: 'Cinnamon Rolls', sold: 98, revenue: '4,165', rating: 4.8, image: 'https://images.unsplash.com/photo-1509365390695-33aee754301f?w=100&q=80' },
    { name: 'Espresso', sold: 213, revenue: '7,987', rating: 4.7, image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=100&q=80' }
  ];

  constructor(private apiService: ApiService, private authService: AuthService) {}
  ngOnInit() {}
}

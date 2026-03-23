import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-reviews',
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
          <a routerLink="/admin/reviews" class="nav-item active"><span class="material-icons">rate_review</span> Reviews</a>
          <a routerLink="/admin/reports" class="nav-item"><span class="material-icons">assessment</span> Reports</a>
          <a routerLink="/admin/settings" class="nav-item"><span class="material-icons">settings</span> Settings</a>
        </nav>
      </aside>
      <main class="admin-main">
        <div class="page-header"><h1>Review Moderation</h1></div>
        <div class="review-list">
          <div class="review-mod-card" *ngFor="let r of reviews" [class.flagged]="r.flagged">
            <div class="review-top">
              <div class="reviewer"><div class="avatar">{{r.initials}}</div><div><h4>{{r.user}}</h4><p>on <strong>{{r.shop}}</strong> · {{r.date}}</p></div></div>
              <div class="stars"><span class="material-icons filled" *ngFor="let s of getStars(r.rating)">star</span></div>
            </div>
            <p class="review-text">{{r.comment}}</p>
            <div class="review-actions" *ngIf="r.flagged">
              <span class="flag-label"><span class="material-icons">flag</span> Flagged for review</span>
              <div class="action-btns">
                <button class="btn-sm approve"><span class="material-icons">check</span> Keep</button>
                <button class="btn-sm danger"><span class="material-icons">delete</span> Remove</button>
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
    .review-list { display: flex; flex-direction: column; gap: 1rem; }
    .review-mod-card { background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; padding: 1.25rem; transition: all 0.2s; }
    .review-mod-card.flagged { border-color: rgba(255,107,107,0.2); }
    .review-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; }
    .reviewer { display: flex; gap: 0.75rem; align-items: center; }
    .avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg,#5eb4ff,#2aa7ff); color: #003151; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700; }
    .reviewer h4 { font-size: 0.9rem; color: #e2e3ff; }
    .reviewer p { font-size: 0.8rem; color: #6e739d; }
    .reviewer strong { color: #a3a8d5; }
    .stars .material-icons { font-size: 0.95rem; color: #F59E0B; }
    .review-text { font-size: 0.875rem; color: #a3a8d5; line-height: 1.6; }
    .review-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid rgba(255,255,255,0.05); }
    .flag-label { display: flex; align-items: center; gap: 0.35rem; font-size: 0.8rem; color: #ff716c; font-weight: 600; }
    .flag-label .material-icons { font-size: 1rem; }
    .action-btns { display: flex; gap: 0.5rem; }
    .btn-sm { display: flex; align-items: center; gap: 0.3rem; background: transparent; border: 1px solid #40456c; color: #a3a8d5; padding: 0.35rem 0.75rem; border-radius: 0.4rem; cursor: pointer; font-size: 0.75rem; font-weight: 600; transition: all 0.2s; }
    .btn-sm .material-icons { font-size: 0.85rem; }
    .btn-sm.approve { border-color: #6bfe9c; color: #6bfe9c; }
    .btn-sm.approve:hover { background: rgba(107,254,156,0.1); }
    .btn-sm.danger { border-color: #ff716c; color: #ff716c; }
    .btn-sm.danger:hover { background: rgba(255,107,107,0.1); }
    @media (max-width: 768px) { .admin-layout { flex-direction: column; } .admin-sidebar { width: 100%; } }
  `]
})
export class AdminReviewsComponent {
  reviews = [
    { user: 'Dev Patel', initials: 'DP', shop: 'The Golden Crust', rating: 5, date: '2 hrs ago', comment: 'Amazing pastries! Best in the neighborhood.', flagged: false },
    { user: 'Anonymous', initials: '??', shop: 'Classic Cuts', rating: 1, date: '5 hrs ago', comment: 'This review has been flagged for potentially inappropriate content that violates community guidelines.', flagged: true },
    { user: 'Meera J.', initials: 'MJ', shop: 'Fresh Bites Cafe', rating: 4, date: '1 day ago', comment: 'Good food, a bit slow on weekends but worth the wait.', flagged: false }
  ];
  getStars(n: number): number[] { return Array(n).fill(0); }
}

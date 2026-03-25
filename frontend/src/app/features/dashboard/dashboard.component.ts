import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-premium-layout">
      <!-- Side Navigation -->
      <aside class="dash-sidebar">
        <div class="dash-brand">
          <div class="brand-hex">
            <span class="material-icons">fingerprint</span>
          </div>
          <div class="brand-info">
            <h3>My Nikat</h3>
            <p>Member Since 2024</p>
          </div>
        </div>

        <nav class="dash-nav">
          <a class="d-nav-item" (click)="setTab('overview')" [class.active]="activeTab === 'overview'">
            <span class="material-icons">grid_view</span>
            <span>Overview</span>
          </a>
          <a class="d-nav-item" (click)="setTab('bookings')" [class.active]="activeTab === 'bookings'">
            <span class="material-icons">event_note</span>
            <span>Bookings</span>
          </a>
          <a class="d-nav-item" (click)="setTab('saved')" [class.active]="activeTab === 'saved'">
            <span class="material-icons">favorite</span>
            <span>Saved Shops</span>
          </a>
          <a class="d-nav-item" (click)="setTab('orders')" [class.active]="activeTab === 'orders'">
            <span class="material-icons">shopping_bag</span>
            <span>Orders</span>
          </a>
          <div class="nav-spacer"></div>
          <a class="d-nav-item" (click)="setTab('settings')" [class.active]="activeTab === 'settings'">
            <span class="material-icons">settings</span>
            <span>Settings</span>
          </a>
          <a class="d-nav-item logout" (click)="signOut()">
            <span class="material-icons">logout</span>
            <span>Sign Out</span>
          </a>
        </nav>

        <div class="dash-user-card">
          <div class="avatar-circle">{{userInitial}}</div>
          <div class="u-meta">
            <h5>{{currentUser?.firstName}} {{currentUser?.lastName}}</h5>
            <span>{{currentUser?.role}}</span>
          </div>
          <button class="btn-dots"><span class="material-icons">more_vert</span></button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="dash-content">
        <header class="dash-header">
          <div class="h-left">
            <h1>Welcome Back, <span>{{currentUser?.firstName}}</span></h1>
            <p>You have {{bookings.length}} upcoming appointments this week.</p>
          </div>
          <div class="h-right">
            <button class="btn-search-trigger" routerLink="/browse">
              <span class="material-icons">search</span>
              Find Services
            </button>
            <div class="notif-bell">
              <span class="material-icons">notifications</span>
              <span class="n-dot"></span>
            </div>
          </div>
        </header>

        <!-- Overview Tab -->
        <ng-container *ngIf="activeTab === 'overview'">
          <!-- Stats Grid -->
          <section class="dash-stats">
            <div class="stat-glass-card">
              <div class="s-head">
                <span class="s-label">Total Points</span>
                <span class="material-icons s-icon">stars</span>
              </div>
              <div class="s-body">
                <h2>1,250</h2>
                <div class="s-progress">
                  <div class="bar" style="width: 65%"></div>
                </div>
                <p>250 pts to Gold Tier</p>
              </div>
            </div>

            <div class="stat-glass-card">
              <div class="s-head">
                <span class="s-label">Bookings</span>
                <span class="material-icons s-icon">calendar_today</span>
              </div>
              <div class="s-body">
                <h2>14</h2>
                <p>Across 5 categories</p>
                <div class="avatar-group">
                  <span class="a-mini">S</span>
                  <span class="a-mini">B</span>
                  <span class="a-mini">+2</span>
                </div>
              </div>
            </div>

            <div class="stat-glass-card wallet">
              <div class="s-head">
                <span class="s-label">Nikat Credit</span>
                <span class="material-icons s-icon">account_balance_wallet</span>
              </div>
              <div class="s-body">
                <h2>₹450</h2>
                <button class="btn-topup">Top Up</button>
              </div>
            </div>
          </section>

          <!-- Main Grid -->
          <div class="dash-main-grid">
            <!-- Left: Bookings -->
            <section class="dash-section">
              <div class="section-head">
                <h3>Upcoming Bookings</h3>
                <a href="#">View All</a>
              </div>

              <div class="booking-stack">
                <div class="booking-item-premium" *ngFor="let b of bookings">
                  <div class="b-date-box" [class.alt]="b.alt">
                    <span class="m">{{b.month}}</span>
                    <span class="d">{{b.day}}</span>
                  </div>
                  <div class="b-info">
                    <h4>{{b.service}}</h4>
                    <p><span class="material-icons">storefront</span> {{b.shop}}</p>
                    <div class="b-meta">
                      <span><span class="material-icons">schedule</span> {{b.time}}</span>
                      <span class="status-tag" [class]="b.status">{{b.status}}</span>
                    </div>
                  </div>
                  <div class="b-actions">
                    <button class="btn-outline">Reschedule</button>
                    <button class="btn-icon-blur"><span class="material-icons">more_horiz</span></button>
                  </div>
                </div>
              </div>
            </section>

            <!-- Right: Recent Activity -->
            <aside class="dash-side-col">
              <section class="dash-section">
                  <div class="section-head">
                    <h3>Recent Activity</h3>
                  </div>
                  <div class="activity-feed">
                    <div class="act-item">
                      <div class="act-icon"><span class="material-icons">reviews</span></div>
                      <div class="act-text">
                        <p>You reviewed <strong>Urban Fade</strong></p>
                        <span>2 days ago</span>
                      </div>
                    </div>
                    <div class="act-item">
                      <div class="act-icon green"><span class="material-icons">payments</span></div>
                      <div class="act-text">
                        <p>Refund processed for <strong>Spa Order</strong></p>
                        <span>5 days ago</span>
                      </div>
                    </div>
                  </div>
              </section>

              <section class="promo-card">
                <div class="p-content">
                  <h4>Refer & Earn</h4>
                  <p>Get ₹200 for every friend you invite to Nikat.</p>
                  <button class="btn-prime">Invite Friends</button>
                </div>
                <span class="material-icons p-deco">redeem</span>
              </section>
            </aside>
          </div>
        </ng-container>

        <!-- Other Tabs Placeholders -->
        <div class="tab-content-placeholder" *ngIf="activeTab !== 'overview'">
           <div class="placeholder-card">
              <span class="material-icons">construction</span>
              <h3>{{activeTab | titlecase}} Section</h3>
              <p>This section is currently under enhancement to provide a premium experience.</p>
              <button class="btn-outline" (click)="setTab('overview')">Back to Overview</button>
           </div>
        </div>div>
      </main>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Manrope:wght@500;600;700;800&display=swap');

    :host {
      --primary: #c084fc;
      --primary-glow: rgba(192, 132, 252, 0.3);
      font-family: 'Manrope', sans-serif;
    }

    .dashboard-premium-layout { display: flex; min-height: 100vh; background: var(--bg); color: var(--text-main); }

    /* Sidebar */
    .dash-sidebar { width: 280px; background: var(--surface-container); border-right: 1px solid var(--border-color); display: flex; flex-direction: column; padding: 2rem 1.25rem; flex-shrink: 0; }
    .dash-brand { display: flex; align-items: center; gap: 1rem; margin-bottom: 3rem; padding: 0 0.5rem; }
    .brand-hex { width: 44px; height: 44px; background: linear-gradient(135deg, var(--primary), #8b5cf6); clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%); display: flex; align-items: center; justify-content: center; color: #fff; box-shadow: 0 0 20px var(--primary-glow); }
    .brand-info h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.1rem; font-weight: 800; margin: 0; color: var(--text-main); }
    .brand-info p { font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin: 2px 0 0; }

    .dash-nav { flex: 1; display: flex; flex-direction: column; gap: 0.5rem; }
    .d-nav-item { display: flex; align-items: center; gap: 1rem; padding: 0.9rem 1.25rem; border-radius: 1rem; color: var(--text-muted); text-decoration: none; font-weight: 700; font-size: 0.95rem; transition: 0.2s; cursor: pointer; }
    .d-nav-item:hover { color: var(--text-main); background: var(--glass); }
    .d-nav-item.active { background: rgba(59,130,246,0.1); color: var(--primary); }
    .d-nav-item.logout { margin-top: auto; color: #ef4444; }
    .nav-spacer { height: 2rem; }

    .dash-user-card { background: var(--glass); border: 1px solid var(--border-color); padding: 1rem; border-radius: 1.25rem; display: flex; align-items: center; gap: 1rem; margin-top: 2rem; color: var(--text-main); }
    .avatar-circle { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), #8b5cf6); display: flex; align-items: center; justify-content: center; font-weight: 800; color: #fff; }
    .u-meta h5 { font-size: 0.9rem; margin: 0; color: var(--text-main); }
    .u-meta span { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
    .btn-dots { background: transparent; border: none; color: var(--text-muted); cursor: pointer; margin-left: auto; }

    /* Content */
    .dash-content { flex: 1; padding: 3rem 4rem; overflow-y: auto; }
    .dash-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 3.5rem; }
    .dash-header h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.75rem; font-weight: 800; margin: 0 0 0.5rem; color: var(--text-main); }
    .dash-header h1 span { color: var(--primary); }
    .dash-header p { font-size: 1.15rem; color: var(--text-muted); }

    .h-right { display: flex; align-items: center; gap: 1.5rem; }
    .btn-search-trigger { background: var(--glass); border: 1px solid var(--glass-border); color: var(--text-main); padding: 0.85rem 1.5rem; border-radius: 1.5rem; display: flex; align-items: center; gap: 0.75rem; font-weight: 700; cursor: pointer; transition: 0.2s; }
    .btn-search-trigger:hover { background: var(--glass-border); }
    .notif-bell { position: relative; width: 48px; height: 48px; border-radius: 50%; background: var(--glass); display: flex; align-items: center; justify-content: center; transform: 0.2s; cursor: pointer; }
    .notif-bell .n-dot { position: absolute; top: 12px; right: 12px; width: 8px; height: 8px; background: #ef4444; border-radius: 50%; border: 2px solid var(--bg); }

    /* Stats */
    .dash-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 4rem; }
    .stat-glass-card { background: var(--surface-container); border: 1px solid var(--border-color); border-radius: 2rem; padding: 2.25rem; transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); color: var(--text-main); }
    .stat-glass-card:hover { transform: translateY(-8px); border-color: var(--primary); }
    .s-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .s-label { font-size: 0.75rem; font-weight: 950; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.1em; }
    .s-icon { color: var(--primary); }
    .s-body h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.5rem; font-weight: 800; margin: 0 0 1rem; color: var(--text-main); }
    .s-body p { font-size: 0.9rem; color: var(--text-muted); font-weight: 600; }
    .s-progress { height: 6px; background: var(--border-color); border-radius: 3px; margin: 1rem 0; }
    .bar { height: 100%; background: var(--primary); border-radius: 3px; box-shadow: 0 0 10px var(--primary-glow); }

    .avatar-group { display: flex; gap: -8px; margin-top: 1rem; }
    .a-mini { width: 30px; height: 30px; border-radius: 50%; background: var(--surface-container-highest); border: 2px solid var(--bg); display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 800; color: var(--text-muted); }

    .wallet { background: linear-gradient(135deg, var(--surface-container-high), var(--surface-container-low)); border: 1px solid var(--border-color); }
    .btn-topup { background: var(--primary); border: none; padding: 0.6rem 1.25rem; border-radius: 1rem; color: #fff; font-weight: 800; font-size: 0.85rem; margin-top: 1rem; cursor: pointer; box-shadow: 0 4px 12px var(--primary-glow); }

    /* Grid */
    .dash-main-grid { display: grid; grid-template-columns: 1fr 340px; gap: 3rem; }
    .section-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .section-head h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; }
    .section-head a { color: var(--primary); font-weight: 800; text-decoration: none; font-size: 0.9rem; }

    .booking-stack { display: flex; flex-direction: column; gap: 1.25rem; }
    .booking-item-premium { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 1.75rem; padding: 1.5rem; display: flex; align-items: center; gap: 1.5rem; transition: 0.2s; }
    .booking-item-premium:hover { background: var(--glass-border); }

    .b-date-box { width: 70px; height: 75px; background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.2); border-radius: 1.25rem; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .b-date-box.alt { background: rgba(168, 85, 247, 0.1); border-color: rgba(168, 85, 247, 0.2); }
    .b-date-box .m { font-size: 0.7rem; font-weight: 900; text-transform: uppercase; color: var(--primary); letter-spacing: 0.05em; }
    .b-date-box .d { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; }

    .b-info { flex: 1; }
    .b-info h4 { font-size: 1.15rem; font-weight: 800; margin: 0 0 0.5rem; }
    .b-info p { font-size: 0.9rem; color: var(--text-muted); display: flex; align-items: center; gap: 6px; font-weight: 600; margin: 0 0 0.75rem; }
    .b-info p .material-icons { font-size: 1rem; color: var(--primary); }
    .b-meta { display: flex; align-items: center; gap: 1.25rem; }
    .b-meta span { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; color: var(--text-muted); font-weight: 700; }
    .b-meta .material-icons { font-size: 1.1rem; color: var(--primary); }
    .status-tag { background: rgba(16,185,129,0.1); color: #10b981; padding: 0.3rem 0.8rem; border-radius: 2rem; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; }

    .b-actions { display: flex; align-items: center; gap: 0.75rem; }
    .btn-outline { background: transparent; border: 1.5px solid var(--glass-border); color: var(--text-main); padding: 0.6rem 1.25rem; border-radius: 1rem; font-weight: 700; font-size: 0.85rem; cursor: pointer; }
    .btn-icon-blur { width: 40px; height: 40px; border-radius: 50%; background: var(--glass); border: none; color: var(--text-main); cursor: pointer; display: flex; align-items: center; justify-content: center; }

    /* Side Column */
    .dash-side-col { display: flex; flex-direction: column; gap: 3rem; }
    .activity-feed { display: flex; flex-direction: column; gap: 2rem; }
    .act-item { display: flex; gap: 1.25rem; align-items: flex-start; }
    .act-icon { width: 44px; height: 44px; border-radius: 1rem; background: rgba(59,130,246,0.1); color: var(--primary); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .act-icon.green { background: rgba(16,185,129,0.1); color: #10b981; }
    .act-text p { font-size: 0.95rem; margin: 0 0 4px; font-weight: 600; }
    .act-text span { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }

    .promo-card { background: linear-gradient(135deg, var(--surface-container-highest), var(--bg)); border: 1px solid var(--primary); border-radius: 2rem; padding: 2.5rem; position: relative; overflow: hidden; }
    .p-content h4 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.25rem; margin: 0 0 0.75rem; color: var(--text-main); }
    .p-content p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1.5rem; font-weight: 600; }
    .btn-prime { background: var(--primary); border: none; padding: 0.75rem 1.5rem; border-radius: 1rem; color: #fff; font-weight: 800; cursor: pointer; box-shadow: 0 4px 12px var(--primary-glow); }
    .p-deco { position: absolute; font-size: 6rem; opacity: 0.05; right: -1rem; bottom: -1rem; transform: rotate(-15deg); color: var(--primary); }

    @media (max-width: 1200px) {
      .dash-main-grid { grid-template-columns: 1fr; }
      .dash-stats { grid-template-columns: repeat(2, 1fr); }
    }
  `]
})
export class DashboardComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  activeTab = 'overview';

  get currentUser() {
    return this.authService.currentUser;
  }

  get userInitial(): string {
    return this.currentUser?.firstName?.charAt(0).toUpperCase() || 'U';
  }

  bookings = [
    { service: 'Classic Fade Haircut', shop: 'Urban Fade Barbershop', month: 'OCT', day: '28', time: '2:30 PM', status: 'confirmed', alt: false },
    { service: 'Deep Tissue Massage', shop: 'Serenity Spa Hub', month: 'NOV', day: '02', time: '11:00 AM', status: 'confirmed', alt: true }
  ];

  setTab(tab: string) {
    this.activeTab = tab;
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

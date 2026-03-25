import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="dashboard-premium-layout">
      <!-- Search Overlay (Simple) -->
      <div class="search-overlay" *ngIf="showSearch">
        <div class="search-modal">
          <div class="search-header-internal">
            <span class="material-icons">search</span>
            <input type="text" placeholder="Search your dashboard..." (input)="onSearch($event)" #searchInput>
            <button class="btn-close" (click)="toggleSearch()"><span class="material-icons">close</span></button>
          </div>
          <div class="search-results-internal">
            <p class="res-count" *ngIf="searchTerm">Found {{filteredBookings.length}} results for "{{searchTerm}}"</p>
            <div class="search-item-internal" *ngFor="let b of filteredBookings" (click)="goToBooking(b)">
              <span class="material-icons">event</span>
              <div class="si-info">
                <strong>{{b.service}}</strong>
                <span>{{b.shop}} • {{b.day}} {{b.month}}</span>
              </div>
            </div>
            <p class="no-results" *ngIf="searchTerm && filteredBookings.length === 0">No matches found in your history.</p>
          </div>
        </div>
      </div>

      <!-- Notifications Panel -->
      <div class="notif-panel-floating" *ngIf="showNotifications" (click)="$event.stopPropagation()">
        <div class="p-header">
          <h4>Notifications</h4>
          <span class="mark-read">Mark all as read</span>
        </div>
        <div class="notif-list-internal">
          <div class="n-item" *ngFor="let n of notifications">
            <div class="n-dot-active" *ngIf="!n.read"></div>
            <div class="n-body">
              <p>{{n.text}}</p>
              <span>{{n.time}}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
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
            <button class="btn-search-trigger" (click)="toggleSearch()">
              <span class="material-icons">search</span>
              Find in Dashboard
            </button>
            <div class="notif-bell" (click)="toggleNotifications($event)">
              <span class="material-icons">notifications</span>
              <span class="n-dot" *ngIf="hasUnreadNotifications"></span>
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
                <a class="view-all-link" (click)="setTab('bookings')">View All</a>
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
                    <button class="btn-outline" (click)="showRescheduleModal(b)">Reschedule</button>
                    <div class="opt-container">
                      <button class="btn-icon-blur" (click)="toggleMenu($event, b)"><span class="material-icons">more_horiz</span></button>
                      <div class="action-dropdown" *ngIf="activeMenuBooking === b" (click)="$event.stopPropagation()">
                        <button (click)="viewShop(b)">View Shop Info</button>
                        <button (click)="messageSupport(b)">Message Support</button>
                        <button class="danger" (click)="cancelBooking(b)">Cancel Booking</button>
                      </div>
                    </div>
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

        <!-- Bookings Tab -->
        <ng-container *ngIf="activeTab === 'bookings'">
          <div class="tab-header-internal">
            <div class="th-info">
              <h2>My Bookings</h2>
              <p>Manage your appointments and service history</p>
            </div>
            <div class="tab-filters">
              <button class="filter-chip active">Upcoming</button>
              <button class="filter-chip">Completed</button>
              <button class="filter-chip">Cancelled</button>
            </div>
          </div>

          <div class="booking-stack full-width">
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
                <button class="btn-outline" (click)="showRescheduleModal(b)">Reschedule</button>
                <div class="opt-container">
                  <button class="btn-icon-blur" (click)="toggleMenu($event, b)"><span class="material-icons">more_horiz</span></button>
                  <div class="action-dropdown" *ngIf="activeMenuBooking === b" (click)="$event.stopPropagation()">
                    <button (click)="viewShop(b)">View Shop Info</button>
                    <button (click)="messageSupport(b)">Message Support</button>
                    <button class="danger" (click)="cancelBooking(b)">Cancel Booking</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ng-container>

        <!-- Saved Shops Tab -->
        <ng-container *ngIf="activeTab === 'saved'">
          <div class="tab-header-internal">
            <div class="th-info">
              <h2>Saved Shops</h2>
              <p>Your favorite neighborhoods spots in one place</p>
            </div>
            <span class="count-badge-premium">{{savedShops.length}} Shops</span>
          </div>

          <div class="shops-grid-premium">
            <div class="shop-card-glass" *ngFor="let s of savedShops">
              <div class="s-header">
                <div class="s-img-placeholder">
                  <span class="material-icons">storefront</span>
                </div>
                <button class="btn-unsave" (click)="unsaveShop(s)">
                  <span class="material-icons">favorite</span>
                </button>
              </div>
              <div class="s-body-internal">
                <h4>{{s.name}}</h4>
                <div class="s-meta-items">
                  <span><span class="material-icons">category</span> {{s.category}}</span>
                  <span><span class="material-icons">location_on</span> {{s.address}}</span>
                </div>
                <button class="btn-glass-action" (click)="viewShop(s)">View Shop</button>
              </div>
            </div>
          </div>
        </ng-container>

        <!-- Orders Tab -->
        <ng-container *ngIf="activeTab === 'orders'">
          <div class="tab-header-internal">
            <div class="th-info">
              <h2>Order History</h2>
              <p>Track your product purchases and deliveries</p>
            </div>
          </div>

          <div class="orders-list-premium">
            <div class="order-card-glass" *ngFor="let o of orders">
              <div class="o-head">
                <div class="o-main">
                  <span class="o-id">{{o.id}}</span>
                  <h4>{{o.shop}}</h4>
                </div>
                <span class="status-tag" [class]="o.status.toLowerCase().replace(' ', '-')">{{o.status}}</span>
              </div>
              <div class="o-details">
                <div class="o-detail-item">
                  <label>Date</label>
                  <span>{{o.date}}</span>
                </div>
                <div class="o-detail-item">
                  <label>Items</label>
                  <span>{{o.items}}</span>
                </div>
                <div class="o-detail-item">
                  <label>Total</label>
                  <span class="price-highlight">{{o.total}}</span>
                </div>
              </div>
              <div class="o-footer">
                <button class="btn-text">Track Order</button>
                <div class="dot-divider"></div>
                <button class="btn-text">Download Invoice</button>
              </div>
            </div>
          </div>
        </ng-container>

        <!-- Settings Tab -->
        <ng-container *ngIf="activeTab === 'settings'">
          <div class="tab-header-internal">
            <div class="th-info">
              <h2>Settings</h2>
              <p>Securely manage your profile and account preferences</p>
            </div>
          </div>

          <div class="settings-grid">
            <section class="settings-card-premium">
              <div class="sc-head">
                <span class="material-icons">person</span>
                <h3>Profile Information</h3>
              </div>
              <div class="sc-body">
                <div class="form-row">
                  <div class="form-group-internal">
                    <label>First Name</label>
                    <input type="text" [(ngModel)]="userProfile.firstName" placeholder="First Name">
                  </div>
                  <div class="form-group-internal">
                    <label>Last Name</label>
                    <input type="text" [(ngModel)]="userProfile.lastName" placeholder="Last Name">
                  </div>
                </div>
                <div class="form-group-internal">
                  <label>Email Address</label>
                  <input type="email" [(ngModel)]="userProfile.email" placeholder="email@example.com">
                </div>
                <div class="form-group-internal">
                  <label>Phone Number</label>
                  <input type="text" [(ngModel)]="userProfile.phone" placeholder="+91 XXXX XXXX">
                </div>
                <button class="btn-prime-save">Save Changes</button>
              </div>
            </section>

            <section class="settings-card-premium">
              <div class="sc-head">
                <span class="material-icons">security</span>
                <h3>Security & Privacy</h3>
              </div>
              <div class="sc-body">
                <div class="form-group-internal">
                  <label>Current Password</label>
                  <input type="password" placeholder="••••••••">
                </div>
                <div class="form-group-internal">
                  <label>New Password</label>
                  <input type="password" placeholder="••••••••">
                </div>
                <div class="form-group-internal">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="••••••••">
                </div>
                <button class="btn-outline-action">Update Password</button>
              </div>
            </section>

            <section class="settings-card-premium notify">
              <div class="sc-head">
                <span class="material-icons">notifications_active</span>
                <h3>Notifications</h3>
              </div>
              <div class="sc-body">
                <div class="toggle-group">
                  <div class="t-info">
                    <strong>Email Notifications</strong>
                    <p>Receive updates about your bookings via email</p>
                  </div>
                  <div class="t-switch active"></div>
                </div>
                <div class="toggle-group">
                  <div class="t-info">
                    <strong>SMS Alerts</strong>
                    <p>Get instant text reminders before appointments</p>
                  </div>
                  <div class="t-switch"></div>
                </div>
              </div>
            </section>
          </div>
        </ng-container>

        <!-- Dashboard Popups -->
        <div class="modal-backdrop" *ngIf="reschedulingBooking">
          <div class="glass-modal">
            <h3>Reschedule Appointment</h3>
            <p>Select a new time for <strong>{{reschedulingBooking.service}}</strong> at {{reschedulingBooking.shop}}</p>
            <div class="slots-grid">
              <button class="slot" *ngFor="let slot of availableSlots" (click)="applyReschedule(slot)">{{slot}}</button>
            </div>
            <button class="btn-close-modal" (click)="reschedulingBooking = null">Cancel</button>
          </div>
        </div>
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

    /* Search Overlay */
    .search-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); backdrop-filter: blur(8px); z-index: 2000; display: flex; justify-content: center; padding-top: 10vh; }
    .search-modal { width: 90%; max-width: 650px; background: var(--surface-container); border: 1px solid var(--glass-border); border-radius: 2rem; overflow: hidden; height: fit-content; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
    .search-header-internal { display: flex; align-items: center; gap: 1rem; padding: 1.5rem 2rem; border-bottom: 1px solid var(--border-color); }
    .search-header-internal input { flex: 1; background: transparent; border: none; color: var(--text-main); font-size: 1.25rem; font-weight: 700; outline: none; }
    .search-results-internal { padding: 1rem; max-height: 400px; overflow-y: auto; }
    .search-item-internal { display: flex; align-items: center; gap: 1rem; padding: 1rem; border-radius: 1rem; cursor: pointer; transition: 0.2s; }
    .search-item-internal:hover { background: var(--glass); }
    .si-info strong { display: block; font-size: 1rem; }
    .si-info span { font-size: 0.8rem; color: var(--text-muted); }

    /* Notifications Panel */
    .notif-panel-floating { position: absolute; top: 80px; right: 4rem; width: 350px; background: var(--surface-container); border: 1px solid var(--border-color); border-radius: 1.5rem; box-shadow: 0 15px 40px rgba(0,0,0,0.4); z-index: 1000; animation: slideIn 0.3s ease; }
    @keyframes slideIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    .p-header { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border-color); }
    .p-header h4 { margin: 0; font-size: 1.1rem; }
    .mark-read { font-size: 0.75rem; color: var(--primary); cursor: pointer; font-weight: 700; }
    .notif-list-internal { padding: 0.75rem; max-height: 350px; overflow-y: auto; }
    .n-item { display: flex; gap: 1rem; padding: 1rem; border-radius: 1rem; transition: 0.2s; position: relative; }
    .n-item:hover { background: var(--glass); }
    .n-dot-active { position: absolute; left: 8px; top: 1.2rem; width: 6px; height: 6px; background: var(--primary); border-radius: 50%; }
    .n-body p { font-size: 0.85rem; margin: 0 0 4px; line-height: 1.4; }
    .n-body span { font-size: 0.75rem; color: var(--text-muted); }

    /* Action Dropdown */
    .opt-container { position: relative; }
    .action-dropdown { position: absolute; right: 0; top: 100%; margin-top: 0.5rem; width: 180px; background: var(--bg); border: 1px solid var(--border-color); border-radius: 1rem; padding: 0.5rem; z-index: 10; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
    .action-dropdown button { width: 100%; text-align: left; padding: 0.7rem 1rem; background: transparent; border: none; color: var(--text-main); font-size: 0.85rem; font-weight: 600; cursor: pointer; border-radius: 0.6rem; transition: 0.2s; }
    .action-dropdown button:hover { background: var(--glass); }
    .action-dropdown button.danger { color: #ef4444; }

    /* Modals */
    .modal-backdrop { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); z-index: 3000; display: flex; items-center: center; justify-content: center; align-items: center; }
    .glass-modal { background: var(--surface-container); border: 1px solid var(--primary); border-radius: 2rem; padding: 2.5rem; width: 450px; text-align: center; }
    .slots-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin: 2rem 0; }
    .slot { padding: 1rem; border: 1px solid var(--border-color); background: var(--glass); border-radius: 1rem; color: var(--text-main); font-weight: 700; cursor: pointer; transition: 0.2s; }
    .slot:hover { border-color: var(--primary); background: var(--primary-glow); }
    .btn-close-modal { background: transparent; border: none; color: var(--text-muted); font-weight: 700; cursor: pointer; }

    .view-all-link { cursor: pointer; color: var(--primary); font-weight: 800; text-decoration: none; font-size: 0.9rem; }

    /* Internal Tab Styling */
    .tab-header-internal { margin-bottom: 2.5rem; display: flex; justify-content: space-between; align-items: flex-end; }
    .th-info h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 800; margin: 0 0 0.5rem; color: var(--text-main); }
    .th-info p { color: var(--text-muted); font-weight: 600; margin: 0; }

    .tab-filters { display: flex; gap: 0.75rem; }
    .filter-chip { padding: 0.6rem 1.25rem; border-radius: 2rem; background: var(--glass); border: 1px solid var(--border-color); color: var(--text-muted); font-weight: 700; font-size: 0.85rem; cursor: pointer; transition: 0.2s; }
    .filter-chip.active { background: var(--primary); color: #fff; border-color: var(--primary); box-shadow: 0 4px 12px var(--primary-glow); }

    .booking-stack.full-width { max-width: 900px; }

    /* Saved Shops */
    .shops-grid-premium { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
    .shop-card-glass { background: var(--surface-container); border: 1px solid var(--border-color); border-radius: 1.5rem; overflow: hidden; transition: 0.3s; }
    .shop-card-glass:hover { transform: translateY(-5px); border-color: var(--primary); background: var(--surface-container-high); }
    .s-header { height: 140px; background: linear-gradient(45deg, var(--surface-container-high), var(--surface-container-highest)); position: relative; display: flex; align-items: center; justify-content: center; }
    .s-img-placeholder { width: 60px; height: 60px; background: var(--glass); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary); }
    .s-img-placeholder .material-icons { font-size: 2rem; }
    .btn-unsave { position: absolute; top: 1rem; right: 1rem; width: 40px; height: 40px; border-radius: 50%; background: rgba(0,0,0,0.3); border: none; color: #ef4444; cursor: pointer; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); }
    .s-body-internal { padding: 1.5rem; }
    .s-body-internal h4 { margin: 0 0 1rem; font-size: 1.2rem; font-weight: 800; }
    .s-meta-items { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; }
    .s-meta-items span { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; color: var(--text-muted); font-weight: 600; }
    .s-meta-items .material-icons { font-size: 1rem; color: var(--primary); }
    .btn-glass-action { width: 100%; padding: 0.75rem; border-radius: 1rem; background: var(--glass); border: 1px solid var(--glass-border); color: var(--text-main); font-weight: 700; cursor: pointer; transition: 0.2s; }
    .btn-glass-action:hover { background: var(--primary); color: #fff; }

    .count-badge-premium { background: var(--primary-glow); color: var(--primary); padding: 0.5rem 1rem; border-radius: 2rem; font-weight: 800; font-size: 0.85rem; }

    /* Orders Tab */
    .orders-list-premium { display: flex; flex-direction: column; gap: 1.25rem; max-width: 1000px; }
    .order-card-glass { background: var(--surface-container); border: 1px solid var(--border-color); border-radius: 1.5rem; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
    .o-head { display: flex; justify-content: space-between; align-items: flex-start; }
    .o-id { font-size: 0.75rem; font-weight: 900; color: var(--primary); letter-spacing: 0.05em; display: block; margin-bottom: 4px; }
    .o-head h4 { margin: 0; font-size: 1.1rem; font-weight: 800; }
    .o-details { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color); padding: 1.25rem 0; }
    .o-detail-item label { display: block; font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 800; margin-bottom: 4px; }
    .o-detail-item span { font-weight: 700; font-size: 0.95rem; }
    .price-highlight { color: var(--primary); }
    .o-footer { display: flex; align-items: center; gap: 1rem; }
    .btn-text { background: transparent; border: none; color: var(--primary); font-weight: 800; font-size: 0.85rem; cursor: pointer; }
    .dot-divider { width: 4px; height: 4px; background: var(--border-color); border-radius: 50%; }

    /* Settings Tab */
    .settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; max-width: 1100px; }
    .settings-card-premium { background: var(--surface-container); border: 1px solid var(--border-color); border-radius: 1.5rem; padding: 2rem; }
    .settings-card-premium.notify { grid-column: span 2; }
    .sc-head { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2rem; color: var(--primary); }
    .sc-head h3 { margin: 0; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.2rem; font-weight: 800; color: var(--text-main); }
    .sc-body { display: flex; flex-direction: column; gap: 1.25rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .form-group-internal { display: flex; flex-direction: column; gap: 0.5rem; }
    .form-group-internal label { font-size: 0.85rem; font-weight: 700; color: var(--text-muted); }
    .form-group-internal input { background: var(--bg); border: 1px solid var(--border-color); border-radius: 0.75rem; padding: 0.75rem 1rem; color: var(--text-main); font-weight: 600; outline: none; transition: 0.2s; }
    .form-group-internal input:focus { border-color: var(--primary); box-shadow: 0 0 0 4px var(--primary-glow); }
    .btn-prime-save { background: var(--primary); color: #fff; border: none; padding: 0.9rem; border-radius: 0.75rem; font-weight: 800; cursor: pointer; box-shadow: 0 4px 12px var(--primary-glow); }
    .btn-outline-action { background: transparent; border: 1.5px solid var(--border-color); color: var(--text-main); padding: 0.9rem; border-radius: 0.75rem; font-weight: 800; cursor: pointer; }

    .toggle-group { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--bg); border-radius: 1rem; border: 1px solid var(--border-color); }
    .t-info strong { display: block; font-size: 0.9rem; margin-bottom: 2px; }
    .t-info p { font-size: 0.75rem; color: var(--text-muted); margin: 0; font-weight: 600; }
    .t-switch { width: 44px; height: 24px; background: var(--border-color); border-radius: 12px; position: relative; cursor: pointer; transition: 0.3s; }
    .t-switch::after { content: ''; position: absolute; left: 4px; top: 4px; width: 16px; height: 16px; background: #fff; border-radius: 50%; transition: 0.3s; }
    .t-switch.active { background: var(--primary); }
    .t-switch.active::after { left: 24px; }


    @media (max-width: 1200px) {
      .dash-main-grid { grid-template-columns: 1fr; }
      .dash-stats { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 768px) {
      .dashboard-premium-layout { flex-direction: column; }
      .dash-sidebar { 
        width: 100%; 
        border-right: none; 
        border-bottom: 1px solid var(--border-color);
        padding: 1rem;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        position: sticky;
        top: 0;
        z-index: 100;
        background: var(--surface-container);
      }
      .dash-brand { margin-bottom: 0; padding: 0; }
      .brand-info { display: none; }
      .dash-nav { 
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: var(--surface-container);
        border-top: 1px solid var(--border-color);
        flex-direction: row;
        justify-content: space-around;
        padding: 0.5rem;
        margin: 0;
        z-index: 1000;
      }
      .d-nav-item { flex-direction: column; gap: 0.25rem; padding: 0.5rem; border-radius: 0.5rem; font-size: 0.7rem; }
      .d-nav-item span:last-child { font-size: 0.6rem; }
      .nav-spacer, .logout, .dash-user-card { display: none; }

      .dash-content { padding: 1.5rem; padding-bottom: 5rem; }
      .dash-header { flex-direction: column; gap: 1.5rem; align-items: flex-start; margin-bottom: 2rem; }
      .dash-header h1 { font-size: 2rem; }
      .dash-header p { font-size: 1rem; }
      .h-right { width: 100%; justify-content: space-between; }
      .btn-search-trigger { flex: 1; justify-content: center; }

      .dash-stats { grid-template-columns: 1fr; gap: 1rem; margin-bottom: 2.5rem; }
      .stat-glass-card { padding: 1.5rem; }
      .s-body h2 { font-size: 2rem; }

      .booking-item-premium { padding: 1rem; gap: 1rem; flex-direction: column; align-items: flex-start; }
      .b-info { width: 100%; }
      .b-actions { width: 100%; justify-content: space-between; gap: 0.5rem; }
      .btn-outline { flex: 1; text-align: center; }

      .dash-side-col { gap: 2rem; }
      .promo-card { padding: 1.5rem; }

      .notif-panel-floating { right: 1rem; left: 1rem; width: auto; top: 140px; }
      .search-modal { width: 95%; }
    }
  `]
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  activeTab = 'overview';
  showNotifications = false;
  showSearch = false;
  searchTerm = '';
  activeMenuBooking: any = null;
  reschedulingBooking: any = null;
  availableSlots = ['09:30 AM', '11:15 AM', '01:45 PM', '04:00 PM', '05:30 PM'];

  savedShops = [
    { id: '1', name: 'Urban Fade Barbershop', category: 'Barber', address: 'MG Road, Bangalore' },
    { id: '2', name: 'Serenity Spa Hub', category: 'Wellness', address: 'Indiranagar, Bangalore' },
    { id: '3', name: 'Auto Clinic', category: 'Mechanic', address: 'Koramangala, Bangalore' }
  ];

  orders = [
    { id: 'ORD-8821', shop: 'Urban Fade', items: 'Fiber Wax, Sea Salt Spray', total: '₹1,200', date: 'Oct 24, 2026', status: 'Delivered' },
    { id: 'ORD-7754', shop: 'Serenity Spa', items: 'Essential Oils (Set of 3)', total: '₹850', date: 'Oct 15, 2026', status: 'In Transit' }
  ];

  userProfile = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  bookings = [
    { id: 1, service: 'Classic Fade Haircut', shop: 'Urban Fade Barbershop', month: 'OCT', day: '28', time: '2:30 PM', status: 'confirmed', alt: false },
    { id: 2, service: 'Deep Tissue Massage', shop: 'Serenity Spa Hub', month: 'NOV', day: '02', time: '11:00 AM', status: 'confirmed', alt: true }
  ];

  notifications = [
    { text: 'Your haircut at Urban Fade is tomorrow at 2:30 PM.', time: '1 hour ago', read: false },
    { text: 'Reminder: Service booking for Spa session is confirmed.', time: '3 hours ago', read: true },
    { text: 'Welcome to Nikat! Explore local shops around you.', time: '1 day ago', read: true }
  ];

  filteredBookings = [...this.bookings];

  get currentUser() {
    return this.authService.currentUser;
  }

  get userInitial(): string {
    return this.currentUser?.firstName?.charAt(0).toUpperCase() || 'U';
  }

  get hasUnreadNotifications(): boolean {
    return this.notifications.some(n => !n.read);
  }

  ngOnInit() {
    if (this.currentUser) {
      this.userProfile = {
        firstName: this.currentUser.firstName || '',
        lastName: this.currentUser.lastName || '',
        email: this.currentUser.email || '',
        phone: this.currentUser.phone || ''
      };
    }
    // Close menus on outside click
    window.addEventListener('click', () => {
      this.activeMenuBooking = null;
      this.showNotifications = false;
    });
  }

  setTab(tab: string) {
    this.activeTab = tab;
    this.showNotifications = false;
    this.showSearch = false;
  }

  toggleNotifications(event: Event) {
    event.stopPropagation();
    this.showNotifications = !this.showNotifications;
    this.showSearch = false;
    this.activeMenuBooking = null;
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    this.showNotifications = false;
    this.activeMenuBooking = null;
    if (this.showSearch) {
      setTimeout(() => {
        const input = document.querySelector('.search-header-internal input') as HTMLInputElement;
        input?.focus();
      }, 100);
    }
  }

  onSearch(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filteredBookings = this.bookings.filter(b => 
      b.service.toLowerCase().includes(this.searchTerm) || 
      b.shop.toLowerCase().includes(this.searchTerm)
    );
  }

  goToBooking(booking: any) {
    this.showSearch = false;
    this.setTab('bookings');
    console.log('Navigating to booking:', booking.id);
  }

  toggleMenu(event: Event, booking: any) {
    event.stopPropagation();
    this.activeMenuBooking = this.activeMenuBooking === booking ? null : booking;
    this.showNotifications = false;
  }

  showRescheduleModal(booking: any) {
    this.reschedulingBooking = booking;
    this.activeMenuBooking = null;
  }

  applyReschedule(slot: string) {
    if (this.reschedulingBooking) {
      this.reschedulingBooking.time = slot;
      alert(`Successfully rescheduled to ${slot}`);
      this.reschedulingBooking = null;
    }
  }

  viewShop(booking: any) {
    this.router.navigate(['/browse']); // Placeholder for shop detail
  }

  messageSupport(booking: any) {
    alert('Support ticket created for ' + booking.service);
  }

  cancelBooking(booking: any) {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.bookings = this.bookings.filter(b => b.id !== booking.id);
      this.filteredBookings = [...this.bookings];
    }
  }

  unsaveShop(shop: any) {
    this.savedShops = this.savedShops.filter(s => s.id !== shop.id);
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

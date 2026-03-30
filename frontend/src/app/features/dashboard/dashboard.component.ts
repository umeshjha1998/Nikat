import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { FormsModule } from '@angular/forms';
import { BookingService, Booking } from '../../core/booking.service';
import { ApiService, OrderDto } from '../../core/api.service';

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

        <div class="dash-user-card" (click)="$event.stopPropagation()">
          <div class="avatar-circle">{{userInitial}}</div>
          <div class="u-meta">
            <h5>{{currentUser?.firstName}} {{currentUser?.lastName}}</h5>
            <span>{{currentUser?.role}}</span>
          </div>
          <button class="btn-dots" (click)="toggleProfileMenu($event)">
            <span class="material-icons">more_vert</span>
          </button>

          <!-- Profile Quick Menu -->
          <div class="profile-quick-menu" *ngIf="showProfileMenu" (click)="$event.stopPropagation()">
            <div class="menu-item-premium" (click)="setTab('settings'); showProfileMenu = false">
              <span class="material-icons">person</span>
              <span>Edit Profile</span>
            </div>
            <div class="menu-item-premium" (click)="setTab('settings'); showProfileMenu = false">
              <span class="material-icons">lock</span>
              <span>Change Password</span>
            </div>
            <div class="menu-item-premium" (click)="setTab('overview'); showProfileMenu = false">
              <span class="material-icons">help_outline</span>
              <span>Help Center</span>
            </div>
            <div class="menu-divider"></div>
            <div class="menu-item-premium logout" (click)="signOut()">
              <span class="material-icons">logout</span>
              <span>Sign Out</span>
            </div>
          </div>
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
              <span class="desktop-only">Find in Dashboard</span>
            </button>
            <div class="notif-bell" (click)="toggleNotifications($event)">
              <span class="material-icons">notifications</span>
              <span class="n-dot" *ngIf="hasUnreadNotifications"></span>
            </div>
            <div class="mobile-only avatar-circle" (click)="setTab('settings')">
              {{userInitial}}
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
                <div class="booking-item-premium" *ngFor="let b of (bookings | slice:0:3)">
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
                  <div class="b-actions" *ngIf="b.type === 'upcoming'">
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
              <button class="filter-chip" [class.active]="bookingFilter === 'upcoming'" (click)="setBookingFilter('upcoming')">Upcoming</button>
              <button class="filter-chip" [class.active]="bookingFilter === 'completed'" (click)="setBookingFilter('completed')">Completed</button>
              <button class="filter-chip" [class.active]="bookingFilter === 'cancelled'" (click)="setBookingFilter('cancelled')">Cancelled</button>
            </div>
          </div>

          <div class="booking-stack full-width">
            <div class="booking-item-premium" *ngFor="let b of filteredBookings">
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
                <!-- Upcoming Only Actions -->
                <ng-container *ngIf="b.type === 'upcoming'">
                  <button class="btn-outline" (click)="showRescheduleModal(b)">Reschedule</button>
                  <div class="opt-container">
                    <button class="btn-icon-blur" (click)="toggleMenu($event, b)"><span class="material-icons">more_horiz</span></button>
                    <div class="action-dropdown" *ngIf="activeMenuBooking === b" (click)="$event.stopPropagation()">
                      <button (click)="viewShop(b)">View Shop Info</button>
                      <button (click)="messageSupport(b)">Message Support</button>
                      <button class="danger" (click)="cancelBooking(b)">Cancel Booking</button>
                    </div>
                  </div>
                </ng-container>

                <!-- Cancelled Only Actions -->
                <button class="btn-prime-mini" *ngIf="b.type === 'cancelled'" (click)="reactivateBooking(b)">
                  <span class="material-icons">refresh</span> Reactivate
                </button>

                <!-- Completed Only Actions -->
                <button class="btn-outline-small" *ngIf="b.type === 'completed'" (click)="viewInvoice(b)">
                  <span class="material-icons">receipt</span> Invoice
                </button>
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
                  <h4>{{o.shopName}}</h4>
                </div>
                <span class="status-tag" [class]="o.status?.toLowerCase() || 'pending'">{{o.status || 'Pending'}}</span>
              </div>
              <div class="o-details">
                <div class="o-detail-item">
                  <label>Order Date</label>
                  <span>{{o.createdAt | date:'mediumDate'}}</span>
                </div>
                <div class="o-detail-item">
                  <label>Items</label>
                  <span>{{getOrderItemsText(o)}}</span>
                </div>
                <div class="o-detail-item">
                  <label>Total</label>
                  <span class="price-highlight">₹{{o.totalAmount}}</span>
                </div>
              </div>
              <div class="o-footer">
                <button class="btn-text" (click)="trackOrder(o)">Track Order</button>
                <div class="dot-divider"></div>
                <button class="btn-text" (click)="downloadInvoice(o)">Download Invoice</button>
              </div>
            </div>
            <div class="no-orders" *ngIf="orders.length === 0">
               <p>You haven't placed any orders yet.</p>
               <button class="btn-prime-mini" routerLink="/shops">Browse Shops</button>
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
                
                <div class="form-group-internal" style="margin-top: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
                  <label>My Location (GPS)</label>
                  <div class="location-action-bar" style="display: flex; gap: 1rem; align-items: center; margin-top: 0.5rem;">
                     <button class="btn-outline-action" type="button" (click)="fetchGPSLocation()" [disabled]="isFetchingLocation" style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                        <span class="material-icons" *ngIf="!isFetchingLocation">my_location</span>
                        <span class="upload-loader" *ngIf="isFetchingLocation" style="width: 14px; height: 14px;"></span>
                        {{ isFetchingLocation ? 'Determining...' : 'Update GPS Location' }}
                     </button>
                  </div>
                  
                  <div class="coords-display" *ngIf="userProfile.latitude" style="display: flex; gap: 1.5rem; margin-top: 1rem; padding: 1rem; background: var(--bg); border-radius: 1rem; border: 1px solid var(--glass-border);">
                     <div class="coord-item">
                        <small style="color: var(--text-muted); text-transform: uppercase; font-size: 0.65rem; font-weight: 800; display: block;">Latitude</small>
                        <span style="font-family: monospace; font-size: 0.9rem;">{{userProfile.latitude}}</span>
                     </div>
                     <div class="coord-item">
                        <small style="color: var(--text-muted); text-transform: uppercase; font-size: 0.65rem; font-weight: 800; display: block;">Longitude</small>
                        <span style="font-family: monospace; font-size: 0.9rem;">{{userProfile.longitude}}</span>
                     </div>
                  </div>
                  <p class="form-hint" style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem;" *ngIf="userProfile.latitude">Coordinates are saved to help find services within your neighborhood.</p>
                </div>

                <!-- NEW: Verification Details Section -->
                <div class="form-group-internal" style="margin-top: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
                  <label>Verification Details (Optional)</label>
                  <div class="form-row">
                    <div class="form-group-internal">
                      <label>Aadhar Number</label>
                      <input type="text" [(ngModel)]="userProfile.aadharNumber" placeholder="XXXX XXXX XXXX">
                    </div>
                    <div class="form-group-internal">
                      <label>PAN Number</label>
                      <input type="text" [(ngModel)]="userProfile.panNumber" placeholder="ABCDE1234F">
                    </div>
                  </div>
                  <div class="form-group-internal" style="margin-top: 1rem;">
                    <label>Passport Number</label>
                    <input type="text" [(ngModel)]="userProfile.passportNumber" placeholder="L1234567">
                  </div>
                </div>

                <!-- NEW: Photo Section -->
                <div class="form-group-internal" style="margin-top: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
                  <label>Profile Photo (Max 25kb)</label>
                  <div class="photo-upload-container" style="display: flex; gap: 1.5rem; align-items: center; margin-top: 0.5rem;">
                    <div class="current-photo" *ngIf="userProfile.photoData" style="width: 80px; height: 80px; border-radius: 1rem; overflow: hidden; border: 2px solid var(--primary); background: var(--bg);">
                      <img [src]="userProfile.photoData" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div class="photo-placeholder" *ngIf="!userProfile.photoData" style="width: 80px; height: 80px; border-radius: 1rem; border: 2px dashed var(--border-color); display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
                      <span class="material-icons">no_photography</span>
                    </div>
                    <label class="btn-outline-action" style="flex: 1; cursor: pointer; text-align: center; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                      <span class="material-icons">add_a_photo</span>
                      {{ userProfile.photoData ? 'Change Photo' : 'Upload Photo' }}
                      <input type="file" (change)="onPhotoSelected($event)" accept="image/*" style="display: none;">
                    </label>
                  </div>
                </div>

                <button class="btn-prime-save" (click)="saveProfile()" style="margin-top: 1.5rem;">Save Changes</button>
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
                  <input type="password" [(ngModel)]="currentPassword" placeholder="••••••••">
                </div>
                <div class="form-group-internal">
                  <label>New Password</label>
                  <input type="password" [(ngModel)]="newPassword" placeholder="••••••••">
                </div>
                <div class="form-group-internal">
                  <label>Confirm New Password</label>
                  <input type="password" [(ngModel)]="confirmPassword" placeholder="••••••••">
                </div>
                <button class="btn-outline-action" (click)="updatePassword()">Update Password</button>
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
                  <div class="t-switch" [class.active]="userProfile.emailNotifications" (click)="userProfile.emailNotifications = !userProfile.emailNotifications"></div>
                </div>
                <div class="toggle-group">
                  <div class="t-info">
                    <strong>SMS Alerts</strong>
                    <p>Get instant text reminders before appointments</p>
                  </div>
                  <div class="t-switch" [class.active]="userProfile.smsAlerts" (click)="userProfile.smsAlerts = !userProfile.smsAlerts"></div>
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

    .dash-user-card { position: relative; background: var(--glass); border: 1px solid var(--border-color); padding: 1rem; border-radius: 1.25rem; display: flex; align-items: center; gap: 1rem; margin-top: 2rem; color: var(--text-main); }
    .avatar-circle { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), #8b5cf6); display: flex; align-items: center; justify-content: center; font-weight: 800; color: #fff; }
    .u-meta h5 { font-size: 0.9rem; margin: 0; color: var(--text-main); }
    .u-meta span { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
    .btn-dots { background: transparent; border: none; color: var(--text-muted); cursor: pointer; margin-left: auto; transition: 0.2s; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; }
    .btn-dots:hover { background: var(--glass-border); color: var(--text-main); }

    .profile-quick-menu { position: absolute; bottom: calc(100% + 12px); left: 0; width: 100%; background: var(--surface-container); border: 1px solid var(--border-color); border-radius: 1.25rem; padding: 0.75rem; display: flex; flex-direction: column; gap: 0.25rem; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 100; backdrop-filter: blur(20px); }
    .menu-item-premium { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1rem; border-radius: 0.75rem; color: var(--text-main); font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: 0.2s; }
    .menu-item-premium:hover { background: var(--glass); color: var(--primary); }
    .menu-item-premium .material-icons { font-size: 1.1rem; }
    .menu-item-premium.logout { color: #ef4444; }
    .menu-divider { height: 1px; background: var(--border-color); margin: 0.5rem 0; opacity: 0.5; }

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

    .btn-prime-mini { background: var(--primary); color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 0.75rem; font-weight: 800; font-size: 0.8rem; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; box-shadow: 0 4px 10px var(--primary-glow); }
    .btn-outline-small { background: transparent; border: 1.5px solid var(--border-color); color: var(--text-main); padding: 0.5rem 1rem; border-radius: 0.75rem; font-weight: 700; font-size: 0.8rem; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }


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


    @media (max-width: 1024px) {
      .dash-sidebar { width: 80px; padding: 1.5rem 0.5rem; align-items: center; }
      .brand-info, .d-nav-item span:last-child, .u-meta, .btn-dots { display: none; }
      .dash-brand { justify-content: center; padding: 0; }
      .d-nav-item { justify-content: center; padding: 1rem; }
      .dash-header h1 { font-size: 2rem; }
    }

    @media (max-width: 768px) {
      .dashboard-premium-layout { flex-direction: column; }
      
      /* Mobile Top Bar */
      .dash-sidebar { 
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 70px;
        flex-direction: row;
        padding: 0;
        border-right: none;
        border-top: 1px solid var(--border-color);
        background: var(--surface-container);
        z-index: 1000;
        justify-content: space-around;
      }

      .dash-brand, .dash-user-card, .nav-spacer { display: none; }

      .dash-nav {
         flex-direction: row;
         width: 100%;
         height: 100%;
         gap: 0;
         padding: 0;
      }

      .d-nav-item {
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 4px;
        padding: 0.5rem;
        border-radius: 0;
        font-size: 0.65rem;
        height: 100%;
      }
      
      .d-nav-item .material-icons { font-size: 1.4rem; }
      .d-nav-item span:last-child { display: block; font-size: 0.6rem; }
      .d-nav-item.active::after { display: none; }

      /* Mobile Content Adjustments */
      .dash-content { padding: 1rem 1rem 100px; }
      .dash-header { flex-direction: column; gap: 1rem; align-items: flex-start; margin-bottom: 2rem; }
      .dash-header h1 { font-size: 1.75rem; }
      .h-right { width: 100%; justify-content: space-between; }
      
      .dash-stats { grid-template-columns: 1fr; gap: 1rem; margin-bottom: 2.5rem; }
      .stat-glass-card { padding: 1.5rem; border-radius: 1.5rem; }
      
      .dash-main-grid { grid-template-columns: 1fr; gap: 2rem; }
      .section-head h3 { font-size: 1.25rem; }
      
      .booking-item-premium { flex-direction: column; align-items: flex-start; gap: 1rem; padding: 1.25rem; }
      .b-date-box { width: 100%; height: 40px; flex-direction: row; gap: 0.5rem; }
      .b-date-box .m, .b-date-box .d { font-size: 1rem; }
      .b-actions { width: 100%; justify-content: space-between; gap: 0.5rem; }
      .btn-outline { flex: 1; padding: 0.75rem; }

      .tab-header-internal { flex-direction: column; align-items: flex-start; gap: 1rem; }
      .tab-filters { overflow-x: auto; width: 100%; padding-bottom: 0.5rem; }
      .filter-chip { white-space: nowrap; }

      .shops-grid-premium { grid-template-columns: 1fr; }
      .orders-list-premium { gap: 1rem; }
      .o-details { grid-template-columns: 1fr 1fr; }
      .settings-grid { grid-template-columns: 1fr; gap: 1.5rem; }
      .settings-card-premium.notify { grid-column: auto; }
      
      .notif-panel-floating { right: 1rem; left: 1rem; width: auto; top: 180px; }
      .search-modal { width: 95%; margin: 1rem auto; }
      
      /* Show Profile Menu properly on mobile */
      .dash-sidebar .dash-user-card.mobile-profile {
         display: flex;
         position: fixed;
         top: 1rem;
         right: 1rem;
         margin: 0;
         z-index: 1001;
         padding: 0.5rem;
         width: auto;
         background: var(--surface-container);
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private bookingService = inject(BookingService);
  private apiService = inject(ApiService);
  
  activeTab = 'overview';
  showNotifications = false;
  showSearch = false;
  showProfileMenu = false;
  isFetchingLocation = false;
  searchTerm = '';
  activeMenuBooking: any = null;
  reschedulingBooking: any = null;
  availableSlots = ['09:30 AM', '11:15 AM', '01:45 PM', '04:00 PM', '05:30 PM'];
  bookingFilter: 'upcoming' | 'completed' | 'cancelled' = 'upcoming';

  savedShops = [
    { id: '1', name: 'Urban Fade Barbershop', category: 'Barber', address: 'MG Road, Bangalore' },
    { id: '2', name: 'Serenity Spa Hub', category: 'Wellness', address: 'Indiranagar, Bangalore' },
    { id: '3', name: 'Auto Clinic', category: 'Mechanic', address: 'Koramangala, Bangalore' }
  ];

  orders: OrderDto[] = [];

  userProfile: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    latitude: null,
    longitude: null,
    aadharNumber: '',
    panNumber: '',
    passportNumber: '',
    photoData: '',
    emailNotifications: true,
    smsAlerts: false
  };

  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  allBookings: Booking[] = [];
  bookings: Booking[] = [];
  filteredBookings: Booking[] = [];

  notifications = [
    { text: 'Your haircut at Urban Fade is tomorrow at 2:30 PM.', time: '1 hour ago', read: false },
    { text: 'Reminder: Service booking for Spa session is confirmed.', time: '3 hours ago', read: true },
    { text: 'Welcome to Nikat! Explore local shops around you.', time: '1 day ago', read: true }
  ];

  get currentUser() {
    return this.authService.currentUser;
  }

  get userInitial(): string {
    return this.currentUser?.firstName?.charAt(0).toUpperCase() || 'U';
  }

  get hasUnreadNotifications(): boolean {
    return this.notifications.some((n: any) => !n.read);
  }

  ngOnInit() {
    if (this.currentUser) {
      this.userProfile = {
        firstName: this.currentUser.firstName || '',
        lastName: this.currentUser.lastName || '',
        email: this.currentUser.email || '',
        phone: this.currentUser.phone || '',
        latitude: this.currentUser.latitude || null,
        longitude: this.currentUser.longitude || null,
        aadharNumber: this.currentUser.aadharNumber || '',
        panNumber: this.currentUser.panNumber || '',
        passportNumber: this.currentUser.passportNumber || '',
        photoData: this.currentUser.photoData || '',
        emailNotifications: true,
        smsAlerts: false
      };
    }
    
    // Subscribe to bookings source of truth
    this.bookingService.bookings$.subscribe((data: Booking[]) => {
      this.allBookings = data;
      this.updateBookingsList();
    });

    // Close menus on outside click
    window.addEventListener('click', () => {
      this.activeMenuBooking = null;
      this.showNotifications = false;
      this.showProfileMenu = false;
    });

    this.loadOrders();
  }

  loadOrders() {
    this.apiService.getOrdersByCurrentUser().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => {
        console.error('Failed to load orders', err);
      }
    });
  }

  getOrderItemsText(order: OrderDto): string {
    return order.items.map(i => i.productName || 'Product').join(', ');
  }

  toggleProfileMenu(event: Event) {
    event.stopPropagation();
    this.showProfileMenu = !this.showProfileMenu;
    this.showNotifications = false;
    this.activeMenuBooking = null;
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
    this.applyFilters();
  }

  private updateBookingsList() {
    // Current "active" upcoming bookings display in overview
    this.bookings = this.allBookings.filter(b => b.type === 'upcoming');
    this.applyFilters();
  }

  setBookingFilter(filter: 'upcoming' | 'completed' | 'cancelled') {
    this.bookingFilter = filter;
    this.applyFilters();
  }

  private applyFilters() {
    this.filteredBookings = this.allBookings.filter(b => {
      const matchesSearch = b.service.toLowerCase().includes(this.searchTerm) || 
                          b.shop.toLowerCase().includes(this.searchTerm);
      const matchesType = b.type === this.bookingFilter;
      return matchesSearch && matchesType;
    });
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
      this.bookingService.rescheduleBooking(this.reschedulingBooking.id, slot);
      alert(`Successfully rescheduled to ${slot}. This update is reflected on the shop dashboard.`);
      this.reschedulingBooking = null;
    }
  }

  viewShop(shop: any) {
    if (shop.id) {
      this.router.navigate(['/shop', shop.id]);
    } else {
      this.router.navigate(['/browse']);
    }
  }

  messageSupport(booking: any) {
    alert('Support ticket created for ' + booking.service);
  }

  cancelBooking(booking: any) {
    if (confirm('Are you sure you want to cancel this booking? This will immediately notify the shop.')) {
      this.bookingService.cancelBooking(booking.id);
      alert('Booking cancelled. Status synced with shop.');
    }
  }

  reactivateBooking(booking: any) {
    const success = this.bookingService.reactivateBooking(booking.id);
    if (success) {
      alert('Booking reactivated! Service timing checked and confirmed.');
    } else {
      alert('Sorry, the original service timings are no longer available for reactivation.');
    }
  }

  viewInvoice(booking: any) {
    alert(`Showing invoice for completed service: ${booking.service}`);
  }

  unsaveShop(shop: any) {
    if (confirm(`Are you sure you want to remove ${shop.name} from your saved shops?`)) {
      this.savedShops = this.savedShops.filter(s => s.id !== shop.id);
      alert('Shop removed from favorites.');
    }
  }

  trackOrder(order: any) {
    alert(`Tracking order ${order.id}: Current status is ${order.status}. Estimated delivery: 2-3 days.`);
  }

  downloadInvoice(order: any) {
    alert(`Generating invoice for ${order.id}. Your download will start shortly.`);
    console.log('Invoice downloaded for:', order.id);
  }

  fetchGPSLocation() {
    this.isFetchingLocation = true;
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          
          this.userProfile.latitude = lat;
          this.userProfile.longitude = lon;

          // Reverse geocoding using Nominatim (OSM)
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
            .then(res => res.json())
            .then(data => {
              if (this.userProfile && data.display_name) {
                alert(`Location found: ${data.display_name}. Profile coordinates updated!`);
              }
              this.isFetchingLocation = false;
            })
            .catch(err => {
              console.error('Reverse Geocode Error:', err);
              this.isFetchingLocation = false;
              alert('GPS coordinates captured, but could not resolve address.');
            });
        },
        (err) => {
          console.error('Error fetching location', err);
          this.isFetchingLocation = false;
          alert('Could not fetch location. Please ensure GPS is enabled and permissions granted.');
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
      this.isFetchingLocation = false;
  }
  }

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.compressImage(e.target.result, 800, 800, 0.7).then(compressed => {
          this.userProfile.photoData = compressed;
        });
      };
      reader.readAsDataURL(file);
    }
  }

  private compressImage(dataUrl: string, maxWidth: number, maxHeight: number, quality: number): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        // Recursive compression to get under 25kb
        const attemptCompression = (q: number) => {
          const result = canvas.toDataURL('image/jpeg', q);
          const sizeKb = Math.round((result.length * 3 / 4) / 1024);
          
          if (sizeKb > 25 && q > 0.1) {
            attemptCompression(q - 0.1);
          } else {
            resolve(result);
          }
        };

        attemptCompression(quality);
      };
    });
  }

  saveProfile() {
    if (!this.currentUser) return;
    
    this.authService.updateProfile(this.currentUser.id, this.userProfile).subscribe({
      next: () => {
        alert('Profile and GPS coordinates updated successfully!');
      },
      error: (err) => {
        alert('Failed to update profile: ' + (err.error?.message || err.message));
      }
    });
  }

  updatePassword() {
    if (!this.currentUser) return;
    if (!this.currentPassword || !this.newPassword) {
      alert('Please fill in both current and new passwords.');
      return;
    }
    if (this.newPassword !== this.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    this.authService.updatePassword(this.currentUser.id, {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    }).subscribe({
      next: () => {
        alert('Password updated successfully in the base! Please use your new password next time.');
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: (err) => {
        alert('Failed to update password: ' + (err.error?.message || err.message));
      }
    });
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

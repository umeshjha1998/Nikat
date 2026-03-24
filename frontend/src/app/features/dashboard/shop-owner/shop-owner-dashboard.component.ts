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
      <!-- Sidebar -->
      <aside class="dashboard-sidebar">
        <div class="business-brand">
          <div class="brand-hexagon">
            <span class="material-icons">architecture</span>
          </div>
          <div class="brand-text">
            <h3>Business Studio</h3>
            <p>Nikat for Partners</p>
          </div>
        </div>

        <nav class="sidebar-nav">
          <a class="nav-item active">
            <span class="material-icons">insights</span>
            <span>Analytics</span>
          </a>
          <a class="nav-item">
            <span class="material-icons">storefront</span>
            <span>Listings</span>
          </a>
          <a class="nav-item">
            <span class="material-icons">event_available</span>
            <span>Appointments</span>
          </a>
          <a class="nav-item">
            <span class="material-icons">chat_bubble_outline</span>
            <span>Inquiries</span>
            <span class="badge">4</span>
          </a>
          <div class="nav-divider"></div>
          <a class="nav-item">
            <span class="material-icons">settings</span>
            <span>Settings</span>
          </a>
          <a class="nav-item">
            <span class="material-icons">help_outline</span>
            <span>Support</span>
          </a>
        </nav>

        <div class="user-profile-mini">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="avatar" class="mini-avatar">
          <div class="user-details">
            <span class="name">Alex Rivers</span>
            <span class="role">Shop Owner</span>
          </div>
          <span class="material-icons">more_vert</span>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="dashboard-main">
        <header class="dashboard-header">
          <div class="header-titles">
            <h1>Urban Craft Coffee</h1>
            <p class="subtitle">Boutique roastery and community hub in the heart of Downtown. Curating specialty beans since 2018.</p>
          </div>
          <div class="header-actions">
            <button class="btn-outline-glass">
              <span class="material-icons">share</span>
              Share Profile
            </button>
            <button class="btn-primary-glow">
              <span class="material-icons">add</span>
              New Listing
            </button>
          </div>
        </header>

        <!-- Stats Overview -->
        <div class="stats-container">
          <div class="stat-card-glass">
            <div class="stat-header">
              <span class="stat-label">Total Views</span>
              <span class="trend positive">
                <span class="material-icons">trending_up</span> +14.2%
              </span>
            </div>
            <div class="stat-main">
              <span class="stat-value">12.4K</span>
              <div class="stat-visual views"></div>
            </div>
          </div>

          <div class="stat-card-glass">
            <div class="stat-header">
              <span class="stat-label">Inquiries</span>
              <span class="trend positive">
                <span class="material-icons">trending_up</span> +5.8%
              </span>
            </div>
            <div class="stat-main">
              <span class="stat-value">842</span>
              <div class="stat-visual inquiries"></div>
            </div>
          </div>

          <div class="stat-card-glass">
            <div class="stat-header">
              <span class="stat-label">Average Rating</span>
              <span class="rating-stars">
                <span class="material-icons">star</span>
                <span class="material-icons">star</span>
                <span class="material-icons">star</span>
                <span class="material-icons">star</span>
                <span class="material-icons">star_half</span>
              </span>
            </div>
            <div class="stat-main">
              <span class="stat-value">4.9</span>
              <span class="stat-meta">From 128 reviews</span>
            </div>
          </div>
        </div>

        <div class="dashboard-grid">
          <!-- Left Column -->
          <div class="grid-col-2">
            <!-- Engagement Chart Placeholder -->
            <section class="content-card-dark">
              <div class="card-header">
                <h2>Engagement Trends</h2>
                <div class="header-tabs">
                  <button class="active">Views</button>
                  <button>Interactions</button>
                </div>
              </div>
              <div class="chart-container">
                <div class="chart-placeholder">
                  <!-- Simulated Chart Line -->
                  <svg viewBox="0 0 800 200" class="simulated-chart">
                    <path d="M0,150 Q50,140 100,160 T200,100 T300,120 T400,80 T500,90 T600,40 T700,60 T800,20" 
                          fill="none" stroke="url(#chartGradient)" stroke-width="4" />
                    <defs>
                      <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="#3ddc84" />
                        <stop offset="100%" stop-color="#6bfe9c" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div class="chart-grid-lines">
                    <span></span><span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            </section>

            <!-- Showcase Photos -->
            <section class="content-card-dark">
              <div class="card-header">
                <h2>Showcase Photos</h2>
                <button class="link-btn">Manage Album</button>
              </div>
              <div class="photo-grid">
                <div class="showcase-img" style="background-image: url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&q=80')"></div>
                <div class="showcase-img" style="background-image: url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80')"></div>
                <div class="showcase-img" style="background-image: url('https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400&q=80')"></div>
                <div class="photo-add-card">
                  <span class="material-icons">add_a_photo</span>
                  <span>Upload</span>
                </div>
              </div>
            </section>
          </div>

          <!-- Right Column -->
          <div class="grid-col-1">
            <!-- Recent Inquiries -->
            <section class="content-card-dark inquiries-section">
              <div class="card-header">
                <h2>Recent Inquiries</h2>
                <span class="dot-badge highlight"></span>
              </div>
              <div class="inquiry-list">
                <div class="inquiry-item" *ngFor="let inquiry of recentInquiries">
                  <div class="inquiry-user">
                    <img [src]="inquiry.avatar" class="user-avatar" alt="avatar">
                    <div class="user-info">
                      <strong>{{inquiry.name}}</strong>
                      <span>{{inquiry.time}}</span>
                    </div>
                  </div>
                  <p class="inquiry-text">"{{inquiry.message}}"</p>
                  <div class="inquiry-actions">
                    <button class="btn-reply">Reply</button>
                    <button class="btn-icon"><span class="material-icons">more_horiz</span></button>
                  </div>
                </div>
              </div>
              <button class="btn-full-width">View All Conversations</button>
            </section>

            <!-- Location Identity -->
            <section class="content-card-dark location-section">
              <div class="card-header">
                <h2>Location Identity</h2>
                <span class="material-icons lock-status">verified</span>
              </div>
              <div class="location-content">
                <div class="map-mini">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=40" alt="map">
                  <div class="map-pin"><span class="material-icons">location_on</span></div>
                </div>
                <div class="address-details">
                  <p class="address">Downtown Core, 452 Liberty Avenue, Suite 101</p>
                  <p class="distance">Central Hub Area</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');

    :host {
      --primary: #3ddc84;
      --primary-glow: rgba(61, 220, 132, 0.3);
      font-family: 'Manrope', sans-serif;
    }

    .dashboard-layout {
      display: flex;
      min-height: 100vh;
      background: var(--bg);
      color: var(--text-main);
    }

    /* Sidebar Styles */
    .dashboard-sidebar {
      width: 260px;
      background: var(--surface-container);
      border-right: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      padding: 2rem 0;
      flex-shrink: 0;
    }

    .business-brand {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0 1.5rem 2rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .brand-hexagon {
      width: 42px;
      height: 42px;
      background: linear-gradient(135deg, var(--primary), #2aa7ff);
      clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      box-shadow: 0 0 15px var(--primary-glow);
    }

    .brand-text h3 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 1rem;
      font-weight: 800;
      margin: 0;
      color: #fff;
    }

    .brand-text p {
      margin: 0;
      font-size: 0.75rem;
      color: var(--text-muted);
      letter-spacing: 0.5px;
    }

    .sidebar-nav {
      margin-top: 2rem;
      padding: 0 1rem;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.85rem 1.25rem;
      border-radius: 0.75rem;
      color: var(--text-muted);
      text-decoration: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      position: relative;
    }

    .nav-item:hover {
      background: var(--glass);
      color: var(--text-main);
    }

    .nav-item.active {
      background: var(--glass);
      color: var(--primary);
      font-weight: 600;
    }

    .nav-item.active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 20%;
      bottom: 20%;
      width: 3px;
      background: var(--primary);
      border-radius: 0 4px 4px 0;
      box-shadow: 2px 0 10px var(--primary-glow);
    }

    .nav-item .material-icons {
      font-size: 1.25rem;
    }

    .badge {
      margin-left: auto;
      background: var(--primary);
      color: #003d20;
      font-size: 0.7rem;
      font-weight: 800;
      padding: 0.1rem 0.6rem;
      border-radius: 1rem;
    }

    .nav-divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.05);
      margin: 1rem 0;
    }

    .user-profile-mini {
      padding: 1.25rem;
      margin: 0 1rem;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .mini-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.1);
    }

    .user-details {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .user-details .name {
      font-size: 0.85rem;
      font-weight: 700;
      color: #fff;
    }

    .user-details .role {
      font-size: 0.7rem;
      color: var(--text-muted);
    }

    /* Main Dashboard Content */
    .dashboard-main {
      flex: 1;
      padding: 3rem;
      overflow-y: auto;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 3rem;
    }

    .header-titles h1 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 2.5rem;
      font-weight: 800;
      margin: 0 0 0.5rem 0;
      background: linear-gradient(135deg, #fff 0%, #a3a8d5 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .header-titles .subtitle {
      max-width: 600px;
      font-size: 1.05rem;
      color: var(--text-muted);
      line-height: 1.6;
    }

    .header-actions {
      display: flex;
      gap: 1rem;
    }

    .btn-primary-glow {
      background: linear-gradient(135deg, #3ddc84, #1eb96a);
      border: none;
      color: #003d20;
      padding: 0.85rem 1.75rem;
      border-radius: 2rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      box-shadow: 0 4px 20px var(--primary-glow);
      transition: all 0.3s ease;
    }

    .btn-primary-glow:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 30px var(--primary-glow);
    }

    .btn-outline-glass {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--glass-border);
      color: #fff;
      padding: 0.85rem 1.75rem;
      border-radius: 2rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-outline-glass:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }

    /* Stats Grid */
    .stats-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .stat-card-glass {
      background: var(--bg-surface);
      border: 1px solid var(--glass-border);
      backdrop-filter: blur(20px);
      border-radius: 1.5rem;
      padding: 2rem;
      position: relative;
      overflow: hidden;
      transition: all 0.4s ease;
    }

    .stat-card-glass:hover {
      border-color: rgba(61, 220, 132, 0.3);
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0,0,0,0.3);
    }

    .stat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .stat-label {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .stat-value {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 2.75rem;
      font-weight: 800;
      color: #fff;
    }

    .trend {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.85rem;
      font-weight: 700;
    }

    .trend.positive { color: var(--primary); }

    .rating-stars {
      color: #ffb800;
      display: flex;
      gap: 2px;
    }

    .stat-meta {
      font-size: 0.85rem;
      color: var(--text-muted);
      display: block;
      margin-top: 0.5rem;
    }

    /* Graph Visual in Stat Card */
    .stat-visual {
      height: 4px;
      width: 100%;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 2px;
      margin-top: 1.5rem;
      position: relative;
    }

    .stat-visual::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 70%;
      background: var(--primary);
      border-radius: 2px;
      box-shadow: 0 0 10px var(--primary-glow);
    }

    /* Dashboard Grid */
    .dashboard-grid {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 2rem;
    }

    .grid-col-2 {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .content-card-dark {
      background: rgba(8, 12, 40, 0.5);
      border: 1px solid var(--glass-border);
      border-radius: 1.5rem;
      padding: 2.5rem;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .card-header h2 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0;
    }

    .header-tabs {
      display: flex;
      background: rgba(255, 255, 255, 0.04);
      padding: 0.3rem;
      border-radius: 2rem;
    }

    .header-tabs button {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 0.5rem 1.25rem;
      border-radius: 1.55rem;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .header-tabs button.active {
      background: var(--primary);
      color: #003d20;
    }

    /* Simulated Chart */
    .chart-container {
      height: 240px;
      margin-top: 1rem;
    }

    .chart-placeholder {
      height: 100%;
      width: 100%;
      position: relative;
    }

    .simulated-chart {
      width: 100%;
      height: 100%;
    }

    .chart-grid-lines {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      pointer-events: none;
    }

    .chart-grid-lines span {
      height: 1px;
      width: 100%;
      background: rgba(255, 255, 255, 0.03);
    }

    /* Photo Grid */
    .photo-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
    }

    .showcase-img {
      aspect-ratio: 1;
      border-radius: 1rem;
      background-size: cover;
      background-position: center;
      border: 2px solid transparent;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .showcase-img:hover {
      border-color: var(--primary);
      transform: scale(1.05);
    }

    .photo-add-card {
      aspect-ratio: 1;
      border: 2px dashed rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .photo-add-card:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: var(--text-muted);
      color: #fff;
    }

    /* Inquiries Section */
    .inquiry-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .inquiry-item {
      padding: 1.25rem;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.04);
    }

    .inquiry-user {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }

    .user-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    .user-info strong {
      display: block;
      font-size: 0.9rem;
      color: #fff;
    }

    .user-info span {
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .inquiry-text {
      font-size: 0.9rem;
      color: var(--text-main);
      line-height: 1.5;
      font-style: italic;
      margin-bottom: 1rem;
    }

    .inquiry-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }

    .btn-reply {
      background: transparent;
      border: 1px solid var(--primary);
      color: var(--primary);
      padding: 0.4rem 1rem;
      border-radius: 1.5rem;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
    }

    .btn-icon {
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
    }

    .btn-full-width {
      width: 100%;
      background: rgba(255, 255, 255, 0.05);
      border: none;
      color: #fff;
      padding: 1rem;
      border-radius: 1rem;
      font-weight: 700;
      cursor: pointer;
    }

    /* Location Section */
    .map-mini {
      position: relative;
      height: 140px;
      border-radius: 1rem;
      overflow: hidden;
      margin-bottom: 1.25rem;
    }

    .map-mini img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: saturate(0.5) brightness(0.6);
    }

    .map-pin {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -100%);
      color: var(--primary);
      text-shadow: 0 0 10px var(--primary-glow);
    }

    .address {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }

    .distance {
      color: var(--text-muted);
      font-size: 0.85rem;
    }

    .highlight { background-color: var(--primary); box-shadow: 0 0 10px var(--primary-glow); }

    @media (max-width: 1280px) {
      .dashboard-grid { grid-template-columns: 1fr; }
      .grid-col-2 { order: 1; }
      .grid-col-1 { order: 2; }
    }

    @media (max-width: 768px) {
      .dashboard-layout { flex-direction: column; }
      .dashboard-sidebar { width: 100%; height: auto; border-right: none; border-bottom: 1px solid var(--glass-border); }
      .stats-container { grid-template-columns: 1fr; }
      .photo-grid { grid-template-columns: repeat(2, 1fr); }
    }
  `]
})
export class ShopOwnerDashboardComponent implements OnInit {
  recentInquiries = [
    { 
      name: 'Sarah Mitchell', 
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      time: '2 hours ago',
      message: 'Do you offer catering services for small corporate events? We are looking for cold brew setups.'
    },
    { 
      name: 'David Chen', 
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      time: '5 hours ago',
      message: 'Is the rooftop patio open this evening for private bookings?'
    }
  ];

  constructor(private apiService: ApiService, private authService: AuthService) {}

  get currentUser() {
    return this.authService.currentUser;
  }

  get userInitial(): string {
    const name = this.currentUser?.firstName || 'O';
    return name.charAt(0).toUpperCase();
  }

  ngOnInit() {}
}

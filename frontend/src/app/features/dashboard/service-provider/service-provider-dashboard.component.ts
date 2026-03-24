import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-service-provider-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-layout">
      <!-- Sidebar -->
      <aside class="dashboard-sidebar">
        <div class="business-brand">
          <div class="brand-hexagon provider">
            <span class="material-icons">architecture</span>
          </div>
          <div class="brand-text">
            <h3>Pro Studio</h3>
            <p>Nikat for Experts</p>
          </div>
        </div>

        <nav class="sidebar-nav">
          <a class="nav-item active">
            <span class="material-icons">auto_graph</span>
            <span>Performance</span>
          </a>
          <a class="nav-item">
            <span class="material-icons">calendar_month</span>
            <span>Schedule</span>
          </a>
          <a class="nav-item">
            <span class="material-icons">design_services</span>
            <span>Services</span>
          </a>
          <a class="nav-item">
            <span class="material-icons">group</span>
            <span>Clients</span>
          </a>
          <div class="nav-divider"></div>
          <a class="nav-item">
            <span class="material-icons">star_outline</span>
            <span>Reviews</span>
          </a>
          <a class="nav-item">
            <span class="material-icons">settings</span>
            <span>Settings</span>
          </a>
        </nav>

        <div class="user-profile-mini">
          <div class="avatar-circle-mini">{{userInitial}}</div>
          <div class="user-details">
            <span class="name">{{currentUser?.firstName}} {{currentUser?.lastName}}</span>
            <span class="role">{{currentUser?.role}}</span>
          </div>
          <span class="material-icons">expand_more</span>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="dashboard-main">
        <header class="dashboard-header">
          <div class="header-titles">
            <h1>Service Dashboard</h1>
            <p class="subtitle">Efficiently managing your time, clients, and professional growth.</p>
          </div>
          <div class="header-actions">
            <button class="btn-primary-glow">
              <span class="material-icons">add</span>
              Add Service
            </button>
          </div>
        </header>

        <!-- Stats Overview -->
        <div class="stats-container">
          <div class="stat-card-glass">
            <div class="stat-header">
              <span class="stat-label">Today's Appointments</span>
            </div>
            <div class="stat-main">
              <span class="stat-value">5</span>
              <span class="stat-sub">Next: 2:30 PM</span>
            </div>
          </div>

          <div class="stat-card-glass">
            <div class="stat-header">
              <span class="stat-label">Monthly Earnings</span>
              <span class="trend positive">+15.3%</span>
            </div>
            <div class="stat-main">
              <span class="stat-value">₹32,400</span>
              <div class="earnings-bar"></div>
            </div>
          </div>

          <div class="stat-card-glass">
            <div class="stat-header">
              <span class="stat-label">Clients</span>
              <span class="trend positive">+4 new</span>
            </div>
            <div class="stat-main">
              <span class="stat-value">67</span>
              <div class="client-avatars">
                <img src="https://i.pravatar.cc/150?u=1" alt="c">
                <img src="https://i.pravatar.cc/150?u=2" alt="c">
                <img src="https://i.pravatar.cc/150?u=3" alt="c">
                <span class="more">+64</span>
              </div>
            </div>
          </div>

          <div class="stat-card-glass">
            <div class="stat-header">
              <span class="stat-label">Avg Rating</span>
              <span class="material-icons rating-icon">star</span>
            </div>
            <div class="stat-main">
              <span class="stat-value">4.8</span>
              <span class="stat-sub">56 Reviews</span>
            </div>
          </div>
        </div>

        <div class="dashboard-grid">
          <!-- Left Column: Schedule -->
          <div class="grid-col-2">
            <section class="content-card-dark">
              <div class="card-header">
                <h2>Today's Schedule</h2>
                <a class="link-btn">Full Calendar</a>
              </div>
              <div class="schedule-timeline">
                <div class="schedule-item" *ngFor="let apt of todayAppointments" [class.current]="apt.current">
                  <div class="time-slot">
                    <span class="time">{{apt.time}}</span>
                    <span class="duration">{{apt.duration}}</span>
                  </div>
                  <div class="timeline-dot" [class.active]="apt.current"></div>
                  <div class="appointment-card">
                    <div class="apt-header">
                      <h3>{{apt.service}}</h3>
                      <span class="apt-status" [class]="apt.status">{{apt.status}}</span>
                    </div>
                    <p class="apt-meta">
                      <span class="material-icons">person</span> {{apt.client}}
                      <span class="divider">|</span>
                      <span class="material-icons">location_on</span> {{apt.location}}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Right Column: Active Services -->
          <div class="grid-col-1">
            <section class="content-card-dark">
              <div class="card-header">
                <h2>Active Services</h2>
              </div>
              <div class="services-mini-list">
                <div class="service-mini-card" *ngFor="let svc of activeServices">
                  <div class="svc-icon-box">
                    <span class="material-icons">{{svc.icon}}</span>
                  </div>
                  <div class="svc-details">
                    <h4>{{svc.name}}</h4>
                    <div class="svc-stats">
                      <span class="price">₹{{svc.price}}</span>
                      <span class="bookings">{{svc.bookings}} bookings</span>
                    </div>
                  </div>
                </div>
              </div>
              <button class="btn-full-width">Manage all Services</button>
            </section>

            <section class="content-card-dark upgrade-panel">
              <span class="material-icons-outlined crown">workspace_premium</span>
              <h3>Nikat Premium</h3>
              <p>Unlock advanced analytics and client automated reminders.</p>
              <button class="btn-premium">Upgrade Now</button>
            </section>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');

    :host {
      --primary: #8b5cf6;
      --primary-glow: rgba(139, 92, 246, 0.3);
      font-family: 'Manrope', sans-serif;
    }

    .dashboard-layout {
      display: flex;
      min-height: 100vh;
      background: var(--bg);
      color: var(--text-main);
    }

    /* Sidebar - Reusing styles for consistency */
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
      background: linear-gradient(135deg, var(--primary), #8b5cf6);
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
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
    }

    .nav-item:hover {
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
    }

    .nav-item.active {
      background: rgba(192, 132, 252, 0.1);
      color: var(--primary);
      font-weight: 600;
    }

    .nav-item.active::before {
      content: '';
      position: absolute; left: 0; top: 20%; bottom: 20%; width: 3px;
      background: var(--primary); border-radius: 0 4px 4px 0;
      box-shadow: 2px 0 10px var(--primary-glow);
    }

    .nav-divider { height: 1px; background: rgba(255, 255, 255, 0.05); margin: 1rem 0; }

    .user-profile-mini {
      padding: 1.25rem; margin: 0 1rem;
      background: var(--glass);
      border-radius: 1rem;
      display: flex; align-items: center; gap: 0.75rem;
      color: var(--text-main);
    }

    .avatar-circle-mini {
      width: 36px; height: 36px; border-radius: 50%;
      background: linear-gradient(135deg, var(--primary), #6d28d9);
      display: flex; align-items: center; justify-content: center;
      color: #fff; font-weight: 800; font-size: 0.9rem;
    }

    .user-details { flex: 1; display: flex; flex-direction: column; }
    .user-details .name { font-size: 0.85rem; font-weight: 700; color: var(--text-main); }
    .user-details .role { font-size: 0.7rem; color: var(--text-muted); }

    /* Main Content */
    .dashboard-main { flex: 1; padding: 3rem; overflow-y: auto; }

    .dashboard-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 3rem; }
    .header-titles h1 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 2.5rem; font-weight: 800; margin: 0 0 0.5rem 0;
      background: linear-gradient(135deg, #fff 0%, #a3a8d5 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .header-titles .subtitle { font-size: 1.05rem; color: var(--text-muted); max-width: 500px; }

    .btn-primary-glow {
      background: linear-gradient(135deg, var(--primary), #8b5cf6);
      border: none; color: #1a0040; padding: 0.85rem 1.75rem; border-radius: 2rem;
      font-weight: 700; display: flex; align-items: center; gap: 0.5rem;
      cursor: pointer; box-shadow: 0 4px 20px var(--primary-glow); transition: all 0.3s ease;
    }

    /* Stats Grid */
    .stats-container { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-bottom: 3rem; }
    .stat-card-glass {
      background: var(--bg-surface); border: 1px solid var(--glass-border);
      backdrop-filter: blur(20px); border-radius: 1.5rem; padding: 1.75rem;
    }
    .stat-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
    .stat-label { font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
    .stat-value { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.25rem; font-weight: 800; color: #fff; display: block; }
    .stat-sub { font-size: 0.85rem; color: var(--text-muted); font-weight: 500; }
    .trend.positive { color: #6bfe9c; font-size: 0.8rem; font-weight: 800; }
    .rating-icon { color: #ffb800; }

    .earnings-bar { height: 4px; width: 100%; background: rgba(255, 255, 255, 0.05); border-radius: 2px; margin-top: 1rem; position: relative; }
    .earnings-bar::after { content: ''; position: absolute; left: 0; top: 0; height: 100%; width: 65%; background: var(--primary); box-shadow: 0 0 10px var(--primary-glow); }

    .client-avatars { display: flex; align-items: center; margin-top: 0.75rem; }
    .client-avatars img { width: 28px; height: 28px; border-radius: 50%; border: 2px solid var(--bg-deep); margin-left: -8px; }
    .client-avatars img:first-child { margin-left: 0; }
    .client-avatars .more { font-size: 0.7rem; font-weight: 700; color: var(--text-muted); margin-left: 8px; }

    /* Dashboard Grid */
    .dashboard-grid { display: grid; grid-template-columns: 1fr 320px; gap: 2rem; }
    .content-card-dark { background: rgba(8, 12, 40, 0.5); border: 1px solid var(--glass-border); border-radius: 1.5rem; padding: 2rem; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .card-header h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.4rem; font-weight: 700; margin: 0; }
    .link-btn { font-size: 0.9rem; color: var(--primary); font-weight: 700; cursor: pointer; }

    /* Timeline */
    .schedule-timeline { display: flex; flex-direction: column; gap: 0; position: relative; padding-left: 100px; }
    .schedule-timeline::before { content: ''; position: absolute; left: 118px; top: 0; bottom: 0; width: 2px; background: rgba(255, 255, 255, 0.05); }

    .schedule-item { display: flex; align-items: flex-start; gap: 2rem; position: relative; padding: 1.5rem 0; }
    .time-slot { width: 80px; position: absolute; left: -100px; text-align: right; }
    .time { font-weight: 800; color: #fff; display: block; font-size: 1rem; }
    .duration { font-size: 0.75rem; color: var(--text-muted); }

    .timeline-dot { width: 12px; height: 12px; border-radius: 50%; background: #1a1e3d; border: 2px solid rgba(255, 255, 255, 0.1); z-index: 1; position: absolute; left: 13px; transform: translateX(-50%); top: 1.8rem; transition: all 0.3s ease; }
    .timeline-dot.active { border-color: var(--primary); background: var(--primary); box-shadow: 0 0 10px var(--primary-glow); }

    .appointment-card { flex: 1; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 1rem; padding: 1.25rem; transition: all 0.3s ease; }
    .schedule-item.current .appointment-card { background: rgba(192, 132, 252, 0.08); border-color: rgba(192, 132, 252, 0.2); transform: scale(1.02); }
    .apt-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
    .apt-header h3 { font-size: 1.1rem; margin: 0; }
    .apt-meta { margin: 0; color: var(--text-muted); font-size: 0.85rem; display: flex; align-items: center; gap: 0.5rem; }
    .apt-meta .material-icons { font-size: 0.9rem; color: var(--primary); }
    .apt-meta .divider { color: rgba(255, 255, 255, 0.1); }

    .apt-status { font-size: 0.7rem; font-weight: 800; padding: 0.2rem 0.6rem; border-radius: 1rem; text-transform: uppercase; }
    .apt-status.confirmed { background: rgba(94, 180, 255, 0.15); color: #5eb4ff; }
    .apt-status.completed { background: rgba(107, 254, 156, 0.15); color: #6bfe9c; }
    .apt-status.upcoming { background: rgba(255, 255, 255, 0.05); color: #ccc; }

    /* Services List */
    .services-mini-list { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
    .service-mini-card { display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(255, 255, 255, 0.02); border-radius: 1rem; border: 1px solid rgba(255, 255, 255, 0.04); transition: all 0.3s ease; }
    .service-mini-card:hover { transform: translateX(5px); background: rgba(255, 255, 255, 0.05); }
    .svc-icon-box { width: 44px; height: 44px; border-radius: 0.75rem; background: rgba(192, 132, 252, 0.1); display: flex; align-items: center; justify-content: center; color: var(--primary); }
    .svc-details h4 { font-size: 0.95rem; margin: 0 0 0.25rem 0; }
    .svc-stats { display: flex; gap: 1rem; font-size: 0.8rem; }
    .price { color: #6bfe9c; font-weight: 700; }
    .bookings { color: var(--text-muted); }

    .btn-full-width { width: 100%; padding: 0.85rem; border-radius: 1rem; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.05); color: #fff; font-weight: 700; cursor: pointer; }

    .upgrade-panel { margin-top: 2rem; background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(192, 132, 252, 0.05)); border: 1px solid rgba(192, 132, 252, 0.2); text-align: center; }
    .crown { font-size: 2.5rem; color: #ffb800; margin-bottom: 1rem; }
    .upgrade-panel h3 { margin: 0 0 0.5rem 0; font-family: 'Plus Jakarta Sans', sans-serif; }
    .upgrade-panel p { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; }
    .btn-premium { width: 100%; padding: 0.85rem; border-radius: 1rem; border: none; background: #fff; color: #000; font-weight: 800; cursor: pointer; box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2); }

    @media (max-width: 1100px) { .dashboard-grid { grid-template-columns: 1fr; } }
    @media (max-width: 768px) {
      .stats-container { grid-template-columns: repeat(2, 1fr); }
      .dashboard-main { padding: 1.5rem; }
      .schedule-timeline { padding-left: 80px; }
      .schedule-timeline::before { left: 98px; }
      .timeline-dot { left: -7px; }
      .time-slot { left: -80px; width: 60px; }
    }
  `]
})
export class ServiceProviderDashboardComponent implements OnInit {
  todayAppointments = [
    { time: '10:00 AM', duration: '45 min', service: 'Classic Haircut', client: 'Raj P.', location: 'In-store', status: 'completed', current: false },
    { time: '11:00 AM', duration: '1 hr', service: 'Full Grooming Package', client: 'Amit S.', location: 'In-store', status: 'completed', current: false },
    { time: '2:30 PM', duration: '30 min', service: 'Beard Trim & Shape', client: 'Vikram R.', location: 'In-store', status: 'confirmed', current: true },
    { time: '4:00 PM', duration: '1 hr', service: 'Hair Coloring', client: 'Neha K.', location: 'Home visit', status: 'upcoming', current: false },
    { time: '6:00 PM', duration: '45 min', service: 'Premium Fade', client: 'Arjun M.', location: 'In-store', status: 'upcoming', current: false }
  ];

  activeServices = [
    { name: 'Classic Haircut', price: '350', bookings: 45, icon: 'content_cut' },
    { name: 'Grooming Package', price: '1,200', bookings: 28, icon: 'spa' },
    { name: 'Home Visit', price: '1,800', bookings: 12, icon: 'home' }
  ];

  constructor(private apiService: ApiService, private authService: AuthService) {}

  get currentUser() {
    return this.authService.currentUser;
  }

  get userInitial(): string {
    const name = this.currentUser?.firstName || 'P';
    return name.charAt(0).toUpperCase();
  }

  ngOnInit() {}
}

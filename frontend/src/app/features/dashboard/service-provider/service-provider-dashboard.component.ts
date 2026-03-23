import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-service-provider-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-layout">
      <aside class="dashboard-sidebar">
        <div class="user-profile-summary">
          <div class="avatar provider"><span class="material-icons">design_services</span></div>
          <div class="user-info">
            <h3>Service Provider</h3>
            <p>Management Portal</p>
          </div>
        </div>
        <nav class="sidebar-nav">
          <a class="nav-item active"><span class="material-icons">space_dashboard</span> Overview</a>
          <a class="nav-item"><span class="material-icons">calendar_month</span> Appointments</a>
          <a class="nav-item"><span class="material-icons">build</span> My Services</a>
          <a class="nav-item"><span class="material-icons">group</span> Clients</a>
          <a class="nav-item"><span class="material-icons">star</span> Reviews</a>
          <a class="nav-item"><span class="material-icons">settings</span> Settings</a>
        </nav>
      </aside>

      <main class="dashboard-main">
        <header class="dashboard-header">
          <div>
            <h1>Service Dashboard</h1>
            <p class="subtitle">Manage appointments, clients, and services</p>
          </div>
          <button class="btn-glow"><span class="material-icons">add</span> Add Service</button>
        </header>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon appts"><span class="material-icons">event_available</span></div>
            <div class="stat-content">
              <span class="stat-label">Today's Appointments</span>
              <span class="stat-value">5</span>
              <span class="stat-change">Next at 2:30 PM</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon earnings"><span class="material-icons">account_balance_wallet</span></div>
            <div class="stat-content">
              <span class="stat-label">This Month's Earnings</span>
              <span class="stat-value">₹32,400</span>
              <span class="stat-change positive">+15.3% from last month</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon clients"><span class="material-icons">people</span></div>
            <div class="stat-content">
              <span class="stat-label">Total Clients</span>
              <span class="stat-value">67</span>
              <span class="stat-change positive">+4 new this week</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon rating"><span class="material-icons">star</span></div>
            <div class="stat-content">
              <span class="stat-label">Average Rating</span>
              <span class="stat-value">4.8</span>
              <span class="stat-change positive">Based on 56 reviews</span>
            </div>
          </div>
        </div>

        <!-- Today's Schedule -->
        <section class="dashboard-section">
          <div class="section-header">
            <h2>Today's Schedule</h2>
            <a class="view-all">Full Calendar <span class="material-icons">arrow_forward</span></a>
          </div>
          <div class="schedule-list">
            <div class="schedule-item" *ngFor="let apt of todayAppointments" [class.current]="apt.current">
              <div class="time-block">
                <span class="time">{{apt.time}}</span>
                <span class="duration">{{apt.duration}}</span>
              </div>
              <div class="divider-line" [class.active]="apt.current"></div>
              <div class="appointment-info">
                <h4>{{apt.service}}</h4>
                <p>{{apt.client}} · {{apt.location}}</p>
              </div>
              <span class="apt-status" [class]="apt.status">{{apt.status}}</span>
            </div>
          </div>
        </section>

        <!-- Active Services -->
        <section class="dashboard-section">
          <div class="section-header">
            <h2>Active Services</h2>
          </div>
          <div class="services-grid">
            <div class="service-card" *ngFor="let svc of activeServices">
              <div class="service-header">
                <span class="service-icon"><span class="material-icons">{{svc.icon}}</span></span>
                <h4>{{svc.name}}</h4>
              </div>
              <p class="service-desc">{{svc.description}}</p>
              <div class="service-footer">
                <span class="price">₹{{svc.price}}</span>
                <span class="bookings">{{svc.bookings}} bookings</span>
              </div>
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
    .avatar.provider { background: linear-gradient(135deg, #c084fc, #8b5cf6); color: #1a0040; }
    .avatar .material-icons { font-size: 1.5rem; }
    .user-info h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.1rem; font-weight: 700; color: #e2e3ff; }
    .user-info p { font-size: 0.8rem; color: #6e739d; }

    .sidebar-nav { display: flex; flex-direction: column; gap: 0.25rem; padding: 0 0.75rem; }
    .nav-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.85rem 1rem; color: #a3a8d5; text-decoration: none; border-radius: 0.75rem; font-size: 0.9rem; font-weight: 500; cursor: pointer; transition: all 0.2s; }
    .nav-item:hover { background: rgba(255,255,255,0.04); color: #e2e3ff; }
    .nav-item.active { background: rgba(192,132,252,0.08); color: #c084fc; }
    .nav-item .material-icons { font-size: 1.25rem; }

    .dashboard-main { flex: 1; padding: 2.5rem; overflow-y: auto; }

    .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .dashboard-header h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.75rem; font-weight: 700; color: #e2e3ff; }
    .subtitle { font-size: 0.9rem; color: #6e739d; margin-top: 0.25rem; }
    .btn-glow { display: flex; align-items: center; gap: 0.5rem; background: linear-gradient(135deg, #c084fc, #8b5cf6); border: none; color: #1a0040; font-weight: 700; padding: 0.75rem 1.5rem; border-radius: 2rem; cursor: pointer; font-size: 0.9rem; transition: all 0.2s; }
    .btn-glow:hover { box-shadow: 0 6px 20px rgba(192,132,252,0.3); }
    .btn-glow .material-icons { font-size: 1.1rem; }

    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 1.25rem; margin-bottom: 2rem; }
    .stat-card { background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; padding: 1.25rem; display: flex; align-items: center; gap: 1rem; transition: all 0.2s; }
    .stat-card:hover { border-color: #40456c; }
    .stat-icon { width: 50px; height: 50px; border-radius: 0.75rem; display: flex; align-items: center; justify-content: center; }
    .stat-icon.appts { background: rgba(192,132,252,0.1); color: #c084fc; }
    .stat-icon.earnings { background: rgba(107,254,156,0.1); color: #6bfe9c; }
    .stat-icon.clients { background: rgba(94,180,255,0.1); color: #5eb4ff; }
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
    .view-all { display: flex; align-items: center; gap: 0.25rem; font-size: 0.85rem; color: #c084fc; cursor: pointer; font-weight: 600; text-decoration: none; }
    .view-all .material-icons { font-size: 1rem; }

    .schedule-list { display: flex; flex-direction: column; gap: 0; }
    .schedule-item { display: flex; align-items: center; gap: 1.25rem; padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,0.03); }
    .schedule-item.current { background: rgba(192,132,252,0.04); margin: 0 -1.5rem; padding: 1rem 1.5rem; border-radius: 0.75rem; }
    .time-block { text-align: right; min-width: 70px; }
    .time { display: block; font-weight: 700; color: #e2e3ff; font-size: 0.9rem; }
    .duration { font-size: 0.75rem; color: #6e739d; }
    .divider-line { width: 3px; height: 40px; background: #40456c; border-radius: 2px; }
    .divider-line.active { background: #c084fc; }
    .appointment-info { flex: 1; }
    .appointment-info h4 { font-size: 0.95rem; color: #e2e3ff; }
    .appointment-info p { font-size: 0.8rem; color: #6e739d; }
    .apt-status { padding: 0.25rem 0.75rem; border-radius: 2rem; font-size: 0.75rem; font-weight: 600; text-transform: capitalize; }
    .apt-status.confirmed { background: rgba(107,254,156,0.1); color: #6bfe9c; }
    .apt-status.upcoming { background: rgba(94,180,255,0.1); color: #5eb4ff; }
    .apt-status.completed { background: rgba(110,115,157,0.15); color: #a3a8d5; }

    .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; }
    .service-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 0.75rem; padding: 1.25rem; transition: all 0.2s; }
    .service-card:hover { border-color: #40456c; }
    .service-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }
    .service-icon { width: 36px; height: 36px; border-radius: 0.5rem; background: rgba(192,132,252,0.1); display: flex; align-items: center; justify-content: center; }
    .service-icon .material-icons { font-size: 1.1rem; color: #c084fc; }
    .service-header h4 { font-size: 0.95rem; color: #e2e3ff; }
    .service-desc { font-size: 0.8rem; color: #6e739d; margin-bottom: 1rem; line-height: 1.5; }
    .service-footer { display: flex; justify-content: space-between; align-items: center; }
    .price { font-weight: 800; color: #6bfe9c; font-size: 1rem; }
    .bookings { font-size: 0.75rem; color: #6e739d; }

    @media (max-width: 768px) {
      .dashboard-layout { flex-direction: column; }
      .dashboard-sidebar { width: 100%; }
      .sidebar-nav { flex-direction: row; overflow-x: auto; }
      .dashboard-main { padding: 1.5rem; }
    }
  `]
})
export class ServiceProviderDashboardComponent implements OnInit {
  todayAppointments = [
    { time: '10:00 AM', duration: '45 min', service: 'Classic Haircut', client: 'Raj P.', location: 'In-store', status: 'completed', current: false },
    { time: '11:30 AM', duration: '1 hr', service: 'Full Grooming Package', client: 'Amit S.', location: 'In-store', status: 'completed', current: false },
    { time: '2:30 PM', duration: '30 min', service: 'Beard Trim & Shape', client: 'Vikram R.', location: 'In-store', status: 'confirmed', current: true },
    { time: '4:00 PM', duration: '1 hr', service: 'Hair Coloring', client: 'Neha K.', location: 'Home visit', status: 'upcoming', current: false },
    { time: '6:00 PM', duration: '45 min', service: 'Premium Fade', client: 'Arjun M.', location: 'In-store', status: 'upcoming', current: false }
  ];

  activeServices = [
    { name: 'Classic Haircut', description: 'Precision cut with shampoo and styling', price: '350', bookings: 45, icon: 'content_cut' },
    { name: 'Full Grooming Package', description: 'Haircut, beard trim, facial, and scalp massage', price: '1,200', bookings: 28, icon: 'spa' },
    { name: 'Home Visit - Premium', description: 'Full range of services at your doorstep', price: '1,800', bookings: 12, icon: 'home' }
  ];

  constructor(private apiService: ApiService) {}
  ngOnInit() {}
}

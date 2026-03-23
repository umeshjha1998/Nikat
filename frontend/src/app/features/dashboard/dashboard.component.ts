import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-layout">
      <!-- Sidebar -->
      <aside class="dashboard-sidebar">
        <div class="user-profile-summary">
          <div class="avatar">
            <span class="material-icons">person</span>
          </div>
          <div class="user-info">
            <h3>Jane Doe</h3>
            <p>Member</p>
          </div>
        </div>
        
        <nav class="sidebar-nav">
          <a routerLink="/dashboard" class="active">
            <span class="material-icons">space_dashboard</span> Overview
          </a>
          <a href="#">
            <span class="material-icons">calendar_today</span> My Bookings
          </a>
          <a href="#">
            <span class="material-icons">favorite</span> Favorites
          </a>
          <a href="#">
            <span class="material-icons">chat</span> Messages
          </a>
          <a href="#">
            <span class="material-icons">star</span> My Reviews
          </a>
          <a href="#">
            <span class="material-icons">settings</span> Settings
          </a>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="dashboard-main">
        <header class="dashboard-header">
          <h1>Dashboard Overview</h1>
        </header>

        <div class="dashboard-stats">
          <div class="stat-card">
            <div class="stat-icon"><span class="material-icons">book_online</span></div>
            <div class="stat-content">
              <h3>Upcoming Bookings</h3>
              <p class="stat-value">2</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon"><span class="material-icons">history</span></div>
            <div class="stat-content">
              <h3>Past Services</h3>
              <p class="stat-value">14</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon"><span class="material-icons">favorite</span></div>
            <div class="stat-content">
              <h3>Saved Shops</h3>
              <p class="stat-value">5</p>
            </div>
          </div>
        </div>

        <section class="dashboard-section">
          <h2>Upcoming Appointments</h2>
          <div class="booking-list">
            <div class="booking-card">
              <div class="booking-date">
                <span class="month">OCT</span>
                <span class="day">28</span>
              </div>
              <div class="booking-details">
                <h3>Haircut & Beard Trim</h3>
                <p>at Urban Fade Barbershop</p>
                <div class="time-location">
                  <span><span class="material-icons">schedule</span> 2:30 PM</span>
                  <span><span class="material-icons">location_on</span> 1.2 miles</span>
                </div>
              </div>
              <div class="booking-actions">
                <button class="btn btn-outline">Reschedule</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-layout {
      display: flex;
      min-height: calc(100vh - 72px);
      background-color: var(--bg-color);
    }

    .dashboard-sidebar {
      width: 280px;
      background-color: #080e38; /* surface-container-low */
      border-right: 1px solid var(--border-color);
      padding: 2rem 0;
      display: flex;
      flex-direction: column;
    }

    .user-profile-summary {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0 2rem 2rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      margin-bottom: 2rem;
    }

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #5eb4ff, #2aa7ff);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #003151;
    }

    .avatar .material-icons {
      font-size: 1.5rem;
    }

    .user-info h3 {
      font-size: 1.125rem;
      font-weight: 700;
      color: var(--text-main);
    }

    .user-info p {
      font-size: 0.875rem;
      color: var(--text-muted);
    }

    .sidebar-nav {
      display: flex;
      flex-direction: column;
      padding: 0 1rem;
      gap: 0.5rem;
    }

    .sidebar-nav a {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      color: var(--text-muted);
      text-decoration: none;
      border-radius: var(--border-radius-md);
      transition: all var(--transition-fast);
      font-weight: 500;
    }

    .sidebar-nav a:hover {
      background-color: rgba(255, 255, 255, 0.05);
      color: var(--text-main);
    }

    .sidebar-nav a.active {
      background-color: rgba(94, 180, 255, 0.1);
      color: var(--primary);
    }

    .sidebar-nav a .material-icons {
      font-size: 1.25rem;
    }

    .dashboard-main {
      flex: 1;
      padding: 2.5rem 3rem;
      overflow-y: auto;
    }

    .dashboard-header {
      margin-bottom: 2.5rem;
    }

    .dashboard-header h1 {
      font-size: 2rem;
      color: var(--text-main);
    }

    .dashboard-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .stat-card {
      background-color: var(--bg-paper);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-lg);
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      transition: transform var(--transition-fast);
    }

    .stat-card:hover {
      transform: translateY(-2px);
      border-color: #40456c;
    }

    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: rgba(94, 180, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--primary);
    }

    .stat-icon .material-icons {
      font-size: 1.75rem;
    }

    .stat-content h3 {
      font-size: 0.875rem;
      color: var(--text-muted);
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: 800;
      color: var(--text-main);
      font-family: var(--font-family-heading);
    }

    .dashboard-section {
      background-color: var(--bg-paper);
      border: 1px solid var(--border-color);
      border-radius: var(--border-radius-lg);
      padding: 2rem;
    }

    .dashboard-section h2 {
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
      color: var(--text-main);
    }

    .booking-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .booking-card {
      display: flex;
      align-items: center;
      padding: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.05);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: var(--border-radius-md);
      gap: 1.5rem;
    }

    .booking-date {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: rgba(94, 180, 255, 0.1);
      color: var(--primary);
      width: 70px;
      height: 70px;
      border-radius: var(--border-radius-md);
    }

    .booking-date .month {
      font-size: 0.875rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    .booking-date .day {
      font-size: 1.5rem;
      font-weight: 800;
    }

    .booking-details {
      flex: 1;
    }

    .booking-details h3 {
      font-size: 1.125rem;
      margin-bottom: 0.25rem;
    }

    .booking-details p {
      color: var(--text-muted);
      font-size: 0.875rem;
      margin-bottom: 0.75rem;
    }

    .time-location {
      display: flex;
      gap: 1.5rem;
      color: var(--text-muted);
      font-size: 0.875rem;
    }

    .time-location span {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .time-location .material-icons {
      font-size: 1rem;
    }

    .btn-outline {
      border: 1px solid var(--border-color);
      background: transparent;
      color: var(--text-main);
      padding: 0.5rem 1rem;
      border-radius: var(--border-radius-md);
      transition: all var(--transition-fast);
    }

    .btn-outline:hover {
      background-color: rgba(255, 255, 255, 0.05);
      border-color: var(--text-muted);
    }

    @media (max-width: 992px) {
      .dashboard-layout {
        flex-direction: column;
      }
      .dashboard-sidebar {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid var(--border-color);
        padding: 1.5rem 0;
      }
      .sidebar-nav {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
      }
      .dashboard-main {
        padding: 1.5rem;
      }
      .booking-card {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class DashboardComponent {
}

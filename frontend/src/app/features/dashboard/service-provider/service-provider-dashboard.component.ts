import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/api.service';
import { AuthService } from '../../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-provider-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="provider-dashboard-container">
      <!-- Sidebar Navigation -->
      <nav class="sidebar glassmorphic">
        <div class="brand">
          <span class="material-icons logo-icon">bolt</span>
          <h2>Nikat</h2>
        </div>

        <div class="nav-links">
          <div class="nav-item" [class.active]="activeTab === 'performance'" (click)="setTab('performance')">
            <span class="material-icons">analytics</span>
            <span>Analytics</span>
          </div>
          <div class="nav-item" [class.active]="activeTab === 'schedule'" (click)="setTab('schedule')">
            <span class="material-icons">event_available</span>
            <span>Schedule</span>
          </div>
          <div class="nav-item" [class.active]="activeTab === 'services'" (click)="setTab('services')">
            <span class="material-icons">category</span>
            <span>Services</span>
          </div>
          <div class="nav-item" [class.active]="activeTab === 'clients'" (click)="setTab('clients')">
            <span class="material-icons">people</span>
            <span>Clients</span>
          </div>
          <div class="nav-item" [class.active]="activeTab === 'settings'" (click)="setTab('settings')">
            <span class="material-icons">settings</span>
            <span>Settings</span>
          </div>
        </div>

        <div class="nav-footer">
          <div class="nav-item logout-item" (click)="signOut()">
            <span class="material-icons">logout</span>
            <span>Sign Out</span>
          </div>
        </div>
      </nav>

      <!-- Main Content Area -->
      <main class="content-area">
        <!-- Top Header -->
        <header class="content-header glassmorphic">
          <div class="header-left">
            <h1>{{ activeTab | titlecase }}</h1>
            <p>Welcome back, {{ currentUser?.firstName }}!</p>
          </div>
          <div class="header-right">
            <div class="notification-badge">
              <span class="material-icons">notifications</span>
              <span class="badge">3</span>
            </div>
            <div class="user-pill glassmorphic">
              <div class="avatar">{{ userInitial }}</div>
              <span>{{ currentUser?.firstName }}</span>
            </div>
          </div>
        </header>

        <!-- Current Service Status Banner (Only if exists) -->
        <div class="status-banner glassmorphic" *ngIf="currentService">
          <div class="status-info">
            <span class="material-icons pulse">verified</span>
            <div>
              <h3>{{ currentService.name }}</h3>
              <p>{{ currentService.status }} • {{ currentService.categoryName || 'General' }}</p>
            </div>
          </div>
          <div class="status-stats">
            <div class="stat">
              <span class="label">Balance</span>
              <span class="value">₹0.00</span>
            </div>
          </div>
        </div>

        <!-- Professional Setup Banner (If no service) -->
        <div class="setup-welcome glassmorphic" *ngIf="!currentService && !isSaving">
           <div class="setup-content">
              <span class="material-icons icon-lg">workspace_premium</span>
              <h2>Ready to start your professional journey?</h2>
              <p>Initialize your professional profile to start listing services and managing appointments.</p>
              <button class="btn-primary" (click)="initializeService()">
                <span class="material-icons">rocket_launch</span>
                Initialize Professional Profile
              </button>
           </div>
        </div>

        <!-- Content Views Based on activeTab -->
        <div class="tab-content">
          
          <!-- ANALYTICS TAB -->
          <div *ngIf="activeTab === 'performance'" class="view-grid">
            <div class="metric-row">
              <div class="glass-card metric-card">
                <div class="card-header">
                  <span class="material-icons revenue">payments</span>
                  <span class="growth">+12%</span>
                </div>
                <h3>₹42,500</h3>
                <p>Total Revenue</p>
              </div>
              <div class="glass-card metric-card">
                <div class="card-header">
                  <span class="material-icons appointments">calendar_month</span>
                  <span class="growth">+5%</span>
                </div>
                <h3>156</h3>
                <p>Appointments</p>
              </div>
              <div class="glass-card metric-card">
                <div class="card-header">
                  <span class="material-icons rating">star</span>
                  <span class="growth">4.9</span>
                </div>
                <h3>52</h3>
                <p>Total Reviews</p>
              </div>
            </div>

            <div class="main-layout">
              <div class="glass-card table-card list-section">
                <div class="section-header">
                  <h3>Appointments for Today</h3>
                  <button class="btn-text">View All</button>
                </div>
                <div class="apt-list">
                  <div class="apt-item" *ngFor="let apt of todayAppointments" [class.active-apt]="apt.current">
                    <div class="apt-time">
                      <span class="time">{{ apt.time }}</span>
                      <span class="duration">{{ apt.duration }}</span>
                    </div>
                    <div class="apt-details">
                      <h4>{{ apt.service }}</h4>
                      <p>{{ apt.client }} • {{ apt.location }}</p>
                    </div>
                    <div class="apt-status" [class]="apt.status">{{ apt.status }}</div>
                    <button class="btn-icon">
                      <span class="material-icons">more_vert</span>
                    </button>
                  </div>
                  <div *ngIf="todayAppointments.length === 0" class="empty-state p-4 text-center">
                    <p>No appointments scheduled for today.</p>
                  </div>
                </div>
              </div>

              <div class="glass-card side-section">
                <div class="section-header">
                  <h3>Offerings Performance</h3>
                </div>
                <div class="service-list">
                  <div class="service-perf" *ngFor="let svc of activeServices">
                    <div class="svc-icon">
                      <span class="material-icons">{{ svc.icon }}</span>
                    </div>
                    <div class="svc-info">
                      <h4>{{ svc.name }}</h4>
                      <p>₹{{ svc.price }}</p>
                    </div>
                    <div class="svc-count">
                      <span>{{ svc.bookings }}</span>
                      <p>bookings</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- SCHEDULE TAB -->
          <div *ngIf="activeTab === 'schedule'" class="view-grid">
            <div class="glass-card full-width">
              <div class="section-header">
                <h3>Appointment Schedule</h3>
                <div class="header-actions">
                  <button class="btn-outline">
                    <span class="material-icons">filter_list</span> Filter
                  </button>
                </div>
              </div>
              
              <div class="data-table-container">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Client</th>
                      <th>Service</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let apt of appointments">
                      <td>
                        <div class="datetime">
                          <strong>{{ apt.appointmentTime | date:'shortTime' }}</strong>
                          <span>{{ apt.appointmentTime | date:'mediumDate' }}</span>
                        </div>
                      </td>
                      <td>{{ apt.userName }}</td>
                      <td>{{ apt.serviceName || 'Standard Service' }}</td>
                      <td>
                        <span class="badge-status" [class]="apt.status.toLowerCase()">{{ apt.status }}</span>
                      </td>
                      <td>
                        <div class="action-group">
                           <button *ngIf="apt.status === 'PENDING'" class="btn-success-sm" (click)="updateAptStatus(apt.id, 'CONFIRMED')">Confirm</button>
                           <button *ngIf="apt.status === 'CONFIRMED'" class="btn-primary-sm" (click)="updateAptStatus(apt.id, 'COMPLETED')">Complete</button>
                           <button class="btn-icon-red" (click)="updateAptStatus(apt.id, 'REJECTED')"><span class="material-icons">close</span></button>
                        </div>
                      </td>
                    </tr>
                    <tr *ngIf="appointments.length === 0">
                      <td colspan="5" class="text-center">No appointments found.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- SERVICES TAB -->
          <div *ngIf="activeTab === 'services'" class="view-grid">
            <div class="glass-card full-width">
              <div class="section-header">
                <h3>My Service Offerings</h3>
                <button class="btn-primary" (click)="openOfferingModal()">
                  <span class="material-icons">add</span> Add New Service
                </button>
              </div>

              <div class="offerings-grid">
                <div class="offering-card glassmorphic" *ngFor="let off of offerings">
                  <div class="card-top">
                    <span class="material-icons service-icon">stars</span>
                    <div class="actions">
                      <button class="btn-icon" (click)="openOfferingModal(off)"><span class="material-icons">edit</span></button>
                      <button class="btn-icon" (click)="deleteOffering(off.id)"><span class="material-icons">delete</span></button>
                    </div>
                  </div>
                  <h4>{{ off.name }}</h4>
                  <p class="desc">{{ off.description }}</p>
                  <div class="meta">
                    <span class="duration"><span class="material-icons">schedule</span> {{ off.durationMinutes }}m</span>
                    <span class="price">₹{{ off.price }}</span>
                  </div>
                </div>
                <div *ngIf="offerings.length === 0" class="empty-state full-width">
                  <p>You haven't added any services yet.</p>
                </div>
              </div>
            </div>

            <!-- Add/Edit Offering Modal -->
            <div class="modal-overlay" *ngIf="showOfferingModal" (click)="closeOfferingModal()">
              <div class="modal-content glass-card" (click)="$event.stopPropagation()">
                <h3>{{ editingOffering ? 'Edit Service' : 'Add New Service' }}</h3>
                <div class="form-grid">
                  <div class="form-group full-width">
                    <label>Service Name</label>
                    <input type="text" [(ngModel)]="offeringForm.name" placeholder="e.g., Premium Haircut">
                  </div>
                  <div class="form-group full-width">
                    <label>Description</label>
                    <textarea [(ngModel)]="offeringForm.description" rows="3" placeholder="What does this service include?"></textarea>
                  </div>
                  <div class="form-group">
                    <label>Price (₹)</label>
                    <input type="number" [(ngModel)]="offeringForm.price">
                  </div>
                  <div class="form-group">
                    <label>Duration (Minutes)</label>
                    <input type="number" [(ngModel)]="offeringForm.durationMinutes">
                  </div>
                </div>
                <div class="modal-actions">
                  <button class="btn-outline" (click)="closeOfferingModal()">Cancel</button>
                  <button class="btn-primary" (click)="saveOffering()" [disabled]="isSaving">
                    {{ isSaving ? 'Saving...' : 'Save Service' }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- CLIENTS TAB -->
          <div *ngIf="activeTab === 'clients'" class="view-grid">
             <div class="glass-card full-width">
                <div class="section-header">
                  <h3>Customer Base</h3>
                </div>
                <div class="data-table-container">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Client Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Last Appointment</th>
                      <th>Total Bookings</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let client of clients">
                      <td>{{ client.firstName }} {{ client.lastName }}</td>
                      <td>{{ client.email }}</td>
                      <td>{{ client.phone }}</td>
                      <td>-</td>
                      <td>1</td>
                    </tr>
                    <tr *ngIf="clients.length === 0">
                      <td colspan="5" class="text-center">No clients linked yet.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
             </div>
          </div>

          <!-- SETTINGS TAB -->
          <div *ngIf="activeTab === 'settings'" class="settings-layout">
            <div class="settings-grid">
              <!-- Professional Listing Details -->
              <div class="glass-card settings-card" *ngIf="currentService">
                <h3>Professional Listing</h3>
                <div class="form-grid">
                  <div class="form-group full-width">
                    <label>Business Display Name</label>
                    <input type="text" [(ngModel)]="currentService.name" placeholder="Business Name">
                  </div>
                  <div class="form-group">
                    <label>Contact Number</label>
                    <input type="text" [(ngModel)]="currentService.phoneNumber" placeholder="Business Contact">
                  </div>
                  <div class="form-group">
                    <label>Professional Category</label>
                    <select [(ngModel)]="currentService.categoryId">
                      <option [value]="null">Select Category</option>
                      <optgroup *ngFor="let group of groupedCategories" [label]="group.name">
                        <option *ngFor="let cat of group.categories" [value]="cat.id">{{ cat.name }}</option>
                      </optgroup>
                    </select>
                  </div>
                  <div class="form-group full-width">
                    <label>About My Services</label>
                    <textarea [(ngModel)]="currentService.description" rows="4"></textarea>
                  </div>
                  <div class="form-group">
                    <label>Work Start Time</label>
                    <input type="time" [(ngModel)]="currentService.startTime">
                  </div>
                  <div class="form-group">
                    <label>Work End Time</label>
                    <input type="time" [(ngModel)]="currentService.endTime">
                  </div>
                  <div class="form-group full-width location-group">
                    <label>Service Area / Location</label>
                    <div class="input-with-button">
                      <input type="text" [(ngModel)]="currentService.serviceArea" placeholder="Click GPS to fetch" readonly>
                      <button class="btn-gps" (click)="fetchGPSLocation()" [disabled]="isFetchingLocation">
                        <span class="material-icons" [class.rotating]="isFetchingLocation">my_location</span>
                      </button>
                    </div>
                    <div class="coords" *ngIf="currentService.latitude">
                      Lat: {{ currentService.latitude | number:'1.4-4' }}, Lon: {{ currentService.longitude | number:'1.4-4' }}
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <button class="btn-primary" (click)="saveSettings()" [disabled]="isSaving">
                    <span class="material-icons">save</span>
                    {{ isSaving ? 'Saving...' : 'Update Listing' }}
                  </button>
                </div>
              </div>

              <!-- Verification & Profile Details -->
              <div class="glass-card settings-card">
                <h3>Personal & Verified Profile</h3>
                <div class="avatar-setup">
                  <div class="avatar-preview glassmorphic">
                    <img *ngIf="userProfile.photoData" [src]="userProfile.photoData" alt="Profile">
                    <span *ngIf="!userProfile.photoData" class="material-icons">person</span>
                  </div>
                  <div class="avatar-actions">
                    <label class="btn-outline file-label">
                       <span class="material-icons">photo_camera</span> Change Photo
                       <input type="file" (change)="onUserPhotoSelected($event)" accept="image/*" hidden>
                    </label>
                    <p class="hint">Upload a professional headshot for client trust.</p>
                  </div>
                </div>
                <div class="form-grid">
                  <div class="form-group">
                    <label>Aadhar Number (Last 4 digits preferred)</label>
                    <input type="text" [(ngModel)]="userProfile.aadharNumber" placeholder="xxxx-xxxx-xxxx">
                  </div>
                  <div class="form-group">
                    <label>PAN Number</label>
                    <input type="text" [(ngModel)]="userProfile.panNumber" placeholder="ABCDE1234F">
                  </div>
                  <div class="form-group">
                    <label>Passport Number</label>
                    <input type="text" [(ngModel)]="userProfile.passportNumber" placeholder="X1234567">
                  </div>
                </div>
                <div class="card-footer">
                   <button class="btn-primary" (click)="saveUserProfile()">
                    <span class="material-icons">verified_user</span> Save Personal Info
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .provider-dashboard-container {
      display: flex;
      min-height: 100vh;
      background: var(--bg);
      color: var(--text-main);
      font-family: 'Inter', sans-serif;
    }

    /* Sidebar Styles */
    .sidebar {
      width: 280px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--border-color);
      position: fixed;
      height: 100vh;
      z-index: 100;
      background: var(--surface-container);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 3rem;
    }
    .brand .logo-icon { color: var(--primary); font-size: 2rem; }
    .brand h2 { font-weight: 700; font-size: 1.5rem; letter-spacing: -0.5px; }

    .nav-links {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      color: var(--text-muted);
    }
    .nav-item .material-icons { font-size: 1.25rem; }
    .nav-item span { font-weight: 500; font-size: 0.95rem; }

    .nav-item:hover {
      background: var(--glass);
      color: var(--text-main);
    }

    .nav-item.active {
      background: var(--primary);
      color: #fff;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      border: 1px solid var(--border-color);
    }

    .nav-footer { margin-top: auto; border-top: 1px solid var(--border-color); padding-top: 1.5rem; }

    /* Main Content Area */
    .content-area { flex: 1; margin-left: 280px; padding: 2rem; background: var(--bg); }

    .content-header {
      padding: 1.5rem 2rem;
      border-radius: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      background: var(--surface-container);
      border: 1px solid var(--border-color);
    }
    .content-header h1 { font-size: 1.75rem; font-weight: 700; margin: 0; }
    .content-header p { color: var(--text-muted); margin: 0.25rem 0 0; }

    .header-right {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .notification-badge {
      position: relative;
      cursor: pointer;
    }
    .notification-badge .material-icons { color: var(--text-muted); }
    .notification-badge .badge {
      position: absolute; top: -5px; right: -5px; background: #ef4444;
      color: white; font-size: 10px; width: 16px; height: 16px;
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
    }

    .user-pill {
      display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 1rem; border-radius: 50px;
      background: var(--surface-container-high); border: 1px solid var(--border-color);
    }
    .user-pill .avatar { width: 32px; height: 32px; background: var(--primary); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; }

    /* Banners */
    .status-banner {
      display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2rem; border-radius: 16px; margin-bottom: 2rem;
      background: linear-gradient(90deg, var(--accent-glow), transparent);
      border-left: 4px solid var(--primary);
    }
    .status-info { display: flex; align-items: center; gap: 1rem; }
    .status-info .material-icons { color: var(--primary); font-size: 2.5rem; }
    .status-info h3 { margin: 0; font-size: 1.25rem; }
    .status-info p { margin: 0; color: var(--primary); opacity: 0.8; font-weight: 600; font-size: 0.85rem; }

    .setup-welcome {
       padding: 4rem 2rem; border-radius: 20px; text-align: center; margin-bottom: 2rem;
       background: var(--surface-container); border: 1px solid var(--border-color);
    }
    .setup-welcome .setup-content { max-width: 500px; margin: 0 auto; }
    .setup-welcome .icon-lg { font-size: 5rem; color: var(--primary); margin-bottom: 1.5rem; }
    .setup-welcome h2 { font-size: 2rem; margin-bottom: 1rem; }
    .setup-welcome p { color: var(--text-muted); margin-bottom: 2rem; line-height: 1.6; }

    /* Grid Layouts */
    .view-grid { display: flex; flex-direction: column; gap: 2rem; animation: fadeIn 0.4s ease-out; }

    .metric-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; }

    .glass-card { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 16px; }

    .metric-card { padding: 1.5rem; }
    .metric-card .card-header { display: flex; justify-content: space-between; margin-bottom: 1rem; }
    .metric-card .card-header .material-icons { font-size: 1.5rem; }
    .metric-card .card-header .revenue { color: #10b981; }
    .metric-card .card-header .appointments { color: var(--primary); }
    .metric-card .card-header .rating { color: #f59e0b; }
    .metric-card .card-header .growth { font-size: 0.8rem; padding: 0.25rem 0.5rem; border-radius: 50px; background: rgba(16, 185, 129, 0.2); color: #10b981; }
    .metric-card h3 { font-size: 1.75rem; font-weight: 700; margin-bottom: 0.25rem; }
    .metric-card p { color: var(--text-muted); margin: 0; font-size: 0.9rem; }

    .main-layout { display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 1.5rem; }

    .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding: 1.5rem 1.5rem 0; }
    .section-header h3 { font-size: 1.2rem; margin: 0; }

    /* Appointment Items */
    .apt-list { display: flex; flex-direction: column; gap: 1rem; padding: 0 1.5rem 1.5rem; }
    .apt-item {
      display: grid; grid-template-columns: 120px 1fr 100px 40px; align-items: center; padding: 1.25rem; border-radius: 12px;
      background: var(--surface-container-high); transition: all 0.3s ease; border: 1px solid var(--border-color);
    }
    .apt-item:hover { background: var(--surface-container-highest); transform: translateX(5px); }
    .apt-item.active-apt { border: 1px solid var(--primary); background: var(--accent-glow); }

    .apt-time { display: flex; flex-direction: column; }
    .apt-time .time { font-weight: 700; color: var(--primary); }
    .apt-time .duration { font-size: 0.75rem; color: var(--text-muted); }
    .apt-details h4 { margin: 0; font-size: 0.95rem; }
    .apt-details p { margin: 0.25rem 0 0; font-size: 0.8rem; color: var(--text-muted); }
    .apt-status { text-align: center; text-transform: uppercase; font-size: 10px; font-weight: 700; padding: 4px 8px; border-radius: 4px; }
    .apt-status.completed { background: rgba(16, 185, 129, 0.1); color: #10b981; }
    .apt-status.confirmed { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
    .apt-status.upcoming { background: var(--glass); color: var(--text-main); }

    /* Service Performance Styles */
    .service-list { display: flex; flex-direction: column; gap: 1.25rem; padding: 0 1.5rem 1.5rem; }
    .service-perf { display: flex; align-items: center; gap: 1rem; }
    .service-perf .svc-icon { width: 40px; height: 40px; border-radius: 10px; background: var(--glass); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; }
    .service-perf .svc-icon .material-icons { color: var(--primary); font-size: 1.25rem; }
    .service-perf .svc-info { flex: 1; }
    .service-perf .svc-info h4 { margin: 0; font-size: 0.9rem; }
    .service-perf .svc-info p { margin: 0; font-size: 0.8rem; color: var(--text-muted); }
    .service-perf .svc-count { text-align: right; }
    .service-perf .svc-count span { font-weight: 700; color: var(--text-main); }
    .service-perf .svc-count p { margin: 0; font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; }

    /* Data Table Styles */
    .data-table-container { overflow-x: auto; padding: 0 1.5rem 1.5rem; }
    .data-table { width: 100%; border-collapse: collapse; text-align: left; }
    .data-table th { padding: 1.25rem; color: var(--text-muted); font-weight: 500; font-size: 0.85rem; border-bottom: 2px solid var(--border-color); }
    .data-table td { padding: 1.25rem; border-bottom: 1px solid var(--border-color); font-size: 0.95rem; }
    .data-table tr:last-child td { border-bottom: none; }
    .data-table .datetime { display: flex; flex-direction: column; }
    .data-table .datetime strong { color: var(--primary); }
    .data-table .datetime span { font-size: 0.75rem; color: var(--text-muted); }

    .badge-status {
      padding: 0.35rem 0.75rem; border-radius: 50px; font-size: 0.75rem; font-weight: 600; text-transform: capitalize;
    }
    .badge-status.confirmed { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
    .badge-status.pending { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
    .badge-status.completed { background: rgba(16, 185, 129, 0.2); color: #10b981; }
    .badge-status.rejected { background: rgba(239, 68, 68, 0.2); color: #ef4444; }

    /* Offerings Grid */
    .offerings-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; padding: 0 1.5rem 1.5rem; }
    .offering-card { padding: 1.5rem; border-radius: 16px; background: var(--surface-container-high); border: 1px solid var(--border-color); }
    .offering-card .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .offering-card .card-top .service-icon { color: var(--primary); font-size: 2rem; }
    .offering-card .card-top .actions { display: flex; gap: 0.25rem; }
    .offering-card h4 { font-size: 1.1rem; font-weight: 600; margin: 0 0 0.5rem 0; color: var(--text-main); }
    .offering-card .desc { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; height: 2.5rem; }
    .offering-card .meta { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 1rem; }
    .offering-card .meta .duration { display: flex; align-items: center; gap: 0.25rem; font-size: 0.85rem; color: var(--text-muted); }
    .offering-card .meta .duration .material-icons { font-size: 1rem; }
    .offering-card .meta .price { font-size: 1.1rem; font-weight: 700; color: var(--primary); }

    /* Settings Page */
    .settings-grid { display: flex; flex-direction: column; gap: 2rem; }
    .settings-card h3 { margin-bottom: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; margin-top: 0; }
    .settings-card .card-footer { margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem; display: flex; justify-content: flex-end; }

    .avatar-setup {
      display: flex; align-items: center; gap: 2.5rem; margin-bottom: 2rem; padding: 1.5rem; background: var(--surface-container-high); border-radius: 16px; border: 1px solid var(--border-color);
    }
    .avatar-setup .avatar-preview { width: 100px; height: 100px; border-radius: 50%; overflow: hidden; display: flex; align-items: center; justify-content: center; background: var(--surface-container-highest); border: 1px solid var(--border-color); }
    .avatar-setup .avatar-preview .material-icons { font-size: 3rem; color: var(--text-muted); }
    .avatar-setup .avatar-preview img { width: 100%; height: 100%; object-fit: cover; }
    .avatar-setup .avatar-actions .hint { font-size: 0.85rem; color: var(--text-muted); margin-top: 0.75rem; }

    .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
    .full-width { grid-column: span 2; }
    .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .form-group label { font-size: 0.85rem; color: var(--text-muted); font-weight: 500; }
    .form-group input, .form-group textarea, .form-group select { background: var(--surface-container-high); border: 1px solid var(--border-color); border-radius: 8px; padding: 0.75rem 1rem; color: var(--text-main); transition: all 0.3s ease; }
    .form-group input:focus, .form-group textarea:focus, .form-group select:focus { background: var(--surface-container-highest); border-color: var(--primary); outline: none; }

    .input-with-button { display: flex; gap: 0.5rem; }
    .input-with-button input { flex: 1; }
    .btn-gps {
      width: 45px; height: 45px; border-radius: 8px; background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); color: var(--primary); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s;
    }
    .btn-gps:hover { background: var(--primary); color: #fff; }
    .btn-gps:disabled { opacity: 0.5; cursor: not-allowed; }
    .coords { font-size: 10px; color: var(--primary); margin-top: 0.25rem; opacity: 0.8; }

    /* Modals */
    .modal-overlay { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center; }
    .modal-content { width: 90%; max-width: 600px; padding: 2.5rem; background: var(--surface-container); border: 1px solid var(--border-color); border-radius: 16px; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; border-top: 1px solid var(--border-color); padding-top: 1.5rem; }

    /* Buttons */
    .btn-primary { background: var(--primary); color: #fff; border: none; padding: 0.75rem 1.75rem; border-radius: 8px; font-weight: 700; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; transition: all 0.3s ease; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 5px 15px var(--accent-glow); }
    .btn-outline { background: transparent; border: 1px solid var(--border-color); color: var(--text-main); padding: 0.75rem 1.75rem; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s; }
    .btn-outline:hover { background: var(--glass); }
    .btn-text { background: transparent; border: none; color: var(--primary); font-weight: 600; cursor: pointer; }
    .btn-icon { background: transparent; border: none; color: var(--text-muted); cursor: pointer; padding: 0.25rem; border-radius: 6px; transition: all 0.2s; }
    .btn-icon:hover { background: var(--glass); color: var(--text-main); }
    .btn-icon .material-icons { font-size: 1.25rem; }
    .btn-icon-red { background: transparent; border: none; color: #ef4444; cursor: pointer; padding: 0.25rem; }
    
    .btn-success-sm { background: #10b981; color: white; border: none; padding: 0.25rem 0.6rem; border-radius: 4px; font-size: 0.75rem; cursor: pointer; }
    .btn-primary-sm { background: #3b82f6; color: white; border: none; padding: 0.25rem 0.6rem; border-radius: 4px; font-size: 0.75rem; cursor: pointer; }

    .action-group { display: flex; gap: 0.5rem; align-items: center; }

    .empty-state { padding: 4rem 2rem; text-align: center; color: var(--text-muted); }
    .empty-state .material-icons { font-size: 3rem; margin-bottom: 1rem; }

    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .rotating { animation: rotate 1.5s linear infinite; }
    @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  `]
})
export class ServiceProviderDashboardComponent implements OnInit {
  activeTab = 'performance';
  currentService: any = null;
  categories: any[] = [];
  groupedCategories: any[] = [];
  private categoryMappings: {[key: string]: string} = {
    // Home Maintenance
    'AC/Fridge/Geyser Repair': 'Home Maintenance',
    'Appliance Repair': 'Home Maintenance',
    'Carpenter Service': 'Home Maintenance',
    'Carpenter Shop': 'Home Maintenance',
    'Electrical Repair Shop': 'Home Maintenance',
    'Electrician': 'Home Maintenance',
    'Gas Stove Repair': 'Home Maintenance',
    'Glass & Mirror Shop': 'Home Maintenance',
    'Iron Welding Shop': 'Home Maintenance',
    'Ironsmith': 'Home Maintenance',
    'Mason': 'Home Maintenance',
    'Painter': 'Home Maintenance',
    'Plumber': 'Home Maintenance',
    'RO & Water Purifier': 'Home Maintenance',
    'Sewing Machine Repair': 'Home Maintenance',
    'Watch/Clock Repair': 'Home Maintenance',
    'Mirror/Glass Installation': 'Home Maintenance',
    'Hardware Shop': 'Home Maintenance',
    'Home Appliances Shop': 'Home Maintenance',

    // Tech & Digital
    'Computer/Laptop Repair': 'Tech & Digital',
    'Cyber Cafe': 'Tech & Digital',
    'Electronic Repairs': 'Tech & Digital',
    'Game Console Repair': 'Tech & Digital',
    'Mobile & Accessories': 'Tech & Digital',
    'Mobile Repair': 'Tech & Digital',
    'Print & Photocopy': 'Tech & Digital',
    'TV Repair': 'Tech & Digital',
    'Wi-Fi & Internet': 'Tech & Digital',

    // Daily Essentials
    'Ayurvedic Store': 'Daily Essentials',
    'Bakery': 'Daily Essentials',
    'Dairy Shop': 'Daily Essentials',
    'Dairy & Milk Delivery': 'Daily Essentials',
    'Grocery Store': 'Daily Essentials',
    'Ice Cream Shop': 'Daily Essentials',
    'Juice Center': 'Daily Essentials',
    'Meat & Poultry Shop': 'Daily Essentials',
    'Paan Shop': 'Daily Essentials',
    'Snacks & Fast Food': 'Daily Essentials',
    'Sweets & Snacks': 'Daily Essentials',
    'Milk Delivery': 'Daily Essentials',
    'Religious Store': 'Daily Essentials',

    // Personal Care & Fitness
    'At-Home Beautician': 'Personal Care',
    'Barber Shop': 'Personal Care',
    'Beauty Parlour': 'Personal Care',
    'Gym': 'Personal Care',
    'Yoga Classes': 'Personal Care',

    // Health & Medical
    'Chemist/Pharmacy': 'Health & Medical',
    'Dentist Clinic': 'Health & Medical',
    'Diagnostic Lab': 'Health & Medical',
    'Doctor Clinic': 'Health & Medical',
    'Nursing Service': 'Health & Medical',
    'Optician': 'Health & Medical',
    'Physiotherapy': 'Health & Medical',

    // Professional & Education
    'Event Decoration/Rental': 'Professional & Education',
    'Packers & Movers': 'Professional & Education',
    'Photography Studio': 'Professional & Education',
    'Property Dealer/Real Estate': 'Professional & Education',
    'School': 'Professional & Education',
    'Tuition & Coaching': 'Professional & Education',
    'Stationery Shop': 'Professional & Education',

    // Neighborhood & Domestic
    'Cook': 'Neighborhood & Domestic',
    'Flower Delivery': 'Neighborhood & Domestic',
    'Garbage Collection': 'Neighborhood & Domestic',
    'Gardener': 'Neighborhood & Domestic',
    'House Help/Maid': 'Neighborhood & Domestic',
    'Nanny': 'Neighborhood & Domestic',
    'Newspaper Delivery': 'Neighborhood & Domestic',
    'Sewage & Drainage': 'Neighborhood & Domestic',

    // Fashion & Lifestyle
    'Footwear & Repair': 'Fashion & Lifestyle',
    'Ladies Tailor': 'Fashion & Lifestyle',
    'Zipper/Chain Repair': 'Fashion & Lifestyle',
    'Ladies Wear': 'Fashion & Lifestyle',
    'Gents Wear': 'Fashion & Lifestyle',
    'Kids Wear': 'Fashion & Lifestyle',
    'Saree Shop': 'Fashion & Lifestyle',
    'Raw Cloth Shop': 'Fashion & Lifestyle',
    'Jewellery Shop': 'Fashion & Lifestyle',
    'Sports Store': 'Fashion & Lifestyle'
  };
  userProfile: any = {
    aadharNumber: '',
    panNumber: '',
    passportNumber: '',
    photoData: ''
  };
  isFetchingLocation = false;
  isSaving = false;
  isFetchingData = false;

  appointments: any[] = [];
  offerings: any[] = [];
  clients: any[] = [];

  // Form states
  showOfferingModal = false;
  editingOffering: any = null;
  offeringForm: any = {
    name: '',
    description: '',
    price: 0,
    durationMinutes: 30
  };

  todayAppointments: any[] = [];
  activeServices: any[] = [];

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) {}

  get currentUser() {
    return this.authService.currentUser;
  }

  get userInitial(): string {
    const name = this.currentUser?.firstName || 'P';
    return name.charAt(0).toUpperCase();
  }

  ngOnInit() {
    this.loadServiceProviderData();
    this.loadCategories();
  }

  setTab(tab: string) {
    this.activeTab = tab;
    if (this.currentService) {
      if (tab === 'schedule') this.loadAppointments();
      if (tab === 'services') this.loadOfferings();
      if (tab === 'clients') this.loadClients();
    }
  }

  loadCategories() {
    this.apiService.getCategories().subscribe(cats => {
      this.categories = cats;
      this.groupCategories();
    });
  }

  groupCategories() {
    const groups: {[key: string]: any[]} = {};
    const normalizedMappings: {[key: string]: string} = {};
    Object.keys(this.categoryMappings).forEach(key => {
      normalizedMappings[key.toLowerCase()] = this.categoryMappings[key];
    });

    this.categories.forEach(cat => {
      const groupName = normalizedMappings[cat.name?.trim().toLowerCase()] || 'Others';
      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(cat);
    });

    this.groupedCategories = Object.keys(groups).map(name => ({
      name,
      categories: groups[name]
    })).sort((a, b) => a.name.localeCompare(b.name));
  }

  loadServiceProviderData() {
    if (!this.currentUser) return;
    this.apiService.getServices().subscribe(svcs => {
      this.currentService = svcs.find(s => s.providerId === this.currentUser?.id) || null;
      
      if (this.currentService) {
        this.loadAppointments();
        this.loadOfferings();
      }

      // Populate user profile
      if (this.currentUser) {
        this.userProfile = {
          ...this.currentUser,
          aadharNumber: this.currentUser.aadharNumber || '',
          panNumber: this.currentUser.panNumber || '',
          passportNumber: this.currentUser.passportNumber || '',
          photoData: this.currentUser.photoData || ''
        };
      }
    });
  }

  loadAppointments() {
    if (!this.currentService) return;
    this.apiService.getAppointmentsByService(this.currentService.id).subscribe(apts => {
      this.appointments = apts;
      // Filter for performance summary
      const now = new Date();
      this.todayAppointments = apts.filter(a => {
        const aptDate = new Date(a.appointmentTime);
        return aptDate.toDateString() === now.toDateString();
      }).map(a => ({
          id: a.id,
          time: new Date(a.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          duration: '30 min',
          service: a.serviceType || 'General Service',
          client: a.userName,
          location: 'Phone/Address',
          status: a.status.toLowerCase(),
          current: false
      }));
    });
  }

  loadOfferings() {
    if (!this.currentService) return;
    this.apiService.getOfferingsByService(this.currentService.id).subscribe(offs => {
      this.offerings = offs;
      this.activeServices = offs.map(o => ({
        name: o.name,
        price: o.price.toString(),
        bookings: 0, // Placeholder
        icon: 'stars'
      }));
    });
  }

  loadClients() {
    if (!this.currentService) return;
    this.apiService.getClientsByService(this.currentService.id).subscribe(cls => {
      this.clients = cls;
    });
  }

  updateAptStatus(aptId: string, status: string) {
    this.apiService.updateAppointmentStatus(aptId, status).subscribe(() => {
      this.loadAppointments();
    });
  }

  // Offerings CRUD
  openOfferingModal(offering?: any) {
    if (offering) {
      this.editingOffering = offering;
      this.offeringForm = { ...offering };
    } else {
      this.editingOffering = null;
      this.offeringForm = { name: '', description: '', price: 300, durationMinutes: 30 };
    }
    this.showOfferingModal = true;
  }

  closeOfferingModal() {
    this.showOfferingModal = false;
    this.editingOffering = null;
  }

  saveOffering() {
    if (!this.currentService) return;
    this.isSaving = true;
    const offeringData = { ...this.offeringForm, serviceId: this.currentService.id };

    if (this.editingOffering) {
      this.apiService.updateOffering(this.editingOffering.id, offeringData).subscribe({
        next: () => {
          this.loadOfferings();
          this.closeOfferingModal();
          this.isSaving = false;
        },
        error: () => this.isSaving = false
      });
    } else {
      this.apiService.createOffering(offeringData).subscribe({
        next: () => {
          this.loadOfferings();
          this.closeOfferingModal();
          this.isSaving = false;
        },
        error: () => this.isSaving = false
      });
    }
  }

  deleteOffering(id: string) {
    if (confirm('Delete this service offering?')) {
      this.apiService.deleteOffering(id).subscribe(() => this.loadOfferings());
    }
  }

  initializeService() {
    if (!this.currentUser) return;
    this.isSaving = true;
    const newSvc = {
      name: (this.currentUser.firstName + ' ' + (this.currentUser.lastName || '')).trim() + ' Pro Services',
      providerId: this.currentUser.id,
      baseCharge: 500,
      description: 'Expert professional services.',
      status: 'ACTIVE', // Auto-active for demonstration
      phoneNumber: this.currentUser.phone
    };
    
    this.apiService.createService(newSvc).subscribe({
      next: (svc) => {
        this.currentService = svc;
        this.isSaving = false;
        this.loadOfferings();
      },
      error: (err) => {
        this.isSaving = false;
        alert('Failed to initialize: ' + (err.error?.message || err.message));
      }
    });
  }

  fetchGPSLocation() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    this.isFetchingLocation = true;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        
        this.currentService.latitude = lat;
        this.currentService.longitude = lon;
        
        // Reverse geocoding using Nominatim (OSM)
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
          .then(res => res.json())
          .then(data => {
            if (this.currentService && data.display_name) {
              this.currentService.serviceArea = data.display_name;
              alert('Location fetched! Your service area has been updated.');
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
  }

  saveSettings() {
    if (!this.currentService) return;
    this.isSaving = true;
    this.apiService.updateService(this.currentService.id, this.currentService).subscribe({
      next: (svc) => {
        this.currentService = svc;
        this.isSaving = false;
        alert('Professional settings saved successfully!');
      },
      error: (err) => {
        this.isSaving = false;
        alert('Failed to save settings: ' + (err.error?.message || err.message));
      }
    });
  }

  onUserPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      this.compressImage(file, 25 * 1024).then(compressed => {
        this.userProfile.photoData = compressed;
      });
    }
  }

  saveUserProfile() {
    if (!this.currentUser) return;
    this.isSaving = true;
    
    this.authService.updateProfile(this.currentUser.id, this.userProfile).subscribe({
      next: () => {
        this.isSaving = false;
        alert('Personal verification details updated successfully!');
      },
      error: (err) => {
        this.isSaving = false;
        alert('Failed to update personal details: ' + (err.error?.message || err.message));
      }
    });
  }

  private compressImage(file: File, maxSize: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          let quality = 0.8;
          let base64 = '';
          const draw = () => {
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);
            base64 = canvas.toDataURL('image/jpeg', quality);
            if (base64.length > maxSize * 1.33 && quality > 0.1) {
              quality -= 0.1;
              width *= 0.9;
              height *= 0.9;
              draw();
            } else {
              resolve(base64);
            }
          };
          draw();
        };
      };
      reader.onerror = reject;
    });
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

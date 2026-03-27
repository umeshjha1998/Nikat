import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService, ShopDto, InquiryDto, AppointmentDto, ProductDto, CategoryDto } from '../../../core/api.service';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-shop-owner-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="dashboard-layout">
      <!-- Sidebar -->
      <aside class="dashboard-sidebar">
        <div class="business-brand" (click)="setTab('analytics')" style="cursor: pointer;">
          <div class="brand-hexagon">
            <span class="material-icons">architecture</span>
          </div>
          <div class="brand-text">
            <h3>{{ currentShop?.name || 'Business Studio' }}</h3>
            <p>Nikat for Partners</p>
          </div>
        </div>

        <nav class="sidebar-nav">
          <a class="nav-item" (click)="setTab('analytics')" [class.active]="activeTab === 'analytics'">
            <span class="material-icons">insights</span>
            <span>Analytics</span>
          </a>
          <a class="nav-item" (click)="setTab('listings')" [class.active]="activeTab === 'listings'">
            <span class="material-icons">storefront</span>
            <span>Listings</span>
          </a>
          <a class="nav-item" (click)="setTab('appointments')" [class.active]="activeTab === 'appointments'">
            <span class="material-icons">event_available</span>
            <span>Appointments</span>
          </a>
          <a class="nav-item" (click)="setTab('inquiries')" [class.active]="activeTab === 'inquiries'">
            <span class="material-icons">chat_bubble_outline</span>
            <span>Inquiries</span>
            <span class="badge" *ngIf="newInquiriesCount > 0">{{ newInquiriesCount }}</span>
          </a>
          <div class="nav-divider"></div>
          <a class="nav-item" (click)="setTab('settings')" [class.active]="activeTab === 'settings'">
            <span class="material-icons">settings</span>
            <span>Settings</span>
          </a>
          <a class="nav-item" (click)="setTab('support')" [class.active]="activeTab === 'support'">
            <span class="material-icons">help_outline</span>
            <span>Support</span>
          </a>
          <div class="nav-item logout-item" (click)="signOut()" style="color: #ef4444; margin-top: auto; cursor: pointer;">
            <span class="material-icons">logout</span>
            <span>Sign Out</span>
          </div>
        </nav>

        <div class="user-profile-mini">
          <div class="mini-avatar-circle">{{userInitial}}</div>
          <div class="user-details" style="margin-left: 10px;">
            <span class="name">{{currentUser?.firstName}} {{currentUser?.lastName}}</span>
            <span class="role">{{currentUser?.role}}</span>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="dashboard-main">
        <header class="dashboard-header">
          <div class="header-titles">
            <h1 style="text-transform: capitalize;">{{ activeTab }}</h1>
            <p class="subtitle" *ngIf="activeTab === 'analytics'">Detailed performance metrics for {{ currentShop?.name }}.</p>
            <p class="subtitle" *ngIf="activeTab === 'listings'">Manage your products and services.</p>
          </div>
          <div class="header-actions">
            <button class="btn-outline-glass" (click)="shareProfile()">
              <span class="material-icons">share</span>
              {{ shareBtnText }}
            </button>
            <button class="btn-primary-glow" *ngIf="activeTab === 'listings'" (click)="openListingModal()">
              <span class="material-icons">add</span>
              New Listing
            </button>
          </div>
        </header>

        <!-- ANALYTICS TAB -->
        <ng-container *ngIf="activeTab === 'analytics'">
          <div class="stats-container">
            <div class="stat-card-glass">
              <div class="stat-header">
                <span class="stat-label">Total Views</span>
                <span class="trend positive"><span class="material-icons">trending_up</span> +14%</span>
              </div>
              <div class="stat-main">
                <span class="stat-value">1.2K</span>
              </div>
            </div>
            <div class="stat-card-glass">
              <div class="stat-header">
                <span class="stat-label">Inquiries</span>
                <span class="trend positive"><span class="material-icons">trending_up</span> +5%</span>
              </div>
              <div class="stat-main">
                <span class="stat-value">{{ inquiries.length }}</span>
              </div>
            </div>
            <div class="stat-card-glass">
              <div class="stat-header">
                <span class="stat-label">Products</span>
              </div>
              <div class="stat-main">
                <span class="stat-value">{{ products.length }}</span>
              </div>
            </div>
          </div>

          <div class="dashboard-grid">
            <div class="grid-col-2">
              <section class="content-card-dark">
                <div class="card-header">
                  <h2>Showcase Photos</h2>
                  <input type="file" #fileInput style="display: none" (change)="onPhotoUpload($event)" accept="image/*">
                  <button class="link-btn" (click)="fileInput.click()">Add Photos</button>
                </div>
                <div class="photo-grid">
                  <div class="showcase-img" *ngFor="let photo of currentShop?.photos" 
                       [style.backgroundImage]="'url(' + photo + ')'"></div>
                  <div class="photo-add-card" (click)="fileInput.click()">
                    <span class="material-icons" *ngIf="!isUploading">add_a_photo</span>
                    <span class="upload-loader" *ngIf="isUploading"></span>
                    <span>{{ isUploading ? 'Uploading...' : 'Upload' }}</span>
                  </div>
                </div>
              </section>
            </div>
            <div class="grid-col-1">
              <section class="content-card-dark inquiries-section">
                <div class="card-header">
                  <h2>Recent Inquiries</h2>
                </div>
                <div class="inquiry-list">
                  <div class="inquiry-item" *ngFor="let inquiry of inquiries.slice(0, 3)">
                    <div class="inquiry-user">
                      <div class="user-info">
                        <strong>{{ inquiry.userName }}</strong>
                        <span>{{ inquiry.createdAt | date:'shortTime' }}</span>
                      </div>
                    </div>
                    <p class="inquiry-text">"{{ inquiry.message }}"</p>
                    <div class="inquiry-actions">
                      <button class="btn-reply" (click)="replyInquiry(inquiry)">Reply</button>
                    </div>
                  </div>
                  <div *ngIf="inquiries.length === 0" class="empty-state">No recent inquiries</div>
                </div>
              </section>
            </div>
          </div>
        </ng-container>

        <!-- LISTINGS TAB -->
        <ng-container *ngIf="activeTab === 'listings'">
          <div class="listings-grid">
             <div class="content-card-dark listing-card" *ngFor="let product of products">
                <img [src]="product.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400'" class="listing-thumb">
                <div class="listing-info">
                   <h3>{{ product.name }}</h3>
                   <p>{{ product.description }}</p>
                   <div class="listing-footer">
                      <span class="price">₹{{ product.price }}</span>
                      <span class="status-tag" [class.available]="product.isAvailable">{{ product.isAvailable ? 'In Stock' : 'Out of Stock' }}</span>
                   </div>
                </div>
                    <div class="listing-actions">
                       <button class="btn-icon" (click)="openListingModal(product)"><span class="material-icons">edit</span></button>
                       <button class="btn-icon" (click)="deleteListing(product.id)"><span class="material-icons">delete</span></button>
                    </div>
             </div>
             <div *ngIf="products.length === 0" class="empty-full-width">
                <span class="material-icons">inventory_2</span>
                <p>No listings yet. Start showcasing your products!</p>
                <button class="btn-primary-glow" (click)="openListingModal()">Create First Listing</button>
             </div>
          </div>
        </ng-container>

        <!-- APPOINTMENTS TAB -->
        <ng-container *ngIf="activeTab === 'appointments'">
          <div class="appointments-view">
             <table class="data-table">
                <thead>
                   <tr>
                      <th>Customer</th>
                      <th>Booking Time</th>
                       <th>Scheduled Slot</th>
                      <th>Service</th>
                      <th>Status</th>
                      <th>Actions</th>
                   </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let apt of appointments">
                       <td>
                          {{ apt.userName }}<br>
                          <small *ngIf="apt.assignedWorker" class="assigned-worker-badge">Assigned: {{ apt.assignedWorker }}</small>
                       </td>
                       <td>{{ apt.createdAt | date:'short' }}</td>
                        <td>
                           <div class="slot-date" style="font-weight: 700; color: var(--text-main);">{{ apt.appointmentTime | date:'dd MMM, yyyy' }}</div>
                           <div class="slot-time" style="font-size: 0.8rem; color: var(--primary);">{{ apt.appointmentTime | date:'h:mm a' }}</div>
                        </td>
                       <td>{{ apt.serviceType }}</td>
                       <td><span class="badge" [class]="apt.status.toLowerCase()">{{ apt.status }}</span></td>
                       <td class="action-cells">
                          <button class="btn-icon ok" (click)="confirmWithWorker(apt)" *ngIf="apt.status === 'PENDING' || apt.status === 'CANCELLED'" title="Confirm Appointment">
                             <span class="material-icons">assignment_ind</span>
                          </button>
                          <button class="btn-icon cancel" (click)="updateAptStatus(apt.id, 'CANCELLED')" *ngIf="apt.status === 'PENDING' || apt.status === 'CONFIRMED'" title="Cancel Appointment">
                             <span class="material-icons">cancel</span>
                          </button>
                       </td>
                    </tr>
                </tbody>
             </table>
             <div *ngIf="appointments.length === 0" class="empty-state-large">
                <p>No appointments booked yet.</p>
             </div>
          </div>
        </ng-container>

        <!-- INQUIRIES TAB -->
        <ng-container *ngIf="activeTab === 'inquiries'">
          <div class="inquiry-thread-list">
             <div class="inquiry-thread-card" *ngFor="let inq of inquiries" [class.new]="inq.status === 'OPEN'">
                <div class="thread-header">
                   <strong>{{ inq.userName }}</strong>
                   <span class="badge" [class]="inq.status.toLowerCase()">{{ inq.status }}</span>
                </div>
                <div class="thread-content">
                   <p class="question">Q: {{ inq.message }}</p>
                   <p class="answer" *ngIf="inq.reply"><strong>A:</strong> {{ inq.reply }}</p>
                   <div class="reply-input-box" *ngIf="!inq.reply">
                      <input #replyInput type="text" placeholder="Type your response...">
                      <button (click)="submitReply(inq.id, replyInput.value)">Send</button>
                   </div>
                </div>
             </div>
             <div *ngIf="inquiries.length === 0" class="empty-state">No inquiries found</div>
          </div>
        </ng-container>

        <ng-container *ngIf="activeTab === 'settings'">
          <div class="settings-form content-card-dark" *ngIf="currentShop; else noShop">
             <h2>Shop Profile Settings</h2>
             <form class="glass-form" (submit)="saveSettings(); $event.preventDefault()">
                <div class="form-row">
                   <div class="form-group">
                      <label>Shop Name</label>
                      <input type="text" [(ngModel)]="currentShop.name" name="name" required>
                   </div>
                   <div class="form-row">
                     <div class="form-group">
                        <label>Workers Count</label>
                        <input type="number" [(ngModel)]="currentShop.workerCount" name="workers">
                     </div>
                     <div class="form-group">
                        <label>Worker Names (Comma separated)</label>
                        <input type="text" [(ngModel)]="currentShop.workerNames" name="workerNames" style="display: none;">
                        <div style="display: grid; gap: 0.8rem; margin-top: 0.8rem;">
                           <div *ngFor="let i of workerRange; trackBy: trackByFn">
                              <input type="text" 
                                     [(ngModel)]="workerNamesList[i]" 
                                     [name]="'worker' + i" 
                                     [placeholder]="'Staff Member ' + (i + 1)"
                                     class="worker-input">
                           </div>
                        </div>
                     </div>
                   </div>
                </div>
                <div class="form-group">
                   <label>Business Description</label>
                   <textarea rows="4" [(ngModel)]="currentShop.description" name="desc"></textarea>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Business Category</label>
                        <select [(ngModel)]="currentShop.categoryId" name="cat" class="glass-select">
                            <option [value]="null" disabled selected>Select a category</option>
                            <option *ngFor="let cat of categories" [value]="cat.id">{{cat.name}}</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                   <div class="form-group">
                      <label>Shop Contact Number</label>
                      <input type="tel" [(ngModel)]="currentShop.phoneNumber" name="phone" placeholder="e.g. +91 98765 43210">
                   </div>
                </div>
                <div class="form-group">
                   <label>Business Address</label>
                   <div class="address-input-wrapper">
                      <input type="text" [(ngModel)]="currentShop.address" name="address" placeholder="e.g. 123 Street Name, Landmark">
                      <button type="button" class="gps-btn" (click)="fetchGPSLocation()" [disabled]="isFetchingLocation">
                         <span class="material-icons" *ngIf="!isFetchingLocation">my_location</span>
                         <span class="upload-loader" *ngIf="isFetchingLocation" style="width: 14px; height: 14px; border-width: 2px;"></span>
                         {{ isFetchingLocation ? 'Locating...' : 'GPS' }}
                      </button>
                   </div>
                   <div class="form-row" style="margin-top: 0.8rem;" *ngIf="currentShop.latitude">
                      <div class="form-group">
                         <label>Latitude</label>
                         <input type="text" [value]="currentShop.latitude" readonly style="opacity: 0.7;">
                      </div>
                      <div class="form-group">
                         <label>Longitude</label>
                         <input type="text" [value]="currentShop.longitude" readonly style="opacity: 0.7;">
                      </div>
                   </div>
                   <p class="form-hint" *ngIf="currentShop.latitude">GPS Coordinates captured! This will be used for Google Maps directions.</p>
                   <p class="form-hint" *ngIf="currentShop.address && !currentShop.latitude">Location fetched! You can add building/shop number or landmark if missing.</p>
                </div>
                <div class="form-row">
                   <div class="form-group">
                      <label>Opens At</label>
                      <input type="time" [(ngModel)]="currentShop.openingTime" name="open">
                   </div>
                   <div class="form-group">
                      <label>Closes At</label>
                      <input type="time" [(ngModel)]="currentShop.closingTime" name="close">
                   </div>
                </div>
                <button type="submit" class="btn-primary-glow" style="margin-top: 1rem;">Save Changes</button>
             </form>
          </div>
          <ng-template #noShop>
            <div class="empty-state-large" style="text-align: center; padding: 4rem;">
               <span class="material-icons" style="font-size: 4rem; color: var(--primary); margin-bottom: 1rem;">storefront</span>
               <h3 style="color: var(--text-main); margin-bottom: 0.5rem;">No Shop Profile Found</h3>
               <p style="color: var(--text-muted); margin-bottom: 2rem;">Your account is registered as a Shop Owner, but your business profile isn't set up yet.</p>
               <button class="btn-prime-glow" (click)="initializeShop()" [disabled]="isUploading">
                 <span class="material-icons">add_business</span>
                 {{ isUploading ? 'Initializing...' : 'Setup My Shop Profile' }}
               </button>
            </div>
          </ng-template>
        </ng-container>

        <!-- SUPPORT TAB -->
        <ng-container *ngIf="activeTab === 'support'">
          <div class="support-view">
             <div class="support-grid">
                <div class="content-card-dark help-article">
                   <span class="material-icons">description</span>
                   <h3>Getting Started</h3>
                   <p>Learn how to optimize your storefront and attract more customers.</p>
                   <a href="#">Read Guide</a>
                </div>
                <div class="content-card-dark help-article">
                   <span class="material-icons">payments</span>
                   <h3>Payments & Commissions</h3>
                   <p>Understand how payouts work and manage your billing.</p>
                   <a href="#">View Policy</a>
                </div>
                <div class="content-card-dark contact-card">
                   <h3>Need Direct Help?</h3>
                   <p>Our partner success team is available 24/7.</p>
                   <button class="btn-outline-glass">Contact Support</button>
                </div>
             </div>
          </div>
        </ng-container>
      </main>

      <!-- Create Listing Modal -->
      <div class="modal-overlay" *ngIf="showListingModal">
        <div class="modal-card">
          <div class="modal-header">
            <h2>{{ newProduct.id ? 'Edit' : 'Add New' }} Listing</h2>
            <button class="btn-icon" (click)="showListingModal = false"><span class="material-icons">close</span></button>
          </div>
               <form (submit)="saveListing(); $event.preventDefault()" class="glass-form">
                  <div class="form-group">
                    <label>Listing Title</label>
                    <input type="text" [(ngModel)]="newProduct.name" name="name" placeholder="e.g. Haircut & Shampoo" required>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                       <label>Price (₹)</label>
                       <input type="number" [(ngModel)]="newProduct.price" name="price" required>
                    </div>
                    <div class="form-group">
                       <label>Status</label>
                       <select class="glass-select" [(ngModel)]="newProduct.isAvailable" name="avail">
                          <option [ngValue]="true">Available</option>
                          <option [ngValue]="false">Out of Stock</option>
                       </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label>Description</label>
                    <textarea [(ngModel)]="newProduct.description" name="desc" rows="3"></textarea>
                  </div>
                  <div class="form-group">
                    <label>Listing Image</label>
                    <div class="product-upload-container">
                       <div *ngIf="newProduct.imageUrl" class="product-preview-box" [style.backgroundImage]="'url(' + newProduct.imageUrl + ')'">
                          <button class="remove-img" (click)="newProduct.imageUrl = ''"><span class="material-icons">close</span></button>
                       </div>
                       <div *ngIf="!newProduct.imageUrl" class="product-upload-placeholder" (click)="productImg.click()">
                          <div *ngIf="!isProductImageUploading">
                             <span class="material-icons">add_a_photo</span>
                             <p>Create with photo</p>
                          </div>
                          <div *ngIf="isProductImageUploading" class="upload-loader"></div>
                       </div>
                    </div>
                    <input type="file" #productImg hidden (change)="onProductImageUpload($event)">
                  </div>

                  <div class="modal-footer">
                    <button type="button" class="btn-link" (click)="showListingModal = false">Cancel</button>
                    <button type="submit" class="btn-primary-glow" [disabled]="isProductImageUploading">
                       {{ newProduct.id ? 'Update Listing' : 'Publish Listing' }}
                    </button>
                  </div>
               </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');

    :host {
      font-family: 'Manrope', sans-serif;
    }

    .assigned-worker-badge {
      color: var(--primary);
      font-weight: 700;
      display: block;
      margin-top: 0.25rem;
      font-size: 0.75rem;
    }

    .worker-input {
      width: 100%;
      border-radius: 0.8rem;
      background: var(--glass);
      color: var(--text-main);
      border: 1px solid var(--glass-border);
      padding: 0.8rem 1.2rem;
      transition: all 0.3s ease;
    }

    .worker-input:focus {
      border-color: var(--primary);
      background: rgba(var(--primary-rgb, 59, 130, 246), 0.05);
      outline: none;
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
      border-bottom: 1px solid var(--border-color);
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
      color: var(--text-main);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 150px;
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
      background: var(--border-color);
      margin: 1rem 0;
    }

    .user-profile-mini {
      padding: 1.25rem;
      margin: 0 1rem;
      background: var(--glass);
      border-radius: 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .mini-avatar-circle {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary), #8b5cf6);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      color: #fff;
    }

    .user-details {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .user-details .name {
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-main);
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
      background: linear-gradient(135deg, var(--text-main) 0%, var(--text-muted) 100%);
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

    .btn-outline-glass {
      background: var(--glass);
      border: 1px solid var(--glass-border);
      color: var(--text-main);
      padding: 0.85rem 1.75rem;
      border-radius: 2rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
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
    }

    .stat-value {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 2.75rem;
      font-weight: 800;
      color: var(--text-main);
    }

    .trend {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.85rem;
      font-weight: 700;
    }

    .trend.positive { color: var(--primary); }

    .stat-visual {
      height: 4px;
      width: 100%;
      background: var(--border-color);
      border-radius: 2px;
      margin-top: 1.5rem;
      position: relative;
    }

    .stat-visual::after {
      content: '';
      position: absolute; left: 0; top: 0;
      height: 100%; width: 70%;
      background: var(--primary);
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
      background: var(--surface-container);
      border: 1px solid var(--border-color);
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
      background: var(--glass);
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
    }

    .header-tabs button.active {
      background: var(--primary);
      color: #003d20;
    }

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
      position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      display: flex; flex-direction: column; justify-content: space-between;
      pointer-events: none;
    }

    .chart-grid-lines span {
      height: 1px; width: 100%; background: var(--border-color);
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
    }

    .showcase-img.placeholder-img {
       background: var(--glass);
       border: 1px dashed var(--glass-border);
    }

    .photo-add-card {
      aspect-ratio: 1;
      border: 2px dashed var(--glass-border);
      border-radius: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: var(--text-muted);
      cursor: pointer;
    }

    .upload-loader {
       width: 24px;
       height: 24px;
       border: 3px solid rgba(61, 220, 132, 0.3);
       border-top-color: var(--primary);
       border-radius: 50%;
       animation: spin 1s linear infinite;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    /* Listings Styles */
    .listings-grid {
       display: grid;
       grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
       gap: 1.5rem;
    }

    .listing-card {
       padding: 0;
       overflow: hidden;
       position: relative;
    }

    .listing-thumb {
       width: 100%;
       height: 200px;
       object-fit: cover;
    }

    .listing-info {
       padding: 1.5rem;
    }

    .listing-info h3 { margin: 0 0 0.5rem 0; font-family: 'Plus Jakarta Sans', sans-serif; }
    .listing-info p { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.5rem; }

    .listing-footer {
       display: flex;
       justify-content: space-between;
       align-items: center;
    }

    .price { font-weight: 800; font-size: 1.25rem; color: var(--primary); }
    .status-tag { 
       font-size: 0.75rem; 
       padding: 0.25rem 0.75rem; 
       border-radius: 1rem; 
       background: rgba(239, 68, 68, 0.1); 
       color: #ef4444; 
    }
    .status-tag.available { background: rgba(61, 220, 132, 0.1); color: var(--primary); }

    .listing-actions {
       position: absolute;
       top: 1rem; right: 1rem;
       display: flex;
       gap: 0.5rem;
    }

    .listing-actions .btn-icon {
       background: rgba(0,0,0,0.5);
       backdrop-filter: blur(5px);
       color: #fff;
       width: 32px; height: 32px;
       border-radius: 50%;
       display: flex; align-items: center; justify-content: center;
    }

    /* Appointments Table */
    .data-table {
       width: 100%;
       border-collapse: separate;
       border-spacing: 0 0.75rem;
    }

    .data-table th {
       text-align: left;
       padding: 1rem;
       color: var(--text-muted);
       font-weight: 600;
       font-size: 0.9rem;
       text-transform: uppercase;
    }

    .data-table tbody tr {
       background: var(--surface-container);
       border-radius: 1rem;
    }

    .data-table td {
       padding: 1.25rem 1rem;
    }

    .data-table td:first-child { border-top-left-radius: 1rem; border-bottom-left-radius: 1rem; }
    .data-table td:last-child { border-top-right-radius: 1rem; border-bottom-right-radius: 1rem; }

    .user-cell { display: flex; align-items: center; gap: 0.75rem; }

    .badge.pending { background: rgba(251, 191, 36, 0.1); color: #fbbf24; }
    .badge.confirmed { background: rgba(61, 220, 132, 0.1); color: var(--primary); }
    .badge.cancelled { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

    .action-cells { display: flex; gap: 0.5rem; }
    .btn-icon.ok { color: var(--primary); }
    .btn-icon.cancel { color: #ef4444; }

    /* Inquiries View */
    .inquiry-thread-list { display: flex; flex-direction: column; gap: 1.5rem; }
    .inquiry-thread-card {
       background: var(--surface-container);
       border: 1px solid var(--border-color);
       border-radius: 1.5rem;
       padding: 2rem;
    }
    .inquiry-thread-card.new { border-left: 4px solid var(--primary); }

    .thread-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
    .user-meta strong { display: block; }
    .user-meta span { font-size: 0.8rem; color: var(--text-muted); }

    .question { background: var(--glass); padding: 1rem; border-radius: 1rem; margin-bottom: 1rem; }
    .answer { padding: 1rem; border-left: 2px solid var(--primary); color: var(--primary); }

    .reply-input-box {
       display: flex; gap: 1rem; margin-top: 1.5rem;
    }
    .reply-input-box input {
       flex: 1; background: var(--glass); border: 1px solid var(--glass-border);
       color: var(--text-main); padding: 0.75rem 1.25rem; border-radius: 2rem;
    }
    .reply-input-box button {
       background: var(--primary); color: #003d20; border: none;
       padding: 0 1.5rem; border-radius: 2rem; font-weight: 700;
    }

    /* Form Styles */
    .glass-form { display: flex; flex-direction: column; gap: 1.5rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .form-group label { font-size: 0.9rem; font-weight: 600; color: var(--text-muted); }
    .form-group input, .form-group textarea {
       background: var(--glass); border: 1px solid var(--glass-border);
       color: var(--text-main); padding: 0.85rem 1.25rem; border-radius: 1rem;
       font-family: inherit;
    }

    .empty-state, .empty-full-width, .empty-state-large {
       text-align: center; color: var(--text-muted); padding: 3rem;
    }
    .empty-full-width .material-icons, .empty-state-large .material-icons { font-size: 3rem; margin-bottom: 1rem; }

    @media (max-width: 1280px) {
      .dashboard-grid { grid-template-columns: 1fr; }
    }

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease-out;
    }

    .modal-card {
      background: var(--surface-container);
      border: 1px solid var(--border-color);
      border-radius: 1.5rem;
      width: 90%;
      max-width: 500px;
      padding: 2rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @media (max-width: 1024px) {
      .dashboard-sidebar { width: 80px; padding: 1.5rem 0.5rem; align-items: center; }
      .brand-text, .nav-item span, .user-details, .badge { display: none; }
      .business-brand { justify-content: center; padding: 0 0 1.5rem; }
      .nav-item { justify-content: center; padding: 1rem; }
    }

    @media (max-width: 768px) {
      .dashboard-layout { flex-direction: column; }
      
      .dashboard-sidebar {
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

      .business-brand, .user-profile-mini, .nav-divider { display: none; }

      .sidebar-nav {
         margin-top: 0;
         flex-direction: row;
         width: 100%;
         height: 100%;
         gap: 0;
         padding: 0;
      }

      .nav-item {
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
      
      .nav-item .material-icons { font-size: 1.4rem; }
      .nav-item span { display: block; font-size: 0.6rem; }
      .nav-item.active::before { display: none; }

      .dashboard-main { padding: 1.5rem 1rem 100px; }
      .dashboard-header { flex-direction: column; gap: 1.5rem; align-items: flex-start; margin-bottom: 2rem; }
      .header-titles h1 { font-size: 2rem; }
      
      .analytics-grid { grid-template-columns: 1fr; gap: 1rem; }
      .card-premium-glass { padding: 1.5rem; border-radius: 1.5rem; }
      
      .content-grid { grid-template-columns: 1fr; gap: 1.5rem; }
      .orders-summary { margin-top: 1.5rem; }

      .products-grid { grid-template-columns: 1fr; }
      .product-card { padding: 1.25rem; }

      .inquiry-thread-card { padding: 1.25rem; }
      
      .data-table-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; }
      .data-table { min-width: 600px; }

      .form-row { grid-template-columns: 1fr !important; }

      .modal-card { width: 95%; padding: 1.5rem; }
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
    }

    .modal-header h2 { margin: 0; font-size: 1.5rem; }

    .modal-footer {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
      justify-content: flex-end;
    }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    .product-upload-container {
      margin-top: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    .product-preview-box {
      width: 100%;
      height: 160px;
      border-radius: 1rem;
      background-size: cover;
      background-position: center;
      position: relative;
      border: 1px solid var(--glass-border);
    }

    .remove-img {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: rgba(0,0,0,0.6);
      border: none;
      color: #fff;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .product-upload-placeholder {
      width: 100%;
      height: 120px;
      border: 2px dashed var(--glass-border);
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

    .product-upload-placeholder:hover {
      border-color: var(--primary);
      color: var(--primary);
      background: rgba(var(--primary-rgb), 0.05);
    }

    .upload-hint {
      font-size: 0.7rem;
      color: var(--text-muted);
      margin: 0;
    }

    .glass-select {
       background: var(--glass);
       border: 1px solid var(--glass-border);
       color: var(--text-main);
       padding: 0.85rem 1.25rem;
       border-radius: 1rem;
       width: 100%;
       outline: none;
    }

    .address-input-wrapper {
       display: flex;
       gap: 0.5rem;
    }

    .address-input-wrapper input {
       flex: 1;
    }

    .gps-btn {
       background: rgba(var(--primary-rgb), 0.1);
       border: 1px solid var(--glass-border);
       color: var(--primary);
       border-radius: 1rem;
       padding: 0 1rem;
       display: flex;
       align-items: center;
       gap: 0.5rem;
       cursor: pointer;
       font-weight: 600;
       transition: all 0.3s ease;
       white-space: nowrap;
    }

    .gps-btn:hover:not(:disabled) {
       background: var(--primary);
       color: #000;
       box-shadow: 0 0 10px var(--primary-glow);
    }

    .form-hint {
       font-size: 0.75rem;
       color: var(--primary);
       margin-top: 0.4rem;
    }
  `]
})
export class ShopOwnerDashboardComponent implements OnInit {
  activeTab = 'analytics';
  activeTrend: 'views' | 'interactions' = 'views';
  isUploading = false;
  shareBtnText = 'Share Profile';
  currentShop: ShopDto | null = null;
  inquiries: InquiryDto[] = [];
  appointments: AppointmentDto[] = [];
  products: ProductDto[] = [];
  categories: CategoryDto[] = [];

  // Modal states
  showListingModal = false;
  isProductImageUploading = false;
  newProduct: Partial<ProductDto> = {
    name: '',
    description: '',
    price: 0,
    isAvailable: true,
    imageUrl: ''
  };
  workerNamesList: string[] = [];

  constructor(private apiService: ApiService) {}
  private authService = inject(AuthService);
  private router = inject(Router);

  get currentUser() {
    return this.authService.currentUser;
  }

  get userInitial(): string {
    const name = this.currentUser?.firstName || 'O';
    return name.charAt(0).toUpperCase();
  }

  get newInquiriesCount(): number {
    return this.inquiries.filter((i: InquiryDto) => i.status === 'OPEN').length;
  }

  get workerRange() {
    return Array.from({ length: this.currentShop?.workerCount || 0 }, (_, i) => i);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.loadInitialData();
        this.loadCategories();
      }
    });
  }

  loadCategories() {
    this.apiService.getCategories().subscribe({
      next: (cats) => this.categories = cats.filter(c => c.isShopCategory),
      error: (err) => console.error('Failed to load categories:', err)
    });
  }

  async loadInitialData() {
    const user = this.authService.currentUser;
    if (!user?.id) return;
    
    this.apiService.getShopsByOwner(user.id).subscribe({
      next: (shops) => {
        if (shops.length > 0) {
          this.currentShop = shops[0];
          this.workerNamesList = (this.currentShop.workerNames || '').split(',').map(n => n.trim());
          this.loadDashboardData(this.currentShop.id);
        } else {
          this.currentShop = null;
        }
      },
      error: (err) => console.error('Failed to load shop:', err)
    });
  }

  initializeShop() {
    if (!this.currentUser) return;
    this.isUploading = true;
    
    const newShop: any = {
      name: (this.currentUser.firstName || 'My') + "'s Shop",
      ownerId: this.currentUser.id,
      description: 'Newly initialized shop. Please update your business details.',
      address: 'Update Address',
      status: 'PENDING_VERIFICATION'
    };

    this.apiService.createShop(newShop).subscribe({
      next: (shop) => {
        this.currentShop = shop;
        alert('Shop initialized! Please update your details in Settings.');
        this.loadInitialData(); // Refresh all data
        this.isUploading = false;
      },
      error: (err) => {
        console.error('Initialization error:', err);
        alert('Failed to initialize shop. Service may be under maintenance.');
        this.isUploading = false;
      }
    });
  }

  loadDashboardData(shopId: string) {
    this.apiService.getInquiriesByShop(shopId).subscribe(data => this.inquiries = data);
    this.apiService.getAppointmentsByShop(shopId).subscribe(data => this.appointments = data);
    this.apiService.getProductsByShop(shopId).subscribe(data => this.products = data);
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  // --- ANALYTICS ACTIONS ---

  shareProfile() {
    if (this.currentShop) {
      const url = `${window.location.origin}/shop/${this.currentShop.id}`;
      
      if (navigator.share) {
        navigator.share({
          title: this.currentShop.name,
          text: `Check out ${this.currentShop.name} on Nikat!`,
          url: url
        }).catch(() => this.copyToClipboard(url));
      } else {
        this.copyToClipboard(url);
      }
    }
  }

  private copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    this.shareBtnText = 'Link Copied!';
    setTimeout(() => this.shareBtnText = 'Share Profile', 2000);
  }

  async onPhotoUpload(event: any) {
    const file = event.target.files[0];
    if (!file || !this.currentShop) return;

    this.isUploading = true;
    try {
      const compressedBase64 = await this.compressImage(file, 48 * 1024); 
      this.apiService.uploadShopPhoto(this.currentShop.id, compressedBase64).subscribe({
        next: () => {
          if (!this.currentShop!.photos) this.currentShop!.photos = [];
          this.currentShop!.photos.push(compressedBase64);
          this.isUploading = false;
        },
        error: (err) => {
          console.error('Upload failed', err);
          this.isUploading = false;
          alert('Upload failed. Please try a smaller image.');
        }
      });
    } catch (err) {
      console.error('Compression failed', err);
      this.isUploading = false;
    }
  }

  async onProductImageUpload(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.isProductImageUploading = true;
    try {
      // Compress to 50KB (51200 bytes)
      const compressedBase64 = await this.compressImage(file, 50 * 1024);
      this.newProduct.imageUrl = compressedBase64;
      this.isProductImageUploading = false;
    } catch (err) {
      console.error('Product image compression failed', err);
      this.isProductImageUploading = false;
      alert('Failed to process image. Please try another one.');
    }
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

  // --- LISTINGS ACTIONS ---

  openListingModal(product?: ProductDto) {
    if (product) {
       this.newProduct = { ...product };
    } else {
       this.newProduct = {
         shopId: this.currentShop?.id,
         name: '',
         description: '',
         price: 0,
         isAvailable: true,
         imageUrl: ''
       };
    }
    this.showListingModal = true;
  }

  saveListing() {
    if (!this.newProduct.name || !this.newProduct.price) return;
    if (!this.newProduct.shopId) {
       alert('Shop profile not loaded. Cannot create listing.');
       return;
    }

    if (this.newProduct.id) {
       this.apiService.updateProduct(this.newProduct.id, this.newProduct).subscribe({
          next: () => {
             const idx = this.products.findIndex(p => p.id === this.newProduct.id);
             if (idx > -1) this.products[idx] = { ...this.newProduct } as ProductDto;
             this.showListingModal = false;
             alert('Listing updated!');
          },
          error: (err) => alert('Failed to update listing.')
       });
    } else {
       this.apiService.createProduct(this.newProduct).subscribe({
         next: (product) => {
           this.products.unshift(product);
           this.showListingModal = false;
           alert('Listing created successfully!');
         },
         error: (err) => {
           console.error('Create listing failed', err);
           alert('Failed to create listing. Is your backend running?');
         }
       });
    }
  }

  deleteListing(id: string) {
    if (confirm('Delete this product?')) {
      this.apiService.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter(p => p.id !== id);
      });
    }
  }

  isFetchingLocation = false;
  // --- SETTINGS ACTIONS ---

  saveSettings() {
    if (!this.currentShop) return;

    // Sync array back to comma string - only include names up to workerCount
    this.currentShop.workerNames = this.workerNamesList
      .slice(0, this.currentShop.workerCount)
      .filter(n => n && n.trim())
      .join(',');

    this.apiService.updateShop(this.currentShop.id, this.currentShop).subscribe({
      next: (updatedShop) => {
        this.currentShop = updatedShop;
        alert('Settings saved successfully!');
      },
      error: (err) => {
        console.error('Update failed', err);
        alert('Failed to save settings. Please try again.');
      }
    });
  }

  fetchGPSLocation() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    this.isFetchingLocation = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        if (this.currentShop) {
          this.currentShop.latitude = lat;
          this.currentShop.longitude = lon;
        }

        // Reverse geocoding using Nominatim (OSM)
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
          .then(res => res.json())
          .then(data => {
            if (this.currentShop && data.display_name) {
              this.currentShop.address = data.display_name;
              alert('Location fetched! You can now refine your address.');
            }
            this.isFetchingLocation = false;
          })
          .catch(err => {
            console.error('Reverse Geocode Error:', err);
            if (this.currentShop) {
               this.currentShop.address = `Lat: ${lat}, Lon: ${lon} (Refine address manually)`;
            }
            this.isFetchingLocation = false;
          });
      },
      (error) => {
        console.error('Geolocation Error:', error);
        alert('Unable to retrieve your location. Check GPS permissions.');
        this.isFetchingLocation = false;
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }

  replyInquiry(inquiry: any) {
    this.activeTab = 'inquiries';
    // Logic to scroll to OR focus on the list
  }

  submitReply(inquiryId: string, reply: string) {
     if (!reply.trim()) return;
     this.apiService.replyInquiry(inquiryId, reply).subscribe(updated => {
        const idx = this.inquiries.findIndex(i => i.id === inquiryId);
        if (idx > -1) this.inquiries[idx] = updated;
     });
  }

  deleteInquiry(id: string) {
     if (confirm('Delete this inquiry?')) {
        this.apiService.deleteInquiry(id).subscribe(() => {
           this.inquiries = this.inquiries.filter(i => i.id !== id);
        });
     }
  }

  confirmWithWorker(apt: AppointmentDto) {
    if (!this.currentShop?.workerNames || this.currentShop.workerNames.trim() === '') {
      this.updateAptStatus(apt.id, 'CONFIRMED');
      return;
    }

    const workers = this.currentShop.workerNames.split(',').map(w => w.trim()).filter(w => w);
    if (workers.length === 0) {
      this.updateAptStatus(apt.id, 'CONFIRMED');
      return;
    }

    const worker = prompt(`Select a worker to assign (Available: ${workers.join(', ')})`, workers[0]);
    if (worker) {
      this.updateAptStatus(apt.id, 'CONFIRMED', worker.trim());
    } else if (worker === '') {
      // If they leave it blank but press OK, confirm without assignment or use default?
      // Better to assign first one or cancel.
      this.updateAptStatus(apt.id, 'CONFIRMED');
    }
  }

  updateAptStatus(id: string, status: string, workerName?: string) {
     const msg = status === 'CONFIRMED' ? 'Are you sure you want to approve this appointment?' : 'Are you sure you want to cancel this appointment?';
     if (!confirm(msg)) return;
 
     this.apiService.updateAppointmentStatus(id, status, workerName).subscribe(updated => {
        const idx = this.appointments.findIndex(a => a.id === id);
        if (idx > -1) this.appointments[idx] = updated;
     });
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ApiService, AppointmentDto } from '../../../core/api.service';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-service-booking',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="booking-premium">
      <!-- Minimal Header -->
      <header class="booking-header">
        <div class="header-inner">
          <a routerLink="/browse" class="btn-close-minimal">
            <span class="material-icons">close</span>
          </a>
          <div class="stepper-wrap">
            <div class="p-step" [class.active]="step >= 1" [class.done]="step > 1">
              <span class="num"><span class="material-icons" *ngIf="step > 1">check</span><span *ngIf="step <= 1">1</span></span>
              <label>Service</label>
            </div>
            <div class="p-line" [class.done]="step > 1"></div>
            <div class="p-step" [class.active]="step >= 2" [class.done]="step > 2">
              <span class="num"><span class="material-icons" *ngIf="step > 2">check</span><span *ngIf="step <= 2">2</span></span>
              <label>Schedule</label>
            </div>
            <div class="p-line" [class.done]="step > 2"></div>
            <div class="p-step" [class.active]="step >= 3" [class.done]="step > 3">
              <span class="num">3</span>
              <label>Confirm</label>
            </div>
          </div>
        </div>
      </header>

      <div class="booking-main-grid">
        <!-- Flow Side -->
        <main class="booking-flow">
          
          <!-- Step 1: Service Selection -->
          <div class="step-animation-wrap" *ngIf="step === 1">
            <div class="step-intro">
              <h1>Select your <span>Service</span></h1>
              <p>Choose from our specialized treatments tailored for you.</p>
            </div>

            <div class="service-menu">
              <div class="menu-item-premium" 
                   *ngFor="let s of serviceOptions" 
                   [class.selected]="selectedServiceId === s.id"
                   (click)="selectedServiceId = s.id">
                <div class="m-check">
                  <div class="dot"></div>
                </div>
                <div class="m-content">
                  <div class="m-top">
                    <h3>{{s.name}}</h3>
                    <span class="m-price">{{s.price}}</span>
                  </div>
                  <div class="m-meta">
                    <span class="meta-tag"><span class="material-icons">schedule</span> {{s.duration}}</span>
                    <span class="meta-tag"><span class="material-icons">bolt</span> {{s.level}}</span>
                  </div>
                </div>
              </div>
            </div>

            <footer class="flow-actions">
              <button class="btn-prime-glow-lg" (click)="nextStep()" [disabled]="!selectedServiceId">
                Choose Schedule
                <span class="material-icons">calendar_month</span>
              </button>
            </footer>
          </div>

          <!-- Step 2: Time & Date -->
          <div class="step-animation-wrap" *ngIf="step === 2">
            <div class="step-intro with-back">
              <button (click)="prevStep()" class="btn-back-link">
                <span class="material-icons">west</span> Back to Service
              </button>
              <h1>Pick a <span>Time Slot</span></h1>
              <p>Book your appointment for {{selectedDate}}</p>
            </div>

            <div class="calendar-mini">
              <div class="cal-nav">
                <h3>{{getCurrentMonthYear()}}</h3>
                <div class="nav-btns">
                  <button><span class="material-icons">chevron_left</span></button>
                  <button><span class="material-icons">chevron_right</span></button>
                </div>
              </div>
              <div class="date-row-premium">
                <div class="d-node" 
                     *ngFor="let d of dates" 
                     [class.active]="selectedDate === d.val"
                     (click)="onDateSelect(d)">
                  <span class="d-label">{{d.day}}</span>
                  <span class="d-num">{{d.num}}</span>
                  <div class="d-dot" *ngIf="d.available"></div>
                </div>
              </div>
            </div>

            <div class="time-slots-premium">
              <h3>Available Slots</h3>
              <div class="ts-grid">
                <button class="ts-btn" 
                        *ngFor="let t of timeSlots" 
                        [class.active]="selectedTime === t"
                        [disabled]="isPastTime(t)"
                        (click)="selectedTime = t">
                  {{t}}
                </button>
              </div>
            </div>

            <footer class="flow-actions">
              <button class="btn-prime-glow-lg" (click)="nextStep()" [disabled]="!selectedTime">
                Review & Confirm
                <span class="material-icons">check_circle</span>
              </button>
            </footer>
          </div>

          <!-- Step 3: Review -->
          <div class="step-animation-wrap" *ngIf="step === 3">
             <div class="step-intro with-back">
              <button (click)="prevStep()" class="btn-back-link">
                <span class="material-icons">west</span> Change Schedule
              </button>
              <h1>Final <span>Confirmation</span></h1>
              <p>Please review your booking details below.</p>
            </div>

            <div class="review-invoice-premium">
              <div class="invoice-section">
                <h4>Booking Summary</h4>
                <div class="inv-row">
                  <div class="inv-label">Service</div>
                  <div class="inv-val">{{getSelectedName()}}</div>
                </div>
                <div class="inv-row">
                  <div class="inv-label">Date & Time</div>
                  <div class="inv-val">{{selectedDate}} • {{selectedTime}}</div>
                </div>
                <div class="inv-row">
                  <div class="inv-label">Duration</div>
                  <div class="inv-val">{{getSelectedDuration()}}</div>
                </div>
              </div>

              <div class="inv-divider"></div>

              <div class="invoice-section price-sec">
                <div class="inv-row total">
                  <span>Due Now</span>
                  <span class="final-price">{{getSelectedPrice()}}</span>
                </div>
                <p class="pay-hint">Pay securely at the venue after your service.</p>
              </div>
            </div>

            <div class="policy-blurb">
              <span class="material-icons">info_outline</span>
              <p>Cancellation Policy: Cancel up to 12 hours before your slot for a free reschedule.</p>
            </div>

            <footer class="flow-actions">
              <button class="btn-confirm-booking-glow" (click)="confirmBooking()">
                Confirm Appointment
                <span class="material-icons">event_available</span>
              </button>
            </footer>
          </div>

        </main>

        <!-- Sidebar Summary (Sticky) -->
        <aside class="booking-summary-sidebar">
          <div class="provider-pill-premium">
            <div class="provider-img" [style.background-image]="'url(' + service.image + ')'"></div>
            <div class="provider-details">
              <h4>{{service.name}}</h4>
              <span class="badge">{{service.category}}</span>
              <div class="p-rating">
                <span class="material-icons">star</span>
                4.8 <strong>(142)</strong>
              </div>
            </div>
          </div>

          <div class="summary-card-glass">
            <h3>Cart</h3>
            <div class="empty-cart-summary" *ngIf="!selectedServiceId">
              <p>Select a service to see details</p>
            </div>
            <div class="selected-summary" *ngIf="selectedServiceId">
               <div class="s-line">
                 <span>{{getSelectedName()}}</span>
                 <strong>{{getSelectedPrice()}}</strong>
               </div>
               <div class="s-line small" *ngIf="selectedTime">
                 <span><span class="material-icons">event</span> {{selectedDate}}</span>
                 <span><span class="material-icons">pace</span> {{selectedTime}}</span>
               </div>
            </div>
          </div>

          <div class="help-box">
            <h5>New to Nikat?</h5>
            <p>Our buyer protection covers all service bookings made via the platform.</p>
            <a href="#">Learn more</a>
          </div>
        </aside>
      </div>

      <!-- Success Overlay -->
      <div class="success-booking-overlay" *ngIf="bookingConfirmed">
        <div class="success-card">
          <div class="icon-pulse">
            <span class="material-icons">check</span>
          </div>
          <h2>Booking <span>Successful</span></h2>
          <p>We've sent the confirmation to your registered email and WhatsApp.</p>
          <div class="booking-ref">REF: #BKH-{{orderId}}</div>
          
          <div class="success-actions">
            <button class="btn-prime" (click)="goToDashboard()">Go to Dashboard</button>
            <button class="btn-ghost" routerLink="/">Return Home</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Manrope:wght@500;600;700;800&display=swap');

    :host {
      --primary: #3b82f6;
      --primary-glow: rgba(59, 130, 246, 0.4);
      --bg: #020410;
      --text-main: #ffffff;
      --text-muted: #94a3b8;
      --card-bg: #080c24;
      --glass: rgba(255, 255, 255, 0.03);
      --glass-border: rgba(255, 255, 255, 0.08);
      font-family: 'Manrope', sans-serif;
    }

    :host-context(.light-theme) {
      --bg: #f3f5f9;
      --text-main: #0f172a;
      --text-muted: #475569;
      --card-bg: #ffffff;
      --glass: rgba(0, 0, 0, 0.04);
      --glass-border: rgba(0, 0, 0, 0.1);
    }

    .booking-premium { min-height: 100vh; background: var(--bg); color: var(--text-main); padding-top: 5rem; transition: all 0.3s ease; }

    /* Header & Stepper */
    .booking-header {
      position: fixed; top: 0; left: 0; right: 0; height: 5rem;
      background: var(--bg); backdrop-filter: blur(20px);
      z-index: 1000; border-bottom: 1px solid var(--glass-border);
      display: flex; align-items: center;
    }
    .header-inner { max-width: 1400px; width: 100%; margin: 0 auto; padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; }
    .btn-close-minimal { width: 40px; height: 40px; border-radius: 50%; background: var(--glass); display: flex; align-items: center; justify-content: center; color: var(--text-main); text-decoration: none; transition: 0.2s; }
    .btn-close-minimal:hover { background: var(--glass-border); transform: rotate(90deg); }

    .stepper-wrap { display: flex; align-items: center; gap: 1rem; }
    .p-step { display: flex; align-items: center; gap: 0.75rem; color: var(--text-muted); opacity: 0.6; transition: 0.3s; }
    .p-step.active { color: var(--text-main); opacity: 1; }
    .p-step.done { color: #10b981; opacity: 1; }
    .p-step .num { width: 28px; height: 28px; border-radius: 50%; border: 1.5px solid currentColor; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; }
    .p-step .num .material-icons { font-size: 1rem; }
    .p-step label { font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; }
    .p-line { width: 40px; height: 2px; background: var(--glass-border); }
    .p-line.done { background: #10b981; }

    /* Layout */
    .booking-main-grid { max-width: 1200px; margin: 0 auto; padding: 4rem 2rem; display: grid; grid-template-columns: 1fr 360px; gap: 4rem; align-items: start; }

    /* Intro */
    .step-intro { margin-bottom: 3.5rem; }
    .step-intro h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 3rem; font-weight: 800; margin: 0 0 0.5rem; }
    .step-intro h1 span { color: var(--primary); }
    .step-intro p { color: var(--text-muted); font-size: 1.1rem; }
    .btn-back-link { background: transparent; border: none; color: var(--primary); font-weight: 800; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; padding: 0; margin-bottom: 1.5rem; }

    /* Service Menu */
    .service-menu { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 3rem; }
    .menu-item-premium {
      background: var(--glass); border: 1px solid var(--glass-border); border-radius: 1.5rem; padding: 1.75rem 2rem;
      display: flex; align-items: center; gap: 1.5rem; cursor: pointer; transition: 0.3s;
    }
    .menu-item-premium:hover { border-color: var(--primary); transform: translateX(8px); background: var(--glass); }
    .menu-item-premium.selected { border-color: var(--primary); background: rgba(59, 130, 246, 0.08); }

    .m-check { width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--text-muted); display: flex; align-items: center; justify-content: center; transition: 0.2s; }
    .menu-item-premium.selected .m-check { border-color: var(--primary); }
    .m-check .dot { width: 10px; height: 10px; border-radius: 50%; background: var(--primary); opacity: 0; transition: 0.2s; }
    .menu-item-premium.selected .m-check .dot { opacity: 1; }

    .m-content { flex: 1; }
    .m-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
    .m-top h3 { font-size: 1.25rem; font-weight: 800; margin: 0; color: var(--text-main); }
    .m-price { font-size: 1.25rem; font-weight: 800; color: var(--text-main); }
    .m-meta { display: flex; gap: 1.25rem; }
    .meta-tag { display: flex; align-items: center; gap: 0.4rem; color: var(--text-muted); font-size: 0.85rem; font-weight: 600; }
    .meta-tag .material-icons { font-size: 1rem; color: var(--primary); }

    /* Calendar Mini */
    .calendar-mini { background: var(--card-bg); border: 1px solid var(--glass-border); border-radius: 2rem; padding: 2rem; margin-bottom: 2.5rem; }
    .cal-nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .cal-nav h3 { margin: 0; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.25rem; }
    .nav-btns { display: flex; gap: 0.5rem; }
    .nav-btns button { width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--glass-border); background: transparent; color: var(--text-main); cursor: pointer; display: flex; align-items: center; justify-content: center; }

    .date-row-premium { display: flex; justify-content: space-between; }
    .d-node {
       width: 60px; height: 90px; border-radius: 1.25rem; display: flex; flex-direction: column; align-items: center; justify-content: center;
       cursor: pointer; transition: 0.3s; position: relative;
    }
    .d-node:hover { background: rgba(255,255,255,0.05); }
    .d-node.active { background: var(--primary); box-shadow: 0 10px 25px var(--primary-glow); }
    .d-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; margin-bottom: 0.5rem; opacity: 0.6; }
    .d-node.active .d-label { opacity: 1; }
    .d-num { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.4rem; font-weight: 800; }
    .d-dot { width: 4px; height: 4px; background: #10b981; border-radius: 50%; position: absolute; bottom: 8px; }

    /* Time Slots */
    .time-slots-premium h3 { font-size: 1rem; color: var(--text-main); margin-bottom: 1.5rem; }
    .ts-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 0.75rem; margin-bottom: 3rem; }
    .ts-btn {
      background: var(--glass); border: 1px solid var(--glass-border); border-radius: 1rem; padding: 1rem;
      color: var(--text-main); font-weight: 800; cursor: pointer; transition: 0.2s; font-size: 0.95rem;
    }
    .ts-btn:hover:not(:disabled) { border-color: var(--primary); color: var(--primary); }
    .ts-btn.active { background: var(--primary); border-color: var(--primary); box-shadow: 0 8px 20px var(--primary-glow); }
    .ts-btn:disabled { opacity: 0.3; cursor: not-allowed; text-decoration: line-through; filter: grayscale(1); }

    /* Review Card */
    .review-invoice-premium { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 2rem; padding: 2.5rem; margin-bottom: 2rem; }
    .invoice-section h4 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--primary); margin: 0 0 1.5rem; }
    .inv-row { display: flex; justify-content: space-between; margin-bottom: 1.25rem; }
    .inv-label { color: var(--text-muted); font-weight: 700; }
    .inv-val { color: var(--text-main); font-weight: 800; }
    .inv-divider { height: 1px; background: var(--glass-border); margin: 2rem 0; }
    .inv-row.total { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; align-items: flex-end; }
    .final-price { color: #10b981; font-size: 2rem; }
    .pay-hint { font-size: 0.85rem; color: var(--text-muted); margin-top: 1.5rem; font-weight: 600; }

    .policy-blurb { display: flex; gap: 1rem; align-items: flex-start; background: rgba(99, 102, 241, 0.05); padding: 1.25rem; border-radius: 1.5rem; border: 1px solid rgba(99, 102, 241, 0.1); margin-bottom: 3rem; }
    .policy-blurb .material-icons { color: #6366f1; }
    .policy-blurb p { font-size: 0.85rem; color: var(--text-muted); margin: 0; line-height: 1.5; font-weight: 600; }

    /* Sidebar */
    .booking-summary-sidebar { display: flex; flex-direction: column; gap: 2rem; }
    .provider-pill-premium { background: var(--card-bg); border: 1px solid var(--glass-border); border-radius: 2rem; padding: 1.5rem; display: flex; gap: 1.25rem; align-items: center; }
    .provider-img { width: 70px; height: 70px; border-radius: 1.5rem; background-size: cover; background-position: center; border: 1px solid var(--glass-border); }
    .provider-details h4 { margin: 0 0 0.4rem; font-size: 1.1rem; }
    .badge { background: rgba(59,130,246,0.1); color: var(--primary); font-size: 0.65rem; font-weight: 900; text-transform: uppercase; padding: 0.3rem 0.6rem; border-radius: 0.5rem; }
    .p-rating { margin-top: 0.5rem; display: flex; align-items: center; gap: 4px; font-size: 0.85rem; font-weight: 700; color: #f59e0b; }
    .p-rating strong { color: var(--text-muted); font-weight: 500; font-size: 0.75rem; }

    .summary-card-glass { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 2rem; padding: 2rem; }
    .summary-card-glass h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; margin-bottom: 1.5rem; }
    .s-line { display: flex; justify-content: space-between; font-weight: 800; font-size: 1rem; margin-bottom: 1rem; }
    .s-line.small { font-size: 0.85rem; color: var(--text-muted); font-weight: 600; flex-direction: column; gap: 0.5rem; padding-top: 1rem; border-top: 1px solid var(--glass-border); }
    .s-line .material-icons { font-size: 1rem; vertical-align: middle; margin-right: 0.4rem; color: var(--primary); }

    .help-box { background: rgba(59,130,246,0.05); padding: 1.5rem; border-radius: 2rem; border: 1px dashed var(--primary); }
    .help-box h5 { font-size: 0.9rem; margin: 0 0 0.5rem; }
    .help-box p { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem; line-height: 1.5; font-weight: 600; }
    .help-box a { color: var(--primary); font-size: 0.8rem; font-weight: 800; text-decoration: none; }

    /* Buttons */
    .btn-prime-glow-lg {
      width: 100%; height: 4.5rem; background: var(--primary); color: #fff; border: none; border-radius: 1.5rem;
      font-size: 1.2rem; font-weight: 800; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 1rem;
    }
    .btn-prime-glow-lg:hover:not(:disabled) { transform: translateY(-4px); box-shadow: 0 15px 40px var(--primary-glow); }
    .btn-prime-glow-lg:disabled { opacity: 0.4; cursor: not-allowed; }

    .btn-confirm-booking-glow {
      width: 100%; height: 5rem; background: linear-gradient(135deg, #10b981, #059669); color: #fff; border: none; border-radius: 1.5rem;
      font-size: 1.4rem; font-weight: 800; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 1.5rem;
    }
    .btn-confirm-booking-glow:hover { transform: translateY(-4px); box-shadow: 0 20px 50px rgba(16, 185, 129, 0.4); }

    /* Success Overlay */
    .success-booking-overlay {
      position: fixed; inset: 0; background: var(--bg); z-index: 2000;
      display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);
    }
    .success-card {
      background: var(--glass); border: 1px solid var(--glass-border); border-radius: 3rem; padding: 4rem;
      width: 100%; max-width: 500px; text-align: center; transform: scale(0.9); animation: pop 0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards;
    }
    @keyframes pop { to { transform: scale(1); } }
    .icon-pulse {
      width: 80px; height: 80px; background: rgba(16, 185, 129, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center;
      margin: 0 auto 2.5rem; color: #10b981; border: 2px solid #10b981;
    }
    .icon-pulse .material-icons { font-size: 3.5rem; }
    .success-card h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; }
    .success-card h2 span { color: #10b981; }
    .success-card p { color: var(--text-muted); font-size: 1.1rem; margin-bottom: 2.5rem; line-height: 1.6; }
    .booking-ref { background: var(--glass); padding: 0.75rem 2rem; border-radius: 3rem; display: inline-block; font-weight: 800; font-family: 'Plus Jakarta Sans', sans-serif; color: var(--primary); border: 1px solid var(--glass-border); margin-bottom: 3rem; }
    .success-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .btn-prime { background: var(--primary); color: #fff; border: none; padding: 1.25rem; border-radius: 1.25rem; font-weight: 800; cursor: pointer; }
    .btn-ghost { background: transparent; border: 1.5px solid var(--glass-border); color: var(--text-main); padding: 1.25rem; border-radius: 1.25rem; font-weight: 800; cursor: pointer; }

    @media (max-width: 1000px) {
      .booking-main-grid { grid-template-columns: 1fr; gap: 3rem; }
      .booking-summary-sidebar { order: -1; }
      .step-intro h1 { font-size: 2.25rem; }
    }
  `]
})
export class ServiceBookingComponent implements OnInit {
  step = 1;
  selectedServiceId: number | null = null;
  selectedDate = 'Mar 25';
  selectedTime = '';
  bookingConfirmed = false;
  orderId = Math.floor(100000 + Math.random() * 900000);

  service = {
    name: 'Urban Fade Barbershop', 
    category: 'Salon & Grooming', 
    provider: 'Marcus Johnson',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&q=80'
  };

  serviceOptions = [
    { id: 1, name: 'Standard Service', duration: '30 min', price: '₹450', level: 'Junior' },
    { id: 2, name: 'Premium Service', duration: '45 min', price: '₹650', level: 'Senior' },
    { id: 3, name: 'Exclusive Package', duration: '1 hour', price: '₹1,200', level: 'Master' }
  ];

  dates: any[] = [];

  timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];
  shopId: string | null = null;
  selectedDateObj: Date = new Date();
  
  constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService, private authService: AuthService) {}

  ngOnInit() {
    this.shopId = this.route.snapshot.paramMap.get('id');
    this.generateDates();
    if (this.shopId) {
      this.apiService.getShopById(this.shopId).subscribe({
        next: (shop) => {
          if (shop) {
            this.service = {
              name: shop.name,
              category: shop.categoryName || 'Local Business',
              provider: shop.ownerName || 'Verified Partner',
              image: (shop as any).imageUrl || 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&q=80'
            };
            if (shop.categoryName === 'Bakery') {
              this.serviceOptions = [
                { id: 1, name: 'Custom Cake Consultation', duration: '15 min', price: 'Free', level: 'Standard' },
                { id: 2, name: 'Bulk Order Pickup', duration: '10 min', price: 'Varied', level: 'Express' }
              ];
            }
          }
        }
      });
    }
  }

  generateDates() {
    const today = new Date();
    this.dates = [];
    for(let i=0; i<7; i++) {
       const d = new Date(today);
       d.setDate(today.getDate() + i);
       this.dates.push({
          day: d.toLocaleDateString('en-US', { weekday: 'short' }),
          num: d.getDate().toString(),
          val: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          fullDate: d,
          available: true
       });
    }
    this.selectedDate = this.dates[0].val;
    this.selectedDateObj = this.dates[0].fullDate;
  }

  onDateSelect(d: any) {
    this.selectedDate = d.val;
    this.selectedDateObj = d.fullDate;
    this.selectedTime = ''; // reset time on date change
  }

  isPastTime(slot: string): boolean {
    const today = new Date();
    if (this.selectedDateObj.toDateString() !== today.toDateString()) return false;
    
    // Parse slot "9:00 AM"
    const match = slot.match(/(\d+):(\d+)\s(AM|PM)/);
    if (!match) return false;
    
    let hr = parseInt(match[1]);
    const min = parseInt(match[2]);
    const mod = match[3];
    if (mod === 'PM' && hr !== 12) hr += 12;
    if (mod === 'AM' && hr === 12) hr = 0;
    
    const slotDate = new Date(today);
    slotDate.setHours(hr, min, 0, 0);
    return slotDate < today;
  }

  getCurrentMonthYear() {
    return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  nextStep() { if (this.step < 3) this.step++; }
  prevStep() { if (this.step > 1) this.step--; }

  getSelectedName(): string {
    return this.serviceOptions.find(o => o.id === this.selectedServiceId)?.name || '';
  }
  getSelectedPrice(): string {
    return this.serviceOptions.find(o => o.id === this.selectedServiceId)?.price || '';
  }
  getSelectedDuration(): string {
    return this.serviceOptions.find(o => o.id === this.selectedServiceId)?.duration || '';
  }

  confirmBooking() {
    const user = this.authService.currentUser;
    if (!user || !this.shopId || !this.selectedServiceId || !this.selectedTime) return;

    // Correctly combine Date and Time for Jackson LocalDateTime format
    const [hrStr, minStr, mod] = this.selectedTime.match(/(\d+):(\d+)\s(AM|PM)/)!.slice(1);
    let hr = parseInt(hrStr);
    if (mod === 'PM' && hr !== 12) hr += 12;
    if (mod === 'AM' && hr === 12) hr = 0;

    const bookingDate = new Date(this.selectedDateObj);
    bookingDate.setHours(hr, parseInt(minStr), 0, 0);

    // Backend expects LocalDateTime. Simple way is ISO string but ensure it doesn't have offset issues?
    // Actually, Jackson handles '2023-10-27T10:00:00' format well.
    const isoStr = bookingDate.getFullYear() + '-' + 
                   (bookingDate.getMonth()+1).toString().padStart(2, '0') + '-' + 
                   bookingDate.getDate().toString().padStart(2, '0') + 'T' + 
                   bookingDate.getHours().toString().padStart(2, '0') + ':' + 
                   bookingDate.getMinutes().toString().padStart(2, '0') + ':00';

    const appointment: Partial<AppointmentDto> = {
      userId: user.id,
      shopId: this.shopId,
      appointmentTime: isoStr as any,
      serviceType: this.getSelectedName(),
      notes: "Booked via shop detail page"
    };

    this.apiService.createAppointment(appointment).subscribe({
      next: (res) => {
        this.bookingConfirmed = true;
      },
      error: (err) => {
        console.error('Booking failed', err);
        alert('Failed to confirm booking. Please try again.');
      }
    });
  }

  goToDashboard() {
    this.router.navigate([this.authService.getHomeDashboardRoute()]);
  }
}

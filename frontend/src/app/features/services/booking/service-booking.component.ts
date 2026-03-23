import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-booking',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="booking-page">
      <div class="booking-hero" [style.backgroundImage]="'url(' + service.image + ')'">
        <div class="hero-overlay">
          <a routerLink="/services" class="back-link"><span class="material-icons">arrow_back</span> Back</a>
          <div class="hero-info">
            <span class="badge-category">{{service.category}}</span>
            <h1>{{service.name}}</h1>
            <p class="provider">by {{service.provider}}</p>
          </div>
        </div>
      </div>

      <div class="booking-content">
        <div class="booking-main">
          <!-- Service Options -->
          <section class="booking-section">
            <h2>Select Service</h2>
            <div class="service-options">
              <label class="service-option" *ngFor="let opt of serviceOptions" [class.selected]="selectedService === opt.id">
                <input type="radio" name="service" [value]="opt.id" [checked]="selectedService === opt.id" (change)="selectedService = opt.id" hidden>
                <div class="option-info">
                  <h4>{{opt.name}}</h4>
                  <p>{{opt.duration}}</p>
                </div>
                <span class="option-price">{{opt.price}}</span>
              </label>
            </div>
          </section>

          <!-- Date & Time -->
          <section class="booking-section">
            <h2>Choose Date & Time</h2>
            <div class="date-grid">
              <button class="date-chip" *ngFor="let d of dates" [class.active]="selectedDate === d.val" (click)="selectedDate = d.val">
                <span class="day-name">{{d.day}}</span>
                <span class="day-num">{{d.num}}</span>
              </button>
            </div>
            <div class="time-grid">
              <button class="time-chip" *ngFor="let t of timeSlots" [class.active]="selectedTime === t" [class.disabled]="t === '11:00 AM'" (click)="t !== '11:00 AM' && (selectedTime = t)">
                {{t}}
              </button>
            </div>
          </section>

          <!-- Notes -->
          <section class="booking-section">
            <h2>Special Requests</h2>
            <textarea class="notes-input" placeholder="Any special requests or notes for the provider..." rows="3"></textarea>
          </section>
        </div>

        <!-- Sidebar Summary -->
        <aside class="booking-sidebar">
          <div class="summary-card">
            <h3>Booking Summary</h3>
            <div class="summary-row">
              <span>Service</span>
              <span class="summary-val">{{getSelectedName()}}</span>
            </div>
            <div class="summary-row">
              <span>Date</span>
              <span class="summary-val">{{selectedDate || 'Not selected'}}</span>
            </div>
            <div class="summary-row">
              <span>Time</span>
              <span class="summary-val">{{selectedTime || 'Not selected'}}</span>
            </div>
            <div class="summary-divider"></div>
            <div class="summary-row total">
              <span>Total</span>
              <span class="summary-val">{{getSelectedPrice()}}</span>
            </div>
            <button class="btn-glow full-width" [disabled]="!selectedDate || !selectedTime">Confirm Booking</button>
            <p class="cancel-note">Free cancellation up to 24 hours before</p>
          </div>
        </aside>
      </div>
    </div>
  `,
  styles: [`
    .booking-page { background: #05092f; min-height: 100vh; }

    .booking-hero { height: 300px; background-size: cover; background-position: center; position: relative; }
    .hero-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(5,9,47,0.3) 0%, rgba(5,9,47,0.95) 100%);
      padding: 2rem; display: flex; flex-direction: column; justify-content: space-between;
    }
    .back-link {
      display: inline-flex; align-items: center; gap: 0.5rem;
      color: #e2e3ff; text-decoration: none; font-size: 0.875rem; font-weight: 600;
      background: rgba(255,255,255,0.1); backdrop-filter: blur(8px);
      padding: 0.5rem 1rem; border-radius: 2rem; width: fit-content;
    }
    .badge-category { display: inline-block; background: rgba(94,180,255,0.15); color: #5eb4ff; padding: 0.3rem 0.75rem; border-radius: 2rem; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.75rem; }
    .hero-info h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 800; color: #e2e3ff; margin-bottom: 0.25rem; }
    .provider { color: #a3a8d5; font-size: 0.95rem; }

    .booking-content { max-width: 1100px; margin: 0 auto; padding: 2rem; display: flex; gap: 2rem; }
    .booking-main { flex: 1; }
    .booking-sidebar { width: 340px; flex-shrink: 0; }

    .booking-section { margin-bottom: 2.5rem; }
    .booking-section h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.3rem; font-weight: 700; color: #e2e3ff; margin-bottom: 1.25rem; }

    .service-options { display: flex; flex-direction: column; gap: 0.75rem; }
    .service-option {
      display: flex; justify-content: space-between; align-items: center;
      background: #080e38; padding: 1.25rem; border-radius: 0.75rem;
      cursor: pointer; border: 1px solid transparent; transition: all 0.2s;
    }
    .service-option:hover { border-color: #40456c; }
    .service-option.selected { border-color: #5eb4ff; background: rgba(94,180,255,0.05); }
    .option-info h4 { color: #e2e3ff; font-size: 1rem; margin-bottom: 0.2rem; }
    .option-info p { color: #6e739d; font-size: 0.8rem; }
    .option-price { color: #6bfe9c; font-weight: 800; font-size: 1.1rem; }

    .date-grid { display: flex; gap: 0.75rem; margin-bottom: 1.5rem; overflow-x: auto; padding-bottom: 0.5rem; }
    .date-chip {
      display: flex; flex-direction: column; align-items: center; gap: 0.25rem;
      background: #080e38; border: 1px solid transparent; padding: 0.85rem 1.1rem;
      border-radius: 0.75rem; cursor: pointer; min-width: 64px; transition: all 0.2s;
      color: #a3a8d5;
    }
    .date-chip:hover { border-color: #40456c; }
    .date-chip.active { background: rgba(94,180,255,0.1); border-color: #5eb4ff; color: #5eb4ff; }
    .day-name { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; }
    .day-num { font-size: 1.2rem; font-weight: 700; }

    .time-grid { display: flex; flex-wrap: wrap; gap: 0.75rem; }
    .time-chip {
      background: #080e38; border: 1px solid transparent; color: #a3a8d5;
      padding: 0.65rem 1.25rem; border-radius: 2rem; cursor: pointer;
      font-size: 0.85rem; font-weight: 600; transition: all 0.2s;
    }
    .time-chip:hover:not(.disabled) { border-color: #40456c; }
    .time-chip.active { background: rgba(94,180,255,0.1); border-color: #5eb4ff; color: #5eb4ff; }
    .time-chip.disabled { opacity: 0.3; cursor: not-allowed; text-decoration: line-through; }

    .notes-input {
      width: 100%; background: #080e38; border: 1px solid #40456c; color: #e2e3ff;
      padding: 1rem; border-radius: 0.75rem; font-family: 'Manrope', sans-serif;
      font-size: 0.875rem; resize: vertical; outline: none;
    }
    .notes-input:focus { border-color: #5eb4ff; }

    .summary-card {
      background: #080e38; border-radius: 1rem; padding: 2rem;
      position: sticky; top: 2rem;
    }
    .summary-card h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.2rem; font-weight: 700; color: #e2e3ff; margin-bottom: 1.5rem; }
    .summary-row { display: flex; justify-content: space-between; margin-bottom: 0.75rem; font-size: 0.875rem; }
    .summary-row span:first-child { color: #6e739d; }
    .summary-val { color: #e2e3ff; font-weight: 600; }
    .summary-row.total { font-size: 1.1rem; }
    .summary-row.total .summary-val { color: #6bfe9c; font-weight: 800; font-size: 1.25rem; }
    .summary-divider { height: 1px; background: #40456c; margin: 1rem 0; }

    .btn-glow {
      background: linear-gradient(135deg, #5eb4ff, #2aa7ff); border: none; color: #003151;
      font-weight: 700; padding: 0.85rem 2rem; border-radius: 2rem; cursor: pointer;
      font-family: 'Manrope', sans-serif; font-size: 0.95rem; transition: all 0.2s;
    }
    .btn-glow:hover:not(:disabled) { box-shadow: 0 6px 20px rgba(94,180,255,0.4); transform: translateY(-2px); }
    .btn-glow:disabled { opacity: 0.4; cursor: not-allowed; }
    .full-width { width: 100%; margin-top: 1.5rem; }
    .cancel-note { text-align: center; font-size: 0.75rem; color: #6e739d; margin-top: 0.75rem; }

    @media (max-width: 768px) {
      .booking-content { flex-direction: column; }
      .booking-sidebar { width: 100%; }
      .date-grid { flex-wrap: nowrap; }
    }
  `]
})
export class ServiceBookingComponent implements OnInit {
  selectedService = 1;
  selectedDate = '';
  selectedTime = '';

  service = {
    name: 'Urban Fade Barbershop', category: 'Salon & Grooming', provider: 'Marcus Johnson',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&q=80'
  };

  serviceOptions = [
    { id: 1, name: 'Classic Haircut', duration: '30 min', price: '$25' },
    { id: 2, name: 'Haircut & Beard Trim', duration: '45 min', price: '$40' },
    { id: 3, name: 'Premium Grooming Package', duration: '1 hour', price: '$65' },
    { id: 4, name: 'Hot Towel Shave', duration: '25 min', price: '$20' }
  ];

  dates = [
    { day: 'Mon', num: '24', val: 'Mar 24' },
    { day: 'Tue', num: '25', val: 'Mar 25' },
    { day: 'Wed', num: '26', val: 'Mar 26' },
    { day: 'Thu', num: '27', val: 'Mar 27' },
    { day: 'Fri', num: '28', val: 'Mar 28' },
    { day: 'Sat', num: '29', val: 'Mar 29' },
    { day: 'Sun', num: '30', val: 'Mar 30' }
  ];

  timeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'];

  constructor(private route: ActivatedRoute) {}
  ngOnInit() {}

  getSelectedName(): string {
    return this.serviceOptions.find(o => o.id === this.selectedService)?.name || '';
  }
  getSelectedPrice(): string {
    return this.serviceOptions.find(o => o.id === this.selectedService)?.price || '';
  }
}

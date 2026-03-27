import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../../core/cart.service';
import { AuthService } from '../../../core/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="checkout-page">
      <!-- Checkout Stepper -->
      <nav class="checkout-stepper">
        <div class="stepper-inner">
          <div class="step done">
            <span class="s-icon"><span class="material-icons">check</span></span>
            <span class="s-label">Cart</span>
          </div>
          <div class="step-connector done"></div>
          <div class="step active">
            <span class="s-icon">2</span>
            <span class="s-label">Shipping</span>
          </div>
          <div class="step-connector"></div>
          <div class="step">
            <span class="s-icon">3</span>
            <span class="s-label">Payment</span>
          </div>
        </div>
      </nav>

      <div class="checkout-main-container">
        <header class="checkout-hero">
          <h1>Delivery <span>Details</span></h1>
          <p>Where should we send your local finds?</p>
        </header>

        <div class="checkout-grid">
          <!-- Form Column -->
          <div class="form-col">
            <section class="checkout-section-premium">
                <div class="section-head">
                  <span class="material-icons">location_on</span>
                  <h2>Shipping Address</h2>
                  <button type="button" class="btn-gps" (click)="useGPS()">
                    <span class="material-icons">my_location</span>
                    <span>Use GPS</span>
                  </button>
                </div>

              <form (submit)="onSubmit($event)" class="premium-checkout-form">
                <div class="f-row">
                  <div class="f-group">
                    <label>First Name</label>
                    <input type="text" [(ngModel)]="form.firstName" name="firstName" placeholder="e.g. Rahul" required>
                  </div>
                  <div class="f-group">
                    <label>Last Name</label>
                    <input type="text" [(ngModel)]="form.lastName" name="lastName" placeholder="e.g. Sharma" required>
                  </div>
                </div>

                <div class="f-group">
                  <label>Contact Number</label>
                  <div class="input-with-icon">
                    <span class="prefix">+91</span>
                    <input type="tel" [(ngModel)]="form.phone" name="phone" placeholder="9876543210" required>
                  </div>
                </div>

                <div class="f-group">
                  <label>Street Address</label>
                  <input type="text" [(ngModel)]="form.address" name="address" placeholder="House No, Building, Street Name" required>
                </div>

                <div class="f-row">
                  <div class="f-group">
                    <label>City / Area</label>
                    <input type="text" [(ngModel)]="form.city" name="city" placeholder="Mumbai" required>
                  </div>
                  <div class="f-group">
                    <label>PIN Code</label>
                    <input type="text" [(ngModel)]="form.pin" name="pin" placeholder="400001" required>
                  </div>
                </div>

                <div class="delivery-methods">
                  <h3>Delivery Preference</h3>
                  <div class="method-grid">
                    <label class="method-card" [class.active]="selectedDelivery === 'standard'">
                      <input type="radio" name="delivery" value="standard" [(ngModel)]="selectedDelivery" hidden>
                      <span class="m-icon material-icons">local_shipping</span>
                      <div class="m-info">
                        <span class="m-title">Standard</span>
                        <span class="m-time">2-4 Days</span>
                      </div>
                      <span class="m-price free">FREE</span>
                    </label>

                    <label class="method-card" [class.active]="selectedDelivery === 'express'">
                      <input type="radio" name="delivery" value="express" [(ngModel)]="selectedDelivery" hidden>
                      <span class="m-icon material-icons">bolt</span>
                      <div class="m-info">
                        <span class="m-title">Express</span>
                        <span class="m-time">Tomorrow</span>
                      </div>
                      <span class="m-price">₹99</span>
                    </label>
                  </div>
                </div>

                <div class="form-actions-premium">
                  <a routerLink="/checkout/cart" class="btn-link">
                    <span class="material-icons">west</span>
                    Back to Cart
                  </a>
                  <button type="submit" class="btn-prime-glow">
                    Continue to Payment
                    <span class="material-icons">payments</span>
                  </button>
                </div>
              </form>
            </section>
          </div>

          <!-- Summary Sidebar -->
          <aside class="summary-col">
            <div class="summary-card-premium">
              <h3>Order Summary</h3>
              <div class="mini-item-list">
                <div class="mini-item" *ngFor="let item of cartService.items">
                  <div class="mi-thumb" [style.backgroundImage]="'url(' + item.image + ')'"></div>
                  <div class="mi-info">
                    <h4>{{item.name}}</h4>
                    <p>Qty: {{item.qty}} • ₹{{item.price * item.qty}}</p>
                  </div>
                </div>
              </div>

              <div class="mini-divider"></div>

              <div class="mini-calc">
                <div class="m-row"><span>Subtotal</span><span>₹{{subtotal}}</span></div>
                <div class="m-row"><span>Delivery</span><span class="free">FREE</span></div>
                <div class="m-row"><span>Est. Tax</span><span>₹{{tax}}</span></div>
              </div>

              <div class="mini-divider"></div>
              
              <div class="m-row total">
                <span>Total</span>
                <span>₹{{total}}</span>
              </div>
            </div>
            
            <div class="safety-badge">
              <span class="material-icons">verified_user</span>
              <p>Nikat Buyer Protection: Your data is encrypted and secure.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Manrope:wght@500;600;700;800&display=swap');

    :host {
      font-family: 'Manrope', sans-serif;
    }

    .checkout-page { min-height: 100vh; background: var(--bg); padding-top: 2rem; padding-bottom: 5rem; }

    /* Stepper (Shared) */
    .checkout-stepper { margin-bottom: 4rem; }
    .stepper-inner { display: flex; align-items: center; justify-content: center; gap: 1rem; }
    .step { display: flex; align-items: center; gap: 0.75rem; color: var(--text-muted); opacity: 0.6; }
    .step.active { color: var(--text-main); opacity: 1; }
    .step.done { color: #10b981; opacity: 1; }
    .s-icon { width: 32px; height: 32px; border-radius: 50%; border: 1.5px solid currentColor; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800; font-family: 'Plus Jakarta Sans', sans-serif; }
    .s-icon .material-icons { font-size: 1.1rem; }
    .s-label { font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
    .step-connector { width: 60px; height: 2px; background: var(--glass-border); position: relative; top: -1px; }
    .step-connector.done { background: #10b981; }

    .checkout-main-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

    .checkout-hero { margin-bottom: 3rem; }
    .checkout-hero h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 3rem; font-weight: 800; color: var(--text-main); margin: 0; }
    .checkout-hero h1 span { color: var(--primary); }
    .checkout-hero p { color: var(--text-muted); font-size: 1.1rem; margin-top: 0.5rem; }

    /* Grid */
    .checkout-grid { display: grid; grid-template-columns: 1fr 380px; gap: 3rem; align-items: start; }

    .checkout-section-premium { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 2rem; padding: 2.5rem; }
    .section-head { display: flex; align-items: center; gap: 1rem; margin-bottom: 2.5rem; color: var(--text-main); }
    .section-head .material-icons { color: var(--primary); font-size: 2rem; }
    .section-head h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; margin: 0; }

    .premium-checkout-form { display: flex; flex-direction: column; gap: 1.5rem; }
    .f-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .f-group label { display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.6rem; text-transform: uppercase; letter-spacing: 0.05em; }
    .f-group input {
       width: 100%; padding: 1.1rem 1.25rem; border-radius: 1.25rem;
       background: var(--surface-container-low); border: 1px solid var(--glass-border);
       color: var(--text-main); font-size: 1rem; transition: 0.2s; outline: none; box-sizing: border-box;
    }
    .f-group input:focus { border-color: var(--primary); background: var(--surface-container); }

    .input-with-icon { position: relative; display: flex; align-items: center; }
    .prefix { position: absolute; left: 1.25rem; color: var(--text-muted); font-weight: 800; font-size: 0.9rem; }
    .input-with-icon input { padding-left: 3.5rem; }

    /* Delivery Methods */
    .delivery-methods { margin-top: 1rem; }
    .delivery-methods h3 { font-size: 1rem; color: var(--text-main); margin-bottom: 1.25rem; }
    .method-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .method-card {
      background: var(--surface-container-low); border: 1px solid var(--glass-border);
      border-radius: 1.25rem; padding: 1.25rem; cursor: pointer; display: flex; align-items: center; gap: 1rem; transition: 0.2s;
    }
    .method-card:hover { border-color: var(--outline-variant); }
    .method-card.active { border-color: var(--primary); background: var(--accent-glow); }
    .m-icon { color: var(--text-muted); }
    .method-card.active .m-icon { color: var(--primary); }
    .m-info { flex: 1; display: flex; flex-direction: column; }
    .m-title { font-weight: 800; color: var(--text-main); font-size: 0.9rem; }
    .m-time { font-size: 0.75rem; color: var(--text-muted); }
    .m-price { font-weight: 800; color: var(--text-main); font-size: 0.9rem; }
    .m-price.free { color: #10b981; }

    .form-actions-premium { margin-top: 2rem; display: flex; align-items: center; justify-content: space-between; gap: 2rem; border-top: 1px solid var(--glass-border); pt: 2rem; padding-top: 2rem; }
    .btn-link { display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); text-decoration: none; font-weight: 700; font-size: 0.9rem; transition: 0.2s; }
    .btn-link:hover { color: var(--text-main); }
    .btn-prime-glow {
       background: var(--primary); color: #fff; border: none; padding: 1.25rem 2.5rem; border-radius: 1.25rem;
       font-weight: 800; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; gap: 0.75rem; transition: 0.3s;
    }
    .btn-prime-glow:hover { transform: translateY(-3px); box-shadow: 0 10px 30px var(--accent-glow); }

    /* Summary Sidebar */
    .summary-card-premium { background: var(--surface-container-low); border: 1px solid var(--glass-border); border-radius: 2rem; padding: 2rem; box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
    .summary-card-premium h3 { font-family: 'Plus Jakarta Sans', sans-serif; color: var(--text-main); font-size: 1.25rem; margin-bottom: 2rem; }
    
    .mini-item-list { display: flex; flex-direction: column; gap: 1.25rem; }
    .mini-item { display: flex; gap: 1rem; align-items: center; }
    .mi-thumb { width: 48px; height: 48px; border-radius: 0.75rem; background-size: cover; background-position: center; border: 1px solid var(--glass-border); }
    .mi-info h4 { font-size: 0.9rem; color: var(--text-main); margin: 0; }
    .mi-info p { font-size: 0.8rem; color: var(--text-muted); margin: 0; }
    
    .mini-divider { height: 1px; background: var(--glass-border); margin: 1.5rem 0; }
    
    .mini-calc { display: flex; flex-direction: column; gap: 1rem; }
    .m-row { display: flex; justify-content: space-between; font-size: 0.9rem; color: var(--text-muted); font-weight: 600; }
    .m-row .free { color: #10b981; font-weight: 800; }
    .m-row.total { font-size: 1.5rem; font-weight: 800; color: var(--text-main); font-family: 'Plus Jakarta Sans', sans-serif; }

    .safety-badge { margin-top: 2rem; display: flex; gap: 1rem; align-items: flex-start; background: rgba(16, 185, 129, 0.05); padding: 1.5rem; border-radius: 1.5rem; border: 1px solid rgba(16, 185, 129, 0.1); }
    .safety-badge .material-icons { color: #10b981; }
    .safety-badge p { font-size: 0.8rem; color: var(--text-muted); line-height: 1.5; margin: 0; font-weight: 600; }

    .btn-gps {
      margin-left: auto; background: var(--surface-container-high); color: var(--primary);
      border: 1px solid var(--glass-border); padding: 0.5rem 1rem; border-radius: 1rem;
      font-size: 0.8rem; font-weight: 800; display: flex; align-items: center; gap: 0.5rem;
      cursor: pointer; transition: 0.2s;
    }
    .btn-gps:hover { background: var(--primary); color: #fff; }
    .btn-gps .material-icons { font-size: 1.1rem; }

    @media (max-width: 1000px) {
      .checkout-grid { grid-template-columns: 1fr; }
      .summary-col { order: -1; }
      .f-row { grid-template-columns: 1fr; }
    }
  `]
})
export class ShippingComponent implements OnInit {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);
  protected cartService = inject(CartService);

  selectedDelivery = 'standard';
  form = { firstName: '', lastName: '', phone: '', address: '', city: '', pin: '' };
  isLocating = false;

  ngOnInit() {
    const user = this.authService.currentUser;
    if (user) {
      this.form.firstName = user.firstName || '';
      this.form.lastName = user.lastName || '';
      this.form.phone = user.phone || '';
    }
  }

  get subtotal() { 
    return this.cartService.items.reduce((s: number, i: CartItem) => s + i.price * i.qty, 0); 
  }
  
  get tax() { return Math.round(this.subtotal * 0.05); }
  get total() { return this.subtotal + this.tax; }

  useGPS() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    this.isLocating = true;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // Simple Reverse Geocoding via OSM Nominatim (Rate limited, for demo)
        this.http.get<any>(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
          .subscribe({
            next: (data) => {
              this.form.address = data.display_name || `Lat: ${latitude}, Lon: ${longitude}`;
              this.form.city = data.address.city || data.address.town || data.address.suburb || '';
              this.form.pin = data.address.postcode || '';
              this.isLocating = false;
            },
            error: () => {
              this.form.address = `Coordinates: ${latitude}, ${longitude}`;
              this.isLocating = false;
            }
          });
      },
      (err) => {
        console.error(err);
        alert('Could not get your location. Please type manually.');
        this.isLocating = false;
      }
    );
  }

  onSubmit(e: Event) { 
    e.preventDefault(); 
    this.cartService.setShippingInfo(this.form);
    this.router.navigate(['/checkout/payment']);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../../core/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="checkout-page">
      <!-- Checkout Stepper -->
      <nav class="checkout-stepper" *ngIf="!orderPlaced">
        <div class="stepper-inner">
          <div class="step done">
            <span class="s-icon"><span class="material-icons">check</span></span>
            <span class="s-label">Cart</span>
          </div>
          <div class="step-connector done"></div>
          <div class="step done">
            <span class="s-icon"><span class="material-icons">check</span></span>
            <span class="s-label">Shipping</span>
          </div>
          <div class="step-connector done"></div>
          <div class="step active">
            <span class="s-icon">3</span>
            <span class="s-label">Payment</span>
          </div>
        </div>
      </nav>

      <div class="checkout-main-container" *ngIf="!orderPlaced">
        <header class="checkout-hero">
          <h1>Final <span>Step</span></h1>
          <p>Securely complete your transaction.</p>
        </header>

        <div class="checkout-grid">
          <!-- Form Column -->
          <div class="form-col">
            <section class="checkout-section-premium">
              <div class="section-head">
                <span class="material-icons">account_balance_wallet</span>
                <h2>Selection</h2>
              </div>

              <!-- Payment Tabs -->
              <div class="payment-tabs-premium">
                <button [class.active]="selectedMethod === 'card'" (click)="selectedMethod = 'card'">
                  <span class="material-icons">credit_card</span>
                  Card
                </button>
                <button [class.active]="selectedMethod === 'upi'" (click)="selectedMethod = 'upi'">
                  <span class="material-icons">qr_code_2</span>
                  UPI
                </button>
                <button [class.active]="selectedMethod === 'cod'" (click)="selectedMethod = 'cod'">
                  <span class="material-icons">payments</span>
                  COD
                </button>
              </div>

              <div class="method-details-wrap">
                <!-- Card Section -->
                <div class="method-card-form" *ngIf="selectedMethod === 'card'">
                  <div class="f-group">
                    <label>Card Number</label>
                    <div class="card-input-box">
                      <input type="text" placeholder="#### #### #### ####" maxlength="19">
                      <div class="card-types">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard">
                      </div>
                    </div>
                  </div>
                  <div class="f-row">
                    <div class="f-group">
                      <label>Expiry Date</label>
                      <input type="text" placeholder="MM/YY" maxlength="5">
                    </div>
                    <div class="f-group">
                      <label>CVV / CVC</label>
                      <input type="password" placeholder="***" maxlength="3">
                    </div>
                  </div>
                  <div class="f-group">
                    <label>Cardholder Name</label>
                    <input type="text" placeholder="NAME ON CARD">
                  </div>
                </div>

                <!-- UPI Section -->
                <div class="method-upi-form" *ngIf="selectedMethod === 'upi'">
                  <div class="f-group">
                    <label>Your VPA / UPI ID</label>
                    <div class="vpa-input-box">
                      <input type="text" placeholder="username@bank">
                      <span class="material-icons">verified</span>
                    </div>
                    <p class="upi-hint">You will receive a payment request on your UPI app.</p>
                  </div>
                </div>

                <!-- COD Section -->
                <div class="method-cod-info" *ngIf="selectedMethod === 'cod'">
                  <div class="cod-inner">
                    <span class="material-icons">info_outline</span>
                    <div>
                      <h4>Cash on Delivery</h4>
                      <p>Pay when you receive your items. A nominal handling fee of <strong>₹20</strong> applies.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="secure-footer">
                <span class="material-icons">lock</span>
                <p>Nikat Gateway uses military-grade 256-bit encryption.</p>
              </div>

              <div class="form-actions-premium">
                <a routerLink="/checkout/shipping" class="btn-link">
                  <span class="material-icons">west</span>
                  Back to Delivery
                </a>
                <button class="btn-prime-glow" (click)="placeOrder()">
                  Securely Pay ₹{{total}}
                  <span class="material-icons">lock</span>
                </button>
              </div>
            </section>
          </div>

          <!-- Summary Sidebar (Same as Shipping for consistency) -->
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
                <div class="m-row" *ngIf="selectedMethod === 'cod'"><span>COD Fee</span><span>₹20</span></div>
              </div>
              <div class="mini-divider"></div>
              <div class="m-row total">
                <span>Total</span>
                <span>₹{{total}}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <!-- High-Fidelity Success State -->
      <div class="success-screen-premium" *ngIf="orderPlaced">
        <div class="success-card">
          <div class="confetti-orb">
             <div class="done-icon">
               <span class="material-icons">task_alt</span>
             </div>
          </div>
          <h1>Transaction <span>Confirmed</span></h1>
          <p>Your order <strong>#NKT-2024-{{orderId}}</strong> is being processed by the merchant.</p>
          
          <div class="success-details">
             <div class="sd-row">
               <span>Delivery Estimate</span>
               <strong>Tomorrow, 12:00 PM - 4:00 PM</strong>
             </div>
             <div class="sd-row">
               <span>Payment Via</span>
               <strong>{{selectedMethod | uppercase}}</strong>
             </div>
          </div>

          <div class="success-actions">
            <button class="btn-prime-glow" routerLink="/dashboard">
              Track Order
              <span class="material-icons">map</span>
            </button>
            <button class="btn-ghost-premium" (click)="goToReviews()">
              Rate Experience
              <span class="material-icons">star</span>
            </button>
            <button class="btn-ghost-premium" routerLink="/" style="grid-column: span 2">
              Return Home
            </button>
          </div>
        </div>
        
        <div class="success-bg-glow"></div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Manrope:wght@500;600;700;800&display=swap');

    :host {
      font-family: 'Manrope', sans-serif;
    }

    .checkout-page { min-height: 100vh; background: var(--bg); padding-top: 2rem; padding-bottom: 5rem; }

    /* Stepper */
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
    .section-head { display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem; color: var(--text-main); }
    .section-head .material-icons { color: var(--primary); font-size: 2rem; }
    .section-head h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; margin: 0; }

    /* Payment Tabs */
    .payment-tabs-premium { display: flex; gap: 0.75rem; background: var(--surface-container-low); padding: 0.4rem; border-radius: 1.25rem; margin-bottom: 2.5rem; border: 1px solid var(--glass-border); }
    .payment-tabs-premium button {
      flex: 1; padding: 1rem; border-radius: 0.85rem; border: none; background: transparent;
      color: var(--text-muted); font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.6rem; transition: 0.2s;
    }
    .payment-tabs-premium button.active { background: var(--primary); color: #fff; box-shadow: 0 4px 12px var(--accent-glow); }
    .payment-tabs-premium button .material-icons { font-size: 1.25rem; }

    .method-details-wrap { min-height: 200px; }
    .f-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .f-group { margin-bottom: 1.5rem; }
    .f-group label { display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.6rem; text-transform: uppercase; letter-spacing: 0.05em; }
    input {
       width: 100%; padding: 1.1rem 1.25rem; border-radius: 1.25rem;
       background: var(--surface-container-low); border: 1px solid var(--glass-border);
       color: var(--text-main); font-size: 1rem; transition: 0.2s; outline: none; box-sizing: border-box;
    }
    input:focus { border-color: var(--primary); }

    .card-input-box { position: relative; }
    .card-types { position: absolute; right: 1.25rem; top: 50%; transform: translateY(-50%); display: flex; gap: 0.5rem; }
    .card-types img { height: 20px; opacity: 0.7; }

    .vpa-input-box { position: relative; }
    .vpa-input-box .material-icons { position: absolute; right: 1.25rem; top: 50%; transform: translateY(-50%); color: #10b981; }
    .upi-hint { font-size: 0.85rem; color: var(--text-muted); margin-top: 0.75rem; font-weight: 600; }

    .cod-inner { background: var(--accent-glow); padding: 1.5rem; border-radius: 1.25rem; border: 1px dashed var(--primary); display: flex; gap: 1rem; }
    .cod-inner .material-icons { color: var(--primary); font-size: 2rem; }
    .cod-inner h4 { color: var(--text-main); margin: 0 0 0.4rem; }
    .cod-inner p { color: var(--text-muted); font-size: 0.9rem; margin: 0; line-height: 1.5; }

    .secure-footer { margin-top: 1rem; display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: rgba(16, 185, 129, 0.05); border-radius: 1rem; color: #10b981; }
    .secure-footer .material-icons { font-size: 1.25rem; }
    .secure-footer p { font-size: 0.8rem; font-weight: 700; margin: 0; }

    .form-actions-premium { margin-top: 2.5rem; display: flex; align-items: center; justify-content: space-between; gap: 2rem; border-top: 1px solid var(--glass-border); padding-top: 2.5rem; }
    .btn-link { display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); text-decoration: none; font-weight: 700; font-size: 0.9rem; }
    .btn-prime-glow {
       background: var(--primary); color: #fff; border: none; padding: 1.25rem 2.5rem; border-radius: 1.25rem;
       font-weight: 800; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; gap: 0.75rem; transition: 0.3s;
    }
    .btn-prime-glow:hover { transform: translateY(-3px); box-shadow: 0 10px 30px var(--accent-glow); }

    /* Summary Sidebar (Consistency) */
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

    /* Success Screen */
    .success-screen-premium {
      position: fixed; inset: 0; background: var(--bg); z-index: 1000;
      display: flex; align-items: center; justify-content: center; padding: 2rem;
    }
    .success-card {
      position: relative; z-index: 10; width: 100%; max-width: 560px; background: var(--glass);
      border: 1px solid var(--glass-border); border-radius: 3rem; padding: 4rem; text-align: center;
      backdrop-filter: blur(20px);
    }
    .confetti-orb {
      width: 100px; height: 100px; border-radius: 50%; background: var(--accent-glow);
      display: flex; align-items: center; justify-content: center; margin: 0 auto 2.5rem;
      border: 2px solid var(--primary); position: relative;
    }
    .done-icon { color: var(--primary); }
    .done-icon .material-icons { font-size: 4rem; }
    
    .success-card h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.75rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem; }
    .success-card h1 span { color: var(--primary); }
    .success-card p { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 3rem; }
    .success-card strong { color: var(--text-main); }

    .success-details {
      background: var(--surface-container-low); border-radius: 2rem; padding: 2rem;
      display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 3.5rem;
    }
    .sd-row { display: flex; justify-content: space-between; font-size: 0.95rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 1rem; }
    .sd-row:last-child { border-bottom: none; padding-bottom: 0; }
    .sd-row span { color: var(--text-muted); font-weight: 600; }
    .sd-row strong { color: var(--text-main); font-weight: 800; }

    .success-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    .btn-ghost-premium {
       background: transparent; border: 1.5px solid var(--glass-border); color: var(--text-main);
       padding: 1.25rem; border-radius: 1.25rem; font-weight: 800; cursor: pointer; transition: 0.2s;
    }
    .btn-ghost-premium:hover { background: var(--surface-container); border-color: var(--text-main); }

    .success-bg-glow {
      position: absolute; width: 800px; height: 800px; background: radial-gradient(circle, var(--accent-glow), transparent 70%);
      top: 50%; left: 50%; transform: translate(-50%, -50%); filter: blur(100px);
    }
  `]
})
export class PaymentComponent {
  selectedMethod = 'card';
  orderPlaced = false;
  orderId = '';
  shopIdToReview = '';
  shopNameToReview = '';

  constructor(
    private router: Router,
    protected cartService: CartService
  ) {}

  get subtotal() { 
    return this.cartService.items.reduce((s: number, i: CartItem) => s + i.price * i.qty, 0); 
  }
  
  get tax() { return Math.round(this.subtotal * 0.05); }
  
  get total() { 
    let t = this.subtotal + this.tax;
    if (this.selectedMethod === 'cod') t += 20;
    return t;
  }

  placeOrder() { 
    const shipping = this.cartService.shippingInfo;
    const addressStr = `${shipping.firstName} ${shipping.lastName}, ${shipping.address}, ${shipping.city} - ${shipping.pin}`;
    const phone = shipping.phone;

    // Capture first shop info for review suggestion
    if (this.cartService.items.length > 0) {
      this.shopIdToReview = this.cartService.items[0].shopId;
      this.shopNameToReview = this.cartService.items[0].shopName;
    }

    this.cartService.checkout(this.selectedMethod, addressStr, phone).subscribe({
      next: (results) => {
        if (results && results.length > 0) {
          this.orderId = results[0].id.substring(0, 8).toUpperCase();
        } else {
          this.orderId = Math.floor(1000 + Math.random() * 9000).toString();
        }
        this.orderPlaced = true;
      },
      error: (err) => {
        alert("Failed to place order. Please try again.");
        console.error(err);
      }
    });
  }

  goToReviews() {
    this.router.navigate(['/reviews'], { 
      queryParams: { 
        shopId: this.shopIdToReview, 
        shopName: this.shopNameToReview 
      } 
    });
  }
}

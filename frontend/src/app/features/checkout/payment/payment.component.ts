import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="checkout-page">
      <div class="checkout-container">
        <!-- Progress Steps -->
        <div class="checkout-steps">
          <div class="step done"><span class="step-num">1</span> Cart</div>
          <div class="step-line done"></div>
          <div class="step done"><span class="step-num">2</span> Shipping</div>
          <div class="step-line done"></div>
          <div class="step active"><span class="step-num">3</span> Payment</div>
        </div>

        <div class="checkout-layout" *ngIf="!orderPlaced">
          <div class="checkout-form">
            <h2>Payment Method</h2>

            <!-- Payment Options -->
            <div class="payment-options">
              <label class="payment-option" [class.selected]="selectedMethod === 'card'" (click)="selectedMethod = 'card'">
                <span class="material-icons">credit_card</span>
                <span>Credit / Debit Card</span>
              </label>
              <label class="payment-option" [class.selected]="selectedMethod === 'upi'" (click)="selectedMethod = 'upi'">
                <span class="material-icons">phone_android</span>
                <span>UPI</span>
              </label>
              <label class="payment-option" [class.selected]="selectedMethod === 'cod'" (click)="selectedMethod = 'cod'">
                <span class="material-icons">local_atm</span>
                <span>Cash on Delivery</span>
              </label>
            </div>

            <!-- Card Form -->
            <div class="card-form" *ngIf="selectedMethod === 'card'">
              <div class="form-group">
                <label>Card Number</label>
                <div class="card-input-wrapper">
                  <input type="text" placeholder="1234 5678 9012 3456" maxlength="19">
                  <span class="material-icons">lock</span>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" maxlength="5">
                </div>
                <div class="form-group">
                  <label>CVV</label>
                  <input type="text" placeholder="123" maxlength="3">
                </div>
              </div>
              <div class="form-group">
                <label>Cardholder Name</label>
                <input type="text" placeholder="John Doe">
              </div>
            </div>

            <!-- UPI Form -->
            <div class="upi-form" *ngIf="selectedMethod === 'upi'">
              <div class="form-group">
                <label>UPI ID</label>
                <input type="text" placeholder="yourname@upi">
              </div>
            </div>

            <!-- COD Info -->
            <div class="cod-info" *ngIf="selectedMethod === 'cod'">
              <div class="info-card">
                <span class="material-icons">info</span>
                <p>Pay with cash when your order is delivered. A small convenience fee of ₹20 will be added.</p>
              </div>
            </div>

            <div class="secure-badge">
              <span class="material-icons">verified_user</span>
              <span>256-bit SSL Encrypted · Secure Payment</span>
            </div>

            <div class="form-actions">
              <a routerLink="/checkout/shipping" class="btn-outline">Back</a>
              <button class="btn-glow" (click)="placeOrder()">
                <span class="material-icons">lock</span> Place Order · ₹1,181
              </button>
            </div>
          </div>

          <div class="order-sidebar">
            <h3>Order Summary</h3>
            <div class="mini-item"><span>Sourdough Loaf × 2</span><span>₹700</span></div>
            <div class="mini-item"><span>Cinnamon Rolls × 1</span><span>₹425</span></div>
            <div class="divider"></div>
            <div class="summary-row"><span>Subtotal</span><span>₹1,125</span></div>
            <div class="summary-row"><span>Delivery</span><span class="free">FREE</span></div>
            <div class="summary-row"><span>Tax</span><span>₹56</span></div>
            <div class="divider"></div>
            <div class="summary-row total"><span>Total</span><span>₹1,181</span></div>
          </div>
        </div>

        <!-- Success State -->
        <div class="success-state" *ngIf="orderPlaced">
          <div class="success-icon"><span class="material-icons">check_circle</span></div>
          <h1>Order Placed!</h1>
          <p>Thank you for your order. You'll receive a confirmation at your registered email.</p>
          <div class="order-number">Order #NKT-2024-{{orderId}}</div>
          <div class="success-actions">
            <a routerLink="/dashboard" class="btn-glow">View My Orders</a>
            <a routerLink="/" class="btn-outline">Continue Shopping</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .checkout-page { background: #05092f; min-height: 100vh; padding: 2rem; }
    .checkout-container { max-width: 1100px; margin: 0 auto; }

    .checkout-steps { display: flex; align-items: center; justify-content: center; gap: 0; margin-bottom: 3rem; }
    .step { display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 600; color: #40456c; }
    .step.active { color: #5eb4ff; }
    .step.done { color: #6bfe9c; }
    .step-num { width: 28px; height: 28px; border-radius: 50%; background: #0e1442; border: 2px solid #40456c; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; }
    .step.active .step-num { border-color: #5eb4ff; background: rgba(94,180,255,0.15); color: #5eb4ff; }
    .step.done .step-num { border-color: #6bfe9c; background: rgba(107,254,156,0.15); color: #6bfe9c; }
    .step-line { width: 60px; height: 2px; background: #40456c; margin: 0 0.5rem; }
    .step-line.done { background: #6bfe9c; }

    .checkout-layout { display: grid; grid-template-columns: 1fr 350px; gap: 2rem; align-items: start; }

    .checkout-form { background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; padding: 2rem; }
    .checkout-form h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; color: #e2e3ff; margin-bottom: 1.5rem; }

    .payment-options { display: flex; gap: 0.75rem; margin-bottom: 2rem; }
    .payment-option { display: flex; align-items: center; gap: 0.5rem; background: #0e1442; border: 1px solid #40456c; border-radius: 0.75rem; padding: 1rem 1.25rem; cursor: pointer; flex: 1; transition: all 0.2s; color: #a3a8d5; font-size: 0.85rem; font-weight: 600; }
    .payment-option:hover { border-color: #5eb4ff; }
    .payment-option.selected { border-color: #5eb4ff; background: rgba(94,180,255,0.05); color: #e2e3ff; }
    .payment-option .material-icons { font-size: 1.35rem; }
    .payment-option.selected .material-icons { color: #5eb4ff; }

    .form-group { margin-bottom: 1.25rem; }
    .form-group label { display: block; font-size: 0.8rem; font-weight: 600; color: #a3a8d5; margin-bottom: 0.4rem; }
    .form-group input { width: 100%; background: #0e1442; border: 1px solid #40456c; border-radius: 0.6rem; padding: 0.75rem 1rem; color: #e2e3ff; font-size: 0.9rem; outline: none; font-family: 'Manrope', sans-serif; box-sizing: border-box; }
    .form-group input:focus { border-color: #5eb4ff; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .card-input-wrapper { position: relative; }
    .card-input-wrapper input { padding-right: 2.5rem; }
    .card-input-wrapper .material-icons { position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); font-size: 1.1rem; color: #6bfe9c; }

    .info-card { display: flex; gap: 0.75rem; background: rgba(94,180,255,0.05); border: 1px solid rgba(94,180,255,0.15); border-radius: 0.75rem; padding: 1rem; }
    .info-card .material-icons { color: #5eb4ff; font-size: 1.25rem; flex-shrink: 0; }
    .info-card p { color: #a3a8d5; font-size: 0.85rem; line-height: 1.5; }

    .secure-badge { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: #6bfe9c; margin: 1.5rem 0; }
    .secure-badge .material-icons { font-size: 1rem; }

    .form-actions { display: flex; justify-content: space-between; gap: 1rem; }
    .btn-outline { padding: 0.75rem 1.5rem; border: 1px solid #40456c; background: transparent; border-radius: 2rem; color: #a3a8d5; font-weight: 600; text-decoration: none; font-size: 0.9rem; transition: all 0.2s; }
    .btn-outline:hover { border-color: #a3a8d5; color: #e2e3ff; }
    .btn-glow { display: flex; align-items: center; gap: 0.5rem; background: linear-gradient(135deg, #5eb4ff, #2aa7ff); border: none; color: #003151; font-weight: 700; padding: 0.75rem 2rem; border-radius: 2rem; cursor: pointer; font-size: 0.9rem; transition: all 0.2s; }
    .btn-glow:hover { box-shadow: 0 6px 20px rgba(94,180,255,0.4); }
    .btn-glow .material-icons { font-size: 1rem; }

    .order-sidebar { background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; padding: 1.5rem; position: sticky; top: 2rem; }
    .order-sidebar h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.15rem; color: #e2e3ff; margin-bottom: 1rem; }
    .mini-item { display: flex; justify-content: space-between; font-size: 0.85rem; color: #a3a8d5; margin-bottom: 0.5rem; }
    .divider { border-top: 1px solid rgba(255,255,255,0.05); margin: 1rem 0; }
    .summary-row { display: flex; justify-content: space-between; font-size: 0.85rem; color: #a3a8d5; margin-bottom: 0.5rem; }
    .summary-row .free { color: #6bfe9c; font-weight: 600; }
    .summary-row.total { font-size: 1.1rem; font-weight: 700; color: #e2e3ff; }

    .success-state { text-align: center; padding: 4rem 2rem; }
    .success-icon { width: 96px; height: 96px; border-radius: 50%; background: rgba(107,254,156,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; }
    .success-icon .material-icons { font-size: 3.5rem; color: #6bfe9c; }
    .success-state h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.25rem; color: #e2e3ff; margin-bottom: 0.75rem; }
    .success-state p { color: #a3a8d5; font-size: 1rem; max-width: 500px; margin: 0 auto 1.5rem; line-height: 1.6; }
    .order-number { background: rgba(94,180,255,0.1); color: #5eb4ff; display: inline-block; padding: 0.5rem 1.5rem; border-radius: 2rem; font-weight: 700; margin-bottom: 2rem; font-family: 'Plus Jakarta Sans', sans-serif; }
    .success-actions { display: flex; gap: 1rem; justify-content: center; }

    @media (max-width: 768px) {
      .checkout-layout { grid-template-columns: 1fr; }
      .payment-options { flex-direction: column; }
      .order-sidebar { position: static; }
      .form-actions { flex-direction: column; }
      .success-actions { flex-direction: column; align-items: center; }
    }
  `]
})
export class PaymentComponent {
  selectedMethod = 'card';
  orderPlaced = false;
  orderId = Math.floor(1000 + Math.random() * 9000);

  placeOrder() { this.orderPlaced = true; }
}

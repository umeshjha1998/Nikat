import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="checkout-page">
      <div class="checkout-container">
        <!-- Progress Steps -->
        <div class="checkout-steps">
          <div class="step done"><span class="step-num">1</span> Cart</div>
          <div class="step-line done"></div>
          <div class="step active"><span class="step-num">2</span> Shipping</div>
          <div class="step-line"></div>
          <div class="step"><span class="step-num">3</span> Payment</div>
        </div>

        <div class="checkout-layout">
          <div class="checkout-form">
            <h2>Shipping Information</h2>
            <form (submit)="onSubmit($event)">
              <div class="form-row">
                <div class="form-group">
                  <label>First Name</label>
                  <input type="text" [(ngModel)]="form.firstName" name="firstName" placeholder="John" required>
                </div>
                <div class="form-group">
                  <label>Last Name</label>
                  <input type="text" [(ngModel)]="form.lastName" name="lastName" placeholder="Doe" required>
                </div>
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <input type="tel" [(ngModel)]="form.phone" name="phone" placeholder="+91 9876543210" required>
              </div>
              <div class="form-group">
                <label>Address</label>
                <input type="text" [(ngModel)]="form.address" name="address" placeholder="123 Main Street, Apt 4B" required>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>City</label>
                  <input type="text" [(ngModel)]="form.city" name="city" placeholder="Mumbai" required>
                </div>
                <div class="form-group">
                  <label>PIN Code</label>
                  <input type="text" [(ngModel)]="form.pin" name="pin" placeholder="400001" required>
                </div>
              </div>

              <h3>Delivery Option</h3>
              <div class="delivery-options">
                <label class="delivery-option" [class.selected]="selectedDelivery === 'standard'">
                  <input type="radio" name="delivery" value="standard" [(ngModel)]="selectedDelivery" hidden>
                  <div class="option-content">
                    <span class="material-icons">local_shipping</span>
                    <div>
                      <h4>Standard Delivery</h4>
                      <p>3-5 business days</p>
                    </div>
                    <span class="delivery-price free">FREE</span>
                  </div>
                </label>
                <label class="delivery-option" [class.selected]="selectedDelivery === 'express'">
                  <input type="radio" name="delivery" value="express" [(ngModel)]="selectedDelivery" hidden>
                  <div class="option-content">
                    <span class="material-icons">bolt</span>
                    <div>
                      <h4>Express Delivery</h4>
                      <p>1-2 business days</p>
                    </div>
                    <span class="delivery-price">₹99</span>
                  </div>
                </label>
              </div>

              <div class="form-actions">
                <a routerLink="/checkout/cart" class="btn-outline">Back to Cart</a>
                <button type="submit" class="btn-glow">Continue to Payment</button>
              </div>
            </form>
          </div>

          <div class="order-sidebar">
            <h3>Order Summary</h3>
            <div class="order-items">
              <div class="mini-item">
                <span>Sourdough Loaf × 2</span><span>₹700</span>
              </div>
              <div class="mini-item">
                <span>Cinnamon Rolls × 1</span><span>₹425</span>
              </div>
            </div>
            <div class="divider"></div>
            <div class="summary-row"><span>Subtotal</span><span>₹1,125</span></div>
            <div class="summary-row"><span>Delivery</span><span class="free">FREE</span></div>
            <div class="summary-row"><span>Tax</span><span>₹56</span></div>
            <div class="divider"></div>
            <div class="summary-row total"><span>Total</span><span>₹1,181</span></div>
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
    .checkout-form h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.1rem; color: #e2e3ff; margin: 1.5rem 0 1rem; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .form-group { margin-bottom: 1.25rem; }
    .form-group label { display: block; font-size: 0.8rem; font-weight: 600; color: #a3a8d5; margin-bottom: 0.4rem; }
    .form-group input { width: 100%; background: #0e1442; border: 1px solid #40456c; border-radius: 0.6rem; padding: 0.75rem 1rem; color: #e2e3ff; font-size: 0.9rem; outline: none; font-family: 'Manrope', sans-serif; box-sizing: border-box; }
    .form-group input:focus { border-color: #5eb4ff; }

    .delivery-options { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; }
    .delivery-option { cursor: pointer; }
    .option-content { display: flex; align-items: center; gap: 1rem; background: #0e1442; border: 1px solid #40456c; border-radius: 0.75rem; padding: 1rem 1.25rem; transition: all 0.2s; }
    .delivery-option.selected .option-content { border-color: #5eb4ff; background: rgba(94,180,255,0.05); }
    .option-content .material-icons { font-size: 1.5rem; color: #6e739d; }
    .delivery-option.selected .option-content .material-icons { color: #5eb4ff; }
    .option-content h4 { font-size: 0.9rem; color: #e2e3ff; }
    .option-content p { font-size: 0.8rem; color: #6e739d; }
    .delivery-price { margin-left: auto; font-weight: 700; color: #e2e3ff; }
    .delivery-price.free { color: #6bfe9c; }

    .form-actions { display: flex; justify-content: space-between; gap: 1rem; }
    .btn-outline { padding: 0.75rem 1.5rem; border: 1px solid #40456c; background: transparent; border-radius: 2rem; color: #a3a8d5; font-weight: 600; text-decoration: none; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; }
    .btn-outline:hover { border-color: #a3a8d5; color: #e2e3ff; }
    .btn-glow { background: linear-gradient(135deg, #5eb4ff, #2aa7ff); border: none; color: #003151; font-weight: 700; padding: 0.75rem 2rem; border-radius: 2rem; cursor: pointer; font-size: 0.9rem; transition: all 0.2s; }
    .btn-glow:hover { box-shadow: 0 6px 20px rgba(94,180,255,0.4); }

    .order-sidebar { background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; padding: 1.5rem; position: sticky; top: 2rem; }
    .order-sidebar h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.15rem; color: #e2e3ff; margin-bottom: 1rem; }
    .mini-item { display: flex; justify-content: space-between; font-size: 0.85rem; color: #a3a8d5; margin-bottom: 0.5rem; }
    .divider { border-top: 1px solid rgba(255,255,255,0.05); margin: 1rem 0; }
    .summary-row { display: flex; justify-content: space-between; font-size: 0.85rem; color: #a3a8d5; margin-bottom: 0.5rem; }
    .summary-row .free { color: #6bfe9c; font-weight: 600; }
    .summary-row.total { font-size: 1.1rem; font-weight: 700; color: #e2e3ff; }

    @media (max-width: 768px) {
      .checkout-layout { grid-template-columns: 1fr; }
      .form-row { grid-template-columns: 1fr; }
      .order-sidebar { position: static; }
    }
  `]
})
export class ShippingComponent {
  selectedDelivery = 'standard';
  form = { firstName: '', lastName: '', phone: '', address: '', city: '', pin: '' };
  onSubmit(e: Event) { e.preventDefault(); }
}

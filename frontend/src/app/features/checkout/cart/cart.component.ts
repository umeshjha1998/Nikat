import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../../core/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="checkout-page">
      <!-- Checkout Stepper -->
      <nav class="checkout-stepper">
        <div class="stepper-inner">
          <div class="step active">
            <span class="s-icon">1</span>
            <span class="s-label">Cart</span>
          </div>
          <div class="step-connector"></div>
          <div class="step">
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

      <div class="cart-main-container">
        <header class="cart-hero">
          <div class="hero-left">
            <a routerLink="/browse" class="back-link-premium">
              <span class="material-icons">west</span>
              Keep Browsing
            </a>
            <h1>Bag <span>({{cartService.count}})</span></h1>
          </div>
          <div class="hero-right" *ngIf="cartService.items.length > 0">
             <button class="btn-ghost-danger" (click)="cartService.clearCart()">Clear All</button>
          </div>
        </header>

        <div class="cart-grid" *ngIf="cartService.items.length > 0; else emptyCart">
          <!-- Items Column -->
          <div class="items-col">
            <div class="cart-card-premium" *ngFor="let item of cartService.items; let i = index">
              <div class="i-img" [style.backgroundImage]="'url(' + item.image + ')'">
                <div class="i-tag" *ngIf="item.qty > 5">Hot 🔥</div>
              </div>
              <div class="i-info">
                <div class="i-head">
                  <div class="i-titles">
                    <h3>{{item.name}}</h3>
                    <p>Sold by <span>{{item.shopName}}</span></p>
                  </div>
                  <button class="i-remove" (click)="cartService.removeFromCart(i)">
                    <span class="material-icons">delete_outline</span>
                  </button>
                </div>
                
                <div class="i-foot">
                  <div class="i-pricing">
                    <span class="price-curr">₹{{item.price}}</span>
                    <span class="price-total">₹{{item.price * item.qty}}</span>
                  </div>
                  <div class="i-controls">
                    <button class="ctrl-btn" (click)="cartService.updateQty(i, item.qty - 1)">
                      <span class="material-icons">remove</span>
                    </button>
                    <span class="qty-val">{{item.qty}}</span>
                    <button class="ctrl-btn" (click)="cartService.updateQty(i, item.qty + 1)">
                      <span class="material-icons">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Summary Column -->
          <aside class="summary-col">
            <div class="summary-sticky">
              <div class="promo-box-premium">
                <label>Voucher / Promo Code</label>
                <div class="promo-input-group">
                  <input type="text" placeholder="NIKAT50">
                  <button>Apply</button>
                </div>
              </div>

              <div class="order-receipt-premium">
                <h2>Billing Summary</h2>
                <div class="receipt-row">
                  <span>Subtotal</span>
                  <span>₹{{subtotal}}</span>
                </div>
                <div class="receipt-row">
                  <span>Shipping Fee</span>
                  <span class="free">FREE</span>
                </div>
                <div class="receipt-row">
                  <span>GST (Tax)</span>
                  <span>₹{{tax}}</span>
                </div>
                <div class="receipt-row discount" *ngIf="discount > 0">
                  <span>Promotion</span>
                  <span>-₹{{discount}}</span>
                </div>
                <div class="receipt-divider"></div>
                <div class="receipt-row grand-total">
                  <span>Total Payable</span>
                  <span>₹{{total}}</span>
                </div>

                <a routerLink="/checkout/shipping" class="btn-checkout-prime">
                  Proceed to Shipping
                  <span class="material-icons">arrow_forward</span>
                </a>
                <p class="crypto-hint"><span class="material-icons">info</span> Secure checkout powered by Nikat Pay</p>
              </div>
            </div>
          </aside>
        </div>

        <ng-template #emptyCart>
          <div class="cart-empty-state-premium">
            <div class="e-orb">
              <span class="material-icons">shopping_bag</span>
            </div>
            <h2>Your bag is looking light</h2>
            <p>Explore the best local shops and services near you to fill it up.</p>
            <a routerLink="/browse" class="btn-prime-glow">
              Start Browsing
              <span class="material-icons">explore</span>
            </a>
          </div>
        </ng-template>
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
    .s-icon { width: 32px; height: 32px; border-radius: 50%; border: 1.5px solid currentColor; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800; font-family: 'Plus Jakarta Sans', sans-serif; }
    .s-label { font-size: 0.85rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
    .step-connector { width: 60px; height: 2px; background: var(--glass-border); position: relative; top: -1px; }

    .cart-main-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
    
    .cart-hero { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 3rem; border-bottom: 1px solid var(--glass-border); padding-bottom: 2rem; }
    .back-link-premium { display: flex; align-items: center; gap: 0.5rem; color: var(--primary); text-decoration: none; font-weight: 700; font-size: 0.9rem; margin-bottom: 1rem; }
    .cart-hero h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 3rem; font-weight: 800; color: var(--text-main); margin: 0; }
    .cart-hero h1 span { color: var(--text-muted); font-weight: 400; font-size: 1.5rem; margin-left: 0.5rem; }
    
    .btn-ghost-danger { background: transparent; border: 1px solid rgba(239, 68, 68, 0.2); color: #f87171; padding: 0.6rem 1.25rem; border-radius: 2rem; font-weight: 700; cursor: pointer; transition: 0.2s; }
    .btn-ghost-danger:hover { background: rgba(239, 68, 68, 0.1); border-color: #f87171; }

    /* Grid Layout */
    .cart-grid { display: grid; grid-template-columns: 1fr 400px; gap: 3rem; align-items: start; }
    
    .items-col { display: flex; flex-direction: column; gap: 1.5rem; }
    .cart-card-premium {
      display: flex; gap: 1.5rem; background: var(--glass); border: 1px solid var(--glass-border);
      border-radius: 1.5rem; padding: 1.5rem; transition: 0.3s;
    }
    .cart-card-premium:hover { border-color: var(--primary); transform: translateX(8px); background: var(--surface-container); }
    
    .i-img { width: 140px; height: 140px; border-radius: 1.25rem; background-size: cover; background-position: center; flex-shrink: 0; position: relative; }
    .i-tag { position: absolute; top: 0.75rem; left: 0.75rem; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); color: #fff; padding: 0.25rem 0.6rem; border-radius: 0.5rem; font-size: 0.65rem; font-weight: 800; }

    .i-info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
    .i-head { display: flex; justify-content: space-between; align-items: flex-start; }
    .i-titles h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.25rem; color: var(--text-main); margin: 0 0 0.25rem; }
    .i-titles p { font-size: 0.85rem; color: var(--text-muted); }
    .i-titles p span { color: var(--primary); font-weight: 700; }
    .i-remove { background: transparent; border: none; color: var(--text-muted); cursor: pointer; padding: 0.5rem; transition: 0.2s; }
    .i-remove:hover { color: #f87171; transform: scale(1.1); }

    .i-foot { display: flex; justify-content: space-between; align-items: flex-end; }
    .i-pricing { display: flex; flex-direction: column; }
    .price-curr { font-size: 0.85rem; color: var(--text-muted); text-decoration: line-through; display: none; }
    .price-total { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; color: var(--text-main); }
    
    .i-controls { display: flex; align-items: center; gap: 0.5rem; background: var(--glass); border-radius: 3rem; border: 1px solid var(--glass-border); padding: 0.25rem; }
    .ctrl-btn { width: 32px; height: 32px; border-radius: 50%; border: none; background: transparent; color: var(--text-main); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
    .ctrl-btn:hover { background: var(--surface-container); }
    .ctrl-btn .material-icons { font-size: 1.1rem; }
    .qty-val { min-width: 30px; text-align: center; font-weight: 800; color: var(--primary); font-size: 0.95rem; }

    /* Summary aside */
    .summary-sticky { position: sticky; top: 2rem; display: flex; flex-direction: column; gap: 1.5rem; }
    
    .promo-box-premium { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 1.5rem; padding: 1.5rem; }
    .promo-box-premium label { display: block; font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.75rem; }
    .promo-input-group { display: flex; gap: 0.5rem; }
    .promo-input-group input { flex: 1; background: var(--surface-container-low); border: 1px solid var(--glass-border); padding: 0.75rem 1rem; border-radius: 1rem; color: var(--text-main); font-size: 0.9rem; outline: none; transition: 0.2s; }
    .promo-input-group input:focus { border-color: var(--primary); }
    .promo-input-group button { background: var(--primary); border: none; color: #fff; padding: 0.75rem 1.25rem; border-radius: 1rem; font-weight: 700; cursor: pointer; }

    .order-receipt-premium { background: var(--surface-container-low); border: 1px solid var(--glass-border); border-radius: 1.5rem; padding: 2rem; box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
    .order-receipt-premium h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; color: var(--text-main); margin-bottom: 2rem; }
    .receipt-row { display: flex; justify-content: space-between; margin-bottom: 1.25rem; color: var(--text-muted); font-size: 0.95rem; font-weight: 600; }
    .receipt-row .free { color: #10b981; font-weight: 800; }
    .receipt-row.discount { color: #f87171; }
    .receipt-divider { height: 1px; background: var(--glass-border); margin: 1.5rem 0; }
    .grand-total { font-size: 1.5rem; font-weight: 800; color: var(--text-main); font-family: 'Plus Jakarta Sans', sans-serif; }
    
    .btn-checkout-prime { 
      background: var(--primary); color: #fff; border: none; padding: 1.25rem; border-radius: 1.25rem;
      font-weight: 800; font-size: 1.1rem; cursor: pointer; transition: 0.3s; width: 100%; text-decoration: none;
      display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-top: 1rem;
    }
    .btn-checkout-prime:hover { transform: translateY(-3px); box-shadow: 0 10px 40px var(--accent-glow); }
    .crypto-hint { margin-top: 1.5rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; color: var(--text-muted); font-size: 0.75rem; font-weight: 700; }
    .crypto-hint .material-icons { font-size: 0.9rem; }

    /* Empty state */
    .cart-empty-state-premium { text-align: center; padding: 6rem 2rem; }
    .e-orb { width: 120px; height: 120px; border-radius: 50%; background: var(--glass); border: 1px solid var(--glass-border); display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; color: var(--text-muted); }
    .e-orb .material-icons { font-size: 4rem; }
    .cart-empty-state-premium h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.25rem; color: var(--text-main); margin-bottom: 1rem; }
    .cart-empty-state-premium p { font-size: 1.1rem; color: var(--text-muted); max-width: 400px; margin: 0 auto 3rem; line-height: 1.6; }
    .btn-prime-glow {
       background: var(--primary); color: #fff; border: none; padding: 1.25rem 2.5rem; border-radius: 3rem;
       font-weight: 800; font-size: 1rem; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 0.75rem; transition: 0.3s;
    }
    .btn-prime-glow:hover { transform: translateY(-2px); box-shadow: 0 10px 30px var(--accent-glow); }

    @media (max-width: 1000px) {
      .cart-grid { grid-template-columns: 1fr; }
      .summary-sticky { position: static; }
      .cart-hero h1 { font-size: 2rem; }
      .i-img { width: 100px; height: 100px; }
    }
  `]
})
export class CartComponent {
  discount = 0;

  constructor(protected cartService: CartService) {}

  get subtotal() { 
    return this.cartService.items.reduce((s: number, i: CartItem) => s + i.price * i.qty, 0); 
  }
  
  get tax() { return Math.round(this.subtotal * 0.05); }
  get total() { return this.subtotal + this.tax - this.discount; }
}

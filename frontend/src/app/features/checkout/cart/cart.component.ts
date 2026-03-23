import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="cart-page">
      <div class="cart-container">
        <div class="cart-header">
          <a routerLink="/browse" class="back-link"><span class="material-icons">arrow_back</span> Continue Shopping</a>
          <h1>Your Cart <span class="item-count">({{cartItems.length}} items)</span></h1>
        </div>

        <div class="cart-layout">
          <!-- Cart Items -->
          <div class="cart-items">
            <div class="cart-item" *ngFor="let item of cartItems; let i = index">
              <div class="item-image" [style.backgroundImage]="'url(' + item.image + ')'"></div>
              <div class="item-details">
                <div class="item-top">
                  <div>
                    <h3>{{item.name}}</h3>
                    <p class="shop-name">from {{item.shopName}}</p>
                  </div>
                  <button class="remove-btn" (click)="removeItem(i)"><span class="material-icons">close</span></button>
                </div>
                <div class="item-bottom">
                  <div class="qty-control">
                    <button (click)="decrementQty(item)"><span class="material-icons">remove</span></button>
                    <span class="qty">{{item.qty}}</span>
                    <button (click)="item.qty = item.qty + 1"><span class="material-icons">add</span></button>
                  </div>
                  <span class="item-price">₹{{item.price * item.qty}}</span>
                </div>
              </div>
            </div>

            <div class="empty-cart" *ngIf="cartItems.length === 0">
              <span class="material-icons empty-icon">shopping_cart</span>
              <h2>Your cart is empty</h2>
              <p>Discover shops and services near you</p>
              <a routerLink="/browse" class="btn-glow">Start Browsing</a>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="order-summary" *ngIf="cartItems.length > 0">
            <h2>Order Summary</h2>
            <div class="summary-row"><span>Subtotal</span><span>₹{{subtotal}}</span></div>
            <div class="summary-row"><span>Delivery</span><span class="free">FREE</span></div>
            <div class="summary-row"><span>Service Tax (5%)</span><span>₹{{tax}}</span></div>
            <div class="divider"></div>
            <div class="summary-row total"><span>Total</span><span>₹{{total}}</span></div>
            <a routerLink="/checkout/shipping" class="btn-glow full-width">Proceed to Shipping</a>
            <div class="promo-row">
              <input type="text" placeholder="Promo code" class="promo-input">
              <button class="promo-btn">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-page { background: #05092f; min-height: 100vh; padding: 2rem; }
    .cart-container { max-width: 1100px; margin: 0 auto; }
    .back-link { display: inline-flex; align-items: center; gap: 0.5rem; color: #5eb4ff; text-decoration: none; font-size: 0.875rem; font-weight: 600; margin-bottom: 1.5rem; }
    .back-link .material-icons { font-size: 1rem; }
    .cart-header h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 700; color: #e2e3ff; margin-bottom: 2rem; }
    .item-count { font-size: 1rem; color: #6e739d; font-weight: 400; }

    .cart-layout { display: grid; grid-template-columns: 1fr 380px; gap: 2rem; align-items: start; }

    .cart-items { display: flex; flex-direction: column; gap: 1rem; }
    .cart-item { display: flex; gap: 1.25rem; background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; padding: 1.25rem; transition: all 0.2s; }
    .cart-item:hover { border-color: #40456c; }
    .item-image { width: 110px; height: 110px; border-radius: 0.75rem; background-size: cover; background-position: center; flex-shrink: 0; }
    .item-details { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
    .item-top { display: flex; justify-content: space-between; }
    .item-top h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.1rem; color: #e2e3ff; }
    .shop-name { font-size: 0.8rem; color: #6e739d; margin-top: 0.2rem; }
    .remove-btn { background: none; border: none; color: #6e739d; cursor: pointer; padding: 0.25rem; transition: color 0.2s; }
    .remove-btn:hover { color: #ff716c; }
    .remove-btn .material-icons { font-size: 1.1rem; }
    .item-bottom { display: flex; justify-content: space-between; align-items: center; }
    .qty-control { display: flex; align-items: center; gap: 0; background: #0e1442; border: 1px solid #40456c; border-radius: 0.5rem; overflow: hidden; }
    .qty-control button { background: none; border: none; color: #a3a8d5; cursor: pointer; padding: 0.4rem 0.6rem; display: flex; align-items: center; transition: background 0.2s; }
    .qty-control button:hover { background: rgba(255,255,255,0.05); }
    .qty-control .material-icons { font-size: 1rem; }
    .qty { min-width: 32px; text-align: center; font-weight: 700; color: #e2e3ff; font-size: 0.9rem; }
    .item-price { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.2rem; font-weight: 800; color: #6bfe9c; }

    .empty-cart { text-align: center; padding: 4rem 2rem; }
    .empty-icon { font-size: 4rem; color: #40456c; margin-bottom: 1rem; }
    .empty-cart h2 { font-family: 'Plus Jakarta Sans', sans-serif; color: #e2e3ff; margin-bottom: 0.5rem; }
    .empty-cart p { color: #6e739d; margin-bottom: 2rem; }

    .order-summary { background: #080e38; border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; padding: 1.5rem; position: sticky; top: 2rem; }
    .order-summary h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.25rem; color: #e2e3ff; margin-bottom: 1.25rem; }
    .summary-row { display: flex; justify-content: space-between; font-size: 0.9rem; color: #a3a8d5; margin-bottom: 0.75rem; }
    .summary-row .free { color: #6bfe9c; font-weight: 600; }
    .divider { border-top: 1px solid rgba(255,255,255,0.05); margin: 1rem 0; }
    .summary-row.total { font-size: 1.15rem; font-weight: 700; color: #e2e3ff; margin-bottom: 1.5rem; }
    .btn-glow { display: block; text-align: center; background: linear-gradient(135deg, #5eb4ff, #2aa7ff); border: none; color: #003151; font-weight: 700; padding: 0.85rem 2rem; border-radius: 2rem; cursor: pointer; font-size: 0.95rem; transition: all 0.2s; text-decoration: none; }
    .btn-glow:hover { box-shadow: 0 6px 20px rgba(94,180,255,0.4); }
    .full-width { width: 100%; }
    .promo-row { display: flex; gap: 0.5rem; margin-top: 1rem; }
    .promo-input { flex: 1; background: #0e1442; border: 1px solid #40456c; border-radius: 0.5rem; padding: 0.65rem 0.75rem; color: #e2e3ff; font-size: 0.85rem; outline: none; font-family: 'Manrope', sans-serif; }
    .promo-input:focus { border-color: #5eb4ff; }
    .promo-btn { background: transparent; border: 1px solid #5eb4ff; color: #5eb4ff; padding: 0.65rem 1rem; border-radius: 0.5rem; cursor: pointer; font-weight: 600; font-size: 0.85rem; transition: all 0.2s; }
    .promo-btn:hover { background: rgba(94,180,255,0.1); }

    @media (max-width: 768px) {
      .cart-layout { grid-template-columns: 1fr; }
      .order-summary { position: static; }
      .cart-item { flex-direction: column; }
      .item-image { width: 100%; height: 180px; }
    }
  `]
})
export class CartComponent {
  cartItems = [
    { name: 'Sourdough Loaf', shopName: 'The Golden Crust', price: 350, qty: 2, image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400&q=80' },
    { name: 'Cinnamon Rolls (4pc)', shopName: 'The Golden Crust', price: 425, qty: 1, image: 'https://images.unsplash.com/photo-1509365390695-33aee754301f?w=400&q=80' },
    { name: 'Premium Espresso Beans', shopName: 'Bean & Brew', price: 680, qty: 1, image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&q=80' }
  ];

  get subtotal() { return this.cartItems.reduce((s, i) => s + i.price * i.qty, 0); }
  get tax() { return Math.round(this.subtotal * 0.05); }
  get total() { return this.subtotal + this.tax; }

  removeItem(i: number) { this.cartItems.splice(i, 1); }
  decrementQty(item: any) { if (item.qty > 1) item.qty--; }
}

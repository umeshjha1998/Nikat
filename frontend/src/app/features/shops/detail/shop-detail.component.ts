import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-shop-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="shop-view-page">
      <!-- Top Bar -->
      <div class="top-bar">
        <a routerLink="/browse" class="btn-back">
          <span class="material-symbols-outlined">arrow_back</span>
          Back to Shops
        </a>
        <div class="top-actions">
          <button class="btn-icon-glass" (click)="isFavorited = !isFavorited">
            <span class="material-symbols-outlined" [class.filled]="isFavorited">{{isFavorited ? 'favorite' : 'favorite_border'}}</span>
          </button>
          <button class="btn-icon-glass">
            <span class="material-symbols-outlined">share</span>
          </button>
        </div>
      </div>

      <!-- Bento Gallery Grid -->
      <section class="bento-gallery">
        <div class="bento-main">
          <img [src]="shop.images[0]" [alt]="shop.name" class="bento-img">
          <div class="bento-overlay">
            <div class="verified-badge" *ngIf="shop.isOpen">
              <span class="material-symbols-outlined">verified</span>
              Verified Business
            </div>
          </div>
        </div>
        <div class="bento-side-top">
          <img [src]="shop.images[1]" alt="Product showcase" class="bento-img">
        </div>
        <div class="bento-side-bottom">
          <img [src]="shop.images[2]" alt="Ambiance" class="bento-img">
          <div class="bento-count" *ngIf="galleryImages.length > 3">
            <span class="material-symbols-outlined">photo_library</span>
            +{{galleryImages.length - 3}} More
          </div>
        </div>
      </section>

      <!-- Shop Info Header -->
      <section class="info-header">
        <div class="info-left">
          <div class="category-chip">
            <span class="chip-dot"></span>
            {{shop.category}}
          </div>
          <h1 class="shop-title">{{shop.name}}</h1>
          <p class="shop-tagline">{{shop.tagline}}</p>
          <div class="meta-row">
            <div class="meta-item rating-item">
              <span class="material-symbols-outlined star-filled">star</span>
              <strong>{{shop.rating}}</strong>
              <span class="meta-muted">({{shop.reviewCount}} reviews)</span>
            </div>
            <div class="meta-divider"></div>
            <div class="meta-item">
              <span class="material-symbols-outlined">location_on</span>
              {{shop.address}}
            </div>
            <div class="meta-divider"></div>
            <div class="meta-item">
              <span class="status-dot" [class.open]="shop.isOpen"></span>
              {{shop.isOpen ? 'Open Now' : 'Closed'}} · {{shop.hours}}
            </div>
          </div>
        </div>
      </section>

      <!-- Action Hub -->
      <section class="action-hub">
        <div class="action-cards">
          <div class="action-card primary-action" [routerLink]="['/book-service', shopId]">
            <span class="material-symbols-outlined action-icon">calendar_today</span>
            <div>
              <h4>Book Appointment</h4>
              <p>Reserve your slot instantly</p>
            </div>
          </div>
          <div class="action-card">
            <span class="material-symbols-outlined action-icon">call</span>
            <div>
              <h4>Call Shop</h4>
              <p>Speak to the owner directly</p>
            </div>
          </div>
          <div class="action-card">
            <span class="material-symbols-outlined action-icon">near_me</span>
            <div>
              <h4>Get Directions</h4>
              <p>Navigate via Google Maps</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Content Tabs -->
      <div class="content-wrapper">
        <nav class="tab-bar">
          <button [class.active]="activeTab === 'products'" (click)="activeTab = 'products'">Products</button>
          <button [class.active]="activeTab === 'about'" (click)="activeTab = 'about'">About</button>
          <button [class.active]="activeTab === 'reviews'" (click)="activeTab = 'reviews'">Reviews</button>
        </nav>

        <div class="tab-content">
          <!-- Products Tab -->
          <div *ngIf="activeTab === 'products'" class="products-panel">
            <div class="product-card" *ngFor="let p of products">
              <div class="product-image">
                <img [src]="p.image" [alt]="p.name">
                <div class="product-price-badge">{{p.price}}</div>
              </div>
              <div class="product-info">
                <h3 class="product-name">{{p.name}}</h3>
                <p class="product-desc">{{p.description}}</p>
                <div class="product-chips" *ngIf="p.chips">
                  <span class="glass-chip" *ngFor="let chip of p.chips">{{chip}}</span>
                </div>
                <div class="product-footer">
                  <span class="product-time" *ngIf="p.time">
                    <span class="material-symbols-outlined">schedule</span>
                    {{p.time}}
                  </span>
                  <button class="btn-add">
                    <span class="material-symbols-outlined">add</span>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- About Tab -->
          <div *ngIf="activeTab === 'about'" class="about-panel">
            <div class="about-card">
              <h3>Our Story</h3>
              <p>{{shop.description}}</p>
            </div>
            <div class="amenities-card">
              <h3>Amenities</h3>
              <div class="amenities-grid">
                <div class="amenity" *ngFor="let a of amenities">
                  <span class="material-symbols-outlined">{{a.icon}}</span>
                  <span>{{a.label}}</span>
                </div>
              </div>
            </div>
            <div class="hours-card">
              <h3>Business Hours</h3>
              <div class="hours-list">
                <div class="hours-row" *ngFor="let h of businessHours">
                  <span class="day">{{h.day}}</span>
                  <span class="time" [class.closed]="h.closed">{{h.closed ? 'Closed' : h.time}}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Reviews Tab -->
          <div *ngIf="activeTab === 'reviews'" class="reviews-panel">
            <div class="reviews-summary">
              <div class="score-big">{{shop.rating}}</div>
              <div class="stars-row">
                <span class="material-symbols-outlined star-filled" *ngFor="let s of getStars(shop.rating)">star</span>
              </div>
              <p class="score-label">Based on {{shop.reviewCount}} verified reviews</p>
            </div>
            <div class="review-list">
              <div class="review-node" *ngFor="let r of reviews">
                <div class="node-head">
                  <div class="node-avatar" [style.background]="r.color">{{r.initials}}</div>
                  <div class="node-meta">
                    <h5>{{r.name}}</h5>
                    <span>{{r.date}}</span>
                  </div>
                  <div class="node-rating">
                    <span class="material-symbols-outlined star-filled">star</span>
                    {{r.rating}}
                  </div>
                </div>
                <p class="node-body">{{r.comment}}</p>
                <div class="node-tags" *ngIf="r.tags">
                  <span class="tag" *ngFor="let t of r.tags">#{{t}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="page-footer">
        <div class="footer-inner">
          <div class="footer-brand">
            <span class="footer-logo">Nikat</span>
            <p class="footer-copy">© 2024 Nikat Digital. Local Discovery Redefined.</p>
          </div>
          <div class="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Partner with Us</a>
            <a href="#">Help Center</a>
            <a routerLink="/admin-login">Admin Login</a>
          </div>
          <div class="footer-social">
            <button class="social-btn"><span class="material-symbols-outlined">public</span></button>
            <button class="social-btn"><span class="material-symbols-outlined">share</span></button>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: 'Manrope', sans-serif; }

    .shop-view-page { min-height: 100vh; background: #05092f; color: #e2e3ff; padding-bottom: 4rem; }

    /* Top Bar */
    .top-bar {
      max-width: 80rem; margin: 0 auto;
      padding: 1rem 1.5rem;
      display: flex; justify-content: space-between; align-items: center;
    }
    .btn-back {
      display: flex; align-items: center; gap: 0.5rem;
      color: #a3a8d5; text-decoration: none;
      font-weight: 700; font-size: 0.875rem;
      transition: color 0.2s;
    }
    .btn-back:hover { color: #5eb4ff; }
    .top-actions { display: flex; gap: 0.75rem; }
    .btn-icon-glass {
      width: 44px; height: 44px; border-radius: 50%;
      background: rgba(24,32,86,0.6); backdrop-filter: blur(20px);
      border: none; color: #a3a8d5; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .btn-icon-glass:hover { color: #5eb4ff; background: rgba(24,32,86,0.8); }
    .btn-icon-glass .filled { color: #ff516c; font-variation-settings: 'FILL' 1; }

    /* Bento Gallery */
    .bento-gallery {
      max-width: 80rem; margin: 0 auto; padding: 0 1.5rem;
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 14rem 14rem;
      gap: 0.75rem;
      height: 29rem;
    }
    .bento-main { grid-row: 1 / 3; position: relative; border-radius: 1.5rem; overflow: hidden; }
    .bento-side-top { border-radius: 1.5rem; overflow: hidden; }
    .bento-side-bottom { position: relative; border-radius: 1.5rem; overflow: hidden; }
    .bento-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
    .bento-main:hover .bento-img,
    .bento-side-top:hover .bento-img,
    .bento-side-bottom:hover .bento-img { transform: scale(1.03); }

    .bento-overlay {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 1.5rem;
      background: linear-gradient(transparent, rgba(5,9,47,0.9));
    }
    .verified-badge {
      display: inline-flex; align-items: center; gap: 0.375rem;
      background: rgba(94,180,255,0.2); backdrop-filter: blur(12px);
      padding: 0.375rem 0.75rem; border-radius: 9999px;
      font-size: 0.75rem; font-weight: 700; color: #5eb4ff;
    }
    .bento-count {
      position: absolute; bottom: 1rem; right: 1rem;
      background: rgba(0,0,0,0.6); backdrop-filter: blur(12px);
      padding: 0.5rem 0.75rem; border-radius: 0.75rem;
      display: flex; align-items: center; gap: 0.375rem;
      font-size: 0.75rem; font-weight: 700; color: #e2e3ff;
    }

    /* Info Header */
    .info-header {
      max-width: 80rem; margin: 0 auto;
      padding: 2rem 1.5rem 0;
    }
    .category-chip {
      display: inline-flex; align-items: center; gap: 0.5rem;
      background: #131a4c; padding: 0.375rem 0.75rem; border-radius: 9999px;
      font-size: 0.75rem; font-weight: 700; color: #fc9df7;
      margin-bottom: 1rem;
    }
    .chip-dot { width: 0.375rem; height: 0.375rem; border-radius: 50%; background: #fc9df7; }
    .shop-title {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 2.5rem; font-weight: 800;
      margin: 0 0 0.5rem; letter-spacing: -0.02em;
    }
    .shop-tagline { color: #a3a8d5; font-size: 1.125rem; margin: 0 0 1.5rem; line-height: 1.5; }

    .meta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 1.25rem; }
    .meta-item {
      display: flex; align-items: center; gap: 0.375rem;
      font-size: 0.875rem; font-weight: 600; color: #a3a8d5;
    }
    .meta-item .material-symbols-outlined { font-size: 1rem; color: #5eb4ff; }
    .rating-item { color: #facc15; }
    .rating-item strong { color: #e2e3ff; }
    .meta-muted { color: #a3a8d5; }
    .star-filled { color: #facc15; font-variation-settings: 'FILL' 1; }
    .meta-divider { width: 1px; height: 1rem; background: rgba(64,69,108,0.3); }
    .status-dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; background: #ef4444; }
    .status-dot.open { background: #6bfe9c; box-shadow: 0 0 8px rgba(107,254,156,0.6); }

    /* Action Hub */
    .action-hub { max-width: 80rem; margin: 0 auto; padding: 2rem 1.5rem; }
    .action-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
    .action-card {
      background: rgba(24,32,86,0.6); backdrop-filter: blur(20px);
      border-radius: 1rem; padding: 1.5rem;
      display: flex; align-items: center; gap: 1rem;
      cursor: pointer; transition: all 0.2s;
    }
    .action-card:hover { background: rgba(24,32,86,0.8); transform: translateY(-2px); }
    .action-card.primary-action {
      background: linear-gradient(135deg, rgba(94,180,255,0.15), rgba(24,32,86,0.6));
      border: 1px solid rgba(94,180,255,0.2);
    }
    .action-icon { font-size: 1.5rem; color: #5eb4ff; }
    .action-card h4 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; font-weight: 700; margin: 0 0 0.25rem; }
    .action-card p { font-size: 0.75rem; color: #a3a8d5; margin: 0; }

    /* Tabs */
    .content-wrapper { max-width: 80rem; margin: 0 auto; padding: 0 1.5rem; }
    .tab-bar {
      display: flex; gap: 0.5rem;
      background: #080e38; padding: 0.375rem; border-radius: 0.75rem;
      margin-bottom: 2rem;
    }
    .tab-bar button {
      flex: 1; padding: 0.75rem;
      background: transparent; border: none; color: #a3a8d5;
      font-weight: 700; font-size: 0.875rem; border-radius: 0.5rem;
      cursor: pointer; transition: all 0.2s; font-family: inherit;
    }
    .tab-bar button.active { background: rgba(24,32,86,0.6); color: #e2e3ff; }
    .tab-bar button:hover:not(.active) { color: #e2e3ff; }
    .tab-content { animation: fadeIn 0.4s ease; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

    /* Products Panel */
    .products-panel {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr)); gap: 1.5rem;
    }
    .product-card {
      background: rgba(24,32,86,0.6); backdrop-filter: blur(20px);
      border-radius: 1.5rem; overflow: hidden;
      transition: all 0.3s;
    }
    .product-card:hover { background: rgba(24,32,86,0.8); transform: translateY(-4px); }
    .product-image { position: relative; height: 12rem; overflow: hidden; }
    .product-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
    .product-card:hover .product-image img { transform: scale(1.05); }
    .product-price-badge {
      position: absolute; bottom: 0.75rem; right: 0.75rem;
      background: rgba(0,0,0,0.6); backdrop-filter: blur(12px);
      padding: 0.375rem 0.75rem; border-radius: 0.5rem;
      font-size: 1rem; font-weight: 800; color: #5eb4ff;
    }
    .product-info { padding: 1.5rem; }
    .product-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.125rem; font-weight: 700; margin: 0 0 0.5rem; }
    .product-desc { font-size: 0.875rem; color: #a3a8d5; line-height: 1.5; margin: 0 0 1rem; }
    .product-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
    .glass-chip {
      background: #0e1442; padding: 0.25rem 0.5rem; border-radius: 0.375rem;
      font-size: 0.625rem; font-weight: 700; color: #a3a8d5;
      text-transform: uppercase; letter-spacing: 0.1em;
    }
    .product-footer { display: flex; justify-content: space-between; align-items: center; }
    .product-time { display: flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; color: #a3a8d5; }
    .product-time .material-symbols-outlined { font-size: 0.875rem; color: #5eb4ff; }
    .btn-add {
      display: flex; align-items: center; gap: 0.25rem;
      background: linear-gradient(135deg, #5eb4ff, #2aa7ff);
      color: #000; border: none; border-radius: 0.75rem;
      padding: 0.625rem 1rem; font-weight: 700; font-size: 0.875rem;
      cursor: pointer; transition: all 0.2s;
    }
    .btn-add:hover { box-shadow: 0 8px 24px rgba(94,180,255,0.2); }
    .btn-add:active { transform: scale(0.95); }
    .btn-add .material-symbols-outlined { font-size: 1rem; }

    /* About Panel */
    .about-panel { display: flex; flex-direction: column; gap: 1.5rem; }
    .about-card, .amenities-card, .hours-card {
      background: rgba(24,32,86,0.6); backdrop-filter: blur(20px);
      border-radius: 1.5rem; padding: 2rem;
    }
    .about-card h3, .amenities-card h3, .hours-card h3 {
      font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.25rem; font-weight: 800; margin: 0 0 1rem;
    }
    .about-card p { color: #a3a8d5; line-height: 1.8; margin: 0; font-size: 1rem; }
    .amenities-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr)); gap: 1rem; }
    .amenity { display: flex; align-items: center; gap: 0.75rem; font-weight: 600; }
    .amenity .material-symbols-outlined { color: #5eb4ff; }
    .hours-list { display: flex; flex-direction: column; gap: 0.75rem; }
    .hours-row { display: flex; justify-content: space-between; padding: 0.5rem 0; }
    .hours-row .day { font-weight: 700; }
    .hours-row .time { color: #a3a8d5; }
    .hours-row .time.closed { color: #ef4444; }

    /* Reviews Panel */
    .reviews-panel { display: flex; flex-direction: column; gap: 2rem; }
    .reviews-summary {
      text-align: center;
      background: rgba(24,32,86,0.6); backdrop-filter: blur(20px);
      padding: 3rem; border-radius: 1.5rem;
    }
    .score-big { font-size: 4rem; font-weight: 800; font-family: 'Plus Jakarta Sans', sans-serif; line-height: 1; margin-bottom: 0.5rem; }
    .stars-row { display: flex; justify-content: center; gap: 0.25rem; margin-bottom: 0.75rem; }
    .score-label { font-size: 0.875rem; color: #a3a8d5; margin: 0; }

    .review-list { display: flex; flex-direction: column; gap: 1.25rem; }
    .review-node {
      background: rgba(24,32,86,0.6); backdrop-filter: blur(20px);
      padding: 1.5rem; border-radius: 1.25rem;
    }
    .node-head { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
    .node-avatar {
      width: 2.75rem; height: 2.75rem; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 0.875rem; color: #000;
    }
    .node-meta h5 { margin: 0; font-size: 0.95rem; font-weight: 700; }
    .node-meta span { font-size: 0.75rem; color: #a3a8d5; }
    .node-rating {
      margin-left: auto;
      background: rgba(250,204,21,0.1); color: #facc15;
      padding: 0.25rem 0.75rem; border-radius: 9999px;
      font-weight: 800; font-size: 0.875rem;
      display: flex; align-items: center; gap: 0.25rem;
    }
    .node-body { color: #a3a8d5; line-height: 1.7; margin: 0 0 0.75rem; font-size: 0.95rem; }
    .node-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .tag { font-size: 0.75rem; font-weight: 700; color: #fc9df7; }

    /* Footer */
    .page-footer {
      margin-top: 5rem; padding: 3rem 1.5rem;
      border-top: 1px solid rgba(255,255,255,0.1);
      background: #05092f;
      transition: all 0.3s ease;
    }
    .footer-inner {
      max-width: 80rem; margin: 0 auto;
      display: flex; flex-direction: column; align-items: center;
      gap: 2rem;
    }
    @media (min-width: 768px) {
      .footer-inner { flex-direction: row; justify-content: space-between; }
    }
    .footer-brand { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
    @media (min-width: 768px) { .footer-brand { align-items: flex-start; } }
    .footer-logo { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.125rem; font-weight: 700; color: #e2e3ff; }
    .footer-copy { color: #a3a8d5; font-size: 0.875rem; margin: 0; }
    .footer-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; }
    .footer-links a { color: #a3a8d5; font-size: 0.875rem; text-decoration: none; transition: color 0.2s; }
    .footer-links a:hover { color: #5eb4ff; }
    .footer-social { display: flex; gap: 1rem; }
    .social-btn {
      width: 2.5rem; height: 2.5rem; border-radius: 50%;
      background: rgba(24,32,86,0.6); border: 1px solid rgba(255,255,255,0.1);
      display: flex; align-items: center; justify-content: center;
      color: #e2e3ff; cursor: pointer; transition: all 0.2s;
    }
    .social-btn:hover { color: #fff; border-color: #5eb4ff; background: #5eb4ff; }
    .social-btn .material-symbols-outlined { font-size: 1.25rem; }

    @media (max-width: 768px) {
      .bento-gallery {
        grid-template-columns: 1fr;
        grid-template-rows: 16rem;
        height: auto;
      }
      .bento-side-top, .bento-side-bottom { display: none; }
      .shop-title { font-size: 1.75rem; }
      .action-cards { grid-template-columns: 1fr; }
      .products-panel { grid-template-columns: 1fr; }
    }
  `]
})
export class ShopDetailComponent implements OnInit {
  activeTab: 'products' | 'about' | 'reviews' = 'products';
  isFavorited = false;
  shopId: string | null = null;

  shop: any = {
    name: 'The Golden Crust',
    category: 'Artisan Bakery',
    tagline: 'Where tradition meets taste. Hand-crafted artisan breads and pastries baked fresh daily with locally sourced ingredients.',
    rating: 4.8,
    reviewCount: 128,
    address: '42 Baker Street, Downtown Core',
    hours: 'Closes 9 PM',
    isOpen: true,
    description: 'Founded in 2019, The Golden Crust is a neighborhood bakery that believes in the art of slow-fermented bread. We source our wheat from organic farms and every loaf is given 24 hours of fermentation for that perfect crust and tang. Our pastry chef trained in Paris and brings a fusion of French technique with local Indian flavors.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKL_Gt0OYgyVI77ZOgLQt3quHujfWLr7jOYdrTIk8L931aBeRBqSRr5-Aoy2CJhm4PxppgYFrtoheNqCH4VTp-P8kxGuF0zdnyGJMj6qc5EHc_L69ZekNcPSQV-dJFNMZ4WKJbt6kE_FYz6ZHIntKoKlas7PGxLZ3bNIumtL0YjcKr6rLeVjSL-yWYLDfmyCXPeafVquM866KDuJL80TurE7oqG9OkkIh8sfy97ultbrmqJ-w8UbXuQUb7gKYbx2GXzI0onVNWpRDm',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDt5Jyfc8T2q_H_cOv2GbLu4JlJaXx--NL_i4FjuEiNDxaNPUKgGvH1N1wCsJcLXMHq8BfOtheFfFaB2lxC53fqH64cVOLDuPIR2hIxEYYzrSgHdfKH8YCNEwq_fAVkidHllvZopbHxFScIqJ5dVHPWnHt9xxcLT0yz-wlCGBN_3xBBD8bU-f9qdAaLy6dlYZw7fhdZWCgVZkWJ3RK2NLAExSGDYPGqpN1zn-TwONPG3w3cjkZTrQ5qWZHYPnkJB547Nm7AvT3IPLB',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCUsuAfvwhrFfOLDeqIh9jssV5dDYr4128gK4R1OjZxeSCTrgLiXW_sLN_0I2baZ3EsypaWtPfiUNvYRrGdPWD5WlkT7vuYJN2CX9cnA4SnBsHmZuJCFnUQBUdJWH3qOJyab8dFMnxIme0I7QjwsZGFMGiDvzCLKaJN1mHfCzXtGlwKkDtFgLmN_yFEKvQ9ndJUTlB6YqTUiTEoYKmRFphZC2NuYu6euyu4xT0bEdwcLhuSL16lOZr82Mh8KRsn9plMdkPyt7NvYRx6'
    ]
  };

  products = [
    { name: 'Sourdough Boule', description: '24-hour fermented with organic wheat. Crispy crust with a tangy, airy interior.', price: '₹180', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKL_Gt0OYgyVI77ZOgLQt3quHujfWLr7jOYdrTIk8L931aBeRBqSRr5-Aoy2CJhm4PxppgYFrtoheNqCH4VTp-P8kxGuF0zdnyGJMj6qc5EHc_L69ZekNcPSQV-dJFNMZ4WKJbt6kE_FYz6ZHIntKoKlas7PGxLZ3bNIumtL0YjcKr6rLeVjSL-yWYLDfmyCXPeafVquM866KDuJL80TurE7oqG9OkkIh8sfy97ultbrmqJ-w8UbXuQUb7gKYbx2GXzI0onVNWpRDm', chips: ['Organic', 'Vegan', 'Slow Fermented'], time: 'Baked at 6 AM' },
    { name: 'Butter Croissant', description: 'Flaky layers of French-style pastry made with premium Amul butter.', price: '₹120', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDt5Jyfc8T2q_H_cOv2GbLu4JlJaXx--NL_i4FjuEiNDxaNPUKgGvH1N1wCsJcLXMHq8BfOtheFfFaB2lxC53fqH64cVOLDuPIR2hIxEYYzrSgHdfKH8YCNEwq_fAVkidHllvZopbHxFScIqJ5dVHPWnHt9xxcLT0yz-wlCGBN_3xBBD8bU-f9qdAaLy6dlYZw7fhdZWCgVZkWJ3RK2NLAExSGDYPGqpN1zn-TwONPG3w3cjkZTrQ5qWZHYPnkJB547Nm7AvT3IPLB', chips: ['Popular', 'Buttery'], time: 'Fresh batch hourly' },
    { name: 'Masala Patties', description: 'Spiced potato-pea filling in golden, flaky pastry. A neighborhood favorite!', price: '₹60', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUsuAfvwhrFfOLDeqIh9jssV5dDYr4128gK4R1OjZxeSCTrgLiXW_sLN_0I2baZ3EsypaWtPfiUNvYRrGdPWD5WlkT7vuYJN2CX9cnA4SnBsHmZuJCFnUQBUdJWH3qOJyab8dFMnxIme0I7QjwsZGFMGiDvzCLKaJN1mHfCzXtGlwKkDtFgLmN_yFEKvQ9ndJUTlB6YqTUiTEoYKmRFphZC2NuYu6euyu4xT0bEdwcLhuSL16lOZr82Mh8KRsn9plMdkPyt7NvYRx6', chips: ['Bestseller', 'Spicy'], time: 'Available till 8 PM' },
    { name: 'Chocolate Lava Cake', description: 'Rich Belgian chocolate with a warm, molten center. Served with vanilla cream.', price: '₹250', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM1Qnj0VQEg70OrDBJmRJJWTVNTT3y_Grqv_5MwrPY-hnO0pioqbHD1hKnuzVR3X4IaexULI2Nvz0mVCi30BxotDpzU8NIXlO1gzdlKqgHfMbIRTytX2fdcqdLLjgRT6PB7mF_Bh_zjCbpL99ST2_s6zss2t5CZvMa9xLms2AwjtVb0PPqpMrsgwGEyH7qbNFNkjzRoczmWMM77uDuHuNgSyVu-B-SuFjC6899oWRM26K35PbnNI1ClKn79xDjVuUQEWlRBfj9Q2PH', chips: ['Indulgent', 'Premium'], time: 'Made to order' }
  ];

  galleryImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAKL_Gt0OYgyVI77ZOgLQt3quHujfWLr7jOYdrTIk8L931aBeRBqSRr5-Aoy2CJhm4PxppgYFrtoheNqCH4VTp-P8kxGuF0zdnyGJMj6qc5EHc_L69ZekNcPSQV-dJFNMZ4WKJbt6kE_FYz6ZHIntKoKlas7PGxLZ3bNIumtL0YjcKr6rLeVjSL-yWYLDfmyCXPeafVquM866KDuJL80TurE7oqG9OkkIh8sfy97ultbrmqJ-w8UbXuQUb7gKYbx2GXzI0onVNWpRDm',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDt5Jyfc8T2q_H_cOv2GbLu4JlJaXx--NL_i4FjuEiNDxaNPUKgGvH1N1wCsJcLXMHq8BfOtheFfFaB2lxC53fqH64cVOLDuPIR2hIxEYYzrSgHdfKH8YCNEwq_fAVkidHllvZopbHxFScIqJ5dVHPWnHt9xxcLT0yz-wlCGBN_3xBBD8bU-f9qdAaLy6dlYZw7fhdZWCgVZkWJ3RK2NLAExSGDYPGqpN1zn-TwONPG3w3cjkZTrQ5qWZHYPnkJB547Nm7AvT3IPLB',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCUsuAfvwhrFfOLDeqIh9jssV5dDYr4128gK4R1OjZxeSCTrgLiXW_sLN_0I2baZ3EsypaWtPfiUNvYRrGdPWD5WlkT7vuYJN2CX9cnA4SnBsHmZuJCFnUQBUdJWH3qOJyab8dFMnxIme0I7QjwsZGFMGiDvzCLKaJN1mHfCzXtGlwKkDtFgLmN_yFEKvQ9ndJUTlB6YqTUiTEoYKmRFphZC2NuYu6euyu4xT0bEdwcLhuSL16lOZr82Mh8KRsn9plMdkPyt7NvYRx6',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCM1Qnj0VQEg70OrDBJmRJJWTVNTT3y_Grqv_5MwrPY-hnO0pioqbHD1hKnuzVR3X4IaexULI2Nvz0mVCi30BxotDpzU8NIXlO1gzdlKqgHfMbIRTytX2fdcqdLLjgRT6PB7mF_Bh_zjCbpL99ST2_s6zss2t5CZvMa9xLms2AwjtVb0PPqpMrsgwGEyH7qbNFNkjzRoczmWMM77uDuHuNgSyVu-B-SuFjC6899oWRM26K35PbnNI1ClKn79xDjVuUQEWlRBfj9Q2PH'
  ];

  reviews = [
    { name: 'Priya S.', initials: 'PS', rating: 5, date: '2 days ago', comment: 'The sourdough is absolutely incredible! You can taste the 24-hour fermentation. The crust is perfect – crispy and golden. This bakery has completely replaced my bread brand loyalty.', tags: ['Authentic', 'Value'], color: '#fc9df7' },
    { name: 'Rahul M.', initials: 'RM', rating: 4, date: '1 week ago', comment: 'Great pastries, especially the butter croissant. The chocolate lava cake is a must-try. Slightly pricey but the quality justifies it. Cozy ambiance too.', tags: ['Professional', 'Clean'], color: '#5eb4ff' },
    { name: 'Ananya K.', initials: 'AK', rating: 5, date: '2 weeks ago', comment: 'Best masala patties in the neighborhood! Hot, flaky, and perfectly spiced. I come here every evening with my kids. The staff is always friendly and welcoming.', tags: ['Friendly', 'Quick'], color: '#6bfe9c' }
  ];

  amenities = [
    { icon: 'wifi', label: 'Free Wi-Fi' },
    { icon: 'local_parking', label: 'Street Parking' },
    { icon: 'ac_unit', label: 'Air Conditioned' },
    { icon: 'credit_card', label: 'Digital Payments' },
    { icon: 'child_care', label: 'Kid Friendly' },
    { icon: 'accessible', label: 'Wheelchair Access' }
  ];

  businessHours = [
    { day: 'Monday', time: '6:00 AM - 9:00 PM', closed: false },
    { day: 'Tuesday', time: '6:00 AM - 9:00 PM', closed: false },
    { day: 'Wednesday', time: '6:00 AM - 9:00 PM', closed: false },
    { day: 'Thursday', time: '6:00 AM - 9:00 PM', closed: false },
    { day: 'Friday', time: '6:00 AM - 10:00 PM', closed: false },
    { day: 'Saturday', time: '7:00 AM - 10:00 PM', closed: false },
    { day: 'Sunday', time: 'Closed', closed: true }
  ];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    this.shopId = this.route.snapshot.paramMap.get('id');
    if (this.shopId) {
      this.apiService.getShopById(this.shopId).subscribe({
        next: (s: any) => {
          if (s) {
            this.shop = {
              ...this.shop,
              ...s,
              images: [s.imageUrl || this.shop.images[0], ...this.shop.images.slice(1)],
              category: s.categoryName || this.shop.category,
              isOpen: s.status === 'APPROVED',
              reviewCount: s.reviewCount || this.shop.reviewCount,
              rating: s.averageRating?.toFixed(1) || this.shop.rating
            };
          }
        }
      });
    }
  }

  getStars(n: number): number[] { return Array(Math.floor(n)).fill(0); }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-bg-orb orb-1"></div>
        <div class="hero-bg-orb orb-2"></div>
        <div class="hero-content">
          <span class="hero-badge">✦ Your Neighborhood, Reimagined</span>
          <h1>Find the soul<br>of your city.</h1>
          <p>Discover hidden gems, trusted services, and vibrant local businesses — all curated for your community.</p>
          <div class="search-bar">
            <span class="material-icons search-icon">search</span>
            <input type="text" placeholder="Search for 'Barbershop', 'Cafe', 'Plumber'..." [(value)]="searchQuery" (keyup.enter)="onSearch()">
            <button class="btn-glow" (click)="onSearch()">Search</button>
          </div>
          <div class="hero-stats">
            <div class="stat"><span class="stat-num">2,400+</span><span class="stat-label">Local Businesses</span></div>
            <div class="stat-divider"></div>
            <div class="stat"><span class="stat-num">18,000+</span><span class="stat-label">Happy Users</span></div>
            <div class="stat-divider"></div>
            <div class="stat"><span class="stat-num">4.8</span><span class="stat-label">Avg. Rating</span></div>
          </div>
        </div>
      </section>

      <!-- Browse Categories -->
      <section class="content-section">
        <div class="section-header">
          <div>
            <h2>Browse Categories</h2>
            <p class="section-subtitle">Quick access to essential services</p>
          </div>
          <a routerLink="/browse" class="view-all-link">View All <span class="material-icons">arrow_forward</span></a>
        </div>
        <div class="category-grid">
          <div class="category-card" *ngFor="let cat of categories" [routerLink]="['/browse']" [queryParams]="{category: cat.name}">
            <div class="category-icon-wrap">
              <span class="material-icons">{{cat.icon}}</span>
            </div>
            <h3>{{cat.name}}</h3>
            <span class="category-count">{{cat.count}} listings</span>
          </div>
        </div>
      </section>

      <!-- Near You -->
      <section class="content-section">
        <div class="section-header">
          <div>
            <h2>Near You</h2>
            <p class="section-subtitle">Top-rated businesses in your area</p>
          </div>
          <a routerLink="/browse" class="view-all-link">View All <span class="material-icons">arrow_forward</span></a>
        </div>
        <div class="shop-grid">
          <div class="shop-card" *ngFor="let shop of nearbyShops" [routerLink]="['/shop', shop.id || 1]">
            <div class="shop-image" [style.backgroundImage]="'url(' + shop.image + ')'">
              <div class="shop-badge" *ngIf="shop.featured">
                <span class="material-icons">star</span> Featured
              </div>
              <div class="shop-rating-badge">
                <span class="material-icons">star</span> {{shop.rating}}
              </div>
            </div>
            <div class="shop-info">
              <h3>{{shop.name}}</h3>
              <p class="shop-category">{{shop.category}}</p>
              <p class="shop-desc">{{shop.description}}</p>
              <div class="shop-meta">
                <span class="distance"><span class="material-icons">location_on</span> {{shop.distance}}</span>
                <span class="status" [class.open]="shop.isOpen">{{shop.isOpen ? 'Open Now' : 'Closed'}}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Curated Collections -->
      <section class="content-section collections-section">
        <div class="section-header">
          <div>
            <h2>Curated Collections</h2>
            <p class="section-subtitle">Hand-picked by our community team</p>
          </div>
        </div>
        <div class="collections-grid">
          <div class="collection-card" *ngFor="let col of collections">
            <div class="collection-image" [style.backgroundImage]="'url(' + col.image + ')'">
              <div class="collection-overlay">
                <span class="collection-tag">{{col.tag}}</span>
                <h3>{{col.title}}</h3>
                <p>{{col.desc}}</p>
                <a class="collection-cta" routerLink="/browse">Explore <span class="material-icons">arrow_forward</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Community CTA -->
      <section class="cta-section">
        <div class="cta-content">
          <div class="cta-icon"><span class="material-icons">groups</span></div>
          <h2>Join the Nikat Community</h2>
          <p>Share recommendations, ask for advice, and stay connected with your neighbors.</p>
          <div class="cta-buttons">
            <a routerLink="/community" class="btn-glow">Explore Community</a>
            <a routerLink="/register" class="btn-outline">Create Account</a>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="site-footer">
        <div class="footer-content">
          <div class="footer-brand">
            <h3>Nikat</h3>
            <p>Connecting vibrant communities through local discovery and trusted services since 2024.</p>
            <div class="footer-social">
              <a href="#"><span class="material-icons">public</span></a>
              <a href="#"><span class="material-icons">chat</span></a>
              <a href="#"><span class="material-icons">photo_camera</span></a>
            </div>
          </div>
          <div class="footer-links">
            <div class="footer-col">
              <h4>Discover</h4>
              <a routerLink="/browse">Browse Shops</a>
              <a routerLink="/services">Find Services</a>
              <a routerLink="/community">Community Hub</a>
              <a routerLink="/reviews">Reviews</a>
            </div>
            <div class="footer-col">
              <h4>For Business</h4>
              <a routerLink="/register">List Your Shop</a>
              <a routerLink="/register">Offer Services</a>
              <a routerLink="/login">Business Login</a>
            </div>
            <div class="footer-col">
              <h4>Support</h4>
              <a routerLink="/help">Help Center</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Contact Us</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2024 Nikat. Explore your community.</span>
          <a routerLink="/admin-login" class="admin-link">
            <span class="material-icons">login</span> Admin Login
          </a>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .home-container {
      background-color: #05092f;
      min-height: 100vh;
    }

    /* ─── Hero ─── */
    .hero-section {
      position: relative;
      padding: 6rem 2rem 4rem;
      text-align: center;
      overflow: hidden;
      background: linear-gradient(180deg, #0e1442 0%, #05092f 100%);
    }
    .hero-bg-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(120px);
      opacity: 0.15;
      pointer-events: none;
    }
    .orb-1 { width: 600px; height: 600px; background: #5eb4ff; top: -200px; left: -100px; }
    .orb-2 { width: 500px; height: 500px; background: #6bfe9c; bottom: -200px; right: -100px; }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }
    .hero-badge {
      display: inline-block;
      background: rgba(94, 180, 255, 0.1);
      border: 1px solid rgba(94, 180, 255, 0.2);
      color: #5eb4ff;
      padding: 0.5rem 1.25rem;
      border-radius: 2rem;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 2rem;
      letter-spacing: 0.02em;
    }
    .hero-content h1 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 4rem;
      font-weight: 800;
      color: #e2e3ff;
      letter-spacing: -0.03em;
      line-height: 1.1;
      margin-bottom: 1.5rem;
    }
    .hero-content > p {
      font-family: 'Manrope', sans-serif;
      font-size: 1.2rem;
      color: #a3a8d5;
      max-width: 560px;
      margin: 0 auto 2.5rem;
      line-height: 1.6;
    }

    .search-bar {
      display: flex;
      background-color: #182056;
      border-radius: 3rem;
      padding: 0.5rem;
      border: 1px solid #40456c;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
      align-items: center;
      max-width: 640px;
      margin: 0 auto 3rem;
    }
    .search-icon {
      color: #a3a8d5;
      margin-left: 1rem;
      margin-right: 0.5rem;
      font-size: 1.5rem;
    }
    .search-bar input {
      flex: 1;
      background: transparent;
      border: none;
      color: #e2e3ff;
      font-family: 'Manrope', sans-serif;
      font-size: 1rem;
      padding: 0.75rem 0.5rem;
      outline: none;
    }
    .search-bar input::placeholder { color: #6e739d; }

    .btn-glow {
      background: linear-gradient(135deg, #5eb4ff, #2aa7ff);
      border: none;
      color: #003151;
      font-weight: 700;
      padding: 0.85rem 2rem;
      border-radius: 2rem;
      cursor: pointer;
      font-family: 'Manrope', sans-serif;
      font-size: 0.95rem;
      transition: all 0.2s;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    .btn-glow:hover {
      box-shadow: 0 6px 20px rgba(94, 180, 255, 0.4);
      transform: translateY(-2px);
    }

    .hero-stats {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
    }
    .stat { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }
    .stat-num { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.75rem; font-weight: 800; color: #e2e3ff; }
    .stat-label { font-size: 0.8rem; color: #6e739d; text-transform: uppercase; letter-spacing: 0.05em; }
    .stat-divider { width: 1px; height: 40px; background: #40456c; }

    /* ─── Sections ─── */
    .content-section {
      max-width: 1280px;
      margin: 0 auto;
      padding: 4rem 2rem 0;
    }
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 2rem;
    }
    .section-header h2 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 1.75rem;
      font-weight: 700;
      color: #e2e3ff;
    }
    .section-subtitle {
      font-size: 0.875rem;
      color: #6e739d;
      margin-top: 0.25rem;
    }
    .view-all-link {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: #5eb4ff;
      text-decoration: none;
      transition: gap 0.2s;
    }
    .view-all-link:hover { gap: 0.5rem; }
    .view-all-link .material-icons { font-size: 1.1rem; }

    /* ─── Categories ─── */
    .category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 1rem;
    }
    .category-card {
      background-color: #080e38;
      border-radius: 1rem;
      padding: 1.75rem 1rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.25s;
      text-decoration: none;
      display: block;
    }
    .category-card:hover {
      background-color: #0e1442;
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
    .category-icon-wrap {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: rgba(94, 180, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
    }
    .category-icon-wrap .material-icons {
      font-size: 1.75rem;
      color: #5eb4ff;
    }
    .category-card h3 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 1rem;
      font-weight: 600;
      color: #e2e3ff;
      margin-bottom: 0.25rem;
    }
    .category-count {
      font-size: 0.75rem;
      color: #6e739d;
    }

    /* ─── Shop Grid ─── */
    .shop-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    .shop-card {
      background-color: #080e38;
      border-radius: 1rem;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.25s;
      text-decoration: none;
      display: flex;
      flex-direction: column;
    }
    .shop-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
    }
    .shop-image {
      height: 200px;
      background-size: cover;
      background-position: center;
      position: relative;
    }
    .shop-badge {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: linear-gradient(135deg, #5eb4ff, #2aa7ff);
      color: #003151;
      padding: 0.25rem 0.75rem;
      border-radius: 2rem;
      font-size: 0.75rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    .shop-badge .material-icons { font-size: 0.875rem; }
    .shop-rating-badge {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      background: rgba(5, 9, 47, 0.85);
      backdrop-filter: blur(8px);
      padding: 0.3rem 0.6rem;
      border-radius: 1rem;
      font-size: 0.875rem;
      font-weight: 700;
      color: #e2e3ff;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    .shop-rating-badge .material-icons { font-size: 0.9rem; color: #F59E0B; }
    .shop-info {
      padding: 1.5rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    .shop-info h3 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 1.2rem;
      font-weight: 700;
      color: #e2e3ff;
      margin-bottom: 0.25rem;
    }
    .shop-category {
      font-size: 0.8rem;
      color: #5eb4ff;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }
    .shop-desc {
      font-size: 0.875rem;
      color: #a3a8d5;
      line-height: 1.5;
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .shop-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
      margin-top: auto;
    }
    .distance {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: #a3a8d5;
    }
    .distance .material-icons { font-size: 0.9rem; }
    .status { font-weight: 700; color: #6e739d; }
    .status.open { color: #6bfe9c; }

    /* ─── Collections ─── */
    .collections-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
      gap: 1.5rem;
    }
    .collection-card { border-radius: 1rem; overflow: hidden; }
    .collection-image {
      height: 280px;
      background-size: cover;
      background-position: center;
      position: relative;
    }
    .collection-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(5,9,47,0.2) 0%, rgba(5,9,47,0.9) 100%);
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
    .collection-tag {
      display: inline-block;
      background: rgba(107, 254, 156, 0.15);
      color: #6bfe9c;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.75rem;
      width: fit-content;
    }
    .collection-overlay h3 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 1.35rem;
      font-weight: 700;
      color: #e2e3ff;
      margin-bottom: 0.5rem;
    }
    .collection-overlay p {
      font-size: 0.875rem;
      color: #a3a8d5;
      margin-bottom: 1rem;
    }
    .collection-cta {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      color: #5eb4ff;
      font-weight: 600;
      font-size: 0.875rem;
      text-decoration: none;
      transition: gap 0.2s;
    }
    .collection-cta:hover { gap: 0.5rem; }
    .collection-cta .material-icons { font-size: 1rem; }

    /* ─── CTA Section ─── */
    .cta-section {
      padding: 5rem 2rem;
      text-align: center;
    }
    .cta-content {
      max-width: 600px;
      margin: 0 auto;
    }
    .cta-icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, rgba(94,180,255,0.15), rgba(107,254,156,0.1));
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 2rem;
    }
    .cta-icon .material-icons { font-size: 2.5rem; color: #5eb4ff; }
    .cta-content h2 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 2rem;
      font-weight: 700;
      color: #e2e3ff;
      margin-bottom: 1rem;
    }
    .cta-content > p {
      color: #a3a8d5;
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }
    .cta-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    .btn-outline {
      border: 1px solid #40456c;
      background: transparent;
      color: #e2e3ff;
      padding: 0.85rem 2rem;
      border-radius: 2rem;
      cursor: pointer;
      font-family: 'Manrope', sans-serif;
      font-size: 0.95rem;
      font-weight: 600;
      transition: all 0.2s;
      text-decoration: none;
    }
    .btn-outline:hover {
      background: rgba(255,255,255,0.05);
      border-color: #a3a8d5;
    }

    /* ─── Footer ─── */
    .site-footer {
      background-color: #000000;
      padding: 4rem 2rem 0;
    }
    .footer-content {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      gap: 4rem;
      padding-bottom: 3rem;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .footer-brand {
      flex: 1;
      max-width: 320px;
    }
    .footer-brand h3 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 1.75rem;
      font-weight: 800;
      color: #5eb4ff;
      margin-bottom: 1rem;
    }
    .footer-brand p {
      font-size: 0.875rem;
      color: #6e739d;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    .footer-social {
      display: flex;
      gap: 1rem;
    }
    .footer-social a {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #0e1442;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #a3a8d5;
      transition: all 0.2s;
    }
    .footer-social a:hover {
      background: rgba(94,180,255,0.15);
      color: #5eb4ff;
    }
    .footer-social a .material-icons { font-size: 1.2rem; }
    .footer-links {
      display: flex;
      gap: 4rem;
      flex: 2;
    }
    .footer-col h4 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.9rem;
      font-weight: 700;
      color: #e2e3ff;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 1rem;
    }
    .footer-col a {
      display: block;
      font-size: 0.875rem;
      color: #6e739d;
      text-decoration: none;
      margin-bottom: 0.75rem;
      transition: color 0.2s;
    }
    .footer-col a:hover { color: #e2e3ff; }
    .footer-bottom {
      max-width: 1280px;
      margin: 0 auto;
      padding: 1.5rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8rem;
      color: #40456c;
    }
    .admin-link {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: #40456c;
      text-decoration: none;
      transition: color 0.2s;
    }
    .admin-link:hover { color: #a3a8d5; }
    .admin-link .material-icons { font-size: 1rem; }

    /* ─── Responsive ─── */
    @media (max-width: 768px) {
      .hero-content h1 { font-size: 2.5rem; }
      .hero-stats { flex-direction: column; gap: 1rem; }
      .stat-divider { width: 40px; height: 1px; }
      .search-bar {
        flex-direction: column;
        border-radius: 1rem;
        padding: 1rem;
      }
      .search-bar input { width: 100%; margin-bottom: 0.75rem; }
      .btn-glow { width: 100%; justify-content: center; }
      .category-grid { grid-template-columns: repeat(3, 1fr); }
      .shop-grid { grid-template-columns: 1fr; }
      .collections-grid { grid-template-columns: 1fr; }
      .footer-content { flex-direction: column; gap: 2rem; }
      .footer-links { flex-direction: column; gap: 2rem; }
      .cta-buttons { flex-direction: column; }
    }
  `]
})
export class HomeComponent implements OnInit {
  searchQuery = '';

  categories = [
    { name: 'Restaurants', icon: 'restaurant', count: 340 },
    { name: 'Cafes', icon: 'local_cafe', count: 185 },
    { name: 'Barbershops', icon: 'content_cut', count: 96 },
    { name: 'Fitness', icon: 'fitness_center', count: 72 },
    { name: 'Groceries', icon: 'local_grocery_store', count: 210 },
    { name: 'Spas', icon: 'spa', count: 48 },
    { name: 'Tech Repair', icon: 'build', count: 65 },
    { name: 'Tutoring', icon: 'school', count: 114 }
  ];

  nearbyShops = [
    {
      id: 1, name: 'The Golden Grind', category: 'Cafe & Workspace',
      description: 'Artisanal coffee and workspace perfect for remote teams and creative sessions.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
      rating: 4.8, distance: '0.8 mi', isOpen: true, featured: true
    },
    {
      id: 2, name: 'Iron Haven Gym', category: 'Fitness Center',
      description: '24/7 access elite training facility with modern equipment and personal coaches.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
      rating: 4.9, distance: '1.2 mi', isOpen: true, featured: false
    },
    {
      id: 3, name: 'Velvet Cut Studio', category: 'Barbershop',
      description: 'Traditional grooming with a modern twist. The neighborhood\'s finest for over a decade.',
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80',
      rating: 4.7, distance: '0.5 mi', isOpen: false, featured: true
    }
  ];

  collections = [
    {
      title: 'Elite Professional Networks',
      desc: 'Connect with the top consultants and freelancers in your vicinity.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      tag: 'Business'
    },
    {
      title: 'Hidden Eateries',
      desc: 'Authentic flavors your neighbors are keeping secret.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      tag: 'Food & Drink'
    }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getShops().subscribe({
      next: (shops: any[]) => {
        if (shops && shops.length > 0) {
          this.nearbyShops = shops.slice(0, 6).map((s: any) => ({
            id: s.id, name: s.name, category: s.categoryName || 'Local Business',
            description: s.description || '',
            image: s.imageUrl || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
            rating: s.averageRating || 4.5, distance: '1.0 mi',
            isOpen: s.status === 'APPROVED', featured: s.featured || false
          }));
        }
      }
    });
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      // Navigate to search results
    }
  }
}

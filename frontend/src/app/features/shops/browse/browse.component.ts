import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService, CategoryDto } from '../../../core/api.service';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="shops-page">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-inner">
          <div class="hero-content">
            <h1 class="hero-title">
              Local Treasures <br><span class="text-accent">Redefined.</span>
            </h1>
            <p class="hero-desc">
              Explore curated local shops in your neighborhood. From artisanal bakeries to tech repair hubs, find exactly what you need.
            </p>
            <div class="hero-actions">
              <button class="btn-location">
                <span class="material-symbols-outlined">location_on</span>
                <span>New Delhi, IN</span>
              </button>
            </div>
          </div>
          <div class="hero-glow"></div>
        </div>
      </section>

      <!-- Category Pills -->
      <section class="category-bar">
        <div class="category-bar-inner">
          <div class="category-pills" [class.expanded]="isCategoriesExpanded">
            <button class="pill" [class.active]="activeCategory === 'all'" (click)="filterByCategory('all')">All Shops</button>
            <button class="pill" 
                    *ngFor="let cat of getVisibleCategories()" 
                    [class.active]="activeCategory === cat.id" 
                    (click)="filterByCategory(cat.id)">
              {{cat.name}}
            </button>
            <button class="pill toggle-btn" (click)="isCategoriesExpanded = !isCategoriesExpanded" *ngIf="categories.length > 10">
              <span class="material-symbols-outlined">{{isCategoriesExpanded ? 'expand_less' : 'expand_more'}}</span>
              {{isCategoriesExpanded ? 'Show Less' : '+' + (categories.length - 10) + ' More'}}
            </button>
          </div>
          <button class="btn-filter" (click)="toggleFilters()">
            <span class="material-symbols-outlined">tune</span>
            <span class="filter-label">Filters</span>
          </button>
        </div>
      </section>

      <!-- Filter Sidebar Overlay -->
      <div class="filter-overlay" [class.active]="showFilters" (click)="toggleFilters()">
        <div class="filter-sidebar" (click)="$event.stopPropagation()">
          <div class="sidebar-header">
            <h2>Filters</h2>
            <button class="close-btn" (click)="toggleFilters()">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div class="sidebar-content">
            <div class="filter-group">
              <label class="group-label">Status</label>
              <div class="check-options">
                <label class="check-item">
                  <input type="checkbox" [(ngModel)]="filters.openNow" (change)="filterShops()">
                  <span>Open Now</span>
                </label>
                <label class="check-item">
                  <input type="checkbox" [(ngModel)]="filters.verifiedOnly" (change)="filterShops()">
                  <span>Verified Only</span>
                </label>
              </div>
            </div>

            <div class="filter-group">
              <label class="group-label">Minimum Rating</label>
              <div class="rating-options">
                <button class="rating-btn" 
                        *ngFor="let r of [4, 3, 2]" 
                        [class.active]="filters.minRating === r"
                        (click)="filters.minRating = r; filterShops()">
                  {{r}}+ <span class="material-symbols-outlined">star</span>
                </button>
              </div>
            </div>

            <div class="filter-group">
              <label class="group-label">Sort By</label>
              <select class="filter-select" [(ngModel)]="filters.sortBy" (change)="filterShops()">
                <option value="popularity">Popularity</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          <div class="sidebar-footer">
            <button class="btn-clear" (click)="resetFilters()">Reset All</button>
            <button class="btn-apply" (click)="toggleFilters()">Apply Filters</button>
          </div>
        </div>
      </div>

      <!-- Shop Cards Grid -->
      <section class="shops-grid-section">
        <div class="shops-grid">
          <!-- Shop Cards from API / Mock -->
          <div class="shop-card" *ngFor="let shop of displayShops" [routerLink]="['/shop', shop.id]">
            <div class="shop-image">
              <img [src]="shop.image" [alt]="shop.name">
              <div class="status-badge" [class.closed]="!shop.isOpen">
                <span class="status-dot"></span>
                {{shop.isOpen ? 'Open Now' : 'Closed'}}
              </div>
              <div class="rating-overlay">
                <span class="material-symbols-outlined star-filled">star</span>
                <span class="rating-text">{{shop.rating}}</span>
              </div>
            </div>
            <div class="shop-info">
              <div class="info-top">
                <h3 class="shop-name">{{shop.name}}</h3>
                <span class="shop-tag" [class]="'tag-' + shop.tagColor">{{shop.category}}</span>
              </div>
              <p class="shop-desc">{{shop.description}}</p>
              <div class="info-footer">
                <div class="footer-left">
                  <span class="footer-label">{{shop.footerLabel}}</span>
                  <span class="footer-value">{{shop.footerValue}}</span>
                </div>
                <button class="btn-view" [class.secondary]="!shop.isOpen" (click)="$event.stopPropagation()">
                  View Products
                </button>
              </div>
            </div>
          </div>

          <!-- Partner CTA Card -->
          <div class="partner-card">
            <div class="partner-inner">
              <div class="partner-icon-wrap">
                <span class="material-symbols-outlined partner-icon">storefront</span>
              </div>
              <div>
                <h3 class="partner-title">Are you a merchant?</h3>
                <p class="partner-desc">Join the Nikat digital ecosystem and reach thousands of local customers in your neighborhood.</p>
              </div>
              <button class="btn-partner">Partner with Us</button>
            </div>
          </div>
        </div>
      </section>

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

    .shops-page { min-height: 100vh; background: var(--bg); color: var(--text-main); transition: all 0.3s ease; }

    /* Hero */
    .hero-section { max-width: 80rem; margin: 0 auto; padding: 0 1.5rem 3rem; }
    .hero-inner {
      background: linear-gradient(135deg, var(--accent-glow), var(--glass));
      padding: 3rem; border-radius: 1.5rem;
      border: 1px solid var(--glass-border);
      position: relative; overflow: hidden;
      transition: all 0.3s ease;
    }
    .hero-content { position: relative; z-index: 10; max-width: 40rem; }
    .hero-title {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 3rem; font-weight: 800;
      letter-spacing: -0.02em; line-height: 1.1;
      margin: 0 0 1rem; color: var(--text-main);
    }
    .text-accent { color: var(--accent); }
    .hero-desc {
      color: var(--text-muted); font-size: 1.125rem;
      line-height: 1.6; margin: 0 0 2rem;
    }
    .hero-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }
    .btn-location {
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0.625rem 1.5rem; border-radius: 9999px;
      background: var(--card-bg); border: 1px solid var(--border-color);
      color: var(--text-main); font-weight: 600; cursor: pointer;
      transition: all 0.2s;
    }
    .btn-location:hover { border-color: var(--accent); background: var(--glass); }
    .btn-location .material-symbols-outlined { color: var(--accent); }
    .hero-glow {
      position: absolute; right: -5rem; top: -5rem;
      width: 24rem; height: 24rem;
      background: var(--accent-glow);
      filter: blur(100px); border-radius: 50%;
    }

    /* Category Bar */
    .category-bar {
      max-width: 80rem; margin: 0 auto; padding: 0 1.5rem 2rem;
      position: sticky; top: 72px; z-index: 40;
    }
    .category-bar-inner {
      background: var(--bg); opacity: 0.98; backdrop-filter: blur(12px);
      padding: 1rem 0;
      display: flex; flex-wrap: wrap; gap: 1rem;
      align-items: center; justify-content: space-between;
      transition: background 0.3s ease;
      border-bottom: 1px solid var(--border-color);
    }
    .category-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .pill {
      padding: 0.5rem 1.25rem; border-radius: 0.75rem;
      font-family: 'Manrope', sans-serif;
      font-size: 0.875rem; font-weight: 600;
      background: var(--card-bg); color: var(--text-muted); border: 1px solid var(--border-color);
      cursor: pointer; transition: all 0.2s;
    }
    .pill:hover { color: var(--text-main); border-color: var(--accent); }
    .pill.active { background: var(--primary); color: #fff; font-weight: 700; border-color: var(--primary); }

    .category-pills.expanded { max-height: none; overflow: visible; }
    .toggle-btn { 
      background: var(--glass); color: var(--accent); border-style: dashed;
      display: flex; align-items: center; gap: 0.25rem;
    }
    .toggle-btn .material-symbols-outlined { font-size: 1.1rem; }
    
    .btn-filter {
      display: flex; align-items: center; gap: 0.5rem;
      background: var(--card-bg); border: 1px solid var(--border-color); color: var(--accent);
      padding: 0.5rem 1rem; border-radius: 0.75rem;
      font-weight: 600; cursor: pointer; transition: all 0.2s;
    }
    .btn-filter:hover { border-color: var(--accent); background: var(--glass); }
    .filter-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; }

    /* Filter Sidebar */
    .filter-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.4); backdrop-filter: blur(4px);
      z-index: 1000; opacity: 0; pointer-events: none; transition: all 0.3s ease;
    }
    .filter-overlay.active { opacity: 1; pointer-events: auto; }
    
    .filter-sidebar {
      position: absolute; right: 0; top: 0; bottom: 0; width: 320px;
      background: var(--bg); border-left: 1px solid var(--glass-border);
      box-shadow: -10px 0 30px rgba(0,0,0,0.1);
      transform: translateX(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex; flex-direction: column;
    }
    .filter-overlay.active .filter-sidebar { transform: translateX(0); }

    .sidebar-header { padding: 1.5rem; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; }
    .sidebar-header h2 { margin: 0; font-size: 1.25rem; }
    .close-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; }

    .sidebar-content { padding: 1.5rem; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 2rem; }
    .group-label { display: block; font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: var(--accent); margin-bottom: 1rem; }
    
    .check-options { display: flex; flex-direction: column; gap: 0.75rem; }
    .check-item { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; font-size: 0.9rem; }
    .check-item input { width: 1.1rem; height: 1.1rem; accent-color: var(--primary); }

    .rating-options { display: flex; gap: 0.5rem; }
    .rating-btn { 
      flex: 1; padding: 0.5rem; border-radius: 0.5rem; border: 1px solid var(--border-color);
      background: var(--card-bg); color: var(--text-main); cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 0.25rem; font-weight: 600;
    }
    .rating-btn.active { background: var(--primary); color: #fff; border-color: var(--primary); }
    .rating-btn .material-symbols-outlined { font-size: 1rem; font-variation-settings: 'FILL' 1; }

    .filter-select {
      width: 100%; padding: 0.75rem; border-radius: 0.75rem;
      background: var(--card-bg); border: 1px solid var(--border-color);
      color: var(--text-main); font-family: inherit; font-weight: 600;
    }

    .sidebar-footer { padding: 1.5rem; border-top: 1px solid var(--border-color); display: flex; gap: 1rem; }
    .btn-clear { flex: 1; padding: 0.75rem; border-radius: 0.75rem; border: 1px solid var(--border-color); background: none; color: var(--text-muted); cursor: pointer; }
    .btn-apply { flex: 2; padding: 0.75rem; border-radius: 0.75rem; border: none; background: var(--primary); color: #fff; font-weight: 700; cursor: pointer; }

    /* Grid */
    .shops-grid-section { max-width: 80rem; margin: 0 auto; padding: 0 1.5rem; }
    .shops-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 2rem;
    }
    @media (min-width: 640px) { .shops-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .shops-grid { grid-template-columns: repeat(3, 1fr); } }

    /* Shop Card */
    .shop-card {
      background: var(--card-bg); border-radius: 1.5rem;
      border: 1px solid var(--border-color);
      transition: all 0.3s ease;
      cursor: pointer;
    }
    .shop-card:hover { border-color: var(--accent); transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
    .shop-image { position: relative; height: 14rem; overflow: hidden; border-radius: 1.5rem 1.5rem 0 0; }
    .shop-image img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform 0.5s ease;
    }
    .shop-card:hover .shop-image img { transform: scale(1.05); }

    .status-badge {
      position: absolute; top: 1rem; left: 1rem;
      background: rgba(16, 185, 129, 0.9); color: #fff;
      padding: 0.25rem 0.75rem; border-radius: 9999px;
      font-size: 0.75rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.05em;
      display: flex; align-items: center; gap: 0.375rem;
      backdrop-filter: blur(10px);
    }
    .status-badge.closed { background: rgba(239, 68, 68, 0.9); color: #fff; }
    .status-dot {
      width: 0.375rem; height: 0.375rem; border-radius: 50%;
      background: #fff;
    }

    .rating-overlay {
      position: absolute; bottom: 1rem; right: 1rem;
      background: rgba(0,0,0,0.6); backdrop-filter: blur(12px);
      padding: 0.25rem 0.5rem; border-radius: 0.5rem;
      display: flex; align-items: center; gap: 0.25rem;
      color: #fff;
    }
    .star-filled { font-size: 0.875rem; color: #facc15; font-variation-settings: 'FILL' 1; }
    .rating-text { font-size: 0.75rem; font-weight: 700; }

    .shop-info { padding: 1.5rem; }
    .info-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; }
    .shop-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin: 0; }
    .shop-tag {
      padding: 0.125rem 0.5rem; border-radius: 0.25rem;
      font-size: 0.625rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.12em;
    }
    .tag-tertiary { background: var(--accent); color: white; }
    .tag-primary { background: var(--glass); color: var(--primary); border: 1px solid var(--glass-border); }
    .tag-secondary { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); }
    .shop-desc { color: var(--text-muted); font-size: 0.875rem; margin: 0 0 1.5rem; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

    .info-footer {
      display: flex; align-items: center; justify-content: space-between;
      padding-top: 1rem; border-top: 1px solid var(--border-color);
    }
    .footer-left { display: flex; flex-direction: column; }
    .footer-label { font-size: 0.625rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.12em; }
    .footer-value { color: var(--text-main); font-weight: 700; }

    .btn-view {
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: #fff; border: none;
      padding: 0.625rem 1.25rem; border-radius: 0.75rem;
      font-weight: 700; font-size: 0.875rem;
      cursor: pointer; transition: all 0.2s;
      box-shadow: 0 4px 12px var(--accent-glow);
    }
    .btn-view:hover { opacity: 0.95; transform: translateY(-1px); box-shadow: 0 6px 16px var(--accent-glow); }
    .btn-view:active { transform: scale(0.95); }
    .btn-view.secondary {
      background: var(--card-bg); color: var(--text-main);
      border: 1px solid var(--border-color);
      box-shadow: none;
    }
    .btn-view.secondary:hover { border-color: var(--accent); background: var(--glass); }

    /* Partner Card */
    .partner-card {
      background: var(--card-bg); border-radius: 1.5rem;
      overflow: hidden; border: 2px solid var(--primary);
    }
    .partner-inner {
      height: 100%; display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 2rem; text-align: center; gap: 1.5rem;
    }
    .partner-icon-wrap {
      width: 5rem; height: 5rem; border-radius: 50%;
      background: var(--glass);
      display: flex; align-items: center; justify-content: center;
      border: 1px solid var(--glass-border);
    }
    .partner-icon { font-size: 2.5rem; color: var(--accent); }
    .partner-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin: 0; }
    .partner-desc { color: var(--text-muted); font-size: 0.875rem; margin: 0; }
    .btn-partner {
      width: 100%;
      background: var(--glass); color: var(--accent);
      border: 1px solid var(--glass-border);
      padding: 0.75rem; border-radius: 0.75rem;
      font-weight: 700; cursor: pointer;
      transition: all 0.2s;
    }
    .btn-partner:hover { background: var(--primary); color: #fff; border-color: var(--primary); }

    /* Footer */
    .page-footer {
      margin-top: 3rem; padding: 3rem 1.5rem;
      border-top: 1px solid var(--border-color);
      background: var(--bg);
      transition: all 0.3s ease;
    }
    .footer-inner {
      max-width: 80rem; margin: 0 auto;
      display: flex; flex-direction: column; align-items: center;
      gap: 2rem;
    }
    .footer-brand { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
    .footer-logo { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.125rem; font-weight: 700; color: var(--text-main); }
    .footer-copy { color: var(--text-muted); font-size: 0.875rem; margin: 0; }
    .footer-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; }
    .footer-links a { color: var(--text-muted); font-size: 0.875rem; text-decoration: none; transition: color 0.2s; }
    .footer-links a:hover { color: var(--accent); }
    .footer-social { display: flex; gap: 1rem; }
    .social-btn {
      width: 2.5rem; height: 2.5rem; border-radius: 50%;
      background: var(--card-bg); border: 1px solid var(--border-color);
      display: flex; align-items: center; justify-content: center;
      color: var(--text-main); cursor: pointer; transition: all 0.2s;
    }
    .social-btn:hover { color: #fff; border-color: var(--accent); background: var(--accent); }
    .social-btn .material-symbols-outlined { font-size: 1.25rem; }

    @media (min-width: 768px) {
      .hero-title { font-size: 3.75rem; }
      .footer-inner { flex-direction: row; justify-content: space-between; }
      .footer-brand { align-items: flex-start; }
    }

    @media (max-width: 768px) {
      .hero-inner { padding: 2rem 1.5rem; }
      .hero-title { font-size: 2.25rem; }
      .hero-desc { font-size: 1rem; }
      
      .category-bar { padding: 0 0 1.5rem; top: 60px; }
      .category-bar-inner { padding: 0.75rem 1rem; overflow-x: auto; flex-wrap: nowrap; -webkit-overflow-scrolling: touch; }
      .category-pills { flex-wrap: nowrap; }
      .pill { white-space: nowrap; padding: 0.4rem 1rem; font-size: 0.8rem; }
      .btn-filter { display: none; }

      .shops-grid-section { padding: 0 1rem; }
      .shops-grid { gap: 1.5rem; }
      .shop-image { height: 12rem; }
      .shop-name { font-size: 1.1rem; }
      .btn-view { padding: 0.5rem 1rem; font-size: 0.8rem; }

      .partner-card { border-width: 1px; }
      .partner-inner { padding: 1.5rem; }
      .partner-icon-wrap { width: 4rem; height: 4rem; }
      .partner-icon { font-size: 2rem; }

      .footer-inner { gap: 1.5rem; text-align: center; }
      .footer-links { flex-direction: column; gap: 1rem; }
    }
  `]
})
export class BrowseComponent implements OnInit {
  activeCategory = 'all';
  shops: any[] = [];
  displayShops: any[] = [];
  categories: CategoryDto[] = [];
  
  // New UI state
  isCategoriesExpanded = false;
  showFilters = false;
  filters = {
    openNow: false,
    verifiedOnly: false,
    minRating: 0,
    sortBy: 'popularity'
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadCategories();
    this.loadShops();
  }

  loadCategories() {
    this.apiService.getCategories().subscribe({
      next: (cats) => {
        // Only show categories that have shops
        this.categories = cats.filter(c => c.isShopCategory);
      },
      error: (err) => console.error('Failed to load categories:', err)
    });
  }

  loadShops() {
    this.apiService.getShops().subscribe({
      next: (shops: any[]) => {
        if (shops && shops.length > 0) {
          const apiShops = shops.map((s: any) => ({
            id: s.id,
            name: s.name,
            categoryId: s.categoryId,
            category: s.categoryName || 'Local Business',
            description: s.description || 'Premium local shop offering exceptional quality.',
            image: s.photos && s.photos.length > 0 ? s.photos[0] : 'https://images.unsplash.com/photo-1517248135467-4c7ed9d42177?auto=format&fit=crop&q=80',
            rating: parseFloat((4.0 + Math.random()).toFixed(1)), 
            isOpen: s.isOpen === undefined ? true : s.isOpen, // Default to true if not provided
            isVerified: s.status === 'VERIFIED',
            createdDate: new Date(s.createdAt || Date.now()).getTime(),
            tagColor: 'primary',
            footerLabel: 'Starting from',
            footerValue: s.startingPrice ? '₹' + s.startingPrice : 'No products yet'
          }));
          this.shops = apiShops;
          this.filterShops();
        }
      }
    });
  }

  filterByCategory(categoryId: string) {
    this.activeCategory = categoryId;
    this.filterShops();
  }

  getVisibleCategories() {
    if (this.isCategoriesExpanded) return this.categories;
    const initial = this.categories.slice(0, 10);
    const current = this.categories.find(c => c.id === this.activeCategory);
    // If the selected category is not in the first 10, add it but ensure no duplicates
    if (current && !initial.find(i => i.id === current.id)) {
      initial.push(current);
    }
    return initial;
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  resetFilters() {
    this.filters = {
      openNow: false,
      verifiedOnly: false,
      minRating: 0,
      sortBy: 'popularity'
    };
    this.filterShops();
  }

  filterShops() {
    let filtered = [...this.shops];

    // Filter by Category
    if (this.activeCategory !== 'all') {
      filtered = filtered.filter(s => s.categoryId === this.activeCategory);
    }

    // Filter by Open Now
    if (this.filters.openNow) {
      filtered = filtered.filter(s => s.isOpen);
    }

    // Filter by Verified
    if (this.filters.verifiedOnly) {
      filtered = filtered.filter(s => s.isVerified);
    }

    // Filter by Rating
    if (this.filters.minRating > 0) {
      filtered = filtered.filter(s => s.rating >= this.filters.minRating);
    }

    // Sort
    if (this.filters.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (this.filters.sortBy === 'newest') {
      filtered.sort((a, b) => b.createdDate - a.createdDate);
    }

    this.displayShops = filtered;
  }
}

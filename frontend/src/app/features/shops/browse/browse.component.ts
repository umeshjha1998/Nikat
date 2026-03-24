import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="browse-page">
      <!-- High-Fidelity Search Hub -->
      <section class="search-hub-glass">
        <div class="search-wrapper">
          <div class="search-main-bar">
            <div class="input-group service">
              <span class="material-icons">search</span>
              <input type="text" placeholder="What are you looking for?" [(ngModel)]="searchQuery">
            </div>
            <div class="bar-divider"></div>
            <div class="input-group location">
              <span class="material-icons">location_on</span>
              <input type="text" placeholder="Location">
            </div>
            <button class="btn-search-prime" (click)="onSearch()">
              Search Nikat
            </button>
          </div>

          <div class="quick-tags">
            <span class="tag-label">Popular:</span>
            <button class="q-tag">Haircuts</button>
            <button class="q-tag">Spa & Wellness</button>
            <button class="q-tag">Manicure</button>
            <button class="q-tag">Photography</button>
          </div>
        </div>
      </section>

      <div class="content-container">
        <!-- Sidebar Filters -->
        <aside class="browse-filters">
          <div class="filter-card-glass">
            <div class="filter-header">
              <h3>Filters</h3>
              <button class="reset-link">Clear All</button>
            </div>

            <div class="filter-group">
              <label>Category</label>
              <div class="custom-checks">
                <label *ngFor="let cat of categoryFilters" class="c-check">
                  <input type="checkbox" [checked]="cat.checked">
                  <span class="box"></span>
                  <span class="label">{{cat.name}}</span>
                  <span class="count">24</span>
                </label>
              </div>
            </div>

            <div class="filter-group">
              <label>Price Range</label>
              <div class="price-toggle">
                <button [class.active]="priceLevel === 1" (click)="priceLevel = 1">₹</button>
                <button [class.active]="priceLevel === 2" (click)="priceLevel = 2">₹₹</button>
                <button [class.active]="priceLevel === 3" (click)="priceLevel = 3">₹₹₹</button>
                <button [class.active]="priceLevel === 4" (click)="priceLevel = 4">₹₹₹₹</button>
              </div>
            </div>

            <div class="filter-group">
              <label>Max Distance ({{distance}} km)</label>
              <input type="range" min="1" max="50" [(ngModel)]="distance" class="range-prime">
            </div>

            <div class="filter-group">
              <label>Rating</label>
              <div class="rating-filter">
                <button *ngFor="let star of [5,4,3]" class="r-btn">
                  {{star}}+ <span class="material-icons">star</span>
                </button>
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Results Area -->
        <main class="results-area">
          <header class="results-header">
            <div class="meta">
              <h2>Top Rated Shops <span>({{searchResults.length}} results)</span></h2>
            </div>
            <div class="view-toggles">
              <button [class.active]="viewMode === 'list'" (click)="viewMode = 'list'">
                <span class="material-icons">list</span>
                List
              </button>
              <button [class.active]="viewMode === 'map'" (click)="viewMode = 'map'">
                <span class="material-icons">map</span>
                Map
              </button>
            </div>
          </header>

          <div class="results-grid" [class.map-active]="viewMode === 'map'">
            <div class="list-container">
              <div class="store-card-premium" *ngFor="let shop of searchResults" [routerLink]="['/shops/detail', shop.id]">
                <div class="store-image">
                  <img [src]="shop.image" [alt]="shop.name">
                  <button class="btn-fav" (click)="$event.stopPropagation()">
                    <span class="material-icons">favorite_border</span>
                  </button>
                  <div class="badge-featured" *ngIf="shop.rating >= 4.8">FEATURED</div>
                </div>
                <div class="store-details">
                  <div class="details-top">
                    <div class="title-row">
                      <h3>{{shop.name}}</h3>
                      <span class="material-icons verified" *ngIf="shop.isOpen">verified</span>
                    </div>
                    <div class="rating-row">
                      <span class="stars">
                        <span class="material-icons">star</span>
                        {{shop.rating | number:'1.1-1'}}
                      </span>
                      <span class="count">({{shop.reviews}} reviews)</span>
                    </div>
                  </div>
                  
                  <p class="category">{{shop.category}}</p>
                  <p class="desc">{{shop.description}}</p>

                  <div class="service-previews">
                    <div class="s-pill" *ngFor="let s of ['Fade Cut', 'Hot Shave']">
                      <span class="s-name">{{s}}</span>
                      <span class="s-price">₹450</span>
                    </div>
                  </div>

                  <div class="store-footer">
                    <div class="loc-info">
                      <span class="material-icons">location_on</span>
                      {{shop.distance}} away
                    </div>
                    <button class="btn-book-quick">Book Now</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Map View Placeholder -->
            <div class="map-container" *ngIf="viewMode === 'map'">
              <div class="map-glass">
                <div class="map-placeholder">
                  <span class="material-icons">explore</span>
                  <p>Interactive Map View Loading...</p>
                </div>
                <!-- Mini Overlay Cards on Map -->
                <div class="map-overlay-card">
                  <img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=100" alt="mini">
                  <div class="mini-info">
                    <h4>Urban Fade</h4>
                    <p>4.9 <span class="material-icons">star</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');

    :host {
      --primary: #3b82f6;
      --primary-glow: rgba(59, 130, 246, 0.3);
      --bg-deep: #020410;
      --glass-bg: rgba(13, 18, 45, 0.5);
      --glass-border: rgba(255, 255, 255, 0.08);
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      font-family: 'Manrope', sans-serif;
    }

    .browse-page {
      min-height: 100vh;
      background: #020410;
      background-image: 
        radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.1) 0px, transparent 50%),
        radial-gradient(at 100% 100%, rgba(37, 99, 235, 0.05) 0px, transparent 50%);
      color: var(--text-main);
      padding-top: 1rem;
    }

    /* Search Hub */
    .search-hub-glass {
      max-width: 1200px; margin: 0 auto 3rem;
      background: var(--glass-bg); backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border); border-radius: 2.5rem;
      padding: 1.5rem; box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    }
    .search-wrapper { display: flex; flex-direction: column; gap: 1rem; }
    
    .search-main-bar {
      display: flex; align-items: center; background: rgba(0,0,0,0.2);
      border: 1px solid var(--glass-border); border-radius: 1.75rem; padding: 0.5rem;
    }
    .input-group { display: flex; align-items: center; gap: 0.75rem; padding: 0 1.25rem; flex: 1; }
    .input-group .material-icons { color: var(--primary); font-size: 1.25rem; }
    .input-group input { 
      background: transparent; border: none; color: #fff; width: 100%; outline: none;
      font-size: 1rem; font-family: inherit;
    }
    .bar-divider { width: 1px; height: 30px; background: var(--glass-border); }

    .btn-search-prime {
      background: var(--primary); color: #fff; border: none; padding: 0.85rem 2rem;
      border-radius: 1.5rem; font-weight: 700; cursor: pointer; transition: all 0.3s;
      box-shadow: 0 4px 15px var(--primary-glow);
    }
    .btn-search-prime:hover { transform: translateY(-2px); box-shadow: 0 6px 20px var(--primary-glow); }

    .quick-tags { display: flex; align-items: center; gap: 0.75rem; padding: 0 1rem; }
    .tag-label { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; }
    .q-tag { 
      background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border);
      color: var(--text-muted); padding: 0.4rem 1rem; border-radius: 2rem;
      font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s;
    }
    .q-tag:hover { background: rgba(59, 130, 246, 0.1); border-color: var(--primary); color: #fff; }

    /* Layout */
    .content-container { max-width: 1400px; margin: 0 auto; display: flex; gap: 3rem; padding: 0 2rem; }

    /* Filters */
    .browse-filters { width: 300px; flex-shrink: 0; }
    .filter-card-glass {
      background: var(--glass-bg); backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border); border-radius: 2rem; padding: 2rem;
      position: sticky; top: 100px;
    }
    .filter-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .filter-header h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.25rem; margin: 0; }
    .reset-link { background: none; border: none; color: var(--primary); font-weight: 700; cursor: pointer; font-size: 0.85rem; }

    .filter-group { margin-bottom: 2.5rem; }
    .filter-group label { display: block; font-size: 0.8rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 1rem; }

    .custom-checks { display: flex; flex-direction: column; gap: 0.75rem; }
    .c-check { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; }
    .c-check input { display: none; }
    .c-check .box { width: 18px; height: 18px; border: 2px solid var(--glass-border); border-radius: 4px; position: relative; }
    .c-check input:checked + .box { background: var(--primary); border-color: var(--primary); }
    .c-check input:checked + .box::after { content: 'check'; font-family: 'Material Icons'; font-size: 14px; color: #fff; position: absolute; left: 0; top: 0; }
    .c-check .label { flex: 1; font-size: 0.95rem; color: var(--text-main); }
    .c-check .count { font-size: 0.8rem; color: var(--text-muted); }

    .price-toggle { display: flex; background: rgba(0,0,0,0.2); border-radius: 12px; padding: 4px; }
    .price-toggle button { flex: 1; border: none; background: transparent; color: var(--text-muted); padding: 8px; border-radius: 8px; font-weight: 700; cursor: pointer; }
    .price-toggle button.active { background: var(--primary); color: #fff; }

    .range-prime { width: 100%; accent-color: var(--primary); background: rgba(255,255,255,0.1); height: 6px; border-radius: 3px; -webkit-appearance: none; }

    .rating-filter { display: flex; gap: 0.5rem; }
    .r-btn { flex: 1; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); padding: 8px; border-radius: 12px; color: #fff; display: flex; align-items: center; justify-content: center; gap: 4px; font-weight: 700; cursor: pointer; }
    .r-btn .material-icons { font-size: 14px; color: #f59e0b; }

    /* Results */
    .results-area { flex: 1; }
    .results-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .results-header h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.8rem; font-weight: 800; margin: 0; }
    .results-header h2 span { font-size: 1rem; color: var(--text-muted); font-weight: 400; margin-left: 0.5rem; }

    .view-toggles { display: flex; background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 1rem; padding: 4px; }
    .view-toggles button { background: transparent; border: none; color: var(--text-muted); padding: 8px 16px; border-radius: 0.75rem; font-weight: 700; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
    .view-toggles button.active { background: var(--primary); color: #fff; }
    .view-toggles .material-icons { font-size: 18px; }

    /* Store Card Premium */
    .list-container { display: flex; flex-direction: column; gap: 1.5rem; }
    .store-card-premium {
      display: flex; background: var(--glass-bg); border: 1px solid var(--glass-border);
      border-radius: 2rem; overflow: hidden; height: 260px; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
    }
    .store-card-premium:hover { transform: translateX(8px); border-color: rgba(59, 130, 246, 0.4); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }

    .store-image { width: 300px; position: relative; flex-shrink: 0; }
    .store-image img { width: 100%; height: 100%; object-fit: cover; }
    .btn-fav { position: absolute; top: 1.25rem; right: 1.25rem; width: 40px; height: 40px; border-radius: 50%; background: rgba(0,0,0,0.4); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s; }
    .btn-fav:hover { background: #ef4444; border-color: #ef4444; transform: scale(1.1); }
    .badge-featured { position: absolute; bottom: 1.25rem; left: 1.25rem; background: #fff; color: #000; font-size: 0.7rem; font-weight: 800; padding: 4px 10px; border-radius: 4px; }

    .store-details { flex: 1; padding: 1.75rem 2.25rem; display: flex; flex-direction: column; }
    .details-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; }
    .title-row { display: flex; align-items: center; gap: 0.5rem; }
    .title-row h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; margin: 0; }
    .verified { color: var(--primary); font-size: 1.25rem; }

    .rating-row { display: flex; align-items: center; gap: 0.5rem; }
    .rating-row .stars { color: #f59e0b; font-weight: 800; display: flex; align-items: center; gap: 4px; }
    .rating-row .count { font-size: 0.85rem; color: var(--text-muted); }

    .category { font-size: 0.85rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 1px; margin: 0 0 0.75rem 0; }
    .desc { font-size: 0.95rem; color: var(--text-muted); line-height: 1.5; margin: 0 0 1.25rem 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

    .service-previews { display: flex; gap: 0.75rem; margin-bottom: 1.5rem; }
    .s-pill { background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.2); padding: 6px 12px; border-radius: 10px; display: flex; gap: 0.75rem; font-size: 0.8rem; }
    .s-name { color: var(--text-main); font-weight: 600; }
    .s-price { color: var(--primary); font-weight: 800; }

    .store-footer { margin-top: auto; display: flex; justify-content: space-between; align-items: center; padding-top: 1.25rem; border-top: 1px solid var(--glass-border); }
    .loc-info { display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: var(--text-muted); }
    .loc-info .material-icons { font-size: 1.1rem; }

    .btn-book-quick { background: #fff; color: #000; border: none; padding: 0.75rem 1.75rem; border-radius: 1.25rem; font-weight: 800; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 15px rgba(255,255,255,0.1); }
    .btn-book-quick:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,255,255,0.2); }

    /* Map View */
    .map-container { display: none; height: 700px; border-radius: 2.5rem; overflow: hidden; }
    .results-grid.map-active .list-container { width: 450px; flex-shrink: 0; max-height: 700px; overflow-y: auto; }
    .results-grid.map-active .map-container { display: block; flex: 1; }
    .results-grid.map-active .store-card-premium { height: auto; flex-direction: column; }
    .results-grid.map-active .store-image { width: 100%; height: 180px; }

    .map-glass { width: 100%; height: 100%; background: #0a0e20; border: 1px solid var(--glass-border); position: relative; }
    .map-placeholder { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-muted); gap: 1rem; }
    .map-placeholder .material-icons { font-size: 4rem; opacity: 0.2; }

    .map-overlay-card { position: absolute; top: 10%; left: 10%; background: var(--glass-bg); backdrop-filter: blur(10px); border: 1px solid var(--glass-border); border-radius: 1rem; padding: 0.5rem; display: flex; gap: 0.75rem; width: 180px; box-shadow: 0 10px 25px rgba(0,0,0,0.4); }
    .map-overlay-card img { width: 40px; height: 40px; border-radius: 8px; }
    .map-overlay-card h4 { font-size: 0.85rem; margin: 0; }
    .map-overlay-card p { font-size: 0.75rem; color: #f59e0b; font-weight: 800; display: flex; align-items: center; gap: 2px; }

    @media (max-width: 1024px) {
      .content-container { flex-direction: column; }
      .browse-filters { width: 100%; }
      .filter-card-glass { position: relative; top: 0; }
    }
    @media (max-width: 768px) {
      .search-main-bar { flex-direction: column; border-radius: 1.5rem; }
      .bar-divider { width: 100%; height: 1px; }
      .store-card-premium { height: auto; flex-direction: column; }
      .store-image { width: 100%; height: 200px; }
    }
  `]
})
export class BrowseComponent implements OnInit {
  searchQuery = '';
  viewMode: 'list' | 'map' = 'list';
  priceLevel = 2;
  distance = 10;

  categoryFilters = [
    { name: 'Barbershops', checked: true },
    { name: 'Beauty Salons', checked: false },
    { name: 'Wellness Spas', checked: false },
    { name: 'Home Services', checked: false },
    { name: 'Medical', checked: false }
  ];

  searchResults = [
    { id: 1, name: 'Urban Fade Barbershop', category: 'Salon & Grooming', description: 'Premium men\'s grooming, fades, and traditional hot towel shaves with expert stylists.', image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80', rating: 4.9, reviews: 128, price: '$$', distance: '1.2 km', isOpen: true },
    { id: 2, name: 'Lumière Spa & Skin', category: 'Wellness & Beauty', description: 'Experience pure tranquility with our signature facials, deep tissue massages, and skincare.', image: 'https://images.unsplash.com/photo-1544161515-4ae6ce6fd859?w=800&q=80', rating: 4.8, reviews: 245, price: '₹₹₹', distance: '3.5 km', isOpen: true },
    { id: 3, name: 'The Artist Collective', category: 'Tattoo & Body Art', description: 'Award-winning artists specializing in fine line, traditional, and custom illustrative tattoos.', image: 'https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?w=800&q=80', rating: 5.0, reviews: 92, price: '₹₹₹₹', distance: '0.8 km', isOpen: false }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getShops().subscribe({
      next: (shops: any[]) => {
        if (shops && shops.length > 0) {
          const apiShops = shops.map((s: any) => ({
            id: s.id, 
            name: s.name, 
            category: s.categoryName || 'Local Business',
            description: s.description || 'Premium local service offering exceptional quality and care.', 
            image: s.imageUrl || 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80',
            rating: s.averageRating || (4.0 + Math.random()), 
            reviews: s.reviewCount || Math.floor(Math.random() * 200), 
            price: '₹₹',
            distance: (Math.random() * 5).toFixed(1) + ' km', 
            isOpen: s.status === 'APPROVED'
          }));
          this.searchResults = apiShops;
        }
      }
    });
  }

  onSearch() {
    console.log('Searching for:', this.searchQuery);
  }
}


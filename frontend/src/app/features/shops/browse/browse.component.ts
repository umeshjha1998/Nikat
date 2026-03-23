import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="browse-layout">
      <!-- Search Header -->
      <div class="search-header">
        <div class="search-container">
          <div class="search-bar">
            <span class="material-icons search-icon">search</span>
            <input type="text" placeholder="Search shops, services..." [value]="searchQuery" (input)="searchQuery = $any($event.target).value" (keyup.enter)="onSearch()">
            <button class="btn-glow" (click)="onSearch()">Search</button>
          </div>
          <div class="search-filters">
            <button class="filter-chip" [class.active]="activeFilter === 'all'" (click)="activeFilter = 'all'">All</button>
            <button class="filter-chip" [class.active]="activeFilter === 'top'" (click)="activeFilter = 'top'">Top Rated</button>
            <button class="filter-chip" [class.active]="activeFilter === 'open'" (click)="activeFilter = 'open'">Open Now</button>
            <button class="filter-chip" [class.active]="activeFilter === 'near'" (click)="activeFilter = 'near'">
              Sort: Distance <span class="material-icons">arrow_drop_down</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content Layout -->
      <div class="browse-content">
        <!-- Sidebar Filters -->
        <aside class="filters-sidebar">
          <h3>Filters</h3>
          <div class="filter-group">
            <h4>Category</h4>
            <label class="checkbox-container" *ngFor="let cat of categoryFilters">
              <input type="checkbox" [checked]="cat.checked" (change)="cat.checked = !cat.checked">
              <span class="checkmark"></span>
              {{cat.name}}
            </label>
          </div>
          <div class="filter-group">
            <h4>Distance</h4>
            <input type="range" class="range-slider" min="1" max="50" [value]="distanceFilter" (input)="distanceFilter = $any($event.target).value">
            <div class="range-labels">
              <span>1 mi</span>
              <span>{{distanceFilter}} mi</span>
            </div>
          </div>
          <div class="filter-group">
            <h4>Rating</h4>
            <label class="radio-container" *ngFor="let r of ratingOptions">
              <input type="radio" name="rating" [checked]="r.checked" (change)="selectRating(r)">
              <span class="radio"></span>
              {{r.label}}
            </label>
          </div>
        </aside>

        <!-- Results Grid -->
        <main class="results-main">
          <div class="results-info">
            <h2>Showing {{searchResults.length}} results</h2>
          </div>
          <div class="shop-grid">
            <div class="shop-card" *ngFor="let shop of searchResults" [routerLink]="['/shop', shop.id || 1]">
              <div class="shop-image" [style.backgroundImage]="'url(' + shop.image + ')'">
                <div class="shop-rating">
                  <span class="material-icons">star</span> {{shop.rating}} ({{shop.reviews}})
                </div>
              </div>
              <div class="shop-info">
                <div class="shop-header-row">
                  <h3>{{shop.name}}</h3>
                  <span class="price-tier">{{shop.price}}</span>
                </div>
                <p class="category-label">{{shop.category}}</p>
                <p class="shop-desc">{{shop.description}}</p>
                <div class="shop-meta">
                  <span class="distance"><span class="material-icons">location_on</span> {{shop.distance}}</span>
                  <span class="status" [class.open]="shop.isOpen">{{shop.isOpen ? 'Open Now' : 'Closed'}}</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .browse-layout { background-color: #05092f; min-height: 100vh; }

    .search-header { background-color: #080e38; border-bottom: 1px solid rgba(255,255,255,0.05); padding: 2rem 0; }
    .search-container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
    .search-bar {
      display: flex; background-color: #182056; border-radius: 3rem;
      padding: 0.5rem; border: 1px solid #40456c; box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      align-items: center; margin-bottom: 1.5rem;
    }
    .search-icon { color: #a3a8d5; margin-left: 1rem; margin-right: 0.5rem; font-size: 1.5rem; }
    .search-bar input {
      flex: 1; background: transparent; border: none; color: #e2e3ff;
      font-family: 'Manrope', sans-serif; font-size: 1rem; padding: 0.5rem; outline: none;
    }
    .btn-glow {
      background: linear-gradient(135deg, #5eb4ff, #2aa7ff); border: none; color: #003151;
      font-weight: 700; padding: 0.75rem 2rem; border-radius: 2rem; cursor: pointer;
      font-family: 'Manrope', sans-serif; transition: all 0.2s;
    }
    .btn-glow:hover { box-shadow: 0 6px 20px rgba(94,180,255,0.4); }

    .search-filters { display: flex; gap: 1rem; flex-wrap: wrap; }
    .filter-chip {
      background: transparent; border: 1px solid #40456c; color: #e2e3ff;
      padding: 0.5rem 1rem; border-radius: 2rem; font-size: 0.875rem;
      cursor: pointer; display: flex; align-items: center; gap: 0.25rem; transition: all 0.2s;
    }
    .filter-chip:hover { background: rgba(255,255,255,0.05); }
    .filter-chip.active { background: rgba(94,180,255,0.1); border-color: #5eb4ff; color: #5eb4ff; }
    .filter-chip .material-icons { font-size: 1.25rem; }

    .browse-content { max-width: 1200px; margin: 0 auto; padding: 2rem; display: flex; gap: 2.5rem; }

    .filters-sidebar { width: 250px; flex-shrink: 0; }
    .filters-sidebar h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.25rem; color: #e2e3ff; margin-bottom: 1.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid #40456c; }
    .filter-group { margin-bottom: 2rem; }
    .filter-group h4 { font-size: 1rem; color: #6e739d; margin-bottom: 1rem; }

    .checkbox-container { display: block; position: relative; padding-left: 30px; margin-bottom: 12px; cursor: pointer; font-size: 0.875rem; user-select: none; color: #a3a8d5; }
    .checkbox-container input { position: absolute; opacity: 0; cursor: pointer; height: 0; width: 0; }
    .checkmark { position: absolute; top: 0; left: 0; height: 20px; width: 20px; background: rgba(255,255,255,0.05); border: 1px solid #40456c; border-radius: 4px; }
    .checkbox-container:hover input ~ .checkmark { background: rgba(255,255,255,0.1); }
    .checkbox-container input:checked ~ .checkmark { background: #5eb4ff; border-color: #5eb4ff; }
    .checkmark:after { content: ""; position: absolute; display: none; }
    .checkbox-container input:checked ~ .checkmark:after { display: block; }
    .checkbox-container .checkmark:after { left: 6px; top: 2px; width: 5px; height: 10px; border: solid #003151; border-width: 0 2px 2px 0; transform: rotate(45deg); }

    .range-slider { width: 100%; height: 4px; background: #40456c; outline: none; -webkit-appearance: none; border-radius: 2px; }
    .range-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: #5eb4ff; cursor: pointer; }
    .range-labels { display: flex; justify-content: space-between; margin-top: 0.5rem; font-size: 0.75rem; color: #6e739d; }

    .radio-container { display: block; position: relative; padding-left: 30px; margin-bottom: 12px; cursor: pointer; font-size: 0.875rem; user-select: none; color: #a3a8d5; }
    .radio-container input { position: absolute; opacity: 0; cursor: pointer; }
    .radio { position: absolute; top: 0; left: 0; height: 20px; width: 20px; background: rgba(255,255,255,0.05); border: 1px solid #40456c; border-radius: 50%; }
    .radio-container:hover input ~ .radio { background: rgba(255,255,255,0.1); }
    .radio-container input:checked ~ .radio { border-color: #5eb4ff; }
    .radio:after { content: ""; position: absolute; display: none; }
    .radio-container input:checked ~ .radio:after { display: block; }
    .radio-container .radio:after { top: 4px; left: 4px; width: 10px; height: 10px; border-radius: 50%; background: #5eb4ff; }

    .results-main { flex: 1; }
    .results-info h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.25rem; color: #e2e3ff; margin-bottom: 1.5rem; font-weight: 500; }

    .shop-grid { display: flex; flex-direction: column; gap: 1.5rem; }
    .shop-card {
      display: flex; background: #080e38; border: 1px solid rgba(255,255,255,0.05);
      border-radius: 1rem; overflow: hidden; transition: all 0.25s; cursor: pointer; text-decoration: none;
    }
    .shop-card:hover { border-color: #40456c; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,0,0,0.3); }
    .shop-image { width: 250px; flex-shrink: 0; background-size: cover; background-position: center; position: relative; min-height: 180px; }
    .shop-rating {
      position: absolute; top: 1rem; left: 1rem; background: rgba(5,9,47,0.85);
      backdrop-filter: blur(4px); padding: 0.25rem 0.5rem; border-radius: 1rem;
      font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.25rem; color: #e2e3ff;
    }
    .shop-rating .material-icons { font-size: 1rem; color: #F59E0B; }
    .shop-info { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
    .shop-header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.25rem; }
    .shop-header-row h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.25rem; color: #e2e3ff; }
    .price-tier { font-weight: 600; color: #6e739d; }
    .category-label { font-size: 0.875rem; color: #5eb4ff; margin-bottom: 0.75rem; }
    .shop-desc { font-size: 0.875rem; color: #a3a8d5; line-height: 1.5; margin-bottom: 1.5rem; }
    .shop-meta { display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem; margin-top: auto; }
    .distance { display: flex; align-items: center; gap: 0.25rem; color: #a3a8d5; }
    .distance .material-icons { font-size: 1rem; }
    .status { font-weight: 600; color: #6e739d; }
    .status.open { color: #6bfe9c; }

    @media (max-width: 768px) {
      .browse-content { flex-direction: column; }
      .filters-sidebar { width: 100%; display: none; }
      .shop-card { flex-direction: column; }
      .shop-image { width: 100%; height: 200px; }
    }
  `]
})
export class BrowseComponent implements OnInit {
  searchQuery = '';
  activeFilter = 'all';
  distanceFilter = 10;

  categoryFilters = [
    { name: 'Barbershops', checked: true },
    { name: 'Salons', checked: false },
    { name: 'Spas', checked: false },
    { name: 'Restaurants', checked: false },
    { name: 'Cafes', checked: false },
    { name: 'Fitness', checked: false }
  ];

  ratingOptions = [
    { label: 'Any', checked: false },
    { label: '4+ Stars', checked: true },
    { label: '4.5+ Stars', checked: false }
  ];

  searchResults = [
    { id: 1, name: 'Urban Fade Barbershop', category: 'Salon & Grooming', description: 'Premium men\'s grooming, fades, and traditional hot towel shaves.', image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80', rating: 4.9, reviews: 128, price: '$$', distance: '1.2 miles', isOpen: true },
    { id: 2, name: 'Classic Cuts & Shaves', category: 'Barbershop', description: 'Old-school atmosphere with modern styles. Specializing in classic cuts and detailed beard trimming.', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80', rating: 4.7, reviews: 89, price: '$', distance: '2.5 miles', isOpen: true },
    { id: 3, name: 'The Gentle Blade', category: 'Barbershop', description: 'Upscale grooming with complimentary beverages, straight razor shaves, and style consultations.', image: 'https://images.unsplash.com/photo-1532710093739-9470acff878b?w=800&q=80', rating: 4.5, reviews: 42, price: '$$$', distance: '3.1 miles', isOpen: false }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getShops().subscribe({
      next: (shops: any[]) => {
        if (shops && shops.length > 0) {
          this.searchResults = shops.map((s: any) => ({
            id: s.id, name: s.name, category: s.categoryName || 'Local Business',
            description: s.description || '', image: s.imageUrl || this.searchResults[0]?.image,
            rating: s.averageRating || 4.5, reviews: s.reviewCount || 0, price: '$$',
            distance: '1.0 mi', isOpen: s.status === 'APPROVED'
          }));
        }
      }
    });
  }

  onSearch() {}

  selectRating(selected: any) {
    this.ratingOptions.forEach(r => r.checked = false);
    selected.checked = true;
  }
}

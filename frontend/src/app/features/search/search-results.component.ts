import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="search-page">
      <div class="search-header">
        <div class="search-container">
          <div class="search-bar">
            <span class="material-icons">search</span>
            <input type="text" [value]="query" (input)="query = $any($event.target).value" (keyup.enter)="doSearch()" placeholder="Search shops, services...">
            <button class="btn-glow" (click)="doSearch()">Search</button>
          </div>
          <div class="filter-row">
            <button class="filter-chip" [class.active]="filter === 'all'" (click)="filter = 'all'">All</button>
            <button class="filter-chip" [class.active]="filter === 'shops'" (click)="filter = 'shops'">Shops</button>
            <button class="filter-chip" [class.active]="filter === 'services'" (click)="filter = 'services'">Services</button>
            <button class="filter-chip" [class.active]="filter === 'top'" (click)="filter = 'top'">Top Rated</button>
            <button class="filter-chip" [class.active]="filter === 'open'" (click)="filter = 'open'">Open Now</button>
          </div>
        </div>
      </div>

      <div class="results-content">
        <p class="results-count">Showing {{results.length}} results for "{{query}}"</p>
        <div class="results-grid">
          <div class="result-card" *ngFor="let r of results" [routerLink]="r.type === 'shop' ? ['/shop', r.id] : ['/services']">
            <div class="result-image" [style.backgroundImage]="'url(' + r.image + ')'">
              <div class="result-rating"><span class="material-icons">star</span> {{r.rating}}</div>
              <span class="result-type-badge">{{r.type === 'shop' ? 'Shop' : 'Service'}}</span>
            </div>
            <div class="result-info">
              <h3>{{r.name}}</h3>
              <p class="result-category">{{r.category}}</p>
              <p class="result-desc">{{r.description}}</p>
              <div class="result-meta">
                <span><span class="material-icons">location_on</span> {{r.distance}}</span>
                <span class="status" [class.open]="r.isOpen">{{r.isOpen ? 'Open Now' : 'Closed'}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-page {
      background: radial-gradient(circle at 15% 50%, rgba(20, 30, 80, 0.5), transparent 50%), radial-gradient(circle at 85% 30%, rgba(26, 45, 94, 0.6), transparent 50%), #05092f;
      min-height: 100vh; color: #e2e3ff;
    }

    .search-header {
      background: rgba(8, 14, 56, 0.45);
      backdrop-filter: blur(16px);
      padding: 2.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .search-container { max-width: 1000px; margin: 0 auto; padding: 0 2rem; }
    .search-bar {
      display: flex; align-items: center; background: rgba(8, 14, 56, 0.45); border-radius: 3rem;
      padding: 0.5rem; border: 1px solid rgba(255, 255, 255, 0.08); margin-bottom: 1.25rem;
      backdrop-filter: blur(10px);
      box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    .search-bar .material-icons { color: #a3a8d5; margin-left: 1rem; margin-right: 0.5rem; font-size: 1.5rem; }
    .search-bar input {
      flex: 1; background: transparent; border: none; color: #e2e3ff;
      font-family: 'Manrope', sans-serif; font-size: 1rem; padding: 0.75rem 0.5rem; outline: none;
    }
    .btn-glow {
      background: linear-gradient(135deg, #5eb4ff, #2aa7ff); border: none; color: #003151;
      font-weight: 700; padding: 0.85rem 2rem; border-radius: 2rem; cursor: pointer;
      font-family: 'Manrope', sans-serif; font-size: 0.95rem; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .btn-glow:hover { box-shadow: 0 6px 20px rgba(94,180,255,0.4); transform: translateY(-2px); }

    .filter-row { display: flex; gap: 0.75rem; flex-wrap: wrap; }
    .filter-chip {
      background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); color: #a3a8d5;
      padding: 0.6rem 1.25rem; border-radius: 2rem; font-size: 0.85rem;
      font-weight: 600; cursor: pointer; transition: all 0.2s ease;
      backdrop-filter: blur(10px);
    }
    .filter-chip:hover { background: rgba(255, 255, 255, 0.08); color: #e2e3ff; }
    .filter-chip.active { background: rgba(94,180,255,0.15); border-color: #5eb4ff; color: #5eb4ff; }

    .results-content { max-width: 1000px; margin: 0 auto; padding: 3rem 2rem; }
    .results-count { color: #a3a8d5; font-size: 0.95rem; margin-bottom: 2rem; font-weight: 500; }

    .results-grid { display: flex; flex-direction: column; gap: 1.5rem; }
    .result-card {
      display: flex;
      background: rgba(8, 14, 56, 0.35); border-radius: 1.25rem; overflow: hidden;
      cursor: pointer; transition: all 0.3s ease; text-decoration: none;
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.06);
    }
    .result-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.3), 0 0 20px rgba(94, 180, 255, 0.1); border-color: rgba(94, 180, 255, 0.3); }
    .result-image {
      width: 260px; flex-shrink: 0; background-size: cover; background-position: center;
      position: relative; min-height: 200px;
    }
    .result-rating {
      position: absolute; top: 0.75rem; left: 0.75rem;
      background: rgba(5,9,47,0.85); backdrop-filter: blur(8px);
      padding: 0.25rem 0.5rem; border-radius: 1rem; font-size: 0.8rem;
      font-weight: 700; color: #e2e3ff; display: flex; align-items: center; gap: 0.2rem;
    }
    .result-rating .material-icons { font-size: 0.85rem; color: #F59E0B; }
    .result-type-badge {
      position: absolute; bottom: 0.75rem; left: 0.75rem;
      background: rgba(94,180,255,0.2); color: #5eb4ff;
      padding: 0.2rem 0.6rem; border-radius: 1rem; font-size: 0.7rem;
      font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
    }
    .result-info { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; }
    .result-info h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.2rem; font-weight: 700; color: #e2e3ff; margin-bottom: 0.3rem; }
    .result-category { font-size: 0.8rem; color: #5eb4ff; font-weight: 600; margin-bottom: 0.5rem; }
    .result-desc { font-size: 0.85rem; color: #a3a8d5; line-height: 1.5; margin-bottom: 1rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .result-meta { display: flex; justify-content: space-between; font-size: 0.8rem; color: #a3a8d5; margin-top: auto; }
    .result-meta span { display: flex; align-items: center; gap: 0.2rem; }
    .result-meta .material-icons { font-size: 0.9rem; }
    .status { font-weight: 700; color: #6e739d; }
    .status.open { color: #6bfe9c; }

    @media (max-width: 768px) {
      .result-card { flex-direction: column; }
      .result-image { width: 100%; height: 200px; }
    }
  `]
})
export class SearchResultsComponent {
  query = 'Barber';
  filter = 'all';
  results = [
    { id: 1, name: 'Urban Fade Barbershop', type: 'shop', category: 'Salon & Grooming', description: 'Premium men\'s grooming, fades, and hot towel shaves by master barbers.', image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80', rating: 4.9, distance: '1.2 mi', isOpen: true },
    { id: 2, name: 'Classic Cuts & Shaves', type: 'shop', category: 'Barbershop', description: 'Old-school atmosphere with modern styles. Classic cuts, fades, and beard trimming.', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80', rating: 4.7, distance: '2.5 mi', isOpen: true },
    { id: 3, name: 'The Gentle Blade', type: 'service', category: 'Mobile Grooming', description: 'Upscale grooming at your doorstep. Straight razor shaves and style consultations.', image: 'https://images.unsplash.com/photo-1532710093739-9470acff878b?w=800&q=80', rating: 4.5, distance: '3.1 mi', isOpen: false },
    { id: 4, name: 'Velvet Cut Studio', type: 'shop', category: 'Hair Salon', description: 'Traditional grooming with a modern twist. The neighborhood\'s finest for over a decade.', image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80', rating: 4.8, distance: '0.5 mi', isOpen: true }
  ];

  constructor(private router: Router) {}
  doSearch() { /* implement search logic */ }
}

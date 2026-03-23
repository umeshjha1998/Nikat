import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService, ServiceDto } from '../../core/api.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-container">
      <header class="page-header">
        <div class="header-content">
          <a routerLink="/" class="brand-logo">Nikat</a>
          <nav class="nav-links">
            <a routerLink="/browse">Shops</a>
            <a routerLink="/services" class="active">Services</a>
            <a routerLink="/community">Community</a>
          </nav>
        </div>
      </header>

      <main class="main-content">
        <div class="hero-section">
          <h1>Find Local Services</h1>
          <p>Discover trusted service providers in your area</p>
        </div>

        <div class="services-grid" *ngIf="services.length > 0; else noServices">
          <div class="service-card" *ngFor="let svc of services">
            <div class="card-badge" *ngIf="svc.isFeatured">Featured</div>
            <div class="card-header">
              <span class="material-symbols-outlined">engineering</span>
              <div class="card-meta">
                <h3>{{ svc.name }}</h3>
                <span class="category-tag">{{ svc.categoryName }}</span>
              </div>
            </div>
            <p class="card-description">{{ svc.description }}</p>
            <div class="card-details">
              <div class="detail"><span class="material-symbols-outlined">location_on</span>{{ svc.serviceArea }}</div>
              <div class="detail"><span class="material-symbols-outlined">payments</span>₹{{ svc.baseCharge }}</div>
              <div class="detail"><span class="material-symbols-outlined">schedule</span>{{ svc.startTime }} - {{ svc.endTime }}</div>
            </div>
            <div class="card-provider">By {{ svc.providerName }}</div>
          </div>
        </div>

        <ng-template #noServices>
          <div class="empty-state">
            <span class="material-symbols-outlined">search_off</span>
            <h2>No services available yet</h2>
            <p>Check back later for local service listings</p>
          </div>
        </ng-template>
      </main>
    </div>
  `,
  styles: [`
    .page-container { min-height: 100vh; background: #05092f; color: #e2e3ff; }
    .page-header { background: rgba(14, 20, 66, 0.9); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(110, 115, 157, 0.15); padding: 1rem 2rem; position: sticky; top: 0; z-index: 100; }
    .header-content { display: flex; align-items: center; justify-content: space-between; max-width: 1200px; margin: 0 auto; }
    .brand-logo { font-size: 1.5rem; font-weight: 900; background: linear-gradient(135deg, #5eb4ff, #2aa7ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-decoration: none; }
    .nav-links { display: flex; gap: 1.5rem; }
    .nav-links a { color: #6e739d; text-decoration: none; font-weight: 500; transition: color 0.2s; }
    .nav-links a:hover, .nav-links a.active { color: #5eb4ff; }
    .main-content { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    .hero-section { text-align: center; margin-bottom: 3rem; padding: 2rem 0; }
    .hero-section h1 { font-size: 2.5rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #5eb4ff, #84c9fd); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .hero-section p { color: #6e739d; font-size: 1.125rem; }
    .services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1.5rem; }
    .service-card {
      background: rgba(24, 32, 86, 0.5); border: 1px solid rgba(110, 115, 157, 0.2);
      border-radius: 1rem; padding: 1.5rem; transition: all 0.3s; position: relative; overflow: hidden;
    }
    .service-card:hover { border-color: rgba(94, 180, 255, 0.3); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3); }
    .card-badge { position: absolute; top: 1rem; right: 1rem; background: linear-gradient(135deg, #5eb4ff, #2aa7ff); color: #003151; font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 1rem; }
    .card-header { display: flex; gap: 1rem; align-items: flex-start; margin-bottom: 1rem; }
    .card-header > .material-symbols-outlined { font-size: 2.5rem; color: #5eb4ff; background: rgba(94, 180, 255, 0.1); padding: 0.5rem; border-radius: 0.75rem; }
    .card-meta h3 { margin: 0 0 0.25rem; font-size: 1.125rem; color: #e2e3ff; }
    .category-tag { font-size: 0.75rem; color: #9da2d3; background: rgba(110, 115, 157, 0.15); padding: 0.2rem 0.6rem; border-radius: 0.5rem; }
    .card-description { color: #9da2d3; font-size: 0.875rem; margin-bottom: 1rem; line-height: 1.5; }
    .card-details { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1rem; }
    .detail { display: flex; align-items: center; gap: 0.25rem; font-size: 0.8rem; color: #6e739d; }
    .detail .material-symbols-outlined { font-size: 1rem; color: #5eb4ff; }
    .card-provider { font-size: 0.8rem; color: #6e739d; border-top: 1px solid rgba(110, 115, 157, 0.15); padding-top: 0.75rem; }
    .empty-state { text-align: center; padding: 4rem 2rem; }
    .empty-state .material-symbols-outlined { font-size: 4rem; color: #6e739d; margin-bottom: 1rem; }
    .empty-state h2 { color: #e2e3ff; margin-bottom: 0.5rem; }
    .empty-state p { color: #6e739d; }
  `]
})
export class ServicesComponent implements OnInit {
  services: ServiceDto[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getServices().subscribe({
      next: (data) => this.services = data,
      error: () => this.services = []
    });
  }
}

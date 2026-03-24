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
    .page-container { 
      min-height: 100vh; 
      background: radial-gradient(circle at 15% 50%, rgba(20, 30, 80, 0.5), transparent 50%), radial-gradient(circle at 85% 30%, rgba(26, 45, 94, 0.6), transparent 50%), #05092f;
      color: #e2e3ff; 
    }
    
    .glass-panel {
      background: rgba(8, 14, 56, 0.45);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1.5rem;
      padding: 1.5rem;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(94, 180, 255, 0.1);
    }

    .page-header { background: rgba(8, 14, 56, 0.65); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding: 1.25rem 2.5rem; position: sticky; top: 0; z-index: 100; box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
    .header-content { display: flex; align-items: center; justify-content: space-between; max-width: 1200px; margin: 0 auto; }
    .brand-logo { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.75rem; font-weight: 800; background: linear-gradient(135deg, #5eb4ff, #2aa7ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-decoration: none; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
    .nav-links { display: flex; gap: 2rem; }
    .nav-links a { color: #a3a8d5; text-decoration: none; font-weight: 600; font-size: 0.95rem; transition: all 0.2s; padding: 0.5rem 0.25rem; border-bottom: 2px solid transparent; }
    .nav-links a:hover { color: #e2e3ff; }
    .nav-links a.active { color: #5eb4ff; border-bottom-color: #5eb4ff; text-shadow: 0 0 10px rgba(94,180,255,0.4); }

    .main-content { max-width: 1200px; margin: 0 auto; padding: 3rem 2rem; }
    .hero-section { text-align: center; margin-bottom: 4rem; padding: 2rem 0; }
    .hero-section h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 3rem; font-weight: 800; margin-bottom: 1rem; color: #e2e3ff; text-shadow: 0 4px 12px rgba(0,0,0,0.4); }
    .hero-section p { color: #a3a8d5; font-size: 1.25rem; font-weight: 400; max-width: 600px; margin: 0 auto; line-height: 1.6; }

    .services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1.75rem; }
    .service-card {
      background: rgba(8, 14, 56, 0.45); backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1.25rem; padding: 1.75rem; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); 
      position: relative; overflow: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    }
    .service-card:hover { border-color: rgba(94, 180, 255, 0.4); transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(94, 180, 255, 0.15); }
    
    .card-badge { 
      position: absolute; top: 1.25rem; right: 1.25rem; 
      background: linear-gradient(135deg, #5eb4ff, #2aa7ff); color: #003151; 
      font-size: 0.75rem; font-weight: 800; padding: 0.3rem 0.85rem; border-radius: 2rem; 
      box-shadow: 0 4px 10px rgba(94, 180, 255, 0.3); text-transform: uppercase; letter-spacing: 0.05em;
    }
    
    .card-header { display: flex; gap: 1.25rem; align-items: flex-start; margin-bottom: 1.25rem; }
    .card-header > .material-symbols-outlined { 
      font-size: 2.25rem; color: #5eb4ff; background: rgba(94, 180, 255, 0.15); 
      padding: 0.75rem; border-radius: 1rem; border: 1px solid rgba(94, 180, 255, 0.2);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    .card-meta h3 { margin: 0 0 0.5rem; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.25rem; color: #e2e3ff; font-weight: 700; }
    .category-tag { font-size: 0.75rem; color: #8fd2ff; background: rgba(94, 180, 255, 0.15); padding: 0.3rem 0.75rem; border-radius: 2rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border: 1px solid rgba(94, 180, 255, 0.2); }
    
    .card-description { color: #a3a8d5; font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.6; }
    
    .card-details { display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.5rem; }
    .detail { display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; color: #e2e3ff; font-weight: 500; }
    .detail .material-symbols-outlined { font-size: 1.1rem; color: #5eb4ff; opacity: 0.8; }
    
    .card-provider { font-size: 0.9rem; color: #6e739d; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 1.25rem; font-weight: 500; }
    
    .empty-state { text-align: center; padding: 5rem 2rem; display: flex; flex-direction: column; align-items: center; }
    .empty-state .material-symbols-outlined { font-size: 4.5rem; color: rgba(110, 115, 157, 0.5); margin-bottom: 1.5rem; }
    .empty-state h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; color: #e2e3ff; margin-bottom: 0.75rem; }
    .empty-state p { color: #a3a8d5; font-size: 1.05rem; }

    @media (max-width: 768px) {
      .header-content { flex-direction: column; gap: 1rem; }
      .hero-section h1 { font-size: 2.25rem; }
      .services-grid { grid-template-columns: 1fr; }
    }
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

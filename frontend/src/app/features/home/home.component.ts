import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="landing-premium-wrapper">
      <!-- Hero Section -->
      <header class="hero-premium">
        <div class="hero-visual-layer">
          <div class="glow-orb orb-gold"></div>
          <div class="glow-orb orb-blue"></div>
          <div class="grid-mesh"></div>
        </div>
        
        <div class="hero-content">
          <div class="badge-float">
            <span class="material-icons">verified</span>
            Trusted by 20,000+ Locals
          </div>
          <h1 class="hero-title">
            The heart of your city, <br>
            <span class="text-gradient">all in one place.</span>
          </h1>
          <p class="hero-desc">
            Discover elite services, artisanal shops, and the vibrant pulse of your neighborhood. 
            Nikat is your gateway to local excellence.
          </p>
          
          <div class="search-container-premium">
            <div class="s-input-group">
              <span class="material-icons">search</span>
              <input type="text" placeholder="What are you looking for today?" [(ngModel)]="searchQuery" (keyup.enter)="onSearch()">
            </div>
            <button class="btn-action-glow" (click)="onSearch()">Find Now</button>
          </div>

          <div class="hero-quick-filters">
            <span class="f-label">Quick Search:</span>
            <button class="f-item" *ngFor="let tag of quickTags" (click)="onTagClick(tag)">
              <span class="material-icons">{{tag.icon}}</span>
              {{tag.label}}
            </button>
          </div>
        </div>
      </header>

      <!-- Featured Experience -->
      <section class="experience-showcase">
        <div class="container">
          <div class="showcase-header">
            <div class="sh-left">
              <h2>Curated Experiences</h2>
              <p>Hand-picked services that define quality in your area.</p>
            </div>
            <button class="btn-outline-glass" routerLink="/browse">View All</button>
          </div>

          <div class="showcase-grid">
            <div class="exp-card" *ngFor="let shop of nearbyShops" [routerLink]="['/shop', shop.id || 1]">
              <div class="exp-img-wrap">
                <img [src]="shop.image" alt="Shop">
                <div class="exp-overlay">
                  <div class="e-rating">
                    <span class="material-icons">star</span>
                    {{shop.rating}}
                  </div>
                  <div class="e-badge" *ngIf="shop.featured">Featured</div>
                </div>
              </div>
              <div class="exp-details">
                <div class="e-cat">{{shop.category}}</div>
                <h3>{{shop.name}}</h3>
                <div class="e-meta">
                  <span><span class="material-icons">near_me</span> {{shop.distance}}</span>
                  <span class="dot"></span>
                  <span>{{shop.priceLevel}}</span>
                  <span class="status-dot" [class.open]="shop.isOpen"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- The Nikat Ecosystem (Stats) -->
      <section class="ecosystem-section">
        <div class="eco-grid">
          <div class="eco-item">
            <h2 class="eco-val">2.4k+</h2>
            <p>Active Listings</p>
          </div>
          <div class="eco-divider"></div>
          <div class="eco-item">
            <h2 class="eco-val">150+</h2>
            <p>Neighborhood Nodes</p>
          </div>
          <div class="eco-divider"></div>
          <div class="eco-item">
            <h2 class="eco-val">48k</h2>
            <p>Annual Bookings</p>
          </div>
        </div>
      </section>

      <!-- Business Propulsion Banner -->
      <section class="business-propulsion">
        <div class="prop-card">
          <div class="prop-content">
            <span class="prop-badge">Partner with Nikat</span>
            <h2>Scale your business <br>with precision.</h2>
            <p>Join the ecosystem of elite service providers and reach customers who value excellence.</p>
            <div class="prop-actions">
              <button class="btn-prime-glow" routerLink="/register">Register Business</button>
              <button class="btn-text-white" routerLink="/login">Merchant Login <span class="material-icons">arrow_right_alt</span></button>
            </div>
          </div>
          <div class="prop-visual">
            <div class="v-rect">
              <span class="material-icons">trending_up</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer Premium -->
      <footer class="footer-premium">
        <div class="f-top">
          <div class="f-col-brand">
            <div class="nav-brand">
              <div class="brand-hexagon-small">
                <span class="material-icons">architecture</span>
              </div>
              <h1>Nikat</h1>
            </div>
            <p>Redefining local discovery through modern technology and community spirit.</p>
            <div class="f-social">
              <a href="#"><span class="material-icons">language</span></a>
              <a href="#"><span class="material-icons">chat</span></a>
              <a href="#"><span class="material-icons">alternate_email</span></a>
            </div>
          </div>
          <div class="f-links-wrap">
            <div class="f-col">
              <h4>Platform</h4>
              <a routerLink="/browse">Discovery</a>
              <a routerLink="/community">Community</a>
              <a routerLink="/services">Find Experts</a>
            </div>
            <div class="f-col">
              <h4>Resources</h4>
              <a routerLink="/help">Center</a>
              <a href="#">Security</a>
              <a href="#">Privacy</a>
            </div>
            <div class="f-col">
              <h4>Ownership</h4>
              <a routerLink="/admin-login">Admin Login</a>
              <a routerLink="/login">Merchant Hub</a>
              <a routerLink="/register">Join Partner Program</a>
            </div>
          </div>
        </div>
        <div class="f-bottom">
          <p>© 2024 Nikat Co. Empowering communities worldwide.</p>
          <div class="f-utils">
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
            <a href="#">Legal</a>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Manrope:wght@500;600;700;800&display=swap');

    :host {
      font-family: 'Manrope', sans-serif;
    }

    .landing-premium-wrapper { background: var(--bg); color: var(--text-main); min-height: 100vh; overflow-x: hidden; transition: all 0.3s ease; }

    /* Hero */
    .hero-premium { min-height: 80vh; position: relative; display: flex; align-items: center; justify-content: center; text-align: center; padding: 4rem 2rem; }
    .hero-visual-layer { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
    .glow-orb { position: absolute; width: 600px; height: 600px; border-radius: 50%; filter: blur(150px); opacity: 0.15; }
    .orb-gold { background: #f59e0b; top: -10%; right: -10%; }
    .orb-blue { background: #3b82f6; bottom: -10%; left: -10%; }
    .grid-mesh { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 40px 40px; }

    .hero-content { position: relative; z-index: 10; max-width: 900px; }
    .badge-float { display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.2); color: var(--primary); padding: 0.5rem 1.25rem; border-radius: 2rem; font-size: 0.85rem; font-weight: 700; margin-bottom: 2rem; }
    .hero-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 5rem; font-weight: 800; line-height: 1.05; margin: 0 0 2rem; letter-spacing: -0.04em; }
    .text-gradient { background: linear-gradient(135deg, #fff 0%, #94a3b8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .hero-desc { font-size: 1.35rem; color: var(--text-muted); line-height: 1.6; max-width: 700px; margin: 0 auto 3.5rem; }

    .search-container-premium { background: var(--card-bg); backdrop-filter: blur(20px); border: 1px solid var(--glass-border); padding: 0.75rem; border-radius: 2rem; display: flex; align-items: center; gap: 1rem; max-width: 680px; margin: 0 auto 2.5rem; box-shadow: 0 20px 50px rgba(0,0,0,0.2); transition: all 0.3s ease; }
    .s-input-group { flex: 1; display: flex; align-items: center; gap: 1rem; padding-left: 1.25rem; }
    .s-input-group .material-icons { color: var(--text-muted); }
    .s-input-group input { background: transparent; border: none; color: var(--text-main); font-size: 1.1rem; width: 100%; outline: none; }
    .btn-action-glow { background: var(--primary); border: none; color: #fff; padding: 1rem 2rem; border-radius: 1.5rem; font-weight: 800; cursor: pointer; transition: 0.2s; }
    .btn-action-glow:hover { transform: scale(1.02); }

    .hero-quick-filters { display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; }
    .f-label { font-size: 0.85rem; color: var(--text-muted); font-weight: 700; }
    .f-item { background: var(--glass); border: 1px solid var(--glass-border); color: var(--text-muted); padding: 0.5rem 1.25rem; border-radius: 2rem; display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: 0.2s; }
    .f-item:hover { color: #fff; border-color: var(--primary); background: rgba(59,130,246,0.1); }
    .f-item .material-icons { font-size: 1.1rem; color: var(--primary); }

    /* Showcase */
    .experience-showcase { padding: 8rem 0; background: linear-gradient(180deg, var(--bg) 0%, #080c24 100%); }
    .container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
    .showcase-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 4rem; }
    .sh-left h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.5rem; font-weight: 800; margin: 0 0 0.5rem; }
    .sh-left p { font-size: 1.1rem; color: var(--text-muted); }
    .btn-outline-glass { background: var(--glass); border: 1px solid var(--glass-border); color: #fff; padding: 0.75rem 1.75rem; border-radius: 1rem; font-weight: 700; cursor: pointer; }

    .showcase-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
    .exp-card { background: rgba(255,255,255,0.02); border: 1px solid var(--glass-border); border-radius: 2rem; overflow: hidden; transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); cursor: pointer; }
    .exp-card:hover { transform: translateY(-12px); border-color: var(--primary); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
    .exp-img-wrap { position: relative; height: 260px; overflow: hidden; }
    .exp-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: 0.6s; }
    .exp-card:hover .exp-img-wrap img { transform: scale(1.1); }
    .exp-overlay { position: absolute; inset: 0; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; background: linear-gradient(to bottom, rgba(0,0,0,0.3), transparent 40%, rgba(0,0,0,0.6)); }
    .e-rating { align-self: flex-end; background: rgba(0,0,0,0.7); backdrop-filter: blur(8px); padding: 0.4rem 0.8rem; border-radius: 1rem; font-weight: 800; font-size: 0.85rem; display: flex; align-items: center; gap: 4px; }
    .e-rating .material-icons { font-size: 1rem; color: #f59e0b; }
    .e-badge { background: var(--primary); color: #fff; padding: 0.4rem 1rem; border-radius: 2rem; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; width: fit-content; }

    .exp-details { padding: 1.5rem 2rem 2.25rem; }
    .e-cat { font-size: 0.75rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.75rem; }
    .exp-details h3 { font-size: 1.4rem; font-weight: 800; margin: 0 0 1rem; }
    .e-meta { display: flex; align-items: center; gap: 0.75rem; color: var(--text-muted); font-size: 0.85rem; font-weight: 700; }
    .e-meta .material-icons { font-size: 1rem; }
    .dot { width: 4px; height: 4px; border-radius: 50%; background: var(--glass-border); }
    .status-dot { width: 8px; height: 8px; border-radius: 50%; background: #4b5563; margin-left: auto; }
    .status-dot.open { background: var(--accent); box-shadow: 0 0 10px var(--accent); }

    /* Ecosystem */
    .ecosystem-section { padding: 6rem 0; border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border); }
    .eco-grid { max-width: 1000px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; text-align: center; }
    .eco-val { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 3.5rem; font-weight: 800; margin: 0 0 0.5rem; background: linear-gradient(135deg, #fff, #64748b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .eco-grid p { font-size: 1rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
    .eco-divider { width: 1px; height: 80px; background: var(--glass-border); }

    /* Propulsion */
    .business-propulsion { padding: 10rem 2rem; }
    .prop-card { max-width: 1100px; margin: 0 auto; background: linear-gradient(135deg, #0a113d, #020410); border: 1px solid var(--glass-border); border-radius: 3rem; padding: 5rem; display: flex; justify-content: space-between; align-items: center; position: relative; overflow: hidden; }
    .prop-card::after { content: ''; position: absolute; top: -50%; right: -20%; width: 500px; height: 500px; background: var(--primary); border-radius: 50%; filter: blur(200px); opacity: 0.1; }
    .prop-content { max-width: 600px; position: relative; z-index: 5; }
    .prop-badge { color: var(--primary); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 1.5rem; }
    .prop-content h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 3rem; font-weight: 800; margin: 0 0 1.5rem; line-height: 1.1; }
    .prop-content p { font-size: 1.25rem; color: var(--text-muted); margin-bottom: 3rem; line-height: 1.6; }
    .prop-actions { display: flex; align-items: center; gap: 2rem; }
    .btn-text-white { background: transparent; border: none; color: #e2e8f0; font-weight: 700; display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }

    .prop-visual { width: 160px; height: 160px; background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.2); border-radius: 3rem; display: flex; align-items: center; justify-content: center; transform: rotate(15deg); }
    .v-rect .material-icons { font-size: 5rem; color: var(--primary); }

    /* Footer */
    .footer-premium { background: var(--bg); border-top: 1px solid var(--border-color); padding: 8rem 4rem 4rem; }
    .f-top { display: flex; gap: 10rem; margin-bottom: 8rem; }
    .f-col-brand { max-width: 340px; }
    .f-col-brand p { color: var(--text-muted); margin: 2rem 0; line-height: 1.6; font-weight: 600; }
    .f-social { display: flex; gap: 1.5rem; }
    .f-social a { color: var(--text-muted); transition: 0.2s; }
    .f-social a:hover { color: #fff; }

    .f-links-wrap { flex: 1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 4rem; }
    .f-col h4 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; font-weight: 800; margin-bottom: 2rem; }
    .f-col a { display: block; color: var(--text-muted); text-decoration: none; margin-bottom: 1.25rem; font-weight: 600; font-size: 0.95rem; transition: 0.2s; }
    .f-col a:hover { color: #fff; }

    .f-bottom { border-top: 1px solid rgba(255,255,255,0.05); padding-top: 3rem; display: flex; justify-content: space-between; align-items: center; color: var(--text-muted); font-size: 0.9rem; }
    .f-utils { display: flex; gap: 3rem; }
    .f-utils a { color: var(--text-muted); text-decoration: none; }

    @media (max-width: 1200px) {
      .hero-title { font-size: 3.5rem; }
      .f-top { flex-direction: column; gap: 4rem; }
      .showcase-grid { grid-template-columns: repeat(2, 1fr); }
    }
  `]
})
export class HomeComponent implements OnInit {
  searchQuery = '';
  currentYear = new Date().getFullYear();

  quickTags = [
    { label: 'Near me', icon: 'near_me' },
    { label: 'Top Rated', icon: 'star' },
    { label: 'Wellness', icon: 'spa' },
    { label: 'Saved', icon: 'bookmark' }
  ];

  nearbyShops = [
    {
      id: 1, name: 'Urban Fade Barbershop', category: 'Grooming & Styles',
      image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80',
      rating: 4.8, distance: '0.8 mi', isOpen: true, featured: true, priceLevel: '$$'
    },
    {
      id: 2, name: 'Glow Spa Premium', category: 'Wellness & Care',
      image: 'https://images.unsplash.com/photo-1544161515-4af6b1d46152?w=800&q=80',
      rating: 4.9, distance: '1.2 mi', isOpen: true, featured: false, priceLevel: '$$$'
    },
    {
      id: 3, name: 'Downtown Brews', category: 'Artisanal Cafe',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80',
      rating: 4.7, distance: '0.5 mi', isOpen: false, featured: true, priceLevel: '$'
    }
  ];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {}

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/browse'], { queryParams: { q: this.searchQuery } });
    }
  }

  onTagClick(tag: any) {
    this.router.navigate(['/browse'], { queryParams: { tag: tag.label } });
  }
}

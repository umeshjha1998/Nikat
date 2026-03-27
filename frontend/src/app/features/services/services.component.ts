import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService, ServiceDto, CategoryDto } from '../../core/api.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="services-page">
      <main class="main-content">
        <div class="layout-flex">
          <!-- Sidebar Filters -->
          <aside class="sidebar">
            <!-- Search & Breadcrumb -->
            <div class="sidebar-search">
              <h1 class="sidebar-title">Explore</h1>
              <div class="search-input-wrap">
                <span class="material-symbols-outlined search-icon">search</span>
                <input type="text" placeholder="Search categories..." class="search-input">
              </div>
            </div>

            <!-- Categories Accordion -->
            <div class="categories-section">
              <span class="section-label">Categories</span>

              <div class="cat-group" (click)="selectCategory('all')">
                <button class="cat-header" [class.active]="activeCategory === 'all'">
                  <div class="cat-header-left">
                    <span class="material-symbols-outlined cat-icon">grid_view</span>
                    <span class="cat-name">All Services</span>
                  </div>
                </button>
              </div>

              <div class="cat-group" *ngFor="let cat of categories" (click)="selectCategory(cat.id)">
                <button class="cat-header" [class.active]="activeCategory === cat.id">
                  <div class="cat-header-left">
                    <span class="material-symbols-outlined cat-icon">category</span>
                    <span class="cat-name">{{cat.name}}</span>
                  </div>
                </button>
              </div>
            </div>

            <!-- Quick Filters -->
            <div class="quick-filters">
              <span class="section-label">Quick Filters</span>
              <div class="filter-options">
                <label class="filter-option">
                  <div class="custom-checkbox" [class.checked]="filters.openNow">
                    <div class="check-fill"></div>
                  </div>
                  <input type="checkbox" [(ngModel)]="filters.openNow" hidden>
                  <span class="filter-text">Open Now</span>
                  <span class="open-dot"></span>
                </label>
                <label class="filter-option">
                  <div class="custom-checkbox" [class.checked]="filters.topRated">
                    <div class="check-fill"></div>
                  </div>
                  <input type="checkbox" [(ngModel)]="filters.topRated" hidden>
                  <span class="filter-text">Top Rated</span>
                </label>
                <label class="filter-option">
                  <div class="custom-checkbox" [class.checked]="filters.nearby">
                    <div class="check-fill"></div>
                  </div>
                  <input type="checkbox" [(ngModel)]="filters.nearby" hidden>
                  <span class="filter-text">Within 5km</span>
                </label>
              </div>
            </div>

            <!-- Price Range -->
            <div class="price-range-section">
              <span class="section-label">Price Range</span>
              <input type="range" min="0" max="100" value="40" class="price-slider">
              <div class="price-labels">
                <span>$</span>
                <span>$$$$</span>
              </div>
            </div>
          </aside>

          <!-- Main Content Area -->
          <section class="content-area">
            <!-- Active Vibe Chips -->
            <div class="active-chips">
              <div class="vibe-chip accent" *ngIf="activeSubCategory">
                {{activeCategory === 'all' ? 'All Services' : 'Selected Category'}}
                <span class="material-symbols-outlined chip-close" (click)="selectCategory('all')">close</span>
              </div>
              <div class="vibe-chip" *ngIf="filters.nearby">
                Within 5km
                <span class="material-symbols-outlined chip-close" (click)="filters.nearby = false">close</span>
              </div>
              <button class="clear-btn" (click)="clearFilters()">Clear All</button>
            </div>

            <!-- Bento Grid Results -->
            <div class="results-grid" *ngIf="displayServices.length > 0; else noServices">
              <!-- Featured Card -->
              <div class="result-card featured" *ngIf="displayServices[0]">
                <div class="card-glow"></div>
                <div class="card-image">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM1Qnj0VQEg70OrDBJmRJJWTVNTT3y_Grqv_5MwrPY-hnO0pioqbHD1hKnuzVR3X4IaexULI2Nvz0mVCi30BxotDpzU8NIXlO1gzdlKqgHfMbIRTytX2fdcqdLLjgRT6PB7mF_Bh_zjCbpL99ST2_s6zss2t5CZvMa9xLms2AwjtVb0PPqpMrsgwGEyH7qbNFNkjzRoczmWMM77uDuHuNgSyVu-B-SuFjC6899oWRM26K35PbnNI1ClKn79xDjVuUQEWlRBfj9Q2PH" alt="Service">
                </div>
                <div class="card-body">
                  <div class="card-top">
                    <div>
                      <span class="recommended-badge">Recommended</span>
                      <h3 class="card-title">{{displayServices[0].name}}</h3>
                    </div>
                    <div class="rating-badge">
                      <span class="material-symbols-outlined star-filled">star</span>
                      <span class="rating-value">4.9</span>
                    </div>
                  </div>
                  <p class="card-desc">{{displayServices[0].description || 'Expert service with premium quality. Specializing in high-quality repair and maintenance.'}}</p>
                  <div class="card-meta">
                    <div class="meta-item">
                      <span class="material-symbols-outlined">location_on</span>
                      {{displayServices[0].serviceArea || '1.2 km away'}}
                    </div>
                    <div class="meta-item">
                      <span class="material-symbols-outlined">schedule</span>
                      {{displayServices[0].startTime || '9:00 AM'}} - {{displayServices[0].endTime || '8:00 PM'}}
                    </div>
                  </div>
                  <a [routerLink]="['/book-service', displayServices[0].id]" class="btn-book">Book Appointment</a>
                </div>
              </div>

              <!-- Regular Cards -->
              <div class="result-card" *ngFor="let svc of displayServices.slice(1)">
                <div class="card-image-sm">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHm1MF-n2-jOIYf2c5h10oW8wgwDoSXbtWuGKf_4x5Y-H-QDAqC0EyuMnuS5K_Qrqhayp8TSe-5oxfTW0spenuamMV918Gl3V_g0BzqSRl4vQJx4iaRUQ8QTvGGHxwAt4IWh29S7eP9USO_sZp0vvgH0b10mSCWG4ovv-lr0CdgvKF5SRr8ZAbIFvkfrW6Y7CyGKpWSF8ULURxFXQOLbjfFRwVwE_svSWwPx6HnDD0a4QqseFkS6ux7P-6Zg8_-UDeyivCcKZIRoSJ" alt="Service">
                  <div class="open-badge">
                    <span class="open-indicator"></span> OPEN
                  </div>
                </div>
                <div class="card-body-sm">
                  <h3 class="card-title-sm">{{svc.name}}</h3>
                  <p class="card-desc-sm">{{svc.description || 'Premium local service offering.'}}</p>
                  <div class="card-footer-sm">
                    <span class="price-distance">₹{{svc.baseCharge || '500'}} • {{svc.serviceArea || '2 km'}}</span>
                    <div class="rating-mini">
                      <span class="material-symbols-outlined star-filled">star</span>
                      <span>4.7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ng-template #noServices>
              <!-- Mock data when no services from API -->
              <div class="results-grid">
                <div class="result-card featured">
                  <div class="card-glow"></div>
                  <div class="card-image">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM1Qnj0VQEg70OrDBJmRJJWTVNTT3y_Grqv_5MwrPY-hnO0pioqbHD1hKnuzVR3X4IaexULI2Nvz0mVCi30BxotDpzU8NIXlO1gzdlKqgHfMbIRTytX2fdcqdLLjgRT6PB7mF_Bh_zjCbpL99ST2_s6zss2t5CZvMa9xLms2AwjtVb0PPqpMrsgwGEyH7qbNFNkjzRoczmWMM77uDuHuNgSyVu-B-SuFjC6899oWRM26K35PbnNI1ClKn79xDjVuUQEWlRBfj9Q2PH" alt="PixelFix Solutions">
                  </div>
                  <div class="card-body">
                    <div class="card-top">
                      <div>
                        <span class="recommended-badge">Recommended</span>
                        <h3 class="card-title">PixelFix Solutions</h3>
                      </div>
                      <div class="rating-badge">
                        <span class="material-symbols-outlined star-filled">star</span>
                        <span class="rating-value">4.9</span>
                      </div>
                    </div>
                    <p class="card-desc">Expert screen replacement and motherboard repairs. We specialize in Apple and Samsung devices with genuine parts.</p>
                    <div class="card-meta">
                      <div class="meta-item">
                        <span class="material-symbols-outlined">location_on</span>
                        1.2 km away
                      </div>
                      <div class="meta-item">
                        <span class="material-symbols-outlined">schedule</span>
                        Closes 8:00 PM
                      </div>
                    </div>
                    <a routerLink="/book-service" class="btn-book">Book Appointment</a>
                  </div>
                </div>

                <div class="result-card">
                  <div class="card-image-sm">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHm1MF-n2-jOIYf2c5h10oW8wgwDoSXbtWuGKf_4x5Y-H-QDAqC0EyuMnuS5K_Qrqhayp8TSe-5oxfTW0spenuamMV918Gl3V_g0BzqSRl4vQJx4iaRUQ8QTvGGHxwAt4IWh29S7eP9USO_sZp0vvgH0b10mSCWG4ovv-lr0CdgvKF5SRr8ZAbIFvkfrW6Y7CyGKpWSF8ULURxFXQOLbjfFRwVwE_svSWwPx6HnDD0a4QqseFkS6ux7P-6Zg8_-UDeyivCcKZIRoSJ" alt="The Tech Lab">
                    <div class="open-badge">
                      <span class="open-indicator"></span> OPEN
                    </div>
                  </div>
                  <div class="card-body-sm">
                    <h3 class="card-title-sm">The Tech Lab</h3>
                    <p class="card-desc-sm">Laptop motherboard & battery specialists.</p>
                    <div class="card-footer-sm">
                      <span class="price-distance">$$ • 3.5 km</span>
                      <div class="rating-mini">
                        <span class="material-symbols-outlined star-filled">star</span>
                        <span>4.7</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="result-card">
                  <div class="card-image-sm">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYHyeeDmrZ4-tHp4PyucApj9nRyKAXlACI45w6E5z_Jcf1p3BJ50eqhy9FXnIXW3MZiuL0W7isX-OPMLLGbbS_CWYXkbWOSqECbS9fh3tJetFygi61AHVbF9ERsNCrxNU9P68QDW6AxYgBHhOEwsgBS2xp-rbNpLdNUSXhLV1Nf1y5dzZSN_ICSwh-sksQKNmCKkfYvzKhyEVAAnDUiv-H3WFgyXjXPq0f8sHajJdKDR8kz1lgl7oFSX_HbpuxBlPM3_iwr0--fY9M" alt="QuickRestore Mobile">
                  </div>
                  <div class="card-body-sm">
                    <h3 class="card-title-sm">QuickRestore Mobile</h3>
                    <p class="card-desc-sm">Quick screen repairs and accessory sales.</p>
                    <div class="card-footer-sm">
                      <span class="price-distance">$ • 0.8 km</span>
                      <div class="rating-mini">
                        <span class="material-symbols-outlined star-filled">star</span>
                        <span>4.5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ng-template>

            <!-- Load More -->
            <div class="load-more-wrap">
              <button class="btn-load-more">
                Load More Results
                <span class="material-symbols-outlined">keyboard_arrow_down</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: 'Manrope', sans-serif;
    }

    .services-page {
      min-height: 100vh;
      background: var(--bg);
      color: var(--text-main);
      transition: background 0.3s ease, color 0.3s ease;
    }

    .main-content {
      max-width: 80rem;
      margin: 0 auto;
      padding: 2rem 1rem 6rem;
    }

    .layout-flex {
      display: flex;
      gap: 2rem;
    }

    /* ── Sidebar ── */
    .sidebar {
      width: 18rem;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .sidebar-title {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 1.875rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--text-main);
      margin: 0 0 1rem;
    }

    .search-input-wrap {
      position: relative;
    }
    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      transition: color 0.2s;
    }
    .search-input-wrap:focus-within .search-icon { color: var(--accent); }
    .search-input {
      width: 100%;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 0.75rem;
      padding: 0.75rem 1rem 0.75rem 3rem;
      color: var(--text-main);
      font-family: inherit;
      font-size: 0.875rem;
      outline: none;
      transition: all 0.3s ease;
    }
    .search-input::placeholder { color: var(--text-muted); opacity: 0.6; }
    .search-input:focus { border-color: var(--accent); box-shadow: 0 0 0 2px var(--accent-glow); }

    .section-label {
      display: block;
      font-size: 0.625rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-weight: 700;
      color: var(--text-muted);
      padding: 0 0.5rem;
      margin-bottom: 0.5rem;
    }

    /* Categories */
    .categories-section { display: flex; flex-direction: column; gap: 0.5rem; }

    .cat-group {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 0.75rem;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .cat-header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: transparent;
      border: none;
      color: var(--text-main);
      cursor: pointer;
      transition: background 0.2s;
    }
    .cat-header:hover { background: var(--glass-border); }
    .cat-header-left { display: flex; align-items: center; gap: 0.75rem; }
    .cat-icon { color: var(--accent); font-size: 1.25rem; }
    .cat-name { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 0.875rem; }
    .cat-chevron { color: var(--text-muted); font-size: 1.25rem; transition: transform 0.3s; }
    .cat-chevron.rotated { transform: rotate(90deg); color: var(--accent); }

    .cat-children {
      padding: 0 1rem 1rem 2.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .cat-child {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.2s;
    }
    .cat-child:hover, .cat-child.active { color: var(--accent); font-weight: 700; }

    /* Quick Filters */
    .quick-filters { border-top: 1px solid var(--border-color); padding-top: 1rem; }
    .filter-options { display: flex; flex-direction: column; gap: 1rem; padding: 0 0.5rem; }
    .filter-option { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; }
    .custom-checkbox {
      width: 1.25rem; height: 1.25rem;
      border: 2px solid var(--border-color); border-radius: 0.25rem;
      display: flex; align-items: center; justify-content: center;
      transition: border-color 0.2s;
      background: var(--glass);
    }
    .filter-option:hover .custom-checkbox { border-color: var(--accent); }
    .check-fill {
      width: 0.75rem; height: 0.75rem;
      background: var(--accent); border-radius: 2px;
      opacity: 0; transition: opacity 0.2s;
    }
    .custom-checkbox.checked .check-fill { opacity: 1; }
    .filter-text { font-size: 0.875rem; font-weight: 500; color: var(--text-main); flex: 1; }
    .open-dot {
      width: 0.5rem; height: 0.5rem; border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
    }

    /* Price Range */
    .price-range-section { border-top: 1px solid var(--border-color); padding-top: 1rem; }
    .price-slider {
      width: 100%;
      height: 0.375rem;
      background: var(--border-color);
      border-radius: 9999px;
      appearance: none;
      -webkit-appearance: none;
      accent-color: var(--accent);
      cursor: pointer;
      margin: 0.5rem 0;
    }
    .price-labels { display: flex; justify-content: space-between; }
    .price-labels span { font-size: 0.625rem; font-weight: 700; color: var(--text-muted); }

    /* ── Content Area ── */
    .content-area { flex: 1; display: flex; flex-direction: column; gap: 2rem; }

    .active-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
    .vibe-chip {
      display: flex; align-items: center; gap: 0.5rem;
      background: var(--card-bg); color: var(--text-main);
      border: 1px solid var(--border-color);
      padding: 0.375rem 0.75rem; border-radius: 9999px;
      font-size: 0.75rem; font-weight: 700;
      font-family: 'Plus Jakarta Sans', sans-serif;
      transition: all 0.3s ease;
    }
    .vibe-chip.accent { background: var(--accent); color: white; border-color: var(--accent); }
    .chip-close { font-size: 0.875rem; cursor: pointer; }
    .clear-btn { font-size: 0.75rem; font-weight: 700; color: var(--accent); background: none; border: none; cursor: pointer; padding: 0.375rem 0.75rem; }

    /* Results Grid */
    .results-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .result-card {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 1rem;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: all 0.3s ease;
    }
    .result-card:hover { transform: translateY(-4px); border-color: var(--accent); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }

    .result-card.featured {
      grid-column: 1 / -1;
      flex-direction: row;
      padding: 1.5rem;
      gap: 1.5rem;
      box-shadow: 0 12px 32px rgba(0,0,0,0.2);
      position: relative;
      overflow: hidden;
    }
    .card-glow {
      position: absolute; top: 0; right: 0;
      width: 8rem; height: 8rem;
      background: var(--accent-glow);
      filter: blur(48px);
      z-index: 0;
      transition: background 0.3s;
    }
    .result-card.featured:hover .card-glow { background: var(--accent-glow); opacity: 0.4; }

    .card-image {
      width: 12rem; height: 12rem; border-radius: 0.75rem; overflow: hidden; flex-shrink: 0;
    }
    .card-image img { width: 100%; height: 100%; object-fit: cover; }

    .card-body { flex: 1; display: flex; flex-direction: column; gap: 1rem; position: relative; z-index: 1; }
    .card-top { display: flex; justify-content: space-between; align-items: flex-start; }
    .recommended-badge {
      display: inline-block;
      background: rgba(16, 185, 129, 0.1); color: #10b981;
      font-size: 0.625rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.1em;
      padding: 0.25rem 0.5rem; border-radius: 9999px;
      margin-bottom: 0.5rem;
      border: 1px solid rgba(16, 185, 129, 0.2);
    }
    .card-title {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 1.25rem; font-weight: 800; color: var(--text-main); margin: 0;
    }
    .rating-badge {
      display: flex; align-items: center; gap: 0.25rem;
      background: var(--glass); padding: 0.25rem 0.5rem; border-radius: 0.5rem;
      border: 1px solid var(--glass-border);
    }
    .star-filled { font-size: 0.875rem; color: #facc15; font-variation-settings: 'FILL' 1; }
    .rating-value { font-size: 0.75rem; font-weight: 700; }
    .card-desc { font-size: 0.875rem; color: var(--text-muted); line-height: 1.6; margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .card-meta { display: flex; flex-wrap: wrap; gap: 1rem; }
    .meta-item { display: flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); }
    .meta-item .material-symbols-outlined { font-size: 0.875rem; color: var(--accent); }

    .btn-book {
      display: inline-block;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      color: white; border: none; border-radius: 0.75rem;
      padding: 0.75rem 2rem;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 700; font-size: 0.875rem;
      text-decoration: none; text-align: center;
      box-shadow: 0 8px 24px var(--accent-glow);
      cursor: pointer; transition: all 0.2s;
      align-self: flex-start;
    }
    .btn-book:hover { box-shadow: 0 12px 32px var(--accent-glow); transform: translateY(-1px); }
    .btn-book:active { transform: scale(0.95); }

    /* Regular Cards */
    .card-image-sm {
      height: 10rem; border-radius: 0.75rem; overflow: hidden; position: relative;
    }
    .card-image-sm img { width: 100%; height: 100%; object-fit: cover; }
    .open-badge {
      position: absolute; top: 0.5rem; right: 0.5rem;
      background: var(--card-bg); border: 1px solid var(--border-color);
      padding: 0.25rem 0.5rem; border-radius: 0.5rem;
      font-size: 0.625rem; font-weight: 700; color: #10b981;
      display: flex; align-items: center; gap: 0.375rem;
    }
    .open-indicator { width: 0.375rem; height: 0.375rem; border-radius: 50%; background: #10b981; }

    .card-body-sm { display: flex; flex-direction: column; gap: 0.5rem; }
    .card-title-sm { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: var(--text-main); margin: 0; font-size: 1rem; }
    .card-desc-sm { font-size: 0.75rem; color: var(--text-muted); margin: 0; }
    .card-footer-sm { display: flex; align-items: center; justify-content: space-between; padding-top: 0.5rem; }
    .price-distance { font-size: 0.875rem; font-weight: 700; color: var(--accent); }
    .rating-mini { display: flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; font-weight: 700; color: var(--text-main); }

    /* Load More */
    .load-more-wrap { display: flex; justify-content: center; padding: 2rem 0; }
    .btn-load-more {
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0.75rem 2rem;
      border-radius: 9999px;
      border: 1px solid var(--border-color);
      background: var(--glass); color: var(--text-muted);
      font-weight: 700; font-size: 0.75rem;
      text-transform: uppercase; letter-spacing: 0.12em;
      cursor: pointer; transition: all 0.3s ease;
    }
    .btn-load-more:hover { color: var(--accent); border-color: var(--accent); background: var(--glass-border); }
    .btn-load-more .material-symbols-outlined { font-size: 0.875rem; }

    @media (max-width: 768px) {
      .main-content { padding: 1rem 0 4rem; }
      .layout-flex { flex-direction: column; gap: 1.5rem; }
      .sidebar { 
        width: 100%; 
        padding: 0 1rem;
        gap: 1rem;
      }
      .sidebar-title { font-size: 1.5rem; margin-bottom: 0.5rem; }
      .categories-section {
        display: flex;
        overflow-x: auto;
        gap: 0.75rem;
        padding: 0.5rem 0;
        -webkit-overflow-scrolling: touch;
      }
      .cat-group { flex-shrink: 0; min-width: 140px; }
      .cat-header { padding: 0.75rem; }
      .cat-children { position: absolute; background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 0.75rem; padding: 1rem; z-index: 50; margin-top: 0.5rem; width: 200px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
      
      .quick-filters { padding-top: 0.5rem; }
      .filter-options { flex-direction: row; overflow-x: auto; padding-bottom: 0.5rem; }
      .filter-option { flex-shrink: 0; background: var(--glass); padding: 0.5rem 1rem; border-radius: 9999px; border: 1px solid var(--border-color); }
      .filter-text { white-space: nowrap; }

      .price-range-section { display: none; }

      .content-area { padding: 0 1rem; }
      .results-grid { grid-template-columns: 1fr; gap: 1rem; }
      .result-card.featured { flex-direction: column; padding: 1rem; }
      .card-image { width: 100%; height: 12rem; }
      .card-body { gap: 0.75rem; }
      .card-title { font-size: 1.1rem; }
      .btn-book { width: 100%; text-align: center; }
    }
  `]

})
export class ServicesComponent implements OnInit {
  services: ServiceDto[] = [];
  displayServices: ServiceDto[] = [];
  activeCategory = 'all';
  filters = { openNow: true, topRated: false, nearby: true };
  categories: CategoryDto[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadCategories();
    this.loadServices();
  }

  loadCategories() {
    this.apiService.getCategories().subscribe({
      next: (cats) => {
        this.categories = cats.filter(c => c.isServiceProviderCategory);
      },
      error: (err) => console.error('Failed to load categories:', err)
    });
  }

  loadServices() {
    this.apiService.getServices().subscribe({
      next: (data) => {
        this.services = data;
        this.filterServices();
      },
      error: () => this.services = []
    });
  }

  selectCategory(categoryId: string, event?: Event) {
    if (event) event.stopPropagation();
    this.activeCategory = categoryId;
    this.filterServices();
  }

  filterServices() {
    if (this.activeCategory === 'all') {
      this.displayServices = this.services;
    } else {
      this.displayServices = this.services.filter(s => s.categoryId === this.activeCategory);
    }
  }

  clearFilters() {
    this.activeCategory = 'all';
    this.filters = { openNow: false, topRated: false, nearby: false };
    this.filterServices();
  }

  toggleCategory(cat: any) {
    cat.expanded = !cat.expanded;
  }
}

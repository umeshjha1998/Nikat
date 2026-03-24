import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService, ServiceDto } from '../../core/api.service';

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

              <div class="cat-group" *ngFor="let cat of categories" (click)="toggleCategory(cat)">
                <button class="cat-header" [class.expanded]="cat.expanded">
                  <div class="cat-header-left">
                    <span class="material-symbols-outlined cat-icon">{{cat.icon}}</span>
                    <span class="cat-name">{{cat.name}}</span>
                  </div>
                  <span class="material-symbols-outlined cat-chevron" [class.rotated]="cat.expanded">chevron_right</span>
                </button>
                <div class="cat-children" *ngIf="cat.expanded">
                  <a href="#" class="cat-child" *ngFor="let child of cat.children"
                     [class.active]="child === activeSubCategory"
                     (click)="selectSubCategory(child, $event)">{{child}}</a>
                </div>
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
                {{activeSubCategory}}
                <span class="material-symbols-outlined chip-close" (click)="activeSubCategory = ''">close</span>
              </div>
              <div class="vibe-chip" *ngIf="filters.nearby">
                Within 5km
                <span class="material-symbols-outlined chip-close" (click)="filters.nearby = false">close</span>
              </div>
              <button class="clear-btn" (click)="clearFilters()">Clear All</button>
            </div>

            <!-- Bento Grid Results -->
            <div class="results-grid" *ngIf="services.length > 0; else noServices">
              <!-- Featured Card -->
              <div class="result-card featured" *ngIf="services[0]">
                <div class="card-glow"></div>
                <div class="card-image">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM1Qnj0VQEg70OrDBJmRJJWTVNTT3y_Grqv_5MwrPY-hnO0pioqbHD1hKnuzVR3X4IaexULI2Nvz0mVCi30BxotDpzU8NIXlO1gzdlKqgHfMbIRTytX2fdcqdLLjgRT6PB7mF_Bh_zjCbpL99ST2_s6zss2t5CZvMa9xLms2AwjtVb0PPqpMrsgwGEyH7qbNFNkjzRoczmWMM77uDuHuNgSyVu-B-SuFjC6899oWRM26K35PbnNI1ClKn79xDjVuUQEWlRBfj9Q2PH" alt="Service">
                </div>
                <div class="card-body">
                  <div class="card-top">
                    <div>
                      <span class="recommended-badge">Recommended</span>
                      <h3 class="card-title">{{services[0].name}}</h3>
                    </div>
                    <div class="rating-badge">
                      <span class="material-symbols-outlined star-filled">star</span>
                      <span class="rating-value">4.9</span>
                    </div>
                  </div>
                  <p class="card-desc">{{services[0].description || 'Expert service with premium quality. Specializing in high-quality repair and maintenance.'}}</p>
                  <div class="card-meta">
                    <div class="meta-item">
                      <span class="material-symbols-outlined">location_on</span>
                      {{services[0].serviceArea || '1.2 km away'}}
                    </div>
                    <div class="meta-item">
                      <span class="material-symbols-outlined">schedule</span>
                      {{services[0].startTime || '9:00 AM'}} - {{services[0].endTime || '8:00 PM'}}
                    </div>
                  </div>
                  <a [routerLink]="['/book-service', services[0].id]" class="btn-book">Book Appointment</a>
                </div>
              </div>

              <!-- Regular Cards -->
              <div class="result-card" *ngFor="let svc of services.slice(1)">
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
      background: #05092f;
      color: #e2e3ff;
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
      color: #e2e3ff;
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
      color: #a3a8d5;
      transition: color 0.2s;
    }
    .search-input-wrap:focus-within .search-icon { color: #5eb4ff; }
    .search-input {
      width: 100%;
      background: #182056;
      border: none;
      border-radius: 0.75rem;
      padding: 0.75rem 1rem 0.75rem 3rem;
      color: #e2e3ff;
      font-family: inherit;
      font-size: 0.875rem;
      outline: none;
      transition: box-shadow 0.2s;
    }
    .search-input::placeholder { color: #a3a8d5; }
    .search-input:focus { box-shadow: 0 0 0 2px rgba(94,180,255,0.5); }

    .section-label {
      display: block;
      font-size: 0.625rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-weight: 700;
      color: #a3a8d5;
      padding: 0 0.5rem;
      margin-bottom: 0.5rem;
    }

    /* Categories */
    .categories-section { display: flex; flex-direction: column; gap: 0.5rem; }

    .cat-group {
      background: #080e38;
      border-radius: 0.75rem;
      overflow: hidden;
      cursor: pointer;
    }
    .cat-header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: transparent;
      border: none;
      color: #e2e3ff;
      cursor: pointer;
      transition: background 0.2s;
    }
    .cat-header:hover { background: #0e1442; }
    .cat-header-left { display: flex; align-items: center; gap: 0.75rem; }
    .cat-icon { color: #5eb4ff; font-size: 1.25rem; }
    .cat-name { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 0.875rem; }
    .cat-chevron { color: #a3a8d5; font-size: 1.25rem; transition: transform 0.3s; }
    .cat-chevron.rotated { transform: rotate(90deg); color: #5eb4ff; }

    .cat-children {
      padding: 0 1rem 1rem 2.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .cat-child {
      font-size: 0.75rem;
      color: #a3a8d5;
      text-decoration: none;
      transition: color 0.2s;
    }
    .cat-child:hover, .cat-child.active { color: #5eb4ff; font-weight: 700; }

    /* Quick Filters */
    .quick-filters { border-top: 1px solid rgba(64,69,108,0.1); padding-top: 1rem; }
    .filter-options { display: flex; flex-direction: column; gap: 1rem; padding: 0 0.5rem; }
    .filter-option { display: flex; align-items: center; gap: 0.75rem; cursor: pointer; }
    .custom-checkbox {
      width: 1.25rem; height: 1.25rem;
      border: 2px solid #40456c; border-radius: 0.25rem;
      display: flex; align-items: center; justify-content: center;
      transition: border-color 0.2s;
    }
    .filter-option:hover .custom-checkbox { border-color: #5eb4ff; }
    .check-fill {
      width: 0.75rem; height: 0.75rem;
      background: #5eb4ff; border-radius: 2px;
      opacity: 0; transition: opacity 0.2s;
    }
    .custom-checkbox.checked .check-fill { opacity: 1; }
    .filter-text { font-size: 0.875rem; font-weight: 500; color: #e2e3ff; flex: 1; }
    .open-dot {
      width: 0.5rem; height: 0.5rem; border-radius: 50%;
      background: #6bfe9c;
      box-shadow: 0 0 8px rgba(107,254,156,0.6);
    }

    /* Price Range */
    .price-range-section { border-top: 1px solid rgba(64,69,108,0.1); padding-top: 1rem; }
    .price-slider {
      width: 100%;
      height: 0.375rem;
      background: #182056;
      border-radius: 9999px;
      appearance: none;
      -webkit-appearance: none;
      accent-color: #5eb4ff;
      cursor: pointer;
      margin: 0.5rem 0;
    }
    .price-labels { display: flex; justify-content: space-between; }
    .price-labels span { font-size: 0.625rem; font-weight: 700; color: #a3a8d5; }

    /* ── Content Area ── */
    .content-area { flex: 1; display: flex; flex-direction: column; gap: 2rem; }

    .active-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
    .vibe-chip {
      display: flex; align-items: center; gap: 0.5rem;
      background: #131a4c; color: #e2e3ff;
      padding: 0.375rem 0.75rem; border-radius: 9999px;
      font-size: 0.75rem; font-weight: 700;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .vibe-chip.accent { background: #fc9df7; color: #651469; }
    .chip-close { font-size: 0.875rem; cursor: pointer; }
    .clear-btn { font-size: 0.75rem; font-weight: 700; color: #5eb4ff; background: none; border: none; cursor: pointer; padding: 0.375rem 0.75rem; }

    /* Results Grid */
    .results-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .result-card {
      background: rgba(24,32,86,0.6);
      backdrop-filter: blur(20px);
      border-radius: 1rem;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: transform 0.3s;
    }
    .result-card:hover { transform: translateY(-4px); }

    .result-card.featured {
      grid-column: 1 / -1;
      flex-direction: row;
      padding: 1.5rem;
      gap: 1.5rem;
      box-shadow: 0 12px 32px rgba(0,0,0,0.4);
      position: relative;
      overflow: hidden;
    }
    .card-glow {
      position: absolute; top: 0; right: 0;
      width: 8rem; height: 8rem;
      background: rgba(94,180,255,0.1);
      filter: blur(48px);
      z-index: 0;
      transition: background 0.3s;
    }
    .result-card.featured:hover .card-glow { background: rgba(94,180,255,0.2); }

    .card-image {
      width: 12rem; height: 12rem; border-radius: 0.75rem; overflow: hidden; flex-shrink: 0;
    }
    .card-image img { width: 100%; height: 100%; object-fit: cover; }

    .card-body { flex: 1; display: flex; flex-direction: column; gap: 1rem; position: relative; z-index: 1; }
    .card-top { display: flex; justify-content: space-between; align-items: flex-start; }
    .recommended-badge {
      display: inline-block;
      background: rgba(107,254,156,0.2); color: #6bfe9c;
      font-size: 0.625rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.1em;
      padding: 0.25rem 0.5rem; border-radius: 9999px;
      margin-bottom: 0.5rem;
    }
    .card-title {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 1.25rem; font-weight: 800; color: #e2e3ff; margin: 0;
    }
    .rating-badge {
      display: flex; align-items: center; gap: 0.25rem;
      background: #182056; padding: 0.25rem 0.5rem; border-radius: 0.5rem;
    }
    .star-filled { font-size: 0.875rem; color: #facc15; font-variation-settings: 'FILL' 1; }
    .rating-value { font-size: 0.75rem; font-weight: 700; }
    .card-desc { font-size: 0.875rem; color: #a3a8d5; line-height: 1.6; margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .card-meta { display: flex; flex-wrap: wrap; gap: 1rem; }
    .meta-item { display: flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; font-weight: 700; color: #a3a8d5; }
    .meta-item .material-symbols-outlined { font-size: 0.875rem; color: #5eb4ff; }

    .btn-book {
      display: inline-block;
      background: linear-gradient(135deg, #5eb4ff, #2aa7ff);
      color: white; border: none; border-radius: 0.75rem;
      padding: 0.75rem 2rem;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 700; font-size: 0.875rem;
      text-decoration: none; text-align: center;
      box-shadow: 0 8px 24px rgba(94,180,255,0.2);
      cursor: pointer; transition: all 0.2s;
      align-self: flex-start;
    }
    .btn-book:hover { box-shadow: 0 12px 32px rgba(94,180,255,0.3); }
    .btn-book:active { transform: scale(0.95); }

    /* Regular Cards */
    .card-image-sm {
      height: 10rem; border-radius: 0.75rem; overflow: hidden; position: relative;
    }
    .card-image-sm img { width: 100%; height: 100%; object-fit: cover; }
    .open-badge {
      position: absolute; top: 0.5rem; right: 0.5rem;
      background: rgba(24,32,86,0.6); backdrop-filter: blur(20px);
      padding: 0.25rem 0.5rem; border-radius: 0.5rem;
      font-size: 0.625rem; font-weight: 700; color: #6bfe9c;
      display: flex; align-items: center; gap: 0.375rem;
    }
    .open-indicator { width: 0.375rem; height: 0.375rem; border-radius: 50%; background: #6bfe9c; }

    .card-body-sm { display: flex; flex-direction: column; gap: 0.5rem; }
    .card-title-sm { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; color: #e2e3ff; margin: 0; font-size: 1rem; }
    .card-desc-sm { font-size: 0.75rem; color: #a3a8d5; margin: 0; }
    .card-footer-sm { display: flex; align-items: center; justify-content: space-between; padding-top: 0.5rem; }
    .price-distance { font-size: 0.875rem; font-weight: 700; color: #5eb4ff; }
    .rating-mini { display: flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; font-weight: 700; }

    /* Load More */
    .load-more-wrap { display: flex; justify-content: center; padding: 2rem 0; }
    .btn-load-more {
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0.5rem 1.5rem;
      border-radius: 9999px;
      border: 1px solid rgba(64,69,108,0.3);
      background: transparent; color: #a3a8d5;
      font-weight: 700; font-size: 0.75rem;
      text-transform: uppercase; letter-spacing: 0.12em;
      cursor: pointer; transition: all 0.2s;
    }
    .btn-load-more:hover { color: #5eb4ff; border-color: #5eb4ff; }
    .btn-load-more .material-symbols-outlined { font-size: 0.875rem; }

    @media (max-width: 768px) {
      .layout-flex { flex-direction: column; }
      .sidebar { width: 100%; }
      .results-grid { grid-template-columns: 1fr; }
      .result-card.featured { flex-direction: column; }
      .card-image { width: 100%; height: 12rem; }
    }
  `]
})
export class ServicesComponent implements OnInit {
  services: ServiceDto[] = [];
  activeSubCategory = '';
  filters = { openNow: true, topRated: false, nearby: true };

  categories = [
    { name: 'Home Maintenance', icon: 'home_repair_service', expanded: false, children: ['Plumber', 'Electrician', 'Painter'] },
    { name: 'Personal Care', icon: 'content_cut', expanded: false, children: ['Barber', 'Beautician', 'Spa & Wellness'] },
    { name: 'Food & Beverage', icon: 'restaurant', expanded: false, children: ['Bakery', 'Snacks', 'Café'] },
    { name: 'Electronics', icon: 'devices', expanded: true, children: ['Mobile Repair', 'Laptop Repair', 'Home Appliances'] }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getServices().subscribe({
      next: (data) => this.services = data,
      error: () => this.services = []
    });
  }

  toggleCategory(cat: any) {
    cat.expanded = !cat.expanded;
  }

  selectSubCategory(child: string, event: Event) {
    event.stopPropagation();
    this.activeSubCategory = child;
  }

  clearFilters() {
    this.activeSubCategory = '';
    this.filters = { openNow: false, topRated: false, nearby: false };
  }
}

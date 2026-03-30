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
                <input type="text" placeholder="Search services..." class="search-input" [(ngModel)]="searchQuery" (input)="onSearchChange()">
              </div>
            </div>

            <!-- Categories Accordion -->
            <div class="categories-section">
              <span class="section-label">Service Categories</span>

              <div class="cat-group-item">
                <button class="cat-header-main" [class.active]="activeCategory === 'all'" (click)="selectCategory('all')">
                  <div class="cat-header-left">
                    <span class="material-symbols-outlined cat-icon">grid_view</span>
                    <span class="cat-name">All Services</span>
                  </div>
                </button>
              </div>

              <!-- Nested Accordion Groups -->
              <div class="cat-accordion" *ngFor="let group of groupedCategories">
                <div class="cat-group-header" (click)="toggleGroup(group.name)">
                  <div class="cat-header-left">
                    <span class="material-symbols-outlined cat-icon-main">{{ group.icon }}</span>
                    <span class="group-name">{{ group.name }}</span>
                  </div>
                  <span class="material-symbols-outlined accordion-chevron" [class.rotated]="expandedGroups.has(group.name)">
                    expand_more
                  </span>
                </div>
                
                <div class="group-content" [class.expanded]="expandedGroups.has(group.name)">
                  <button class="sub-cat-item" 
                          *ngFor="let cat of group.categories" 
                          [class.active]="activeCategory === cat.id"
                          [class.highlighted]="isCatHighlighted(cat.name)"
                          (click)="selectCategory(cat.id)">
                    {{ cat.name }}
                  </button>
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
            <!-- Active Vibe Chips & View Toggle -->
            <div class="content-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
              <div class="active-chips" style="margin: 0;">
                <div class="vibe-chip accent" *ngIf="activeCategory !== 'all'">
                  {{ activeCategoryName }}
                  <span class="material-symbols-outlined chip-close" (click)="selectCategory('all')">close</span>
                </div>
                <div class="vibe-chip" *ngIf="filters.nearby">
                  Within 5km
                  <span class="material-symbols-outlined chip-close" (click)="filters.nearby = false">close</span>
                </div>
                <button class="clear-btn" (click)="clearFilters()" *ngIf="activeCategory !== 'all' || filters.nearby">Clear All</button>
              </div>

              <div class="view-toggle-wrap" style="display: flex; background: var(--card-bg); padding: 0.25rem; border-radius: 9999px; border: 1px solid var(--border-color);">
                <button class="toggle-btn-small" [class.active]="!isMapView" (click)="setMapView(false)">
                  <span class="material-symbols-outlined">grid_view</span>
                </button>
                <button class="toggle-btn-small" [class.active]="isMapView" (click)="setMapView(true)">
                  <span class="material-symbols-outlined">map</span>
                </button>
              </div>
            </div>

            <!-- Bento Grid Results -->
            <div class="results-grid" *ngIf="!isMapView && displayServices.length > 0; else noServices">
              <!-- Featured Card -->
              <div class="result-card featured" *ngIf="displayServices[0]">
                <div class="card-glow"></div>
                <div class="card-image">
                  <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80" alt="Service">
                </div>
                <div class="card-body">
                  <div class="card-top">
                    <div>
                      <span class="recommended-badge">Recommended</span>
                      <h3 class="card-title">{{displayServices[0].name}}</h3>
                    </div>
                    <div class="rating-badge" *ngIf="displayServices[0].averageRating">
                      <span class="material-symbols-outlined star-filled">star</span>
                      <span class="rating-value">{{displayServices[0].averageRating.toFixed(1)}}</span>
                    </div>
                    <div class="rating-badge" *ngIf="!displayServices[0].averageRating">
                      <span class="rating-value">Not Rated</span>
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
                  <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80" alt="Service">
                  <div class="open-badge">
                    <span class="open-indicator"></span> OPEN
                  </div>
                </div>
                <div class="card-body-sm">
                  <h3 class="card-title-sm">{{svc.name}}</h3>
                  <p class="card-desc-sm">{{svc.description || 'Premium local service offering.'}}</p>
                  <div class="card-footer-sm">
                    <span class="price-distance">₹{{svc.baseCharge || '500'}} • {{svc.serviceArea || '2 km'}}</span>
                    <div class="rating-mini" *ngIf="svc.averageRating">
                      <span class="material-symbols-outlined star-filled">star</span>
                      <span>{{svc.averageRating.toFixed(1)}}</span>
                    </div>
                    <div class="rating-mini" *ngIf="!svc.averageRating">
                      <span>Not Rated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Map View -->
            <div class="map-view-container" *ngIf="isMapView" style="height: 600px; border-radius: 2rem; border: 2px solid var(--border-color); overflow: hidden; position: relative; margin-bottom: 2rem;">
              <div id="serviceMap" style="height: 100%; width: 100%; z-index: 1;"></div>
              
              <div class="map-overlay-info" style="position: absolute; bottom: 1.5rem; left: 1.5rem; z-index: 1000; background: var(--bg); padding: 10px 15px; border-radius: 10px; border: 1px solid var(--glass-border); box-shadow: 0 5px 15px rgba(0,0,0,0.1);" *ngIf="displayServices.length > 0">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--primary);">Showing {{displayServices.length}} providers</span>
              </div>
            </div>

            <ng-template #noServices>
              <div class="no-results-state" *ngIf="!isMapView" style="padding: 4rem 2rem; text-align: center; background: var(--card-bg); border-radius: 2rem; border: 1px solid var(--border-color);">
                <span class="material-symbols-outlined" style="font-size: 4rem; color: var(--text-muted); opacity: 0.3; margin-bottom: 1.5rem;">search_off</span>
                <h3 style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; margin: 0 0 0.5rem;">No services found</h3>
                <p style="color: var(--text-muted); max-width: 300px; margin: 0 auto;">Try adjusting your filters or search query to find what you're looking for.</p>
                <button class="btn-clear" (click)="clearFilters()" style="margin-top: 1.5rem; background: var(--primary); color: #fff; border-radius: 9999px; padding: 0.75rem 2rem; border: none; font-weight: 700;">Reset All Filters</button>
              </div>
            </ng-template>

            <!-- Load More -->
            <div class="load-more-wrap" *ngIf="!isMapView && displayServices.length > 5">
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

    .categories-section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 1rem;
      padding: 1rem;
      max-height: 500px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--accent-glow) transparent;
    }
    .categories-section::-webkit-scrollbar { width: 4px; }
    .categories-section::-webkit-scrollbar-thumb { background: var(--accent-glow); border-radius: 4px; }

    .cat-group-item { margin-bottom: 0.25rem; }
    .cat-header-main {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0.75rem;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 0.75rem;
      color: var(--text-main);
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .cat-header-main:hover { background: var(--glass-border); }
    .cat-header-main.active { background: var(--primary); color: white; }
    .cat-header-main.active .cat-icon { color: white; }

    .cat-accordion {
      border-bottom: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
    }
    .cat-accordion:last-child { border-bottom: none; }

    .cat-group-header {
      padding: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      border-radius: 0.75rem;
      transition: background 0.2s;
    }
    .cat-group-header:hover { background: var(--glass-border); }

    .cat-icon-main { color: var(--accent); font-size: 1.25rem; }
    .group-name { font-weight: 700; font-size: 0.9rem; color: var(--text-main); font-family: 'Plus Jakarta Sans', sans-serif; }
    .accordion-chevron { font-size: 1.25rem; color: var(--text-muted); transition: transform 0.3s; }
    .accordion-chevron.rotated { transform: rotate(180deg); color: var(--accent); }

    .group-content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), padding 0.3s ease;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .group-content.expanded {
      max-height: 500px; /* arbitrary large value */
      padding: 0.5rem 0.5rem 0.75rem 2.85rem;
    }

    .sub-cat-item {
      text-align: left;
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.4rem 0.75rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .sub-cat-item:hover { color: var(--accent); background: var(--glass-border); }
    .sub-cat-item.active { color: var(--accent); font-weight: 800; background: var(--accent-glow); }
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

    /* Highlighted Categories */
    .sub-cat-item.highlighted {
      background: var(--accent-glow) !important;
      color: var(--accent) !important;
      border: 1px solid var(--accent) !important;
      box-shadow: 0 0 10px var(--accent-glow);
    }
    .cat-group-header.highlighted {
      background: var(--accent-glow) !important;
      border: 1px solid var(--accent) !important;
    }
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

    .toggle-btn-small {
      display: flex; align-items: center; justify-content: center;
      padding: 0.5rem 1rem; border: none; background: transparent;
      color: var(--text-muted); cursor: pointer; border-radius: 9999px;
      transition: all 0.2s;
    }
    .toggle-btn-small:hover { color: var(--accent); }
    .toggle-btn-small.active { background: var(--primary); color: white; box-shadow: 0 4px 12px var(--accent-glow); }
    .toggle-btn-small .material-symbols-outlined { font-size: 1.25rem; }

    ::ng_deep .provider-popup .leaflet-popup-content-wrapper {
      background: var(--card-bg); color: var(--text-main); border-radius: 12px;
      padding: 0; overflow: hidden; border: 1px solid var(--border-color);
    }
    ::ng_deep .provider-popup .leaflet-popup-tip { background: var(--card-bg); }
    ::ng_deep .popup-content { font-family: 'Manrope', sans-serif; }
    ::ng_deep .popup-image { width: 100%; height: 100px; object-fit: cover; }
    ::ng_deep .popup-body { padding: 12px; }
    ::ng_deep .popup-title { font-size: 1rem; font-weight: 800; margin: 0 0 4px; color: var(--text-main); }
    ::ng_deep .popup-cat { font-size: 0.7rem; color: var(--accent); font-weight: 700; text-transform: uppercase; }
    ::ng_deep .popup-charge { font-size: 0.9rem; font-weight: 700; color: #10b981; margin-top: 8px; display: block; }
    ::ng_deep .btn-view-map {
      display: block; width: 100%; padding: 8px; margin-top: 10px;
      background: var(--primary); color: white; border: none; border-radius: 6px;
      font-size: 0.75rem; font-weight: 700; cursor: pointer; text-align: center; text-decoration: none;
    }
  `]

})
export class ServicesComponent implements OnInit {
  declare L: any;
  isMapView = false;
  private map: any;
  private markers: any[] = [];

  services: ServiceDto[] = [];
  displayServices: ServiceDto[] = [];
  activeCategory = 'all';
  searchQuery = '';
  filters = { openNow: true, topRated: false, nearby: true };
  categories: CategoryDto[] = [];
  groupedCategories: any[] = [];
  expandedGroups: Set<string> = new Set(['Home Maintenance', 'Neighborhood & Domestic', 'Tech & Digital']); // Open some by default
  private searchTimeout: any;

  private categoryMappings: {[key: string]: string} = {
    // Home Maintenance
    'AC/Fridge/Geyser Repair': 'Home Maintenance',
    'Appliance Repair': 'Home Maintenance',
    'Carpenter Service': 'Home Maintenance',
    'Carpenter Shop': 'Home Maintenance',
    'Electrical Repair Shop': 'Home Maintenance',
    'Electrician': 'Home Maintenance',
    'Gas Stove Repair': 'Home Maintenance',
    'Glass & Mirror Shop': 'Home Maintenance',
    'Iron Welding Shop': 'Home Maintenance',
    'Ironsmith': 'Home Maintenance',
    'Mason': 'Home Maintenance',
    'Painter': 'Home Maintenance',
    'Plumber': 'Home Maintenance',
    'RO & Water Purifier': 'Home Maintenance',
    'Sewing Machine Repair': 'Home Maintenance',
    'Watch/Clock Repair': 'Home Maintenance',
    'Mirror/Glass Installation': 'Home Maintenance',
    'Hardware Shop': 'Home Maintenance',
    'Home Appliances Shop': 'Home Maintenance',

    // Tech & Digital
    'Computer/Laptop Repair': 'Tech & Digital',
    'Cyber Cafe': 'Tech & Digital',
    'Electronic Repairs': 'Tech & Digital',
    'Game Console Repair': 'Tech & Digital',
    'Mobile & Accessories': 'Tech & Digital',
    'Mobile Repair': 'Tech & Digital',
    'Print & Photocopy': 'Tech & Digital',
    'TV Repair': 'Tech & Digital',
    'Wi-Fi & Internet': 'Tech & Digital',

    // Daily Essentials
    'Ayurvedic Store': 'Daily Essentials',
    'Bakery': 'Daily Essentials',
    'Dairy Shop': 'Daily Essentials',
    'Dairy & Milk Delivery': 'Daily Essentials',
    'Grocery Store': 'Daily Essentials',
    'Ice Cream Shop': 'Daily Essentials',
    'Juice Center': 'Daily Essentials',
    'Meat & Poultry Shop': 'Daily Essentials',
    'Paan Shop': 'Daily Essentials',
    'Snacks & Fast Food': 'Daily Essentials',
    'Sweets & Snacks': 'Daily Essentials',
    'Milk Delivery': 'Daily Essentials',
    'Religious Store': 'Daily Essentials',

    // Personal Care & Fitness
    'At-Home Beautician': 'Personal Care',
    'Barber Shop': 'Personal Care',
    'Beauty Parlour': 'Personal Care',
    'Gym': 'Personal Care',
    'Yoga Classes': 'Personal Care',

    // Health & Medical
    'Chemist/Pharmacy': 'Health & Medical',
    'Dentist Clinic': 'Health & Medical',
    'Diagnostic Lab': 'Health & Medical',
    'Doctor Clinic': 'Health & Medical',
    'Nursing Service': 'Health & Medical',
    'Optician': 'Health & Medical',
    'Physiotherapy': 'Health & Medical',

    // Professional & Education
    'Event Decoration/Rental': 'Professional & Education',
    'Packers & Movers': 'Professional & Education',
    'Photography Studio': 'Professional & Education',
    'Property Dealer/Real Estate': 'Professional & Education',
    'School': 'Professional & Education',
    'Tuition & Coaching': 'Professional & Education',
    'Stationery Shop': 'Professional & Education',

    // Neighborhood & Domestic
    'Cook': 'Neighborhood & Domestic',
    'Flower Delivery': 'Neighborhood & Domestic',
    'Garbage Collection': 'Neighborhood & Domestic',
    'Gardener': 'Neighborhood & Domestic',
    'House Help/Maid': 'Neighborhood & Domestic',
    'Nanny': 'Neighborhood & Domestic',
    'Newspaper Delivery': 'Neighborhood & Domestic',
    'Sewage & Drainage': 'Neighborhood & Domestic',

    // Fashion & Lifestyle
    'Footwear & Repair': 'Fashion & Lifestyle',
    'Ladies Tailor': 'Fashion & Lifestyle',
    'Zipper/Chain Repair': 'Fashion & Lifestyle',
    'Ladies Wear': 'Fashion & Lifestyle',
    'Gents Wear': 'Fashion & Lifestyle',
    'Kids Wear': 'Fashion & Lifestyle',
    'Saree Shop': 'Fashion & Lifestyle',
    'Raw Cloth Shop': 'Fashion & Lifestyle',
    'Jewellery Shop': 'Fashion & Lifestyle',
    'Sports Store': 'Fashion & Lifestyle'
  };

  private groupIcons: {[key: string]: string} = {
    'Home Maintenance': 'build_circle',
    'Daily Essentials': 'shopping_basket',
    'Personal Care': 'face',
    'Health & Medical': 'medical_services',
    'Tech & Digital': 'devices',
    'Professional & Education': 'school',
    'Neighborhood & Domestic': 'diversity_3',
    'Fashion & Lifestyle': 'checkroom',
    'Others': 'more_horiz'
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadCategories();
    this.loadServices();
  }

  loadCategories() {
    this.apiService.getCategories().subscribe({
      next: (cats) => {
        this.categories = cats.filter(c => c.isServiceProviderCategory);
        this.groupCategories();
      },
      error: (err) => console.error('Failed to load categories:', err)
    });
  }

  groupCategories() {
    const groups: {[key: string]: CategoryDto[]} = {};
    
    // Normalize mappings for case-insensitive lookup
    const normalizedMappings: {[key: string]: string} = {};
    Object.keys(this.categoryMappings).forEach(key => {
      normalizedMappings[key.toLowerCase()] = this.categoryMappings[key];
    });

    this.categories.forEach(cat => {
      const groupName = normalizedMappings[cat.name?.trim().toLowerCase()] || 'Others';
      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(cat);
    });

    this.groupedCategories = Object.keys(groups).map(name => ({
      name,
      icon: this.groupIcons[name] || 'category',
      categories: groups[name]
    })).sort((a, b) => {
      if (a.name === 'Others') return 1;
      if (b.name === 'Others') return -1;
      return a.name.localeCompare(b.name);
    });
  }

  toggleGroup(groupName: string) {
    if (this.expandedGroups.has(groupName)) {
      this.expandedGroups.delete(groupName);
    } else {
      this.expandedGroups.add(groupName);
    }
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
    this.searchQuery = ''; // Clear search when specific cat selected
    this.filterServices();
  }

  isCatHighlighted(catName: string): boolean {
    if (!this.searchQuery || this.searchQuery.length < 2) return false;
    return catName.toLowerCase().includes(this.searchQuery.toLowerCase());
  }

  get activeCategoryName(): string {
    const cat = this.categories.find(c => c.id === this.activeCategory);
    return cat ? cat.name : 'Unknown';
  }

  onSearchChange() {
    this.filterServices();
    
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    if (this.searchQuery.length > 1) {
      this.searchTimeout = setTimeout(() => {
        // Expand matching groups
        let firstMatchGroup: string | null = null;
        
        this.groupedCategories.forEach(group => {
          const hasMatch = group.categories.some((c: any) => 
            c.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
          if (hasMatch) {
            this.expandedGroups.add(group.name);
            if (!firstMatchGroup) firstMatchGroup = group.name;
          }
        });

        // Auto-scroll to first highlight
        if (firstMatchGroup) {
          setTimeout(() => {
            const container = document.querySelector('.categories-section');
            const highlighted = document.querySelector('.sub-cat-item.highlighted');
            if (container && highlighted) {
              highlighted.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 100); // Small delay to allow expansion animation
        }
      }, 2000); // 2 second delay
    }
  }

  filterServices() {
    let filtered = this.services;

    // By Search Query
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      const q = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(s => 
        (s.name && s.name.toLowerCase().includes(q)) || 
        (s.categoryName && s.categoryName.toLowerCase().includes(q)) ||
        (s.description && s.description.toLowerCase().includes(q))
      );
    }
    
    // By Active Category
    if (this.activeCategory !== 'all') {
      filtered = filtered.filter(s => s.categoryId === this.activeCategory);
    }
    
    this.displayServices = filtered;
    
    if (this.isMapView) {
      setTimeout(() => this.updateMapMarkers(), 100);
    }
  }

  setMapView(isMap: boolean) {
    this.isMapView = isMap;
    if (isMap) {
      setTimeout(() => this.initMap(), 100);
    }
  }

  private initMap() {
    if (this.map) {
      this.map.remove();
    }

    // Default center (Delhi)
    const defaultLat = 28.6139;
    const defaultLng = 77.2090;

    this.map = (window as any).L.map('serviceMap', {
      zoomControl: false
    }).setView([defaultLat, defaultLng], 13);

    (window as any).L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
    }).addTo(this.map);

    (window as any).L.control.zoom({
      position: 'topright'
    }).addTo(this.map);

    this.updateMapMarkers();
  }

  private updateMapMarkers() {
    if (!this.map) return;

    // Clear existing markers
    this.markers.forEach(m => m.remove());
    this.markers = [];

    const bounds: any[] = [];

    this.displayServices.forEach(svc => {
      if (svc.latitude && svc.longitude) {
        const marker = (window as any).L.marker([svc.latitude, svc.longitude]);
        
        const popupHtml = `
          <div class="popup-content">
            <img class="popup-image" src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80" />
            <div class="popup-body">
              <span class="popup-cat">${svc.categoryName}</span>
              <h4 class="popup-title">${svc.name}</h4>
              <span class="popup-charge">Base Charge: ₹${svc.baseCharge}</span>
              <a href="/book-service/${svc.id}" class="btn-view-map">Book Now</a>
            </div>
          </div>
        `;

        marker.bindPopup(popupHtml, {
          className: 'provider-popup',
          maxWidth: 200,
          minWidth: 200
        });

        marker.addTo(this.map);
        this.markers.push(marker);
        bounds.push([svc.latitude, svc.longitude]);
      }
    });

    if (bounds.length > 0) {
      this.map.fitBounds(bounds, { padding: [50, 50] });
    }
  }

  clearFilters() {
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.filters = { openNow: false, topRated: false, nearby: false };
    this.filterServices();
  }

  toggleCategory(cat: any) {
    cat.expanded = !cat.expanded;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/api.service';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-shop-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="shop-view-page">
      <!-- Top Bar -->
      <div class="top-bar">
        <a routerLink="/browse" class="btn-back">
          <span class="material-symbols-outlined">arrow_back</span>
          Back to Shops
        </a>
        <div class="top-actions">
          <button class="btn-icon-glass" (click)="toggleFavorite()">
            <span class="material-symbols-outlined" [class.filled]="isFavorited">{{isFavorited ? 'favorite' : 'favorite_border'}}</span>
          </button>
          <button class="btn-icon-glass">
            <span class="material-symbols-outlined">share</span>
          </button>
        </div>
      </div>

      <!-- Bento Gallery Grid -->
      <section class="bento-gallery">
        <div class="bento-main">
          <img [src]="shop.images[0]" [alt]="shop.name" class="bento-img">
          <div class="bento-overlay">
            <div class="verified-badge" *ngIf="shop.isOpen">
              <span class="material-symbols-outlined">verified</span>
              Verified Business
            </div>
          </div>
        </div>
        <div class="bento-side-top">
          <img [src]="shop.images[1]" alt="Product showcase" class="bento-img">
        </div>
        <div class="bento-side-bottom">
          <img [src]="shop.images[2]" alt="Ambiance" class="bento-img">
          <div class="bento-count" *ngIf="galleryImages.length > 3">
            <span class="material-symbols-outlined">photo_library</span>
            +{{galleryImages.length - 3}} More
          </div>
        </div>
      </section>

      <!-- Shop Info Header -->
      <section class="info-header">
        <div class="info-left">
          <div class="category-chip">
            <span class="chip-dot"></span>
            {{shop.category}}
          </div>
          <h1 class="shop-title">
            {{shop.name}}
            <button class="btn-icon-mng" *ngIf="isOwner" (click)="editBasicInfo()" title="Edit Name & Tagline">
              <span class="material-symbols-outlined">edit</span>
            </button>
          </h1>
          <p class="shop-tagline">{{shop.description}}</p>
          <div class="meta-row">
            <div class="meta-item rating-item">
              <span class="material-symbols-outlined star-filled">star</span>
              <strong>{{shop.rating}}</strong>
              <span class="meta-muted">({{shop.reviewCount}} reviews)</span>
            </div>
            <div class="meta-divider"></div>
            <div class="meta-item">
              <span class="material-symbols-outlined">groups</span>
              <strong>{{shop.workerCount || 0}}</strong>
              <span class="meta-muted">Workers</span>
            </div>
            <div class="meta-divider"></div>
            <div class="meta-item">
              <span class="material-symbols-outlined">location_on</span>
              {{shop.address}}
            </div>
            <div class="meta-divider"></div>
            <div class="meta-item">
              <span class="status-dot" [class.open]="shop.isOpen"></span>
              {{shop.isOpen ? 'Open Now' : (isClosedToday ? 'Closed Today' : 'Closed Now')}} · {{todayHours}}
            </div>
          </div>
        </div>
      </section>
       <!-- Action Hub -->
       <section class="action-hub">
         <div class="action-cards">
           <div class="action-card primary-action" (click)="bookAppointment()">
             <span class="material-symbols-outlined action-icon">calendar_today</span>
             <div>
               <h4>Book Appointment</h4>
               <p>{{ isOwner ? 'View pending requests' : 'Reserve your slot instantly' }}</p>
             </div>
           </div>
           <a [href]="'tel:' + shop.phoneNumber" class="action-card" style="text-decoration: none;" *ngIf="shop.phoneNumber">
             <span class="material-symbols-outlined action-icon">call</span>
             <div>
               <h4>Call Shop</h4>
               <p>{{ shop.phoneNumber }}</p>
             </div>
           </a>
           <div class="action-card" *ngIf="!shop.phoneNumber" (click)="bookAppointment()">
             <span class="material-symbols-outlined action-icon">call</span>
             <div>
               <h4>Inquire Now</h4>
               <p>Send a message to owner</p>
             </div>
           </div>
           <div class="action-card" (click)="getDirections()">
             <span class="material-symbols-outlined action-icon">near_me</span>
             <div>
               <h4>Get Directions</h4>
               <p>Navigate via Google Maps</p>
             </div>
           </div>
         </div>
       </section>


      <!-- Content Tabs -->
      <div class="content-wrapper">
        <nav class="tab-bar">
          <button [class.active]="activeTab === 'products'" (click)="activeTab = 'products'">Products</button>
          <button [class.active]="activeTab === 'about'" (click)="activeTab = 'about'">About</button>
          <button [class.active]="activeTab === 'reviews'" (click)="activeTab = 'reviews'">Reviews</button>
        </nav>

        <div class="tab-content">
          <!-- Products Tab -->
          <div *ngIf="activeTab === 'products'" class="products-panel">
            <!-- Add Product Card for Owner -->
            <div class="product-card add-new-card" *ngIf="isOwner" (click)="openProductModal()">
               <div class="add-icon-box">
                  <span class="material-symbols-outlined">add_circle</span>
                  <p>Add New Product/Service</p>
               </div>
            </div>

            <div class="product-card" *ngFor="let p of products">
              <div class="product-image">
                <img [src]="p.image" [alt]="p.name">
                <div class="product-price-badge">{{p.price}}</div>
                <div class="owner-actions" *ngIf="isOwner">
                  <button class="btn-mng-p" (click)="editProduct(p)" title="Edit Product">
                    <span class="material-symbols-outlined">edit</span>
                  </button>
                  <button class="btn-mng-p delete" (click)="deleteProduct(p.id)" title="Delete Product">
                    <span class="material-symbols-outlined">delete_outline</span>
                  </button>
                </div>
              </div>
              <div class="product-info">
                <h3 class="product-name">{{p.name}}</h3>
                <p class="product-desc">{{p.description}}</p>
                <div class="product-chips" *ngIf="p.chips">
                  <span class="glass-chip" *ngFor="let chip of p.chips">{{chip}}</span>
                </div>
                <div class="product-footer">
                  <span class="product-time" *ngIf="p.time">
                    <span class="material-symbols-outlined">schedule</span>
                    {{p.time}}
                  </span>
                  <button class="btn-add" (click)="addProduct(p)" *ngIf="!isOwner">
                    <span class="material-symbols-outlined">add</span>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- About Tab -->
          <div *ngIf="activeTab === 'about'" class="about-panel">
            <div class="about-card" [class.editing]="isEditingAbout">
              <div class="card-header-row">
                <h3>Our Story</h3>
                <button class="btn-icon-mng" *ngIf="isOwner" (click)="isEditingAbout = !isEditingAbout">
                  <span class="material-symbols-outlined">{{isEditingAbout ? 'close' : 'edit'}}</span>
                </button>
              </div>
              <p *ngIf="!isEditingAbout">{{shop.ourStory || 'Tell your customers about your journey and what makes your business special.'}}</p>
              <div class="edit-area" *ngIf="isEditingAbout">
                <textarea class="glass-textarea" [(ngModel)]="editShopData.ourStory" placeholder="Write your shop's story here..."></textarea>
                <button class="btn-primary-glow" (click)="saveShopAbout()">Save Our Story</button>
              </div>
            </div>

            <div class="amenities-card" [class.editing]="isEditingAmenities">
              <div class="card-header-row">
                <h3>Amenities</h3>
                <button class="btn-icon-mng" *ngIf="isOwner" (click)="isEditingAmenities = !isEditingAmenities">
                  <span class="material-symbols-outlined">{{isEditingAmenities ? 'close' : 'edit'}}</span>
                </button>
              </div>
              <div class="amenities-grid" *ngIf="!isEditingAmenities">
                <div class="amenity" *ngFor="let a of displayAmenities">
                  <span class="material-symbols-outlined">{{a.icon}}</span>
                  <span>{{a.label}}</span>
                </div>
                <p *ngIf="displayAmenities.length === 0" class="muted-text">No amenities listed yet.</p>
              </div>
              <div class="amenities-editor" *ngIf="isEditingAmenities">
                <div class="amenities-selection-grid">
                  <div class="amenity-toggle" *ngFor="let am of AMENITY_LIST" 
                    [class.active]="isAmenitySelected(am.id)" 
                    (click)="toggleAmenityId(am.id)">
                    <span class="material-symbols-outlined">{{am.icon}}</span>
                    <span>{{am.label}}</span>
                  </div>
                </div>
                <div class="editor-actions">
                  <button class="btn-primary-glow" (click)="saveShopAmenities()">Save Amenities</button>
                </div>
              </div>
            </div>

            <div class="hours-card" [class.editing]="isEditingHours">
              <div class="card-header-row">
                <h3>Business Hours</h3>
                <button class="btn-icon-mng" *ngIf="isOwner" (click)="isEditingHours = !isEditingHours">
                  <span class="material-symbols-outlined">{{isEditingHours ? 'close' : 'edit'}}</span>
                </button>
              </div>
              <div class="hours-list" *ngIf="!isEditingHours">
                <div class="hours-row" *ngFor="let h of displayBusinessHours">
                  <span class="day">{{h.day}}</span>
                  <span class="time" [class.closed]="h.closed">{{h.closed ? 'Closed' : h.time}}</span>
                </div>
              </div>
              <div class="hours-editor" *ngIf="isEditingHours">
                <div class="day-row" *ngFor="let h of editHoursData; let i = index">
                  <span class="day-label">{{h.day}}</span>
                  <div class="time-inputs" *ngIf="!h.closed">
                    <input type="time" [(ngModel)]="h.open">
                    <span>to</span>
                    <input type="time" [(ngModel)]="h.close">
                  </div>
                  <label class="closed-toggle">
                    <input type="checkbox" [(ngModel)]="h.closed"> Closed
                  </label>
                </div>
                <button class="btn-primary-glow" (click)="saveShopHours()" style="margin-top: 1.5rem;">Save Hours</button>
              </div>
            </div>
          </div>

          <!-- Reviews Tab -->
          <div *ngIf="activeTab === 'reviews'" class="reviews-panel">
            <div class="reviews-summary">
              <div class="score-big">{{shop.rating}}</div>
              <div class="stars-row">
                <span class="material-symbols-outlined star-filled" *ngFor="let s of getStars(shop.rating)">star</span>
              </div>
              <p class="score-label">Based on {{shop.reviewCount}} verified reviews</p>
            </div>
            <div class="review-list">
              <div class="review-node" *ngFor="let r of reviews">
                <div class="node-head">
                  <div class="node-avatar" [style.background]="r.color">{{r.initials}}</div>
                  <div class="node-meta">
                    <h5>{{r.name}}</h5>
                    <span>{{r.date}}</span>
                  </div>
                  <div class="node-rating">
                    <span class="material-symbols-outlined star-filled">star</span>
                    {{r.rating}}
                  </div>
                </div>
                <p class="node-body">{{r.comment}}</p>
                <div class="node-tags" *ngIf="r.tags">
                  <span class="tag" *ngFor="let t of r.tags">#{{t}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Management Modal -->
      <div class="modal-overlay" *ngIf="showProductModal">
         <div class="modal-card">
            <div class="modal-header">
               <h2>{{ editingProduct?.id ? 'Edit' : 'Add New' }} Product/Service</h2>
               <button class="btn-icon" (click)="showProductModal = false"><span class="material-symbols-outlined">close</span></button>
            </div>
            <form (submit)="saveProduct(); $event.preventDefault()" class="glass-form">
               <div class="form-group">
                  <label>Title</label>
                  <input type="text" [(ngModel)]="newProduct.name" name="pname" required>
               </div>
               <div class="form-row">
                  <div class="form-group">
                     <label>Price (₹)</label>
                     <input type="number" [(ngModel)]="newProduct.price" name="pprice" required>
                  </div>
                  <div class="form-group">
                     <label>Availability</label>
                     <select [(ngModel)]="newProduct.isAvailable" name="pavail" class="glass-select">
                        <option [ngValue]="true">In Stock</option>
                        <option [ngValue]="false">Out of Stock</option>
                     </select>
                  </div>
               </div>
               <div class="form-group">
                  <label>Description (Optional)</label>
                  <textarea rows="3" [(ngModel)]="newProduct.description" name="pdesc" placeholder="Brief details about the product/service"></textarea>
               </div>
               <div class="form-group">
                  <label>Image URL (Optional)</label>
                  <div class="image-upload-box" (click)="photoInput.click()">
                    <img *ngIf="newProduct.imageUrl" [src]="newProduct.imageUrl" class="preview-img">
                    <div *ngIf="!newProduct.imageUrl" class="upload-placeholder">
                      <span class="material-symbols-outlined">add_a_photo</span>
                      <p>Click to add listing image</p>
                    </div>
                  </div>
                  <input type="file" #photoInput style="display: none;" (change)="onListingPhotoSelected($event)">
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn-link" (click)="showProductModal = false">Cancel</button>
                  <button type="submit" class="btn-primary-glow" [disabled]="isUploading">
                     {{ isUploading ? 'Saving...' : (editingProduct?.id ? 'Update Listing' : 'Create Listing') }}
                  </button>
               </div>
            </form>
         </div>
      </div>
  `,
  styles: [`
    :host { display: block; font-family: 'Manrope', sans-serif; }

    .shop-view-page { min-height: 100vh; background: var(--bg); color: var(--text-main); padding-bottom: 4rem; }

    /* Top Bar */
    .top-bar {
      max-width: 80rem; margin: 0 auto;
      padding: 1rem 1.5rem;
      display: flex; justify-content: space-between; align-items: center;
    }
    .btn-back {
      display: flex; align-items: center; gap: 0.5rem;
      color: var(--text-muted); text-decoration: none;
      font-weight: 700; font-size: 0.875rem;
      transition: color 0.2s;
    }
    .btn-back:hover { color: var(--primary); }
    .top-actions { display: flex; gap: 0.75rem; }
    .btn-icon-glass {
      width: 44px; height: 44px; border-radius: 50%;
      background: var(--card-bg); backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border); color: var(--text-muted); cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .btn-icon-glass:hover { color: var(--primary); background: var(--surface-container-high); }
    .btn-icon-glass .filled { color: #ff516c; font-variation-settings: 'FILL' 1; }

    /* Bento Gallery */
    .bento-gallery {
      max-width: 80rem; margin: 0 auto; padding: 0 1.5rem;
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 14rem 14rem;
      gap: 0.75rem;
      height: 29rem;
    }
    .bento-main { grid-row: 1 / 3; position: relative; border-radius: 1.5rem; overflow: hidden; }
    .bento-side-top { border-radius: 1.5rem; overflow: hidden; }
    .bento-side-bottom { position: relative; border-radius: 1.5rem; overflow: hidden; }
    .bento-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
    .bento-main:hover .bento-img,
    .bento-side-top:hover .bento-img,
    .bento-side-bottom:hover .bento-img { transform: scale(1.03); }

    .bento-overlay {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 1.5rem;
      background: linear-gradient(transparent, var(--overlay-bg, rgba(0,0,0,0.8)));
    }
    .verified-badge {
      display: inline-flex; align-items: center; gap: 0.375rem;
      background: rgba(94,180,255,0.2); backdrop-filter: blur(12px);
      padding: 0.375rem 0.75rem; border-radius: 9999px;
      font-size: 0.75rem; font-weight: 700; color: #5eb4ff;
    }
    .bento-count {
      position: absolute; bottom: 1rem; right: 1rem;
      background: rgba(0,0,0,0.6); backdrop-filter: blur(12px);
      padding: 0.5rem 0.75rem; border-radius: 0.75rem;
      display: flex; align-items: center; gap: 0.375rem;
      font-size: 0.75rem; font-weight: 700; color: var(--text-main);
    }

    /* Info Header */
    .info-header {
      max-width: 80rem; margin: 0 auto;
      padding: 2rem 1.5rem 0;
    }
    .category-chip {
      display: inline-flex; align-items: center; gap: 0.5rem;
      background: var(--surface-container); padding: 0.375rem 0.75rem; border-radius: 9999px;
      font-size: 0.75rem; font-weight: 700; color: #fc9df7;
      margin-bottom: 1rem;
    }
    .chip-dot { width: 0.375rem; height: 0.375rem; border-radius: 50%; background: #fc9df7; }
    .shop-title {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 2.5rem; font-weight: 800;
      margin: 0 0 0.5rem; letter-spacing: -0.02em; color: var(--text-main);
    }
    .shop-tagline { color: var(--text-muted); font-size: 1.125rem; margin: 0 0 1.5rem; line-height: 1.5; }

    .meta-row { display: flex; flex-wrap: wrap; align-items: center; gap: 1.25rem; }
    .meta-item {
      display: flex; align-items: center; gap: 0.375rem;
      font-size: 0.875rem; font-weight: 600; color: var(--text-muted);
    }
    .meta-item .material-symbols-outlined { font-size: 1rem; color: var(--primary); }
    .rating-item { color: #facc15; }
    .rating-item strong { color: var(--text-main); }
    .meta-muted { color: var(--text-muted); }
    .star-filled { color: #facc15; font-variation-settings: 'FILL' 1; }
    .meta-divider { width: 1px; height: 1rem; background: var(--glass-border); }
    .status-dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; background: #ef4444; }
    .status-dot.open { background: #6bfe9c; box-shadow: 0 0 8px rgba(107,254,156,0.6); }

    /* Action Hub */
    .action-hub { max-width: 80rem; margin: 0 auto; padding: 2rem 1.5rem; }
    .action-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
    .action-card {
      background: var(--card-bg); backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      border-radius: 1rem; padding: 1.5rem;
      display: flex; align-items: center; gap: 1rem;
      cursor: pointer; transition: all 0.2s;
    }
    .action-card:hover { background: var(--surface-container-high); transform: translateY(-2px); }
    .action-card.primary-action {
      background: linear-gradient(135deg, rgba(94,180,255,0.1), var(--card-bg));
      border: 1px solid rgba(94,180,255,0.2);
    }
    .action-icon { font-size: 1.5rem; color: var(--primary); }
    .action-card h4 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; font-weight: 700; margin: 0 0 0.25rem; color: var(--text-main); }
    .action-card p { font-size: 0.75rem; color: var(--text-muted); margin: 0; }

    /* Tabs */
    .content-wrapper { max-width: 80rem; margin: 0 auto; padding: 0 1.5rem; }
    .tab-bar {
      display: flex; gap: 0.5rem;
      background: var(--surface-container-low); padding: 0.375rem; border-radius: 0.75rem;
      margin-bottom: 2rem;
    }
    .tab-bar button {
      flex: 1; padding: 0.75rem;
      background: transparent; border: none; color: var(--text-muted);
      font-weight: 700; font-size: 0.875rem; border-radius: 0.5rem;
      cursor: pointer; transition: all 0.2s; font-family: inherit;
    }
    .tab-bar button.active { background: var(--card-bg); color: var(--text-main); }
    .tab-bar button:hover:not(.active) { color: var(--text-main); }
    .tab-content { animation: fadeIn 0.4s ease; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

    /* Products Panel */
    .products-panel {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr)); gap: 1.5rem;
    }
    .product-card {
      background: var(--card-bg); backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      border-radius: 1.5rem; overflow: hidden;
      transition: all 0.3s;
    }
    .product-card:hover { background: var(--surface-container-high); transform: translateY(-4px); }
    .product-image { position: relative; height: 12rem; overflow: hidden; }
    .product-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
    .product-card:hover .product-image img { transform: scale(1.05); }
    .product-price-badge {
      position: absolute; bottom: 0.75rem; right: 0.75rem;
      background: rgba(0,0,0,0.6); backdrop-filter: blur(12px);
      padding: 0.375rem 0.75rem; border-radius: 0.5rem;
      font-size: 1rem; font-weight: 800; color: #5eb4ff;
    }
    .product-info { padding: 1.5rem; }
    .product-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.125rem; font-weight: 700; margin: 0 0 0.5rem; color: var(--text-main); }
    .product-desc { font-size: 0.875rem; color: var(--text-muted); line-height: 1.5; margin: 0 0 1rem; }
    .product-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
    .glass-chip {
      background: var(--surface-container-high); padding: 0.25rem 0.5rem; border-radius: 0.375rem;
      font-size: 0.625rem; font-weight: 700; color: var(--text-muted);
      text-transform: uppercase; letter-spacing: 0.1em;
    }
    .product-footer { display: flex; justify-content: space-between; align-items: center; }
    .product-time { display: flex; align-items: center; gap: 0.25rem; font-size: 0.75rem; color: var(--text-muted); }
    .product-time .material-symbols-outlined { font-size: 0.875rem; color: var(--primary); }
    .btn-add {
      display: flex; align-items: center; gap: 0.25rem;
      background: linear-gradient(135deg, #5eb4ff, #2aa7ff);
      color: #000; border: none; border-radius: 0.75rem;
      padding: 0.625rem 1rem; font-weight: 700; font-size: 0.875rem;
      cursor: pointer; transition: all 0.2s;
    }
    .btn-add:hover { box-shadow: 0 8px 24px rgba(94,180,255,0.2); }
    .btn-add:active { transform: scale(0.95); }
    .btn-add .material-symbols-outlined { font-size: 1rem; }

    /* About Panel */
    .about-panel { display: flex; flex-direction: column; gap: 1.5rem; }
    .about-card, .amenities-card, .hours-card {
      background: var(--card-bg); backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      border-radius: 1.5rem; padding: 2rem;
    }
    .about-card h3, .amenities-card h3, .hours-card h3 {
      font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.25rem; font-weight: 800; margin: 0 0 1rem; color: var(--text-main);
    }
    .about-card p { color: var(--text-muted); line-height: 1.8; margin: 0; font-size: 1rem; }
    .amenities-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr)); gap: 1rem; }
    .amenity { display: flex; align-items: center; gap: 0.75rem; font-weight: 600; color: var(--text-main); }
    .amenity .material-symbols-outlined { color: var(--primary); }
    .hours-list { display: flex; flex-direction: column; gap: 0.75rem; }
    .hours-row { display: flex; justify-content: space-between; padding: 0.5rem 0; color: var(--text-main); }
    .hours-row .day { font-weight: 700; }
    .hours-row .time { color: var(--text-muted); }
    .hours-row .time.closed { color: #ef4444; }

    /* Reviews Panel */
    .reviews-panel { display: flex; flex-direction: column; gap: 2rem; }
    .reviews-summary {
      text-align: center;
      background: var(--card-bg); backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      padding: 3rem; border-radius: 1.5rem;
    }
    .score-big { font-size: 4rem; font-weight: 800; font-family: 'Plus Jakarta Sans', sans-serif; line-height: 1; margin-bottom: 0.5rem; color: var(--text-main); }
    .stars-row { display: flex; justify-content: center; gap: 0.25rem; margin-bottom: 0.75rem; }
    .score-label { font-size: 0.875rem; color: var(--text-muted); margin: 0; }

    .review-list { display: flex; flex-direction: column; gap: 1.25rem; }
    .review-node {
      background: var(--card-bg); backdrop-filter: blur(20px);
      border: 1px solid var(--glass-border);
      padding: 1.5rem; border-radius: 1.25rem;
    }
    .node-head { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
    .node-avatar {
      width: 2.75rem; height: 2.75rem; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 0.875rem; color: #000;
    }
    .node-meta h5 { margin: 0; font-size: 0.95rem; font-weight: 700; color: var(--text-main); }
    .node-meta span { font-size: 0.75rem; color: var(--text-muted); }
    .node-rating {
      margin-left: auto;
      background: rgba(250,204,21,0.1); color: #facc15;
      padding: 0.25rem 0.75rem; border-radius: 9999px;
      font-weight: 800; font-size: 0.875rem;
      display: flex; align-items: center; gap: 0.25rem;
    }
    .node-body { color: var(--text-muted); line-height: 1.7; margin: 0 0 0.75rem; font-size: 0.95rem; }
    .node-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .tag { font-size: 0.75rem; font-weight: 700; color: #fc9df7; }

    /* Footer */
    .page-footer {
      margin-top: 5rem; padding: 3rem 1.5rem;
      border-top: 1px solid var(--glass-border);
      background: var(--bg);
      transition: all 0.3s ease;
    }
    .footer-inner {
      max-width: 80rem; margin: 0 auto;
      display: flex; flex-direction: column; align-items: center;
      gap: 2rem;
    }
    @media (min-width: 768px) {
      .footer-inner { flex-direction: row; justify-content: space-between; }
    }
    .footer-brand { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
    @media (min-width: 768px) { .footer-brand { align-items: flex-start; } }
    .footer-logo { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.125rem; font-weight: 700; color: var(--text-main); }
    .footer-copy { color: var(--text-muted); font-size: 0.875rem; margin: 0; }
    .footer-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; }
    .footer-links a { color: var(--text-muted); font-size: 0.875rem; text-decoration: none; transition: color 0.2s; }
    .footer-links a:hover { color: var(--primary); }
    .footer-social { display: flex; gap: 1rem; }
    .social-btn {
      width: 2.5rem; height: 2.5rem; border-radius: 50%;
      background: var(--card-bg); border: 1px solid var(--glass-border);
      display: flex; align-items: center; justify-content: center;
      color: var(--text-main); cursor: pointer; transition: all 0.2s;
    }
    .social-btn:hover { color: #fff; border-color: var(--primary); background: var(--primary); }
    .social-btn .material-symbols-outlined { font-size: 1.25rem; }

    .social-btn .material-symbols-outlined { font-size: 1.25rem; }

    /* Management UI */
    .btn-icon-mng {
       background: rgba(94, 180, 255, 0.1); border: 1px solid var(--glass-border);
       color: var(--primary); width: 32px; height: 32px; border-radius: 50%;
       display: flex; align-items: center; justify-content: center;
       cursor: pointer; transition: all 0.2s;
       vertical-align: middle; margin-left: 0.5rem;
    }
    .btn-icon-mng:hover { background: var(--primary); color: #000; box-shadow: 0 0 10px var(--primary-glow); }
    .btn-icon-mng .material-symbols-outlined { font-size: 1.1rem; }

    .card-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
    .card-header-row h3 { margin: 0 !important; }

    .add-new-card {
       border: 2px dashed var(--glass-border) !important;
       background: transparent !important;
       display: flex; align-items: center; justify-content: center;
       cursor: pointer; min-height: 20rem;
    }
    .add-new-card:hover { border-color: var(--primary) !important; background: rgba(94, 180, 255, 0.05) !important; }
    .add-icon-box { text-align: center; color: var(--text-muted); transition: all 0.3s; }
    .add-new-card:hover .add-icon-box { color: var(--primary); transform: scale(1.05); }
    .add-icon-box span { font-size: 3rem; margin-bottom: 1rem; }

    .owner-actions {
       position: absolute; top: 0.75rem; left: 0.75rem;
       display: flex; gap: 0.5rem; opacity: 0; transition: opacity 0.3s;
    }
    .product-card:hover .owner-actions { opacity: 1; }
    .btn-mng-p {
       background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
       border: 1px solid rgba(255,255,255,0.1); color: #fff;
       width: 32px; height: 32px; border-radius: 0.5rem;
       display: flex; align-items: center; justify-content: center;
       cursor: pointer;
    }
    .btn-mng-p:hover { background: var(--primary); color: #000; }
    .btn-mng-p.delete:hover { background: #ef4444; color: #fff; }

    /* Modal & Forms */
    .modal-overlay {
       position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
       display: flex; align-items: center; justify-content: center; z-index: 2000;
       padding: 1.5rem;
    }
    .modal-card {
       background: var(--surface-container); border: 1px solid var(--border-color);
       border-radius: 1.5rem; width: 100%; max-width: 32rem; padding: 2rem;
       box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    }
    .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .modal-header h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; margin: 0; }
    
    .glass-form { display: grid; gap: 1.25rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .form-group label { font-size: 0.85rem; font-weight: 700; color: var(--text-muted); }
    .form-group input, .form-group textarea {
       background: var(--glass); border: 1px solid var(--glass-border);
       border-radius: 1rem; padding: 0.85rem 1.25rem; font-family: inherit;
       font-size: 0.95rem; color: var(--text-main);
    }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
    .glass-select { background: var(--glass); border: 1px solid var(--glass-border); color: var(--text-main); border-radius: 1rem; padding: 0.85rem; }
    .modal-footer { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; }
    .btn-link { background: transparent; border: none; font-weight: 700; color: var(--text-muted); cursor: pointer; }
    .btn-primary-glow {
       background: linear-gradient(135deg, var(--primary), #2aa7ff);
       color: #000; border: none; border-radius: 1rem; padding: 0.85rem 2rem;
       font-weight: 800; cursor: pointer; transition: all 0.3s;
       box-shadow: 0 0 20px var(--primary-glow);
    }

    .image-upload-box {
       height: 10rem; border: 2px dashed var(--glass-border); border-radius: 1rem;
       display: flex; align-items: center; justify-content: center; cursor: pointer;
       position: relative; overflow: hidden;
    }
    .image-upload-box img { width: 100%; height: 100%; object-fit: cover; }
    .upload-placeholder { text-align: center; color: var(--text-muted); }
    .upload-placeholder span { font-size: 2rem; margin-bottom: 0.5rem; }

    /* About Editors */
    .glass-textarea { width: 100%; min-height: 12rem; margin-bottom: 2rem; resize: vertical; }
    .amenities-editor { display: flex; flex-direction: column; margin-bottom: 2rem; }
    .amenity-toggle {
       background: var(--glass); border: 1px solid var(--glass-border); color: var(--text-muted);
       padding: 0.75rem 1.25rem; border-radius: 1rem; cursor: pointer;
       display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;
       font-weight: 600; font-size: 0.875rem;
    }
    .amenity-toggle.active { background: var(--primary); color: #000; border-color: var(--primary); }
    .amenity-toggle span { line-height: 1; }

    .amenities-selection-grid { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem; }
    .editor-actions { width: 100%; display: flex; justify-content: flex-start; }

    .hours-editor { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
    .day-row { display: grid; grid-template-columns: 6rem 1fr 6rem; align-items: center; gap: 1rem; background: var(--glass); padding: 0.75rem 1.25rem; border-radius: 1rem; }
    .day-label { font-weight: 700; font-size: 0.875rem; }
    .time-inputs { display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-size: 0.8rem; }
    .time-inputs input { background: rgba(0,0,0,0.2); border: 1px solid var(--glass-border); color: #fff; padding: 0.4rem; border-radius: 0.5rem; }
    .closed-toggle { font-size: 0.8rem; display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: #ef4444; }

    @media (max-width: 768px) {
      .bento-gallery {
        grid-template-columns: 1fr;
        grid-template-rows: 16rem;
        height: auto;
      }
      .bento-side-top, .bento-side-bottom { display: none; }
      .shop-title { font-size: 1.75rem; }
      .action-cards { grid-template-columns: 1fr; }
      .products-panel { grid-template-columns: 1fr; }
    }
  `]
})
export class ShopDetailComponent implements OnInit {
  activeTab: 'products' | 'about' | 'reviews' = 'products';
  isFavorited = false;
  shopId: string | null = null;

  shop: any = {
    name: 'The Golden Crust',
    category: 'Artisan Bakery',
    rating: 4.8,
    reviewCount: 128,
    address: '42 Baker Street, Downtown Core',
    hours: 'Closes 9 PM',
    isOpen: true,
    description: 'Founded in 2019, The Golden Crust is a neighborhood bakery that believes in the art of slow-fermented bread. We source our wheat from organic farms and every loaf is given 24 hours of fermentation for that perfect crust and tang. Our pastry chef trained in Paris and brings a fusion of French technique with local Indian flavors.',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCUsuAfvwhrFfOLDeqIh9jssV5dDYr4128gK4R1OjZxeSCTrgLiXW_sLN_0I2baZ3EsypaWtPfiUNvYRrGdPWD5WlkT7vuYJN2CX9cnA4SnBsHmZuJCFnUQBUdJWH3qOJyab8dFMnxIme0I7QjwsZGFMGiDvzCLKaJN1mHfCzXtGlwKkDtFgLmN_yFEKvQ9ndJUTlB6YqTUiTEoYKmRFphZC2NuYu6euyu4xT0bEdwcLhuSL16lOZr82Mh8KRsn9plMdkPyt7NvYRx6'
    ],
    workerCount: 0
  };

  products: any[] = [];

  galleryImages = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAKL_Gt0OYgyVI77ZOgLQt3quHujfWLr7jOYdrTIk8L931aBeRBqSRr5-Aoy2CJhm4PxppgYFrtoheNqCH4VTp-P8kxGuF0zdnyGJMj6qc5EHc_L69ZekNcPSQV-dJFNMZ4WKJbt6kE_FYz6ZHIntKoKlas7PGxLZ3bNIumtL0YjcKr6rLeVjSL-yWYLDfmyCXPeafVquM866KDuJL80TurE7oqG9OkkIh8sfy97ultbrmqJ-w8UbXuQUb7gKYbx2GXzI0onVNWpRDm',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDt5Jyfc8T2q_H_cOv2GbLu4JlJaXx--NL_i4FjuEiNDxaNPUKgGvH1N1wCsJcLXMHq8BfOtheFfFaB2lxC53fqH64cVOLDuPIR2hIxEYYzrSgHdfKH8YCNEwq_fAVkidHllvZopbHxFScIqJ5dVHPWnHt9xxcLT0yz-wlCGBN_3xBBD8bU-f9qdAaLy6dlYZw7fhdZWCgVZkWJ3RK2NLAExSGDYPGqpN1zn-TwONPG3w3cjkZTrQ5qWZHYPnkJB547Nm7AvT3IPLB',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCUsuAfvwhrFfOLDeqIh9jssV5dDYr4128gK4R1OjZxeSCTrgLiXW_sLN_0I2baZ3EsypaWtPfiUNvYRrGdPWD5WlkT7vuYJN2CX9cnA4SnBsHmZuJCFnUQBUdJWH3qOJyab8dFMnxIme0I7QjwsZGFMGiDvzCLKaJN1mHfCzXtGlwKkDtFgLmN_yFEKvQ9ndJUTlB6YqTUiTEoYKmRFphZC2NuYu6euyu4xT0bEdwcLhuSL16lOZr82Mh8KRsn9plMdkPyt7NvYRx6',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCM1Qnj0VQEg70OrDBJmRJJWTVNTT3y_Grqv_5MwrPY-hnO0pioqbHD1hKnuzVR3X4IaexULI2Nvz0mVCi30BxotDpzU8NIXlO1gzdlKqgHfMbIRTytX2fdcqdLLjgRT6PB7mF_Bh_zjCbpL99ST2_s6zss2t5CZvMa9xLms2AwjtVb0PPqpMrsgwGEyH7qbNFNkjzRoczmWMM77uDuHuNgSyVu-B-SuFjC6899oWRM26K35PbnNI1ClKn79xDjVuUQEWlRBfj9Q2PH'
  ];

  reviews = [
    { name: 'Priya S.', initials: 'PS', rating: 5, date: '2 days ago', comment: 'The sourdough is absolutely incredible! You can taste the 24-hour fermentation. The crust is perfect – crispy and golden. This bakery has completely replaced my bread brand loyalty.', tags: ['Authentic', 'Value'], color: '#fc9df7' },
    { name: 'Rahul M.', initials: 'RM', rating: 4, date: '1 week ago', comment: 'Great pastries, especially the butter croissant. The chocolate lava cake is a must-try. Slightly pricey but the quality justifies it. Cozy ambiance too.', tags: ['Professional', 'Clean'], color: '#5eb4ff' },
    { name: 'Ananya K.', initials: 'AK', rating: 5, date: '2 weeks ago', comment: 'Best masala patties in the neighborhood! Hot, flaky, and perfectly spiced. I come here every evening with my kids. The staff is always friendly and welcoming.', tags: ['Friendly', 'Quick'], color: '#6bfe9c' }
  ];

  amenities = [
    { icon: 'wifi', label: 'Free Wi-Fi' },
    { icon: 'local_parking', label: 'Street Parking' },
    { icon: 'ac_unit', label: 'Air Conditioned' },
    { icon: 'credit_card', label: 'Digital Payments' },
    { icon: 'child_care', label: 'Kid Friendly' },
    { icon: 'accessible', label: 'Wheelchair Access' }
  ];

  businessHours = [
    { day: 'Monday', time: '6:00 AM - 9:00 PM', closed: false },
    { day: 'Tuesday', time: '6:00 AM - 9:00 PM', closed: false },
    { day: 'Wednesday', time: '6:00 AM - 9:00 PM', closed: false },
    { day: 'Thursday', time: '6:00 AM - 9:00 PM', closed: false },
    { day: 'Friday', time: '6:00 AM - 10:00 PM', closed: false },
    { day: 'Saturday', time: '7:00 AM - 10:00 PM', closed: false },
    { day: 'Sunday', time: 'Closed', closed: true }
  ];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.shopId = this.route.snapshot.paramMap.get('id');
    if (this.shopId) {
      this.apiService.getShopById(this.shopId).subscribe({
        next: (s: any) => {
          if (s) {
            this.shop = {
              ...this.shop,
              ...s,
              name: s.name,
              description: s.description || this.shop.description,
              address: s.address || this.shop.address,
              images: (s.photos && s.photos.length > 0) ? s.photos : this.shop.images,
              category: s.categoryName || this.shop.category,
              isOpen: s.isOpen,
              hours: (s.openingTime && s.closingTime) ? `${this.to12h(s.openingTime)} - ${this.to12h(s.closingTime)}` : this.shop.hours,
              reviewCount: s.reviewCount || this.shop.reviewCount,
              rating: s.averageRating?.toFixed(1) || this.shop.rating,
              workerCount: s.workerCount,
              phoneNumber: s.phoneNumber,
              latitude: s.latitude,
              longitude: s.longitude
            };
            this.checkOwnership();
          }
        }
      });
      
      this.apiService.getProductsByShop(this.shopId).subscribe({
        next: (data) => {
          this.products = data.map(p => ({
            ...p,
            price: '₹' + p.price,
            image: p.imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKL_Gt0OYgyVI77ZOgLQt3quHujfWLr7jOYdrTIk8L931aBeRBqSRr5-Aoy2CJhm4PxppgYFrtoheNqCH4VTp-P8kxGuF0zdnyGJMj6qc5EHc_L69ZekNcPSQV-dJFNMZ4WKJbt6kE_FYz6ZHIntKoKlas7PGxLZ3bNIumtL0YjcKr6rLeVjSL-yWYLDfmyCXPeafVquM866KDuJL80TurE7oqG9OkkIh8sfy97ultbrmqJ-w8UbXuQUb7gKYbx2GXzI0onVNWpRDm',
            chips: ['Verified', 'Local']
          }));
        }
      });
    }
  }

  getDirections(): void {
    if (this.shop.latitude && this.shop.longitude) {
      window.open(`https://www.google.com/maps?q=${this.shop.latitude},${this.shop.longitude}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.shop.address)}`, '_blank');
    }
  }

  /** Redirects to login if not authenticated; returns true if logged in */
  private requireLogin(): boolean {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  bookAppointment(): void {
    if (this.requireLogin()) {
      this.router.navigate(['/book-service', this.shopId]);
    }
  }

  addProduct(product: any): void {
    if (!this.requireLogin()) return;
    // TODO: Add product to cart logic
  }

  toggleFavorite(): void {
    if (!this.requireLogin()) return;
    this.isFavorited = !this.isFavorited;
  }

  getStars(n: number): number[] { return Array(Math.floor(n)).fill(0); }

  // MANAGEMENT LOGIC
  isOwner = false;
  isEditingAbout = false;
  isEditingAmenities = false;
  isEditingHours = false;
  showProductModal = false;
  isUploading = false;

  editingProduct: any = null;
  newProduct: any = { name: '', price: 0, description: '', isAvailable: true, imageUrl: '' };
  
  editShopData: any = { ourStory: '', amenities: '', dailyHours: '' };
  editHoursData: any[] = [];

  AMENITY_LIST = [
    { id: 'wifi', icon: 'wifi', label: 'Free Wi-Fi' },
    { id: 'parking', icon: 'local_parking', label: 'Parking' },
    { id: 'ac', icon: 'ac_unit', label: 'Air Conditioned' },
    { id: 'payment', icon: 'credit_card', label: 'Digital Payment' },
    { id: 'kids', icon: 'child_care', label: 'Kid Friendly' },
    { id: 'accessible', icon: 'accessible', label: 'Wheelchair Access' },
    { id: 'seating', icon: 'event_seat', label: 'Outdoor Seating' },
    { id: 'delivery', icon: 'delivery_dining', label: 'Home Delivery' }
  ];

  DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  get displayAmenities() {
    if (!this.shop?.amenities) return [];
    const ids = this.shop.amenities.split(',').map((s: string) => s.trim());
    return this.AMENITY_LIST.filter(a => ids.includes(a.id));
  }

  get displayBusinessHours() {
     if (this.shop?.dailyHours) {
        try {
           return JSON.parse(this.shop.dailyHours);
        } catch(e) {
           console.error('Failed to parse dailyHours', e);
        }
     }
     
     // Fallback to openingTime and closingTime if available
     if (this.shop?.openingTime && this.shop?.closingTime) {
        const timeStr = `${this.to12h(this.shop.openingTime)} - ${this.to12h(this.shop.closingTime)}`;
        return this.DAYS.map(day => ({
           day,
           time: timeStr,
           closed: false
        }));
     }

     return this.businessHours; // static default
  }

  get todayHours(): string {
     const day = new Date().toLocaleString('en-US', { weekday: 'long' });
     const h = this.displayBusinessHours.find((x: any) => x.day === day);
     return h ? (h.closed ? 'Closed' : h.time) : 'N/A';
  }

  get isClosedToday(): boolean {
     const day = new Date().toLocaleString('en-US', { weekday: 'long' });
     const h = this.displayBusinessHours.find((x: any) => x.day === day);
     return h ? h.closed : false;
  }

  checkOwnership() {
    const user = this.authService.currentUser;
    if (user && this.shop && (user.id === this.shop.ownerId)) {
      this.isOwner = true;
      this.editShopData = {
        ourStory: this.shop.ourStory || '',
        amenities: this.shop.amenities || '',
        dailyHours: this.shop.dailyHours || ''
      };
      this.initHoursEditor();
    }
  }

  initHoursEditor() {
    const current = this.displayBusinessHours;
    this.editHoursData = current.map((h: any) => {
       const timeRange = (h.time && h.time.includes(' - ')) ? h.time : '09:00 AM - 09:00 PM';
       const [open, close] = timeRange.split(' - ');
       return { 
          day: h.day, 
          open: this.to24h(open) || '09:00', 
          close: this.to24h(close) || '21:00', 
          closed: h.closed 
       };
    });
  }

  private to24h(timeStr: string) {
    if (!timeStr || timeStr === 'Closed') return null;
    const parts = timeStr.split(' ');
    if (parts.length < 2) return timeStr; // Already in 24h or malformed
    const time = parts[0];
    const modifier = parts[1];
    let [hours, minutes] = time.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM' && hours !== '12') hours = (parseInt(hours, 10) + 12).toString();
    return `${hours.padStart(2, '0')}:${minutes || '00'}`;
  }

  private to12h(time24: string) {
    if (!time24) return '';
    const [h, m] = time24.split(':');
    const hours = parseInt(h, 10);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const h12 = ((hours + 11) % 12 + 1);
    return `${h12}:${m} ${suffix}`;
  }

  isAmenitySelected(id: string) {
    return this.editShopData.amenities?.split(',').includes(id);
  }

  toggleAmenityId(id: string) {
    let ids = this.editShopData.amenities ? this.editShopData.amenities.split(',').map((s: string) => s.trim()).filter((s: string) => s) : [];
    if (ids.includes(id)) {
      ids = ids.filter((i: string) => i !== id);
    } else {
      ids.push(id);
    }
    this.editShopData.amenities = ids.join(',');
  }

  private getShopPayload(): any {
    return {
      id: this.shop.id,
      ownerId: this.shop.ownerId,
      name: this.shop.name,
      categoryId: this.shop.categoryId,
      workerCount: this.shop.workerCount,
      workerNames: this.shop.workerNames,
      description: this.shop.description,
      address: this.shop.address,
      openingHours: this.shop.openingHours,
      openingTime: this.shop.openingTime,
      closingTime: this.shop.closingTime,
      phoneNumber: this.shop.phoneNumber,
      latitude: this.shop.latitude,
      longitude: this.shop.longitude,
      ourStory: this.shop.ourStory,
      amenities: this.shop.amenities,
      dailyHours: this.shop.dailyHours
    };
  }

  saveShopAbout() {
    this.shop.ourStory = this.editShopData.ourStory;
    this.apiService.updateShop(this.shop.id, this.getShopPayload()).subscribe({
      next: (updatedShop) => {
        this.shop = { ...this.shop, ...updatedShop };
        this.isEditingAbout = false;
        alert('Our story updated successfully!');
      },
      error: (err) => {
        console.error('Failed to update our story', err);
        alert('Failed to update our story. Please try again.');
      }
    });
  }

  saveShopAmenities() {
    this.shop.amenities = this.editShopData.amenities;
    this.apiService.updateShop(this.shop.id, this.getShopPayload()).subscribe({
      next: (updatedShop) => {
        this.shop = { ...this.shop, ...updatedShop };
        this.isEditingAmenities = false;
        alert('Amenities updated successfully!');
      },
      error: (err) => {
        console.error('Failed to update amenities', err);
        alert('Failed to update amenities. Please try again.');
      }
    });
  }

  saveShopHours() {
    const finalHours = this.editHoursData.map(h => ({
       day: h.day,
       time: h.closed ? 'Closed' : `${this.to12h(h.open)} - ${this.to12h(h.close)}`,
       closed: h.closed
    }));
    this.shop.dailyHours = JSON.stringify(finalHours);
    this.apiService.updateShop(this.shop.id, this.getShopPayload()).subscribe({
      next: (updatedShop) => {
        this.shop = { ...this.shop, ...updatedShop };
        this.isEditingHours = false;
        alert('Business hours updated successfully!');
      },
      error: (err) => {
        console.error('Failed to update business hours', err);
        alert('Failed to update business hours. Please try again.');
      }
    });
  }

  // Product CRUD
  openProductModal() {
    this.editingProduct = null;
    this.newProduct = { name: '', price: 0, description: '', isAvailable: true, imageUrl: '' };
    this.showProductModal = true;
  }

  editProduct(p: any) {
    this.editingProduct = p;
    this.newProduct = { ...p, price: parseFloat(p.price.toString().replace('₹', '')) };
    this.showProductModal = true;
  }

  onListingPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.isUploading = true;
      this.apiService.uploadFile(file).subscribe({
        next: (url) => {
          this.newProduct.imageUrl = url;
          this.isUploading = false;
        },
        error: () => this.isUploading = false
      });
    }
  }

  saveProduct() {
     if (!this.shop.id) return;
     this.isUploading = true;
     const payload = { ...this.newProduct, shopId: this.shop.id };
     
     if (this.editingProduct?.id) {
        this.apiService.updateProduct(this.editingProduct.id, payload).subscribe({
           next: () => this.refreshProducts(),
           error: () => this.isUploading = false
        });
     } else {
        this.apiService.createProduct(payload).subscribe({
           next: () => this.refreshProducts(),
           error: () => this.isUploading = false
        });
     }
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this listing?')) {
       this.apiService.deleteProduct(id).subscribe(() => this.refreshProducts());
    }
  }

  refreshProducts() {
     this.showProductModal = false;
     this.isUploading = false;
     this.apiService.getProductsByShop(this.shopId!).subscribe(data => {
        this.products = data.map(p => ({
           ...p,
           price: '₹' + p.price,
           image: p.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7ed9d42177?auto=format&fit=crop&q=80',
           chips: ['Verified', 'Local']
        }));
     });
  }

  editBasicInfo() {
     const name = prompt('Enter Business Name', this.shop.name);
     const desc = prompt('Enter Business Description', this.shop.description);
     if (name) {
        this.shop.name = name;
        this.shop.description = desc;
        this.apiService.updateShop(this.shop.id, this.getShopPayload()).subscribe({
           next: () => alert('Quick info updated!'),
           error: () => alert('Failed to update quick info.')
        });
     }
  }
}

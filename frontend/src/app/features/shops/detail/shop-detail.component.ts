import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-shop-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="shop-detail-premium">
      <!-- Adaptive Hero Section -->
      <section class="hero-mount" [style.backgroundImage]="'url(' + shop.image + ')'">
        <div class="hero-glass-overlay">
          <div class="top-navigation">
            <a routerLink="/browse" class="btn-back-glass">
              <span class="material-icons">arrow_back</span>
              Explore Nikat
            </a>
            <div class="action-spread">
              <button class="btn-icon-glass"><span class="material-icons">favorite_border</span></button>
              <button class="btn-icon-glass"><span class="material-icons">share</span></button>
            </div>
          </div>

          <div class="shop-prime-meta">
            <div class="badge-cluster">
              <span class="badge-pill verified" *ngIf="shop.isOpen">
                <span class="material-icons">verified</span> Verified
              </span>
              <span class="badge-pill category">{{shop.category}}</span>
            </div>
            <h1>{{shop.name}}</h1>
            <div class="meta-stats">
              <div class="stat-item rating">
                <span class="material-icons">star</span>
                <strong>{{shop.rating}}</strong>
                <span class="count">({{shop.reviewCount}} reviews)</span>
              </div>
              <div class="divider"></div>
              <div class="stat-item loc">
                <span class="material-icons">location_on</span>
                {{shop.address}}
              </div>
              <div class="divider"></div>
              <div class="stat-item status" [class.is-open]="shop.isOpen">
                <span class="dot"></span>
                {{shop.isOpen ? 'Open Now' : 'Closed'}} • Closes 9 PM
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="detail-grid">
        <!-- Sticky Booking / Info Sidebar -->
        <aside class="sidebar-sticky">
          <div class="booking-card-glass">
            <div class="card-header">
              <h3>Reservations</h3>
              <p>Book your slot instantly</p>
            </div>
            <div class="quick-info-list">
              <div class="info-row">
                <span class="material-icons">schedule</span>
                <div class="txt">
                  <label>Service Time</label>
                  <span>Approx. 45 - 60 mins</span>
                </div>
              </div>
              <div class="info-row">
                <span class="material-icons">payments</span>
                <div class="txt">
                  <label>Pricing</label>
                  <span>Starting from ₹450</span>
                </div>
              </div>
            </div>
            <button class="btn-book-prime">Book Appointment Now</button>
            <p class="card-note">Free cancellation up to 24h prior</p>
          </div>

          <div class="biz-info-glass">
            <h4>Location & Hours</h4>
            <div class="mini-map">
              <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400" alt="map">
              <button class="btn-dir">Get Directions</button>
            </div>
            <p class="full-addr">{{shop.address}}</p>
          </div>
        </aside>

        <!-- Main Content Scroll -->
        <main class="main-scroll">
          <nav class="section-tabs">
            <button [class.active]="activeSection === 'services'" (click)="activeSection = 'services'">Services</button>
            <button [class.active]="activeSection === 'gallery'" (click)="activeSection = 'gallery'">Gallery</button>
            <button [class.active]="activeSection === 'reviews'" (click)="activeSection = 'reviews'">Reviews</button>
            <button [class.active]="activeSection === 'about'" (click)="activeSection = 'about'">About</button>
          </nav>

          <!-- Services Section -->
          <section class="content-block" *ngIf="activeSection === 'services'">
            <div class="menu-category" *ngFor="let cat of ['Featured Services', 'Grooming', 'Styling']">
              <h3>{{cat}}</h3>
              <div class="service-list">
                <div class="service-card-premium" *ngFor="let p of products">
                  <div class="s-info">
                    <h4>{{p.name}}</h4>
                    <p>{{p.description}}</p>
                    <div class="s-meta">
                      <span class="price">{{p.price}}</span>
                      <span class="time">45 mins</span>
                    </div>
                  </div>
                  <div class="s-action">
                    <button class="btn-add-s">Select</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Gallery Section -->
          <section class="content-block" *ngIf="activeSection === 'gallery'">
            <div class="gallery-layout">
              <div class="g-item" *ngFor="let img of galleryImages">
                <img [src]="img" alt="Gallery">
              </div>
            </div>
          </section>

          <!-- Reviews Section -->
          <section class="content-block" *ngIf="activeSection === 'reviews'">
            <div class="reviews-hub">
              <div class="overview-card">
                <div class="big-score">{{shop.rating}}</div>
                <div class="stars-cluster">
                  <span class="material-icons" *ngFor="let s of [1,2,3,4,5]">star</span>
                </div>
                <p>Based on {{shop.reviewCount}} verified reviews</p>
              </div>
              
              <div class="review-stream">
                <div class="review-node-glass" *ngFor="let r of reviews">
                  <div class="node-header">
                    <div class="avatar">{{r.initials}}</div>
                    <div class="node-meta">
                      <h5>{{r.name}}</h5>
                      <span>{{r.date}}</span>
                    </div>
                    <div class="node-rating">
                      <span class="material-icons">star</span>
                      {{r.rating}}
                    </div>
                  </div>
                  <p class="node-text">{{r.comment}}</p>
                  <div class="node-tags">
                    <span class="tag">#Professional</span>
                    <span class="tag">#Clean</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- About Section -->
          <section class="content-block" *ngIf="activeSection === 'about'">
            <div class="about-glass">
              <h3>Our Story</h3>
              <p>{{shop.description}}</p>
              
              <div class="amenities-grid">
                <div class="amenity">
                  <span class="material-icons">wifi</span>
                  Free Wi-Fi
                </div>
                <div class="amenity">
                  <span class="material-icons">local_parking</span>
                  Free Parking
                </div>
                <div class="amenity">
                  <span class="material-icons">ac_unit</span>
                  Air Conditioned
                </div>
                <div class="amenity">
                  <span class="material-icons">credit_card</span>
                  Digital Payments
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');

    :host {
      --primary: #3b82f6;
      --primary-glow: rgba(59, 130, 246, 0.4);
      --glass-bg: rgba(13, 18, 45, 0.6);
      --glass-border: rgba(255, 255, 255, 0.1);
      --text-main: #e2e8f0;
      --text-muted: #94a3b8;
      font-family: 'Manrope', sans-serif;
    }

    .shop-detail-premium {
      min-height: 100vh;
      background: #020410;
      color: var(--text-main);
    }

    /* Hero Section */
    .hero-mount {
      height: 60vh; background-size: cover; background-position: center; position: relative;
    }
    .hero-glass-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(2,4,16,0.3) 0%, rgba(2,4,16,0.95) 100%);
      display: flex; flex-direction: column; justify-content: space-between; padding: 2rem 4rem;
    }

    .top-navigation { display: flex; justify-content: space-between; align-items: center; }
    .btn-back-glass {
      background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); color: #fff;
      padding: 0.75rem 1.5rem; border-radius: 2rem; border: 1px solid rgba(255,255,255,0.2);
      text-decoration: none; display: flex; align-items: center; gap: 0.5rem; font-weight: 700;
      transition: all 0.3s;
    }
    .btn-back-glass:hover { background: rgba(255,255,255,0.2); transform: translateX(-5px); }

    .action-spread { display: flex; gap: 1rem; }
    .btn-icon-glass {
      width: 48px; height: 48px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.2);
      background: rgba(255,255,255,0.1); color: #fff; cursor: pointer; transition: all 0.3s;
    }
    .btn-icon-glass:hover { background: var(--primary); border-color: var(--primary); transform: scale(1.1); }

    .shop-prime-meta { max-width: 1200px; margin: 0 auto; width: 100%; }
    .badge-cluster { display: flex; gap: 0.75rem; margin-bottom: 1rem; }
    .badge-pill { padding: 0.4rem 1rem; border-radius: 2rem; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 0.4rem; }
    .badge-pill.verified { background: rgba(59, 130, 246, 0.2); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.3); }
    .badge-pill.category { background: rgba(255,255,255,0.1); color: var(--text-muted); border: 1px solid var(--glass-border); }

    .shop-prime-meta h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 4rem; font-weight: 800; margin: 0 0 1.5rem 0; letter-spacing: -2px; }

    .meta-stats { display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
    .stat-item { display: flex; align-items: center; gap: 0.5rem; font-weight: 600; color: var(--text-main); }
    .stat-item.rating { color: #f59e0b; }
    .stat-item .material-icons { font-size: 1.25rem; }
    .divider { width: 1px; height: 16px; background: rgba(255,255,255,0.2); }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #ef4444; }
    .stat-item.is-open .dot { background: #10b981; box-shadow: 0 0 10px #10b981; }

    /* Layout Content */
    .detail-grid { max-width: 1400px; margin: -5rem auto 0; padding: 0 4rem 5rem; display: flex; gap: 4rem; position: relative; z-index: 20; }
    .sidebar-sticky { width: 380px; flex-shrink: 0; display: flex; flex-direction: column; gap: 2rem; }
    .sidebar-sticky > div { position: sticky; top: 2rem; } /* Will need fix for multiple sticky */

    .booking-card-glass {
      background: var(--glass-bg); backdrop-filter: blur(20px); border: 1px solid var(--glass-border);
      border-radius: 2.5rem; padding: 2.5rem; box-shadow: 0 20px 50px rgba(0,0,0,0.4);
    }
    .card-header h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.6rem; margin: 0 0 0.25rem 0; }
    .card-header p { color: var(--text-muted); margin: 0 0 2rem 0; font-size: 0.95rem; }

    .quick-info-list { display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 2.5rem; }
    .info-row { display: flex; align-items: center; gap: 1rem; }
    .info-row .material-icons { width: 44px; height: 44px; border-radius: 12px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; color: var(--primary); }
    .info-row .txt label { display: block; font-size: 0.75rem; color: var(--text-muted); font-weight: 800; text-transform: uppercase; margin-bottom: 2px; }
    .info-row .txt span { font-weight: 700; font-size: 1rem; }

    .btn-book-prime {
      width: 100%; padding: 1.25rem; border-radius: 1.5rem; border: none;
      background: linear-gradient(135deg, #3b82f6, #2563eb); color: #fff;
      font-weight: 800; font-size: 1.1rem; cursor: pointer; transition: all 0.3s;
      box-shadow: 0 10px 30px var(--primary-glow); margin-bottom: 1rem;
    }
    .btn-book-prime:hover { transform: translateY(-3px); box-shadow: 0 15px 40px var(--primary-glow); }
    .card-note { text-align: center; font-size: 0.8rem; color: var(--text-muted); }

    .biz-info-glass {
      background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 2rem; padding: 1.5rem;
    }
    .mini-map { height: 15vw; min-height: 150px; border-radius: 1.5rem; overflow: hidden; position: relative; margin: 1rem 0; }
    .mini-map img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) invert(0.9); }
    .btn-dir { position: absolute; bottom: 1rem; right: 1rem; background: #fff; color: #000; border: none; padding: 0.6rem 1.2rem; border-radius: 1rem; font-weight: 800; font-size: 0.85rem; cursor: pointer; }

    .main-scroll { flex: 1; min-width: 0; }
    .section-tabs { display: flex; gap: 0.5rem; background: rgba(255,255,255,0.05); padding: 0.5rem; border-radius: 1.5rem; margin-bottom: 3rem; }
    .section-tabs button { flex: 1; border: none; background: transparent; color: var(--text-muted); padding: 1rem; border-radius: 1rem; font-weight: 700; cursor: pointer; transition: all 0.3s; font-family: inherit; }
    .section-tabs button.active { background: var(--glass-bg); color: #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.2); }

    .content-block { animation: fadeIn 0.5s ease; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

    .menu-category { margin-bottom: 3.5rem; }
    .menu-category h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.8rem; margin-bottom: 1.5rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--glass-border); }
    
    .service-list { display: flex; flex-direction: column; gap: 1.25rem; }
    .service-card-premium {
      display: flex; justify-content: space-between; align-items: center;
      background: var(--glass-bg); border: 1px solid var(--glass-border);
      padding: 1.75rem 2rem; border-radius: 1.75rem; transition: all 0.3s;
    }
    .service-card-premium:hover { border-color: var(--primary); transform: translateX(5px); }
    .s-info h4 { font-size: 1.25rem; font-weight: 800; margin: 0 0 0.4rem 0; }
    .s-info p { color: var(--text-muted); margin: 0 0 1rem 0; font-size: 0.95rem; line-height: 1.5; }
    .s-meta { display: flex; gap: 1.5rem; }
    .s-meta span { font-weight: 800; color: var(--primary); font-size: 1.1rem; }
    .s-meta .time { color: var(--text-muted); font-size: 0.85rem; font-weight: 500; }

    .btn-add-s { background: #fff; color: #000; border: none; padding: 0.75rem 1.75rem; border-radius: 1rem; font-weight: 800; cursor: pointer; transition: all 0.2s; }
    .btn-add-s:hover { background: var(--primary); color: #fff; }

    .gallery-layout { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
    .g-item { height: 280px; border-radius: 1.5rem; overflow: hidden; border: 1px solid var(--glass-border); }
    .g-item img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
    .g-item:hover img { transform: scale(1.1); }

    .reviews-hub { display: flex; flex-direction: column; gap: 3rem; }
    .overview-card { text-align: center; background: var(--glass-bg); padding: 3rem; border-radius: 2.5rem; border: 1px solid var(--glass-border); }
    .big-score { font-size: 5rem; font-weight: 800; font-family: 'Plus Jakarta Sans', sans-serif; line-height: 1; margin-bottom: 0.5rem; }
    .stars-cluster { color: #f59e0b; margin-bottom: 1rem; }
    .review-stream { display: flex; flex-direction: column; gap: 1.5rem; }
    .review-node-glass { background: var(--glass-bg); border: 1px solid var(--glass-border); padding: 2rem; border-radius: 2rem; }
    .node-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem; }
    .avatar { width: 44px; height: 44px; border-radius: 50%; background: var(--primary); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; }
    .node-meta h5 { margin: 0; font-size: 1rem; }
    .node-meta span { color: var(--text-muted); font-size: 0.8rem; }
    .node-rating { margin-left: auto; background: rgba(245, 158, 11, 0.1); color: #f59e0b; padding: 4px 12px; border-radius: 2rem; font-weight: 800; font-size: 0.9rem; display: flex; align-items: center; gap: 4px; }
    .node-text { line-height: 1.7; color: var(--text-muted); }

    .about-glass { background: var(--glass-bg); border: 1px solid var(--glass-border); padding: 3rem; border-radius: 2.5rem; }
    .about-glass p { font-size: 1.1rem; line-height: 1.8; color: var(--text-muted); margin-bottom: 3rem; }
    .amenities-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
    .amenity { display: flex; align-items: center; gap: 1rem; font-weight: 700; color: var(--text-main); }
    .amenity .material-icons { color: var(--primary); }

    @media (max-width: 1024px) {
      .detail-grid { flex-direction: column; padding: 0 2rem 5rem; gap: 2rem; }
      .sidebar-sticky { width: 100%; order: 2; }
      .main-scroll { order: 1; }
      .hero-mount { height: 40vh; }
      .hero-glass-overlay { padding: 2rem; }
      .shop-prime-meta h1 { font-size: 2.5rem; }
    }
  `]
})
export class ShopDetailComponent implements OnInit {
  activeSection: 'services' | 'gallery' | 'reviews' | 'about' = 'services';
  shop: any = {
    name: 'Urban Fade Barbershop', 
    category: 'Salon & Grooming', 
    rating: 4.8, 
    reviewCount: 128,
    address: '42 Premium Skyline, Downtown Core', 
    hours: '9:00 AM - 9:00 PM', 
    isOpen: true,
    description: 'A sanctuary for the modern gentleman. We blend traditional barbering techniques with contemporary styles to give you the sharpest look in the city. Our master stylists specialize in high-fades, straight-razor shaves, and grooming consultations.',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&q=80'
  };

  products = [
    { name: 'Signature Fade Cut', description: 'Our most popular service. Includes consultation, precision fade, and style styling.', price: '₹450', image: 'https://images.unsplash.com/photo-1599351474290-288d848c47ac?w=400&q=80' },
    { name: 'Traditional Hot Shave', description: 'Luxurious 30-minute experience with hot towels, essential oils, and straight razor.', price: '₹350', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80' },
    { name: 'Beard Sculpture & Trim', description: 'Complete beard redesign and maintenance using premium oils and precision trimmers.', price: '₹250', image: 'https://images.unsplash.com/photo-1512690196236-d5a7139e8396?w=400&q=80' }
  ];

  galleryImages = [
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600',
    'https://images.unsplash.com/photo-1532710093739-9470acff878b?w=600',
    'https://images.unsplash.com/photo-1599351474290-288d848c47ac?w=600'
  ];

  reviews = [
    { name: 'Sarah M.', initials: 'SM', rating: 5, date: '2 days ago', comment: 'Absolutely incredible experience! The attention to detail is unmatched. Rahul is a master of his craft. The atmosphere is professional and high-end.' },
    { name: 'James K.', initials: 'JK', rating: 4.5, date: '1 week ago', comment: 'Best fade I\'ve had in a long time. The waiting area is comfortable and they offer great coffee while you wait.' }
  ];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getShopById(id).subscribe({
        next: (s: any) => {
          if (s) {
            this.shop = { ...this.shop, ...s,
              image: s.imageUrl || this.shop.image,
              category: s.categoryName || this.shop.category,
              isOpen: s.status === 'APPROVED',
              reviewCount: s.reviewCount || this.shop.reviewCount,
              rating: s.averageRating?.toFixed(1) || this.shop.rating
            };
          }
        }
      });
    }
  }

  getStars(n: number): number[] { return Array(Math.floor(n)).fill(0); }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-shop-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="detail-page">
      <!-- Hero Banner -->
      <div class="shop-hero" [style.backgroundImage]="'url(' + shop.image + ')'">
        <div class="hero-overlay">
          <div class="hero-nav">
            <a routerLink="/browse" class="back-link"><span class="material-icons">arrow_back</span> Back to Shops</a>
          </div>
          <div class="hero-info">
            <div class="hero-badges">
              <span class="badge badge-category">{{shop.category}}</span>
              <span class="badge badge-status" [class.open]="shop.isOpen">{{shop.isOpen ? 'Open Now' : 'Closed'}}</span>
            </div>
            <h1>{{shop.name}}</h1>
            <div class="hero-meta">
              <span class="rating"><span class="material-icons">star</span> {{shop.rating}} <span class="review-count">({{shop.reviewCount}} reviews)</span></span>
              <span class="meta-sep">·</span>
              <span><span class="material-icons">location_on</span> {{shop.address}}</span>
              <span class="meta-sep">·</span>
              <span><span class="material-icons">schedule</span> {{shop.hours}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="detail-content">
        <!-- About -->
        <section class="detail-section">
          <h2>About</h2>
          <p class="about-text">{{shop.description}}</p>
          <div class="quick-actions">
            <button class="action-btn"><span class="material-icons">phone</span> Call</button>
            <button class="action-btn"><span class="material-icons">directions</span> Directions</button>
            <button class="action-btn"><span class="material-icons">share</span> Share</button>
            <button class="action-btn favorite"><span class="material-icons">favorite_border</span> Save</button>
          </div>
        </section>

        <!-- Products / Menu -->
        <section class="detail-section">
          <div class="section-header-row">
            <h2>Products & Menu</h2>
            <div class="tab-chips">
              <button class="chip" [class.active]="activeTab === 'all'" (click)="activeTab = 'all'">All</button>
              <button class="chip" [class.active]="activeTab === 'popular'" (click)="activeTab = 'popular'">Popular</button>
              <button class="chip" [class.active]="activeTab === 'new'" (click)="activeTab = 'new'">New</button>
            </div>
          </div>
          <div class="product-grid">
            <div class="product-card" *ngFor="let p of products">
              <div class="product-image" [style.backgroundImage]="'url(' + p.image + ')'"></div>
              <div class="product-info">
                <h4>{{p.name}}</h4>
                <p>{{p.description}}</p>
                <div class="product-footer">
                  <span class="product-price">{{p.price}}</span>
                  <button class="add-btn"><span class="material-icons">add</span></button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Reviews -->
        <section class="detail-section">
          <div class="section-header-row">
            <h2>Reviews</h2>
            <a routerLink="/reviews" class="view-all-link">See All <span class="material-icons">arrow_forward</span></a>
          </div>
          <div class="reviews-summary">
            <div class="rating-big">
              <span class="big-num">{{shop.rating}}</span>
              <div class="stars">
                <span class="material-icons" *ngFor="let s of [1,2,3,4,5]" [class.filled]="s <= shop.rating">star</span>
              </div>
              <span class="review-total">{{shop.reviewCount}} reviews</span>
            </div>
          </div>
          <div class="review-list">
            <div class="review-card" *ngFor="let r of reviews">
              <div class="review-header">
                <div class="reviewer-avatar">{{r.initials}}</div>
                <div>
                  <h4>{{r.name}}</h4>
                  <div class="review-stars">
                    <span class="material-icons filled" *ngFor="let s of getStars(r.rating)">star</span>
                    <span class="review-date">{{r.date}}</span>
                  </div>
                </div>
              </div>
              <p>{{r.comment}}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .detail-page { background: #05092f; min-height: 100vh; }

    .shop-hero {
      height: 400px;
      background-size: cover;
      background-position: center;
      position: relative;
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(5,9,47,0.3) 0%, rgba(5,9,47,0.95) 100%);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2rem;
    }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #e2e3ff;
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 600;
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(8px);
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      transition: background 0.2s;
    }
    .back-link:hover { background: rgba(255,255,255,0.15); }
    .back-link .material-icons { font-size: 1.1rem; }

    .hero-info { max-width: 800px; }
    .hero-badges { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
    .badge {
      padding: 0.3rem 0.75rem;
      border-radius: 2rem;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .badge-category { background: rgba(94,180,255,0.15); color: #5eb4ff; }
    .badge-status { background: rgba(110,115,157,0.2); color: #6e739d; }
    .badge-status.open { background: rgba(107,254,156,0.15); color: #6bfe9c; }

    .hero-info h1 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 2.5rem;
      font-weight: 800;
      color: #e2e3ff;
      margin-bottom: 1rem;
    }
    .hero-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
      font-size: 0.875rem;
      color: #a3a8d5;
    }
    .hero-meta .material-icons { font-size: 1rem; vertical-align: middle; margin-right: 0.2rem; }
    .rating { display: flex; align-items: center; gap: 0.3rem; color: #F59E0B; font-weight: 700; }
    .rating .material-icons { color: #F59E0B; }
    .review-count { color: #a3a8d5; font-weight: 400; }
    .meta-sep { color: #40456c; }

    .detail-content { max-width: 1000px; margin: 0 auto; padding: 2rem; }

    .detail-section { margin-bottom: 3rem; }
    .detail-section h2 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 1.5rem;
      font-weight: 700;
      color: #e2e3ff;
      margin-bottom: 1rem;
    }
    .about-text { color: #a3a8d5; line-height: 1.7; font-size: 1rem; margin-bottom: 1.5rem; }

    .quick-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
    .action-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #0e1442;
      border: 1px solid #40456c;
      color: #e2e3ff;
      padding: 0.75rem 1.25rem;
      border-radius: 0.75rem;
      cursor: pointer;
      font-family: 'Manrope', sans-serif;
      font-size: 0.875rem;
      font-weight: 600;
      transition: all 0.2s;
    }
    .action-btn:hover { background: #131a4c; border-color: #5eb4ff; }
    .action-btn .material-icons { font-size: 1.1rem; }
    .action-btn.favorite:hover { border-color: #ff716c; }
    .action-btn.favorite:hover .material-icons { color: #ff716c; }

    .section-header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .section-header-row h2 { margin-bottom: 0; }
    .tab-chips { display: flex; gap: 0.5rem; }
    .chip {
      background: transparent;
      border: 1px solid #40456c;
      color: #a3a8d5;
      padding: 0.4rem 1rem;
      border-radius: 2rem;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .chip.active { background: rgba(94,180,255,0.15); border-color: #5eb4ff; color: #5eb4ff; }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 1.25rem;
    }
    .product-card {
      background: #080e38;
      border-radius: 1rem;
      overflow: hidden;
      transition: all 0.2s;
    }
    .product-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
    .product-image { height: 160px; background-size: cover; background-position: center; }
    .product-info { padding: 1rem; }
    .product-info h4 { font-size: 1rem; color: #e2e3ff; margin-bottom: 0.25rem; }
    .product-info p { font-size: 0.8rem; color: #6e739d; margin-bottom: 0.75rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .product-footer { display: flex; justify-content: space-between; align-items: center; }
    .product-price { font-weight: 800; color: #6bfe9c; font-size: 1.1rem; }
    .add-btn {
      width: 32px; height: 32px; border-radius: 50%;
      background: linear-gradient(135deg, #5eb4ff, #2aa7ff);
      border: none; color: #003151; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
    }
    .add-btn:hover { transform: scale(1.1); }
    .add-btn .material-icons { font-size: 1.1rem; }

    .reviews-summary { text-align: center; margin-bottom: 2rem; }
    .rating-big { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }
    .big-num { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 3.5rem; font-weight: 800; color: #e2e3ff; }
    .stars .material-icons { font-size: 1.5rem; color: #40456c; }
    .stars .material-icons.filled { color: #F59E0B; }
    .review-total { font-size: 0.875rem; color: #6e739d; margin-top: 0.25rem; }

    .review-list { display: flex; flex-direction: column; gap: 1rem; }
    .review-card { background: #080e38; padding: 1.5rem; border-radius: 1rem; }
    .review-header { display: flex; gap: 1rem; align-items: center; margin-bottom: 0.75rem; }
    .reviewer-avatar {
      width: 42px; height: 42px; border-radius: 50%;
      background: linear-gradient(135deg, #5eb4ff, #2aa7ff);
      display: flex; align-items: center; justify-content: center;
      color: #003151; font-weight: 700; font-size: 0.9rem;
    }
    .review-header h4 { color: #e2e3ff; font-size: 0.95rem; }
    .review-stars { display: flex; align-items: center; gap: 0.15rem; margin-top: 0.15rem; }
    .review-stars .material-icons { font-size: 0.9rem; color: #F59E0B; }
    .review-date { font-size: 0.75rem; color: #6e739d; margin-left: 0.5rem; }
    .review-card p { color: #a3a8d5; font-size: 0.875rem; line-height: 1.6; }

    .view-all-link {
      display: flex; align-items: center; gap: 0.25rem;
      font-size: 0.875rem; font-weight: 600; color: #5eb4ff; text-decoration: none;
    }
    .view-all-link:hover { gap: 0.5rem; }
    .view-all-link .material-icons { font-size: 1rem; }

    @media (max-width: 768px) {
      .shop-hero { height: 300px; }
      .hero-info h1 { font-size: 1.75rem; }
      .product-grid { grid-template-columns: repeat(2, 1fr); }
      .quick-actions { flex-wrap: wrap; }
    }
  `]
})
export class ShopDetailComponent implements OnInit {
  activeTab = 'all';
  shop: any = {
    name: 'The Golden Crust', category: 'Bakery & Cafe', rating: 4.8, reviewCount: 128,
    address: '42 Baker Street, Downtown', hours: '7:00 AM - 9:00 PM', isOpen: true,
    description: 'A beloved neighborhood bakery crafting artisan breads, signature pastries, and expertly brewed coffee since 2018. Using locally-sourced ingredients and traditional techniques.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80'
  };
  products = [
    { name: 'Sourdough Loaf', description: 'Hand-crafted with 48hr fermentation', price: '$8.50', image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400&q=80' },
    { name: 'Cinnamon Rolls', description: 'Fresh baked daily with cream cheese glaze', price: '$4.25', image: 'https://images.unsplash.com/photo-1509365390695-33aee754301f?w=400&q=80' },
    { name: 'Espresso', description: 'Double shot with single-origin beans', price: '$3.75', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&q=80' },
    { name: 'Avocado Toast', description: 'Sourdough base with micro-greens', price: '$12.00', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&q=80' }
  ];
  reviews = [
    { name: 'Sarah M.', initials: 'SM', rating: 5, date: '2 days ago', comment: 'Absolutely incredible sourdough! The best I\'ve had in town. The atmosphere is cozy and the staff is wonderful.' },
    { name: 'James K.', initials: 'JK', rating: 4, date: '1 week ago', comment: 'Great coffee and pastries. It gets crowded on weekends but the quality is consistently high.' }
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
              isOpen: s.status === 'APPROVED'
            };
          }
        }
      });
    }
  }

  getStars(n: number): number[] { return Array(n).fill(0); }
}

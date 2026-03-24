import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="reviews-page">
      <!-- Header & Stats -->
      <section class="header-section">
        <div class="header-inner">
          <div class="header-content">
            <h1 class="page-title">Community Reviews</h1>
            <p class="page-subtitle">
              Real stories from real people. See what the Nikat community is saying about local businesses.
            </p>
          </div>
          <div class="stats-bar">
            <div class="stat-card">
              <span class="stat-value">12.4k</span>
              <span class="stat-label">Total Reviews</span>
            </div>
            <div class="stat-card">
              <span class="stat-value">4.6</span>
              <span class="stat-label">Average Rating</span>
            </div>
            <div class="stat-card">
              <span class="stat-value">850+</span>
              <span class="stat-label">Verified Places</span>
            </div>
            <div class="stat-card highlight">
              <span class="stat-value">25</span>
              <span class="stat-label">New Today</span>
            </div>
          </div>
        </div>
      </section>

      <div class="main-layout">
        <!-- Submit Review -->
        <aside class="submit-section">
          <div class="submit-card">
            <h2 class="submit-title">Share Your Experience</h2>
            <p class="submit-desc">Your voice matters. Help others discover great local services and shops.</p>
            <div class="form">
              <!-- Business Name -->
              <div class="form-group">
                <label>Business Name</label>
                <input type="text" placeholder="Search for a shop or service..." [(ngModel)]="newReview.businessName" class="form-input">
              </div>

              <!-- Star Rating -->
              <div class="form-group">
                <label>Your Rating</label>
                <div class="star-rating-input">
                  <button class="star-btn" *ngFor="let s of [1,2,3,4,5]" (click)="newReview.rating = s">
                    <span class="material-symbols-outlined" [class.filled]="s <= newReview.rating">star</span>
                  </button>
                </div>
              </div>

              <!-- Review Text -->
              <div class="form-group">
                <label>Your Review</label>
                <textarea placeholder="Tell others about your experience..." [(ngModel)]="newReview.comment" class="form-textarea" rows="4"></textarea>
              </div>

              <!-- Tags -->
              <div class="form-group">
                <label>Quick Tags</label>
                <div class="tag-pills">
                  <button class="tag-pill" *ngFor="let tag of availableTags" (click)="toggleTag(tag)" [class.active]="newReview.tags.includes(tag)">
                    {{tag}}
                  </button>
                </div>
              </div>

              <button class="btn-submit" (click)="submitReview()">
                <span class="material-symbols-outlined">send</span>
                Submit Review
              </button>
            </div>
          </div>
        </aside>

        <!-- Review Feed -->
        <section class="feed-section">
          <div class="feed-header">
            <h2 class="feed-title">Recent Reviews</h2>
            <div class="feed-filters">
              <button class="feed-pill" [class.active]="activeFilter === 'all'" (click)="activeFilter = 'all'">All</button>
              <button class="feed-pill" [class.active]="activeFilter === 'shops'" (click)="activeFilter = 'shops'">Shops</button>
              <button class="feed-pill" [class.active]="activeFilter === 'services'" (click)="activeFilter = 'services'">Services</button>
              <button class="feed-pill" [class.active]="activeFilter === 'food'" (click)="activeFilter = 'food'">Food & Drink</button>
            </div>
          </div>

          <div class="review-list">
            <div class="review-card" *ngFor="let review of reviews; let i = index" [class.featured]="i === 0">
              <!-- Review Header -->
              <div class="review-header">
                <div class="reviewer-info">
                  <div class="avatar" [style.background]="review.avatarColor">
                    {{review.initials}}
                  </div>
                  <div>
                    <h4 class="reviewer-name">{{review.name}}</h4>
                    <span class="review-date">{{review.date}}</span>
                  </div>
                </div>
                <div class="review-rating">
                  <span class="material-symbols-outlined star-filled" *ngFor="let s of getStars(review.rating)">star</span>
                  <span class="material-symbols-outlined star-empty" *ngFor="let s of getEmptyStars(review.rating)">star</span>
                </div>
              </div>

              <!-- Business Referenced -->
              <div class="reviewed-biz" *ngIf="review.businessName">
                <span class="material-symbols-outlined biz-icon">storefront</span>
                <span class="biz-name">{{review.businessName}}</span>
                <span class="biz-category">{{review.category}}</span>
              </div>

              <!-- Review Body -->
              <p class="review-body">{{review.comment}}</p>

              <!-- Tags -->
              <div class="review-tags" *ngIf="review.tags && review.tags.length > 0">
                <span class="review-tag" *ngFor="let tag of review.tags">#{{tag}}</span>
              </div>

              <!-- Actions -->
              <div class="review-actions">
                <button class="action-btn" (click)="review.liked = !review.liked" [class.liked]="review.liked">
                  <span class="material-symbols-outlined">{{review.liked ? 'favorite' : 'favorite_border'}}</span>
                  {{review.likes + (review.liked ? 1 : 0)}}
                </button>
                <button class="action-btn">
                  <span class="material-symbols-outlined">comment</span>
                  Reply
                </button>
                <button class="action-btn">
                  <span class="material-symbols-outlined">share</span>
                  Share
                </button>
              </div>
            </div>
          </div>

          <!-- Load More -->
          <div class="load-more-wrap">
            <button class="btn-load-more">
              Load More Reviews
              <span class="material-symbols-outlined">expand_more</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: 'Manrope', sans-serif; }

    .reviews-page { min-height: 100vh; background: var(--bg); color: var(--on-surface); }

    /* Header */
    .header-section { max-width: 80rem; margin: 0 auto; padding: 2rem 1.5rem; }
    .header-inner { display: flex; flex-direction: column; gap: 2rem; }
    .page-title {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 2.5rem; font-weight: 800;
      letter-spacing: -0.02em; margin: 0;
      background: linear-gradient(to right, var(--on-surface), var(--accent));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .page-subtitle { color: var(--on-surface-variant); font-size: 1.1rem; margin: 0.5rem 0 0; max-width: 38rem; line-height: 1.6; }

    .stats-bar { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
    @media (min-width: 768px) { .stats-bar { grid-template-columns: repeat(4, 1fr); } }
    .stat-card {
      background: var(--surface-container-low);
      padding: 1.5rem; border-radius: 1rem;
      display: flex; flex-direction: column; gap: 0.25rem;
    }
    .stat-card.highlight { background: rgba(94,180,255,0.1); }
    .stat-value { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 800; color: var(--on-surface); }
    .stat-card.highlight .stat-value { color: var(--accent); }
    .stat-label { font-size: 0.75rem; color: var(--on-surface-variant); font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; }

    /* Layout */
    .main-layout {
      max-width: 80rem; margin: 0 auto;
      padding: 0 1.5rem 4rem;
      display: flex; gap: 2rem;
    }

    /* Submit Section */
    .submit-section { width: 22rem; flex-shrink: 0; position: sticky; top: 5rem; align-self: flex-start; }
    .submit-card {
      background: var(--surface-container); backdrop-filter: blur(20px);
      border-radius: 1.5rem; padding: 2rem; border: 1px solid var(--glass-border);
    }
    .submit-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.25rem; font-weight: 800; margin: 0 0 0.5rem; }
    .submit-desc { color: var(--on-surface-variant); font-size: 0.875rem; margin: 0 0 1.5rem; line-height: 1.5; }

    .form { display: flex; flex-direction: column; gap: 1.25rem; }
    .form-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .form-group label { font-size: 0.75rem; color: var(--on-surface-variant); font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; }
    .form-input, .form-textarea {
      background: var(--surface-container-low); border: 1px solid var(--glass-border); border-radius: 0.75rem;
      padding: 0.75rem 1rem; color: var(--on-surface);
      font-size: 0.875rem; font-family: inherit;
      outline: none; transition: box-shadow 0.2s;
      resize: none;
    }
    .form-input::placeholder, .form-textarea::placeholder { color: var(--outline-variant); }
    .form-input:focus, .form-textarea:focus { box-shadow: 0 0 0 2px var(--accent-glow); }

    /* Star Input */
    .star-rating-input { display: flex; gap: 0.25rem; }
    .star-btn {
      background: none; border: none; cursor: pointer; padding: 0.25rem;
      color: rgba(250,204,21,0.3); transition: color 0.15s;
    }
    .star-btn .material-symbols-outlined { font-size: 1.75rem; }
    .star-btn .filled { color: #facc15; font-variation-settings: 'FILL' 1; }

    /* Tags */
    .tag-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .tag-pill {
      background: var(--surface-container-low); color: var(--on-surface-variant); border: none;
      padding: 0.375rem 0.75rem; border-radius: 9999px;
      font-size: 0.75rem; font-weight: 600;
      cursor: pointer; transition: all 0.2s;
    }
    .tag-pill:hover { color: var(--on-surface); }
    .tag-pill.active { background: var(--accent); color: var(--bg); font-weight: 700; }

    .btn-submit {
      display: flex; align-items: center; justify-content: center; gap: 0.5rem;
      background: linear-gradient(135deg, var(--accent), var(--primary));
      color: #fff; border: none; border-radius: 0.75rem;
      padding: 0.875rem; font-weight: 700; font-size: 0.875rem;
      cursor: pointer; transition: all 0.2s;
      box-shadow: 0 8px 24px var(--accent-glow);
    }
    .btn-submit:hover { box-shadow: 0 12px 32px var(--accent-glow); }
    .btn-submit:active { transform: scale(0.95); }

    /* Feed */
    .feed-section { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1.5rem; }
    .feed-header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; }
    .feed-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; margin: 0; }
    .feed-filters { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .feed-pill {
      padding: 0.375rem 1rem; border-radius: 9999px;
      font-size: 0.75rem; font-weight: 600;
      background: var(--surface-container-low); color: var(--on-surface-variant); border: none;
      cursor: pointer; transition: all 0.2s;
    }
    .feed-pill:hover { color: var(--on-surface); }
    .feed-pill.active { background: var(--accent); color: var(--bg); font-weight: 700; }

    /* Review Card */
    .review-list { display: flex; flex-direction: column; gap: 1.5rem; }
    .review-card {
      background: var(--surface-container); backdrop-filter: blur(20px);
      border-radius: 1.5rem; padding: 2rem; border: 1px solid var(--glass-border);
      animation: fadeUp 0.4s ease;
      transition: background 0.2s;
    }
    .review-card:hover { background: var(--surface-container-high); }
    .review-card.featured {
      border-left: 3px solid var(--accent);
    }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

    .review-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .reviewer-info { display: flex; align-items: center; gap: 1rem; }
    .avatar {
      width: 2.75rem; height: 2.75rem; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-weight: 800; font-size: 0.875rem; color: #000;
    }
    .reviewer-name { margin: 0; font-size: 1rem; font-weight: 700; }
    .review-date { font-size: 0.75rem; color: var(--on-surface-variant); }
    .review-rating { display: flex; gap: 0.125rem; }
    .star-filled { color: #facc15; font-size: 1rem; font-variation-settings: 'FILL' 1; }
    .star-empty { color: rgba(250,204,21,0.2); font-size: 1rem; }

    .reviewed-biz {
      display: inline-flex; align-items: center; gap: 0.5rem;
      background: var(--surface-container-low); padding: 0.5rem 0.75rem; border-radius: 0.5rem;
      margin-bottom: 1rem;
    }
    .biz-icon { font-size: 1rem; color: var(--accent); }
    .biz-name { font-size: 0.875rem; font-weight: 700; color: var(--on-surface); }
    .biz-category { font-size: 0.625rem; color: var(--on-surface-variant); text-transform: uppercase; letter-spacing: 0.1em; }

    .review-body { color: var(--on-surface-variant); font-size: 0.95rem; line-height: 1.7; margin: 0 0 1rem; }

    .review-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
    .review-tag { font-size: 0.75rem; font-weight: 700; color: var(--tertiary); }

    .review-actions { display: flex; gap: 1rem; }
    .action-btn {
      display: flex; align-items: center; gap: 0.375rem;
      background: none; border: none; color: var(--on-surface-variant);
      font-size: 0.75rem; font-weight: 600;
      cursor: pointer; transition: color 0.2s;
    }
    .action-btn:hover { color: var(--accent); }
    .action-btn.liked { color: #ff516c; }
    .action-btn .material-symbols-outlined { font-size: 1rem; }

    /* Load More */
    .load-more-wrap { display: flex; justify-content: center; padding: 2rem 0; }
    .btn-load-more {
      display: flex; align-items: center; gap: 0.5rem;
      padding: 0.5rem 1.5rem; border-radius: 9999px;
      border: 1px solid var(--glass-border);
      background: transparent; color: var(--on-surface-variant);
      font-weight: 700; font-size: 0.75rem;
      text-transform: uppercase; letter-spacing: 0.12em;
      cursor: pointer; transition: all 0.2s;
    }
    .btn-load-more:hover { color: var(--accent); border-color: var(--accent); }
    .btn-load-more .material-symbols-outlined { font-size: 0.875rem; }

    @media (max-width: 900px) {
      .main-layout { flex-direction: column; }
      .submit-section { width: 100%; position: static; }
    }
  `]
})
export class ReviewsComponent implements OnInit {
  activeFilter = 'all';
  availableTags = ['Clean', 'Friendly', 'Quick', 'Value', 'Professional', 'Authentic'];

  newReview = {
    businessName: '',
    rating: 0,
    comment: '',
    tags: [] as string[]
  };

  reviews = [
    { name: 'Priya S.', initials: 'PS', rating: 5, date: '2 hours ago', businessName: 'The Golden Crust', category: 'Bakery', comment: 'The sourdough bread here is absolutely phenomenal. Crispy crust, soft interior, and the aroma fills the entire street. Best bakery discovery I\'ve made through Nikat!', tags: ['Authentic', 'Value'], avatarColor: '#fc9df7', likes: 24, liked: false },
    { name: 'Rahul M.', initials: 'RM', rating: 4, date: '5 hours ago', businessName: 'TechFix Pro', category: 'Electronics', comment: 'Got my iPhone screen replaced in under 45 minutes. The quality is excellent and the price was very reasonable compared to the authorized service center. Highly recommend!', tags: ['Quick', 'Professional'], avatarColor: '#5eb4ff', likes: 18, liked: false },
    { name: 'Ananya K.', initials: 'AK', rating: 5, date: '1 day ago', businessName: 'Sweet Delights', category: 'Sweets', comment: 'Their milk cake is to die for! Pure ghee taste that reminds me of my grandmother\'s kitchen. The kaju katli is equally impressive. A hidden gem in the neighborhood.', tags: ['Authentic', 'Friendly'], avatarColor: '#6bfe9c', likes: 42, liked: false },
    { name: 'Vikram J.', initials: 'VJ', rating: 3, date: '2 days ago', businessName: 'Quick Stitch', category: 'Tailoring', comment: 'Decent tailoring work but delivery took longer than promised. The fitting was good though, and the fabric quality was maintained. Would give another chance.', tags: ['Professional'], avatarColor: '#facc15', likes: 6, liked: false },
    { name: 'Meera D.', initials: 'MD', rating: 5, date: '3 days ago', businessName: 'Green Basket', category: 'Grocery', comment: 'Finally found a reliable source for organic vegetables! Everything is fresh and the prices are fair. Their home delivery is super quick too. Love this service!', tags: ['Clean', 'Value', 'Quick'], avatarColor: '#ff8c42', likes: 31, liked: false }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getReviews().subscribe({
      next: (data: any[]) => {
        if (data && data.length > 0) {
          const apiReviews = data.map(r => ({
            name: r.userName || 'Anonymous',
            initials: (r.userName || 'A').substring(0, 2).toUpperCase(),
            rating: r.rating || 4,
            date: r.createdAt || 'Recently',
            businessName: r.shopName || r.serviceName || '',
            category: r.category || '',
            comment: r.comment || '',
            tags: [],
            avatarColor: '#5eb4ff',
            likes: r.likes || 0,
            liked: false
          }));
          this.reviews = [...apiReviews, ...this.reviews];
        }
      }
    });
  }

  toggleTag(tag: string) {
    const idx = this.newReview.tags.indexOf(tag);
    if (idx > -1) {
      this.newReview.tags.splice(idx, 1);
    } else {
      this.newReview.tags.push(tag);
    }
  }

  submitReview() {
    if (!this.newReview.businessName || !this.newReview.rating || !this.newReview.comment) return;
    const review = {
      name: 'You',
      initials: 'YO',
      rating: this.newReview.rating,
      date: 'Just now',
      businessName: this.newReview.businessName,
      category: '',
      comment: this.newReview.comment,
      tags: [...this.newReview.tags],
      avatarColor: '#5eb4ff',
      likes: 0,
      liked: false
    };
    this.reviews.unshift(review);
    this.newReview = { businessName: '', rating: 0, comment: '', tags: [] };
  }

  getStars(n: number): number[] { return Array(Math.floor(n)).fill(0); }
  getEmptyStars(n: number): number[] { return Array(5 - Math.floor(n)).fill(0); }
}

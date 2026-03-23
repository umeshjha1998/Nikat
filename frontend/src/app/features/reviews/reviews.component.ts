import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="reviews-page">
      <div class="page-header">
        <div class="header-content">
          <h1>Review & Rating Hub</h1>
          <p>See what the community says about local businesses and services</p>
        </div>
      </div>

      <div class="reviews-content">
        <!-- Stats Bar -->
        <div class="stats-bar">
          <div class="stat-item">
            <span class="stat-num">12,400+</span>
            <span class="stat-label">Total Reviews</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">4.6</span>
            <span class="stat-label">Avg. Rating</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">94%</span>
            <span class="stat-label">Would Recommend</span>
          </div>
        </div>

        <!-- Filter Row -->
        <div class="filter-row">
          <div class="filter-chips">
            <button class="chip" [class.active]="activeFilter === 'all'" (click)="activeFilter = 'all'">All Reviews</button>
            <button class="chip" [class.active]="activeFilter === 'recent'" (click)="activeFilter = 'recent'">Recent</button>
            <button class="chip" [class.active]="activeFilter === 'top'" (click)="activeFilter = 'top'">Highest Rated</button>
            <button class="chip" [class.active]="activeFilter === 'shops'" (click)="activeFilter = 'shops'">Shops</button>
            <button class="chip" [class.active]="activeFilter === 'services'" (click)="activeFilter = 'services'">Services</button>
          </div>
        </div>

        <!-- Reviews List -->
        <div class="reviews-list">
          <div class="review-card" *ngFor="let r of reviews">
            <div class="review-top">
              <div class="review-user">
                <div class="avatar">{{r.initials}}</div>
                <div>
                  <h4>{{r.userName}}</h4>
                  <span class="review-date">{{r.date}}</span>
                </div>
              </div>
              <div class="review-stars">
                <span class="material-icons filled" *ngFor="let s of getStars(r.rating)">star</span>
                <span class="material-icons" *ngFor="let s of getEmptyStars(r.rating)">star</span>
              </div>
            </div>
            <div class="review-target">
              <span class="material-icons">{{r.targetType === 'shop' ? 'storefront' : 'build'}}</span>
              <a [routerLink]="r.targetType === 'shop' ? ['/shop', r.targetId] : ['/services']">{{r.targetName}}</a>
            </div>
            <p class="review-text">{{r.comment}}</p>
            <div class="review-actions">
              <button class="action-btn"><span class="material-icons">thumb_up</span> {{r.helpful}}</button>
              <button class="action-btn"><span class="material-icons">reply</span> Reply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reviews-page { background: #05092f; min-height: 100vh; }

    .page-header {
      background: linear-gradient(180deg, #0e1442 0%, #05092f 100%);
      padding: 4rem 2rem 3rem;
      text-align: center;
    }
    .header-content { max-width: 600px; margin: 0 auto; }
    .header-content h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.5rem; font-weight: 800; color: #e2e3ff; margin-bottom: 0.75rem; }
    .header-content p { color: #a3a8d5; font-size: 1.1rem; }

    .reviews-content { max-width: 900px; margin: 0 auto; padding: 2rem; }

    .stats-bar {
      display: flex; justify-content: center; gap: 3rem;
      background: #080e38; border-radius: 1rem; padding: 2rem;
      margin-bottom: 2rem;
    }
    .stat-item { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }
    .stat-num { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.75rem; font-weight: 800; color: #e2e3ff; }
    .stat-label { font-size: 0.75rem; color: #6e739d; text-transform: uppercase; letter-spacing: 0.05em; }

    .filter-row { margin-bottom: 2rem; }
    .filter-chips { display: flex; gap: 0.5rem; flex-wrap: wrap; }
    .chip {
      background: transparent; border: 1px solid #40456c; color: #a3a8d5;
      padding: 0.5rem 1rem; border-radius: 2rem; font-size: 0.85rem;
      font-weight: 600; cursor: pointer; transition: all 0.2s;
    }
    .chip.active { background: rgba(94,180,255,0.15); border-color: #5eb4ff; color: #5eb4ff; }

    .reviews-list { display: flex; flex-direction: column; gap: 1.25rem; }
    .review-card { background: #080e38; border-radius: 1rem; padding: 1.75rem; }

    .review-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem; }
    .review-user { display: flex; gap: 0.75rem; align-items: center; }
    .avatar {
      width: 44px; height: 44px; border-radius: 50%;
      background: linear-gradient(135deg, #5eb4ff, #2aa7ff);
      display: flex; align-items: center; justify-content: center;
      color: #003151; font-weight: 700; font-size: 0.85rem;
    }
    .review-user h4 { color: #e2e3ff; font-size: 0.95rem; }
    .review-date { font-size: 0.75rem; color: #6e739d; }
    .review-stars .material-icons { font-size: 1rem; color: #40456c; }
    .review-stars .material-icons.filled { color: #F59E0B; }

    .review-target {
      display: flex; align-items: center; gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    .review-target .material-icons { font-size: 1rem; color: #5eb4ff; }
    .review-target a { color: #5eb4ff; font-size: 0.85rem; font-weight: 600; text-decoration: none; }
    .review-target a:hover { text-decoration: underline; }

    .review-text { color: #a3a8d5; font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem; }

    .review-actions { display: flex; gap: 1rem; }
    .action-btn {
      display: flex; align-items: center; gap: 0.3rem;
      background: transparent; border: none; color: #6e739d;
      font-size: 0.8rem; cursor: pointer; transition: color 0.2s;
    }
    .action-btn:hover { color: #e2e3ff; }
    .action-btn .material-icons { font-size: 1rem; }

    @media (max-width: 768px) {
      .stats-bar { flex-direction: column; gap: 1.5rem; }
    }
  `]
})
export class ReviewsComponent implements OnInit {
  activeFilter = 'all';
  reviews = [
    { userName: 'Sarah Mitchell', initials: 'SM', rating: 5, date: '2 days ago', targetType: 'shop', targetId: 1, targetName: 'The Golden Crust', comment: 'Absolutely incredible sourdough! The best I\'ve had in town. The atmosphere is cozy and the staff are always friendly and welcoming.', helpful: 24 },
    { userName: 'James Kim', initials: 'JK', rating: 4, date: '5 days ago', targetType: 'service', targetId: 1, targetName: 'Urban Fade Barbershop', comment: 'Great haircut and the hot towel service was a nice touch. The shop was clean and professional. Would recommend to anyone looking for a quality barber.', helpful: 18 },
    { userName: 'Priya Patel', initials: 'PP', rating: 5, date: '1 week ago', targetType: 'shop', targetId: 2, targetName: 'Iron Haven Gym', comment: 'Best gym in the neighborhood. The equipment is top-notch and the personal trainers really know what they\'re doing. Worth every penny!', helpful: 31 },
    { userName: 'Marcus Chen', initials: 'MC', rating: 3, date: '2 weeks ago', targetType: 'service', targetId: 2, targetName: 'Quick Fix Tech', comment: 'They fixed my laptop screen but it took longer than expected. The quality of work was good though. Fair pricing for the area.', helpful: 7 }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getReviews().subscribe({
      next: (reviews: any[]) => {
        if (reviews && reviews.length > 0) {
          this.reviews = reviews.map((r: any) => ({
            userName: r.reviewerName || 'Anonymous', initials: (r.reviewerName || 'A')[0],
            rating: r.rating || 4, date: 'Recently',
            targetType: r.shopId ? 'shop' : 'service', targetId: r.shopId || r.serviceId || 1,
            targetName: r.shopName || r.serviceName || 'Business',
            comment: r.comment || '', helpful: 0
          }));
        }
      }
    });
  }

  getStars(n: number): number[] { return Array(Math.floor(n)).fill(0); }
  getEmptyStars(n: number): number[] { return Array(5 - Math.floor(n)).fill(0); }
}

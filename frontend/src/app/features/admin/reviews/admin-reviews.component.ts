import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header"><h1>Review Moderation</h1></div>
    <div class="review-list">
      <div class="review-mod-card" *ngFor="let r of reviews" [class.flagged]="r.flagged">
        <div class="review-top">
          <div class="reviewer">
            <div class="avatar">{{r.initials}}</div>
            <div>
              <h4>{{r.user}} <span class="muted">on</span> <strong>{{r.shop}}</strong></h4>
              <p>{{r.date}}</p>
            </div>
          </div>
          <div class="stars"><span class="material-icons" *ngFor="let s of [].constructor(r.rating)">star</span></div>
        </div>
        <p class="review-text">{{r.text}}</p>
        <div class="review-actions">
          <div class="flag-label" *ngIf="r.flagged"><span class="material-icons">flag</span> Flagged</div>
          <div class="action-btns">
            <button class="btn approve"><span class="material-icons">check</span></button>
            <button class="btn reject"><span class="material-icons">delete</span></button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../admin-shared.css']
})
export class AdminReviewsComponent {
  reviews = [
    { user: 'Amit K.', initials: 'AK', shop: 'Golden Crust Bakery', date: '2 hrs ago', rating: 5, text: 'Absolutely loved the pastries! Best in town.', flagged: false },
    { user: 'Sneha P.', initials: 'SP', shop: 'Classic Cuts Salon', date: '5 hrs ago', rating: 1, text: 'Terrible experience. Rude staff and overpriced services.', flagged: true },
    { user: 'Vikram R.', initials: 'VR', shop: 'Zen Wellness Spa', date: '1 day ago', rating: 4, text: 'Relaxing experience, good ambience. Will visit again.', flagged: false }
  ];
}

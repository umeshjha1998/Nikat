import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-review-rating-hub',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './review-rating-hub.component.html',
  styleUrl: './review-rating-hub.component.scss'
})
export class ReviewRatingHubComponent {
  currentRating: number = 4;
  hoverRating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];

  setRating(rating: number) {
    this.currentRating = rating;
  }

  onStarHover(rating: number) {
    this.hoverRating = rating;
  }

  onStarLeave() {
    this.hoverRating = 0;
  }

  isStarActive(star: number): boolean {
    if (this.hoverRating > 0) {
      return star <= this.hoverRating;
    }
    return star <= this.currentRating;
  }
}

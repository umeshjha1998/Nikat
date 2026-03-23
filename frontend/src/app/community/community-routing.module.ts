import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewRatingHubComponent } from './review-rating-hub/review-rating-hub.component';

const routes: Routes = [
  { path: '', loadComponent: () => import('./community-hub-interactive-features/community-hub-interactive-features.component').then(m => m.CommunityHubInteractiveFeaturesComponent) },
  { path: 'review-rating-hub', component: ReviewRatingHubComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }

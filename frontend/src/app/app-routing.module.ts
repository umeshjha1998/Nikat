import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
  { path: 'listings', loadChildren: () => import('./listings/listings.module').then(m => m.ListingsModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'community', loadChildren: () => import('./community/community.module').then(m => m.CommunityModule) },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

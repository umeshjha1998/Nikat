import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageShopsComponent } from './manage-shops/manage-shops.component';
import { ManageServicesComponent } from './manage-services/manage-services.component';

const routes: Routes = [
  { path: '', loadComponent: () => import('./admin-dashboard-support-added/admin-dashboard-support-added.component').then(m => m.AdminDashboardSupportAddedComponent) },
  { path: 'users', component: ManageUsersComponent },
  { path: 'shops', component: ManageShopsComponent },
  { path: 'services', component: ManageServicesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

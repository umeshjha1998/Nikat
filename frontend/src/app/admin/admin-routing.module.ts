import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageShopsComponent } from './manage-shops/manage-shops.component';
import { ManageServicesComponent } from './manage-services/manage-services.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
      { path: 'users', component: ManageUsersComponent },
      { path: 'shops', component: ManageShopsComponent },
      { path: 'services', component: ManageServicesComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { CategoryRefinementComponent } from './category-refinement/category-refinement.component';

const routes: Routes = [
  { path: 'results', component: ResultsComponent },
  { path: 'category/:id', component: CategoryRefinementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }

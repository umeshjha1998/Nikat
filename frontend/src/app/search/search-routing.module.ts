import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'results', loadComponent: () => import('./search-results/search-results.component').then(m => m.SearchResultsComponent) },
  { path: 'category/:id', loadComponent: () => import('./refined-category-search/refined-category-search.component').then(m => m.RefinedCategorySearchComponent) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }

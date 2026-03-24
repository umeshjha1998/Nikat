import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <h1>Category Management</h1>
      <button class="btn-add"><span class="material-icons">add</span> Add Category</button>
    </div>
    <div class="cat-grid">
      <div class="cat-card" *ngFor="let c of categories">
        <div class="cat-icon" [style.background]="c.bg"><span class="material-icons" [style.color]="c.color">{{c.icon}}</span></div>
        <div class="cat-info">
          <h3>{{c.name}}</h3>
          <p>{{c.count}} listings · {{c.type}}</p>
        </div>
        <div class="cat-actions">
          <button class="icon-btn"><span class="material-icons">edit</span></button>
          <button class="icon-btn danger"><span class="material-icons">delete</span></button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../admin-shared.css']
})
export class AdminCategoriesComponent {
  categories = [
    { name: 'Barbershop & Salon', icon: 'content_cut', count: 24, type: 'Shop', bg: 'rgba(94,180,255,0.1)', color: '#5eb4ff' },
    { name: 'Restaurant & Cafe', icon: 'restaurant', count: 18, type: 'Shop', bg: 'rgba(107,254,156,0.1)', color: '#6bfe9c' },
    { name: 'Wellness & Spa', icon: 'spa', count: 12, type: 'Both', bg: 'rgba(192,132,252,0.1)', color: '#c084fc' },
    { name: 'Home Services', icon: 'home_repair_service', count: 31, type: 'Service', bg: 'rgba(255,179,71,0.1)', color: '#ffb347' },
    { name: 'Fitness & Yoga', icon: 'fitness_center', count: 8, type: 'Service', bg: 'rgba(245,158,11,0.1)', color: '#F59E0B' }
  ];
}

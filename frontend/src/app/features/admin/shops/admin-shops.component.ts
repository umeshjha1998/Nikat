import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-shops',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header"><h1>Shop Management</h1></div>
    <div class="cards-grid">
      <div class="shop-mgmt-card" *ngFor="let s of shops">
        <div class="card-img" [style.backgroundImage]="'url(' + s.image + ')'">
          <span class="card-status" [class]="s.status">{{s.status}}</span>
        </div>
        <div class="card-body">
          <h3>{{s.name}}</h3>
          <p>{{s.owner}} · {{s.category}}</p>
          <div class="card-actions">
            <button class="btn-sm approve" *ngIf="s.status==='pending'"><span class="material-icons">check</span> Approve</button>
            <button class="btn-sm"><span class="material-icons">edit</span></button>
            <button class="btn-sm danger"><span class="material-icons">delete</span></button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../admin-shared.css']
})
export class AdminShopsComponent {
  shops = [
    { name: 'The Golden Crust', owner: 'Priya S.', category: 'Bakery', status: 'approved', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80' },
    { name: 'Urban Style Salon', owner: 'Rahul K.', category: 'Salon', status: 'pending', image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=400&q=80' },
    { name: 'Fresh Bites Cafe', owner: 'Neha M.', category: 'Restaurant', status: 'approved', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80' },
    { name: 'Zen Wellness Spa', owner: 'Amit D.', category: 'Spa', status: 'rejected', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=400&q=80' }
  ];
}

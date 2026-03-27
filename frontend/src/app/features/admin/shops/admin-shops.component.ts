import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, ShopDto } from '../../../core/api.service';

@Component({
  selector: 'app-admin-shops',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header"><h1>Shop Management</h1></div>
    <div class="cards-grid">
      <div class="shop-mgmt-card" *ngFor="let s of shops">
        <div class="card-img" [style.backgroundImage]="'url(' + (s.photos && s.photos[0] ? s.photos[0] : 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80') + ')'">
          <span class="card-status" [class]="s.status.toLowerCase()">{{s.status}}</span>
        </div>
        <div class="card-body">
          <h3>{{s.name}}</h3>
          <p>{{s.address}} · {{s.categoryName || 'No Category'}}</p>
          <div class="card-actions">
            <button class="btn-sm approve" *ngIf="s.status === 'PENDING_VERIFICATION'"><span class="material-icons">check</span> Approve</button>
            <button class="btn-sm"><span class="material-icons">edit</span></button>
            <button class="btn-sm danger"><span class="material-icons">delete</span></button>
          </div>
        </div>
      </div>
      <div *ngIf="shops.length === 0" class="empty-state">No shops found in the database.</div>
    </div>
  `,
  styleUrls: ['../admin-shared.css']
})
export class AdminShopsComponent implements OnInit {
  shops: ShopDto[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getShops().subscribe({
      next: (data) => this.shops = data,
      error: () => this.shops = []
    });
  }
}

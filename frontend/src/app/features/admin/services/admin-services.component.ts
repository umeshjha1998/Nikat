import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, ServiceDto } from '../../../core/api.service';

@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header"><h1>Service Management</h1></div>
    <div class="table-container">
      <table class="data-table">
        <thead><tr><th>Service</th><th>Location</th><th>Category</th><th>Price</th><th>Availability</th><th>Actions</th></tr></thead>
        <tbody>
          <tr *ngFor="let s of services">
            <td class="name-cell">{{s.name}}</td>
            <td>{{s.serviceArea || 'N/A'}}</td>
            <td>{{s.categoryName || 'No Category'}}</td>
            <td class="price-cell">₹{{s.basePrice}}</td>
            <td><span class="status-badge" [class.available]="s.isAvailable">{{s.isAvailable ? 'Available' : 'Busy'}}</span></td>
            <td><button class="icon-btn"><span class="material-icons">more_vert</span></button></td>
          </tr>
        </tbody>
      </table>
      <div *ngIf="services.length === 0" class="empty-state" style="padding: 2rem; text-align: center;">No services found in the database.</div>
    </div>
  `,
  styleUrls: ['../admin-shared.css']
})
export class AdminServicesComponent implements OnInit {
  services: ServiceDto[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getServices().subscribe({
      next: (data) => this.services = data,
      error: () => this.services = []
    });
  }
}

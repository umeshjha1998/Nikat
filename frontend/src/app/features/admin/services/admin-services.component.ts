import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header"><h1>Service Management</h1></div>
    <div class="table-container">
      <table class="data-table">
        <thead><tr><th>Service</th><th>Provider</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          <tr *ngFor="let s of services">
            <td class="name-cell">{{s.name}}</td>
            <td>{{s.provider}}</td>
            <td>{{s.category}}</td>
            <td class="price-cell">₹{{s.price}}</td>
            <td><span class="status-badge" [class]="s.status">{{s.status}}</span></td>
            <td><button class="icon-btn"><span class="material-icons">more_vert</span></button></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['../admin-shared.css']
})
export class AdminServicesComponent {
  services = [
    { name: 'Classic Haircut', provider: 'Vikram R.', category: 'Grooming', price: '350', status: 'approved' },
    { name: 'Deep Tissue Massage', provider: 'Priya S.', category: 'Wellness', price: '1,200', status: 'pending' },
    { name: 'Home Cleaning', provider: 'Amit D.', category: 'Home', price: '800', status: 'approved' },
    { name: 'AC Repair', provider: 'Raj P.', category: 'Repair', price: '500', status: 'approved' }
  ];
}

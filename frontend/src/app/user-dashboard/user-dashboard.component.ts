import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule, SharedModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  user = {
    name: 'Umesh Jha',
    email: 'umesh@nikat.com',
    phone: '+91 98765 43210',
    address: 'Indira Nagar, Lucknow, IN',
    role: 'PREMIUM USER',
    joined: 'Jan 2024'
  };

  stats = [
    { label: 'Total Reviews', value: '24', icon: 'rate_review' },
    { label: 'Saved Places', value: '12', icon: 'bookmark' },
    { label: 'Points Earned', value: '1.2k', icon: 'stars' }
  ];

  recentActivity = [
    { type: 'Review', title: 'The Urban Fade', date: '2 days ago', status: 'Published' },
    { type: 'Order', title: 'Gourmet Pizza Central', date: '1 week ago', status: 'Completed' },
    { type: 'Visit', title: 'Blue Lagoon Spa', date: '2 weeks ago', status: 'Verified' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  logout(): void {
    this.router.navigate(['/auth/login']);
  }
}

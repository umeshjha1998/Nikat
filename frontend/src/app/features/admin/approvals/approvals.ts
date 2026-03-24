import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-approvals',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <h1>Approval Queue</h1>
      <div class="header-actions">
        <button class="outline-btn"><span class="material-icons">filter_list</span> Filter</button>
      </div>
    </div>

    <div class="tabs" style="margin-bottom:1.5rem">
      <button class="tab" [class.active]="activeTab==='pending'" (click)="activeTab='pending'">Pending <span class="badge badge-error-soft" style="margin-left:0.5rem">{{pendingCount}}</span></button>
      <button class="tab" [class.active]="activeTab==='approved'" (click)="activeTab='approved'">Approved</button>
      <button class="tab" [class.active]="activeTab==='rejected'" (click)="activeTab='rejected'">Rejected</button>
    </div>

    <div class="approval-list">
      <div class="approval-item" *ngFor="let item of items">
        <div class="item-info">
          <span class="item-type" [class]="item.type">{{item.type}}</span>
          <div>
            <h4>{{item.name}}</h4>
            <p>Submitted by {{item.submittedBy}} · {{item.date}}</p>
          </div>
        </div>
        <div class="action-btns">
          <button class="btn approve"><span class="material-icons">check</span></button>
          <button class="btn reject"><span class="material-icons">close</span></button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['../admin-shared.css']
})
export class Approvals {
  activeTab = 'pending';
  pendingCount = 5;
  items = [
    { name: 'Urban Style Salon', type: 'shop', submittedBy: 'Rahul K.', date: '2 hrs ago' },
    { name: 'Deep Tissue Massage', type: 'service', submittedBy: 'Priya S.', date: '5 hrs ago' },
    { name: 'Fresh Bites Cafe', type: 'shop', submittedBy: 'Neha M.', date: '1 day ago' },
    { name: 'Yoga Session — Beginner', type: 'service', submittedBy: 'Amit D.', date: '1 day ago' },
    { name: 'Review on Classic Cuts', type: 'review', submittedBy: 'Auto-flagged', date: '2 days ago' }
  ];
}

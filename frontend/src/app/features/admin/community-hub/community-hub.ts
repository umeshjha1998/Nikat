import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-community-hub',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-header">
      <h1>Community Hub</h1>
      <div class="header-actions">
        <div class="search-box"><span class="material-icons">search</span><input placeholder="Search posts, users..."></div>
        <button class="outline-btn"><span class="material-icons">filter_list</span> Filter</button>
      </div>
    </div>

    <div class="tabs" style="margin-bottom:1.5rem">
      <button class="tab" [class.active]="activeTab==='posts'" (click)="activeTab='posts'">Posts</button>
      <button class="tab" [class.active]="activeTab==='flagged'" (click)="activeTab='flagged'">Flagged</button>
      <button class="tab" [class.active]="activeTab==='trending'" (click)="activeTab='trending'">Trending</button>
    </div>

    <div class="table-container">
      <table class="data-table">
        <thead><tr><th>Content</th><th>Author</th><th>Engagement</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          <tr *ngFor="let p of posts">
            <td class="name-cell">{{p.title}}</td>
            <td><div class="user-row"><div class="avatar">{{p.initials}}</div><span>{{p.author}}</span></div></td>
            <td><span class="muted">{{p.likes}} likes · {{p.comments}} comments</span></td>
            <td><span class="badge" [class]="'badge-' + p.badge">{{p.status}}</span></td>
            <td>
              <div class="action-btns">
                <button class="icon-btn"><span class="material-icons">visibility</span></button>
                <button class="icon-btn danger"><span class="material-icons">delete</span></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['../admin-shared.css']
})
export class CommunityHub {
  activeTab = 'posts';
  posts = [
    { title: 'Best cafes in Pune for remote work', author: 'Priya S.', initials: 'PS', likes: 42, comments: 18, status: 'Active', badge: 'active' },
    { title: 'Looking for a good salon near Koregaon', author: 'Rahul K.', initials: 'RK', likes: 15, comments: 7, status: 'Active', badge: 'active' },
    { title: 'Scam alert: Fake listings!', author: 'Anonymous', initials: 'AN', likes: 63, comments: 45, status: 'Flagged', badge: 'error' },
    { title: 'Top 5 home services I recommend', author: 'Meera J.', initials: 'MJ', likes: 28, comments: 12, status: 'Active', badge: 'active' }
  ];
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page-container">
      <header class="page-header">
        <div class="header-content">
          <a routerLink="/" class="brand-logo">Nikat</a>
          <nav class="nav-links">
            <a routerLink="/browse">Shops</a>
            <a routerLink="/services">Services</a>
            <a routerLink="/community" class="active">Community</a>
          </nav>
        </div>
      </header>

      <main class="main-content">
        <div class="hero-section">
          <h1>Community Board</h1>
          <p>Local news, events, and announcements from your neighborhood</p>
        </div>

        <div class="posts-list" *ngIf="posts.length > 0; else noPosts">
          <div class="post-card" *ngFor="let post of posts">
            <div class="post-type-badge" [attr.data-type]="post.postType">{{ post.postType }}</div>
            <h3>{{ post.title }}</h3>
            <p class="post-content">{{ post.content }}</p>
            <div class="post-meta">
              <span class="author"><span class="material-symbols-outlined">person</span>{{ post.authorName }}</span>
              <span class="location" *ngIf="post.location"><span class="material-symbols-outlined">location_on</span>{{ post.location }}</span>
            </div>
          </div>
        </div>

        <ng-template #noPosts>
          <div class="empty-state">
            <span class="material-symbols-outlined">forum</span>
            <h2>No community posts yet</h2>
            <p>Be the first to share something with your community!</p>
          </div>
        </ng-template>
      </main>
    </div>
  `,
  styles: [`
    .page-container { min-height: 100vh; background: #05092f; color: #e2e3ff; }
    .page-header { background: rgba(14, 20, 66, 0.9); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(110, 115, 157, 0.15); padding: 1rem 2rem; position: sticky; top: 0; z-index: 100; }
    .header-content { display: flex; align-items: center; justify-content: space-between; max-width: 1200px; margin: 0 auto; }
    .brand-logo { font-size: 1.5rem; font-weight: 900; background: linear-gradient(135deg, #5eb4ff, #2aa7ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-decoration: none; }
    .nav-links { display: flex; gap: 1.5rem; }
    .nav-links a { color: #6e739d; text-decoration: none; font-weight: 500; transition: color 0.2s; }
    .nav-links a:hover, .nav-links a.active { color: #5eb4ff; }
    .main-content { max-width: 800px; margin: 0 auto; padding: 2rem; }
    .hero-section { text-align: center; margin-bottom: 3rem; padding: 2rem 0; }
    .hero-section h1 { font-size: 2.5rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #5eb4ff, #84c9fd); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .hero-section p { color: #6e739d; font-size: 1.125rem; }
    .posts-list { display: flex; flex-direction: column; gap: 1.25rem; }
    .post-card {
      background: rgba(24, 32, 86, 0.5); border: 1px solid rgba(110, 115, 157, 0.2);
      border-radius: 1rem; padding: 1.5rem; transition: all 0.3s;
    }
    .post-card:hover { border-color: rgba(94, 180, 255, 0.3); }
    .post-type-badge {
      display: inline-block; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
      padding: 0.2rem 0.6rem; border-radius: 0.5rem; margin-bottom: 0.75rem;
      background: rgba(94, 180, 255, 0.15); color: #5eb4ff;
    }
    .post-card h3 { margin: 0 0 0.5rem; font-size: 1.125rem; color: #e2e3ff; }
    .post-content { color: #9da2d3; font-size: 0.875rem; line-height: 1.6; margin-bottom: 1rem; }
    .post-meta { display: flex; gap: 1.5rem; font-size: 0.8rem; color: #6e739d; border-top: 1px solid rgba(110, 115, 157, 0.15); padding-top: 0.75rem; }
    .author, .location { display: flex; align-items: center; gap: 0.25rem; }
    .author .material-symbols-outlined, .location .material-symbols-outlined { font-size: 1rem; color: #5eb4ff; }
    .empty-state { text-align: center; padding: 4rem 2rem; }
    .empty-state .material-symbols-outlined { font-size: 4rem; color: #6e739d; margin-bottom: 1rem; }
    .empty-state h2 { color: #e2e3ff; margin-bottom: 0.5rem; }
    .empty-state p { color: #6e739d; }
  `]
})
export class CommunityComponent implements OnInit {
  posts: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getCommunityPosts().subscribe({
      next: (data) => this.posts = data,
      error: () => this.posts = []
    });
  }
}

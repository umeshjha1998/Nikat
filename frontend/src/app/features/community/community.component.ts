import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="community-page">
      <main class="hub-main">
        <!-- Hero Section -->
        <section class="hub-hero">
          <div class="hero-content">
            <span class="h-badge">Nexus of Neighborhoods</span>
            <h1>The pulse of your <span>community.</span></h1>
            <p>Connect with your neighbors, share updates, and discover what's happening just around the corner.</p>

            <div class="hub-search-premium">
              <span class="material-symbols-outlined">search</span>
              <input type="text" placeholder="Search discussions, events, or local help...">
            </div>
          </div>
          <div class="hero-bg-glow"></div>
        </section>

        <!-- Main Layout -->
        <div class="hub-layout">
          <!-- Left: Feed -->
          <div class="feed-col">
            <nav class="feed-filters">
              <button class="f-pill active">All Activity</button>
              <button class="f-pill">Events</button>
              <button class="f-pill">Local Help</button>
              <button class="f-pill">News</button>
            </nav>

            <div class="posts-stack" *ngIf="posts.length > 0; else emptyState">
              <article class="post-card-premium" *ngFor="let post of posts">
                <div class="p-type" [attr.data-type]="post.postType">{{post.postType}}</div>
                <div class="p-header">
                  <div class="p-author">
                    <div class="a-hex">
                      <span class="material-symbols-outlined">person</span>
                    </div>
                    <div class="a-info">
                      <h4>{{post.authorName}}</h4>
                      <span>{{post.location || 'Your Neighborhood'}}</span>
                    </div>
                  </div>
                  <div class="p-time">2h ago</div>
                </div>
                <div class="p-body">
                  <h2>{{post.title}}</h2>
                  <p>{{post.content}}</p>
                </div>
                <div class="p-footer">
                  <div class="p-stats">
                    <div class="s-item" (click)="onLike(post)">
                      <span class="material-symbols-outlined">favorite_border</span>
                      <span>24</span>
                    </div>
                    <div class="s-item" (click)="onComment(post)">
                      <span class="material-symbols-outlined">chat_bubble_outline</span>
                      <span>12</span>
                    </div>
                    <div class="s-item" (click)="onShare(post)">
                      <span class="material-symbols-outlined">share</span>
                    </div>
                  </div>
                  <button class="btn-more-blur">Read Full Story</button>
                </div>
              </article>
            </div>

            <ng-template #emptyState>
              <div class="empty-state-premium">
                <div class="e-icon-box">
                  <span class="material-symbols-outlined">forum</span>
                </div>
                <h3>Start the conversation</h3>
                <p>Be the first to share something with your community.</p>
                <button class="btn-prime-glow" (click)="createPost()">Create First Post</button>
              </div>
            </ng-template>
          </div>

          <!-- Right: Sidebar -->
          <aside class="side-col">
            <section class="side-widget-glass">
              <h3>Trending #Nodes</h3>
              <div class="trending-list">
                <a href="#" class="t-item">
                  <span>#ArtisanMarket</span>
                  <span class="t-count">1.2k</span>
                </a>
                <a href="#" class="t-item">
                  <span>#SafeStreets</span>
                  <span class="t-count">840</span>
                </a>
                <a href="#" class="t-item">
                  <span>#SummerMixer</span>
                  <span class="t-count">420</span>
                </a>
              </div>
            </section>

            <section class="side-widget-glass highlight">
              <div class="w-head">
                <span class="material-symbols-outlined">event</span>
                <h4>Weekend Mixer</h4>
              </div>
              <p>Join us at Central Plaza this Saturday for local music and food.</p>
              <button class="btn-glass-full" (click)="joinEvent()">Join Event</button>
            </section>

            <section class="member-preview">
              <h3>Active Neighbors</h3>
              <div class="m-grid">
                <div class="m-avatar" *ngFor="let i of [1,2,3,4,5,6]"></div>
                <div class="m-plus">+120</div>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .community-page { min-height: 100vh; background: var(--bg); color: var(--text-main); transition: all 0.3s ease; }

    /* Hero */
    .hub-hero { padding: 3rem 2rem 4rem; text-align: center; position: relative; overflow: hidden; }
    .hero-content { position: relative; z-index: 10; max-width: 900px; margin: 0 auto; }
    .h-badge {
      display: inline-block; padding: 0.4rem 1rem;
      background: var(--glass); border: 1px solid var(--glass-border);
      color: var(--accent); border-radius: 2rem;
      font-size: 0.75rem; font-weight: 900;
      text-transform: uppercase; letter-spacing: 0.1em;
      margin-bottom: 1.5rem;
    }
    .hub-hero h1 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 3.5rem; font-weight: 800;
      margin: 0 0 1rem; letter-spacing: -0.04em;
      color: var(--text-main);
    }
    .hub-hero h1 span { color: var(--accent); }
    .hub-hero p { font-size: 1.125rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 3rem; line-height: 1.6; }

    .hub-search-premium {
      max-width: 700px; margin: 0 auto;
      background: var(--card-bg); border: 1px solid var(--glass-border);
      border-radius: 1.5rem; padding: 0.5rem;
      display: flex; align-items: center;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      transition: all 0.3s ease;
    }
    .hub-search-premium .material-symbols-outlined { margin: 0 1.25rem; color: var(--accent); font-size: 1.5rem; }
    .hub-search-premium input {
      flex: 1; background: transparent; border: none;
      color: var(--text-main); font-size: 1rem; outline: none;
      padding: 0.75rem 0; font-family: 'Manrope', sans-serif;
    }
    .hub-search-premium input::placeholder { color: var(--text-muted); }
    .hero-bg-glow {
      position: absolute; width: 600px; height: 600px;
      background: radial-gradient(circle, var(--accent-glow), transparent 70%);
      top: -150px; left: 50%; transform: translateX(-50%); filter: blur(80px);
    }

    /* Layout */
    .hub-layout { max-width: 80rem; margin: 0 auto; padding: 0 2rem 6rem; display: grid; grid-template-columns: 1fr 22rem; gap: 3rem; }
    .feed-filters { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 2rem; }
    .f-pill {
      background: var(--card-bg); color: var(--text-muted);
      padding: 0.5rem 1.25rem; border-radius: 0.75rem;
      font-weight: 700; cursor: pointer; font-size: 0.85rem;
      border: 1px solid var(--border-color); transition: all 0.2s;
    }
    .f-pill:hover { color: var(--text-main); border-color: var(--accent); }
    .f-pill.active { background: var(--primary); color: #fff; border-color: var(--primary); padding: 0.5rem 1.5rem; }

    .posts-stack { display: flex; flex-direction: column; gap: 1.5rem; }
    .post-card-premium {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 1.5rem; padding: 2rem;
      position: relative; transition: all 0.3s ease;
    }
    .post-card-premium:hover { border-color: var(--accent); transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
    .p-type {
      position: absolute; top: 1.5rem; right: 2rem;
      font-size: 0.625rem; font-weight: 700;
      text-transform: uppercase; color: var(--accent); letter-spacing: 0.1em;
      background: var(--accent-glow);
      padding: 0.25rem 0.75rem; border-radius: 0.5rem;
    }

    .p-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; }
    .p-author { display: flex; align-items: center; gap: 1rem; }
    .a-hex {
      width: 44px; height: 44px;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
      display: flex; align-items: center; justify-content: center;
      color: #fff;
    }
    .a-info h4 { font-size: 1rem; font-weight: 800; margin: 0 0 0.1rem; color: var(--text-main); }
    .a-info span { font-size: 0.75rem; color: var(--text-muted); font-weight: 600; }
    .p-time { font-size: 0.75rem; color: var(--text-muted); font-weight: 700; }

    .p-body h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; margin: 0 0 0.75rem; line-height: 1.2; color: var(--text-main); }
    .p-body p { font-size: 0.95rem; color: var(--text-muted); line-height: 1.7; margin: 0 0 1.5rem; }

    .p-footer { border-top: 1px solid var(--border-color); padding-top: 1.25rem; display: flex; justify-content: space-between; align-items: center; }
    .p-stats { display: flex; gap: 1.5rem; }
    .s-item { display: flex; align-items: center; gap: 0.375rem; color: var(--text-muted); font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: color 0.2s; }
    .s-item:hover { color: var(--accent); }
    .s-item .material-symbols-outlined { font-size: 1.125rem; }
    .btn-more-blur {
      background: var(--glass); border: 1px solid var(--glass-border);
      color: var(--text-main); padding: 0.5rem 1rem; border-radius: 0.75rem;
      font-weight: 700; font-size: 0.8rem; cursor: pointer;
      transition: all 0.2s;
    }
    .btn-more-blur:hover { border-color: var(--accent); background: var(--glass-border); }

    /* Sidebar */
    .side-col { display: flex; flex-direction: column; gap: 2rem; }
    .side-widget-glass {
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      border-radius: 1.5rem; padding: 1.5rem;
      transition: all 0.3s ease;
    }
    .side-widget-glass h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; font-weight: 800; margin: 0 0 1.25rem; color: var(--text-main); }

    .trending-list { display: flex; flex-direction: column; gap: 1rem; }
    .t-item { display: flex; justify-content: space-between; text-decoration: none; color: var(--text-muted); font-weight: 700; font-size: 0.875rem; transition: all 0.2s; }
    .t-item:hover { color: var(--accent); transform: translateX(4px); }
    .t-count { font-size: 0.75rem; color: var(--text-muted); opacity: 0.7; }

    .side-widget-glass.highlight {
      background: linear-gradient(135deg, var(--accent-glow), var(--card-bg));
      border: 2px solid var(--primary);
    }
    .w-head { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }
    .w-head .material-symbols-outlined { color: var(--accent); }
    .w-head h4 { font-size: 1rem; font-weight: 800; margin: 0; color: var(--text-main); }
    .side-widget-glass.highlight p { font-size: 0.875rem; color: var(--text-muted); line-height: 1.5; margin: 0 0 1.25rem; }
    .btn-glass-full {
      width: 100%; padding: 0.75rem; border-radius: 0.75rem;
      background: linear-gradient(135deg, var(--primary), var(--accent));
      border: none; color: #fff;
      font-weight: 700; cursor: pointer; transition: all 0.2s;
      box-shadow: 0 4px 12px var(--accent-glow);
    }
    .btn-glass-full:hover { box-shadow: 0 8px 24px var(--accent-glow); transform: translateY(-1px); }

    .member-preview h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; font-weight: 800; margin: 0 0 1.25rem; color: var(--text-main); }
    .m-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; }
    .m-avatar { width: 48px; height: 48px; border-radius: 1rem; background: var(--glass-border); border: 1px solid var(--border-color); }
    .m-plus {
      width: 48px; height: 48px; border-radius: 1rem;
      border: 1px dashed var(--border-color);
      display: flex; align-items: center; justify-content: center;
      font-size: 0.7rem; font-weight: 800; color: var(--text-muted);
    }

    /* Empty state */
    .empty-state-premium { text-align: center; padding: 5rem 2rem; }
    .e-icon-box {
      width: 5rem; height: 5rem; border-radius: 1.5rem;
      background: var(--glass);
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 1.5rem; color: var(--accent);
      border: 1px solid var(--glass-border);
    }
    .e-icon-box .material-symbols-outlined { font-size: 2.5rem; }
    .empty-state-premium h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; margin: 0 0 0.75rem; color: var(--text-main); }
    .empty-state-premium p { color: var(--text-muted); margin: 0 0 2rem; font-size: 1rem; }
    .btn-prime-glow {
      background: linear-gradient(135deg, var(--primary), var(--accent));
      border: none; color: #fff;
      padding: 0.875rem 2rem; border-radius: 0.75rem;
      font-weight: 700; cursor: pointer;
      box-shadow: 0 8px 24px var(--accent-glow);
      transition: all 0.2s;
    }
    .btn-prime-glow:hover { box-shadow: 0 12px 32px var(--accent-glow); transform: translateY(-1px); }

    @media (max-width: 1024px) {
      .hub-layout { grid-template-columns: 1fr; }
      .side-col { display: none; }
      .hub-hero h1 { font-size: 2.5rem; }
    }
  `]
})
export class CommunityComponent implements OnInit {
  posts: any[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.apiService.getCommunityPosts().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.posts = data;
        } else {
          this.posts = [
            {
              authorName: 'David Chen',
              title: 'Neighborhood Summer Mixer - Volunteers Needed!',
              content: 'We are planning our annual community mixer and need some hands for set up and coordination. Last year was a blast, let\'s make this one even better!',
              postType: 'Announcement',
              location: 'South Side'
            },
            {
              authorName: 'Sarah Miller',
              title: 'Best Coffee Bean Recommendation?',
              content: 'Looking for locally roasted coffee beans that work well for French press. Any hidden gems I should check out? Preference for dark roasts.',
              postType: 'Discussion',
              location: 'Cedar Ave'
            }
          ];
        }
      },
      error: () => {
        this.posts = [
          {
            authorName: 'David Chen',
            title: 'Neighborhood Summer Mixer - Volunteers Needed!',
            content: 'We are planning our annual community mixer and need some hands for set up and coordination. Last year was a blast, let\'s make this one even better!',
            postType: 'Announcement',
            location: 'South Side'
          }
        ];
      }
    });
  }

  /** Redirects to login if not authenticated; returns true if logged in */
  private requireLogin(): boolean {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  onLike(post: any): void {
    if (!this.requireLogin()) return;
    // TODO: Like post logic
  }

  onComment(post: any): void {
    if (!this.requireLogin()) return;
    // TODO: Open comment section / navigate to post detail
  }

  onShare(post: any): void {
    if (!this.requireLogin()) return;
    // TODO: Share post logic
  }

  createPost(): void {
    if (!this.requireLogin()) return;
    // TODO: Navigate to create post form
  }

  joinEvent(): void {
    if (!this.requireLogin()) return;
    // TODO: Join event logic
  }
}

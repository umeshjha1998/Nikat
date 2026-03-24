import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="community-premium-wrapper">
      <!-- Navbar (Consistent) -->
      <nav class="premium-nav-glass">
        <div class="nav-inner">
          <a routerLink="/" class="brand">Nikat <span>Community</span></a>
          <div class="nav-links">
            <a routerLink="/browse">Shops</a>
            <a routerLink="/services">Services</a>
            <a class="active">Discussions</a>
          </div>
          <button class="btn-prime-tiny">Create Post</button>
        </div>
      </nav>

      <main class="hub-main">
        <!-- Hero Section -->
        <section class="hub-hero">
          <div class="hero-content">
            <span class="h-badge">Nexus of Neighborhoods</span>
            <h1>The pulse of your <span>community.</span></h1>
            <p>Connect with your neighbors, share updates, and discover what's happening just around the corner.</p>
            
            <div class="hub-search-premium">
              <span class="material-icons">search</span>
              <input type="text" placeholder="Search discussions, events, or local help...">
              <kbd>⌘ K</kbd>
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
                      <span class="material-icons">person</span>
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
                    <div class="s-item">
                      <span class="material-icons">favorite_border</span>
                      <span>24</span>
                    </div>
                    <div class="s-item">
                      <span class="material-icons">chat_bubble_outline</span>
                      <span>12</span>
                    </div>
                    <div class="s-item">
                      <span class="material-icons">ios_share</span>
                    </div>
                  </div>
                  <button class="btn-more-blur">Read Full Story</button>
                </div>
              </article>
            </div>

            <ng-template #emptyState>
              <div class="empty-state-premium">
                <div class="e-icon-box">
                  <span class="material-icons">forum</span>
                </div>
                <h3>Start the conversation</h3>
                <p>Be the first to share something with your community.</p>
                <button class="btn-prime-glow">Create First Post</button>
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
                 <span class="material-icons">event</span>
                 <h4>Weekend Mixer</h4>
               </div>
               <p>Join us at Central Plaza this Saturday for local music and food.</p>
               <button class="btn-glass-full">Join Event</button>
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
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Manrope:wght@500;600;700;800&display=swap');

    :host {
      --primary: #3b82f6;
      --bg: #020410;
      --glass: rgba(255, 255, 255, 0.03);
      --glass-border: rgba(255, 255, 255, 0.08);
      --text-muted: #94a3b8;
      font-family: 'Manrope', sans-serif;
    }

    .community-premium-wrapper { min-height: 100vh; background: var(--bg); color: #fff; }

    /* Nav */
    .premium-nav-glass { height: 5rem; background: rgba(2, 4, 16, 0.6); backdrop-filter: blur(20px); border-bottom: 1px solid var(--glass-border); position: sticky; top: 0; z-index: 1000; }
    .nav-inner { max-width: 1300px; height: 100%; margin: 0 auto; padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; }
    .brand { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.4rem; font-weight: 800; color: #fff; text-decoration: none; }
    .brand span { font-weight: 400; color: var(--text-muted); font-size: 0.9rem; margin-left: 0.4rem; }
    .nav-links { display: flex; gap: 2.5rem; }
    .nav-links a { font-size: 0.9rem; font-weight: 700; color: var(--text-muted); text-decoration: none; transition: 0.2s; cursor: pointer; }
    .nav-links a.active { color: var(--primary); }
    .btn-prime-tiny { background: var(--primary); border: none; padding: 0.5rem 1.25rem; border-radius: 0.75rem; color: #fff; font-weight: 800; font-size: 0.8rem; cursor: pointer; }

    /* Hero */
    .hub-hero { padding: 8rem 2rem 6rem; text-align: center; position: relative; overflow: hidden; }
    .hero-content { position: relative; z-index: 10; max-width: 900px; margin: 0 auto; }
    .h-badge { display: inline-block; padding: 0.4rem 1rem; background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.2); color: var(--primary); border-radius: 2rem; font-size: 0.75rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1.5rem; }
    .hub-hero h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 4.5rem; font-weight: 800; margin-bottom: 1rem; letter-spacing: -0.04em; }
    .hub-hero h1 span { color: var(--primary); }
    .hub-hero p { font-size: 1.25rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 3.5rem; line-height: 1.6; }

    .hub-search-premium {
      max-width: 700px; margin: 0 auto; background: var(--glass); border: 1px solid var(--glass-border);
      border-radius: 1.5rem; padding: 0.6rem; display: flex; align-items: center; backdrop-filter: blur(20px);
      box-shadow: 0 40px 80px rgba(0,0,0,0.4);
    }
    .hub-search-premium .material-icons { margin: 0 1.25rem; color: var(--primary); font-size: 1.75rem; }
    .hub-search-premium input { flex: 1; background: transparent; border: none; color: #fff; font-size: 1.15rem; outline: none; padding: 0.75rem 0; font-family: 'Manrope', sans-serif; }
    .hub-search-premium kbd { background: rgba(255,255,255,0.1); padding: 0.4rem 0.75rem; border-radius: 0.5rem; font-size: 0.75rem; font-weight: 800; color: var(--text-muted); margin-right: 1rem; }
    .hero-bg-glow { position: absolute; width: 800px; height: 800px; background: radial-gradient(circle, rgba(59,130,246,0.08), transparent 70%); top: -200px; left: 50%; transform: translateX(-50%); filter: blur(100px); }

    /* Layout */
    .hub-layout { max-width: 1300px; margin: 0 auto; padding: 0 2rem 10rem; display: grid; grid-template-columns: 1fr 340px; gap: 4rem; }
    .feed-filters { display: flex; gap: 1rem; margin-bottom: 3rem; }
    .f-pill { background: var(--glass); border: 1px solid var(--glass-border); color: var(--text-muted); padding: 0.6rem 1.5rem; border-radius: 1.25rem; font-weight: 700; cursor: pointer; font-size: 0.85rem; }
    .f-pill.active { background: var(--primary); color: #fff; border-color: var(--primary); }

    .posts-stack { display: flex; flex-direction: column; gap: 2rem; }
    .post-card-premium { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 2.25rem; padding: 2.5rem; position: relative; transition: 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
    .post-card-premium:hover { background: rgba(255,255,255,0.05); border-color: var(--primary); transform: translateY(-8px); }
    .p-type { position: absolute; top: 1.5rem; right: 2rem; font-size: 0.7rem; font-weight: 950; text-transform: uppercase; color: var(--primary); letter-spacing: 0.1em; background: rgba(59,130,246,0.1); padding: 0.3rem 0.8rem; border-radius: 0.5rem; }

    .p-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem; }
    .p-author { display: flex; align-items: center; gap: 1rem; }
    .a-hex { width: 44px; height: 44px; background: linear-gradient(135deg, var(--primary), #1e40af); clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%); display: flex; align-items: center; justify-content: center; }
    .a-info h4 { font-size: 1.05rem; font-weight: 800; margin: 0 0 0.1rem; }
    .a-info span { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }
    .p-time { font-size: 0.8rem; color: #4b5563; font-weight: 700; }

    .p-body h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.65rem; font-weight: 800; margin-bottom: 1rem; line-height: 1.2; }
    .p-body p { font-size: 1.05rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 2rem; }

    .p-footer { border-top: 1px solid var(--glass-border); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; }
    .p-stats { display: flex; gap: 1.5rem; }
    .s-item { display: flex; align-items: center; gap: 0.4rem; color: #4b5563; font-size: 0.85rem; font-weight: 800; cursor: pointer; transition: 0.2s; }
    .s-item:hover { color: var(--primary); }
    .s-item .material-icons { font-size: 1.25rem; }
    .btn-more-blur { background: var(--glass); border: 1px solid var(--glass-border); color: #fff; padding: 0.6rem 1.25rem; border-radius: 1rem; font-weight: 800; font-size: 0.85rem; cursor: pointer; }

    /* Sidebar */
    .side-col { display: flex; flex-direction: column; gap: 2.5rem; }
    .side-widget-glass { background: var(--glass); border: 1px solid var(--glass-border); border-radius: 2rem; padding: 2rem; }
    .side-widget-glass h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.1rem; margin-bottom: 1.5rem; }
    
    .trending-list { display: flex; flex-direction: column; gap: 1.25rem; }
    .t-item { display: flex; justify-content: space-between; text-decoration: none; color: var(--text-muted); font-weight: 700; font-size: 0.95rem; transition: 0.2s; }
    .t-item:hover { color: #fff; transform: translateX(4px); }
    .t-count { font-size: 0.75rem; color: #4b5563; }

    .side-widget-glass.highlight { background: linear-gradient(135deg, #1e40af, #020410); border-color: rgba(59,130,246,0.3); }
    .w-head { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; }
    .w-head .material-icons { color: var(--primary); }
    .w-head h4 { font-size: 1.1rem; font-weight: 800; margin: 0; }
    .side-widget-glass.highlight p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1.5rem; }
    .btn-glass-full { width: 100%; height: 44px; border-radius: 1rem; background: var(--primary); border: none; color: #fff; font-weight: 800; cursor: pointer; }

    .member-preview h3 { font-size: 1rem; margin-bottom: 1.25rem; }
    .m-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; }
    .m-avatar { width: 48px; height: 48px; border-radius: 1rem; background: var(--glass); border: 1px solid var(--glass-border); }
    .m-plus { width: 48px; height: 48px; border-radius: 1rem; border: 1px dashed var(--glass-border); display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 800; color: var(--text-muted); }

    /* Empty state */
    .empty-state-premium { text-align: center; padding: 6rem 2rem; }
    .e-icon-box { width: 90px; height: 90px; border-radius: 2rem; background: var(--glass); display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; color: var(--text-muted); }
    .e-icon-box .material-icons { font-size: 2.5rem; }
    .empty-state-premium h3 { font-size: 1.75rem; margin-bottom: 1rem; }
    .empty-state-premium p { color: var(--text-muted); margin-bottom: 2.5rem; font-size: 1.1rem; }
    .btn-prime-glow { background: var(--primary); border: none; color: #fff; padding: 1rem 2.5rem; border-radius: 1.25rem; font-weight: 800; cursor: pointer; box-shadow: 0 0 30px rgba(59,130,246,0.3); }

    @media (max-width: 1100px) {
      .hub-layout { grid-template-columns: 1fr; }
      .side-col { display: none; }
      .hub-hero h1 { font-size: 3rem; }
    }
  `]
})
export class CommunityComponent implements OnInit {
  posts: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getCommunityPosts().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.posts = data;
        } else {
          // Mock some premium data if none exists
          this.posts = [
            { 
              authorName: 'David Chen', 
              title: 'Neighborhood Summer Mixer - Volunteers Needed!', 
              content: 'We are planning our annual community mixer and need some hands for set up and coordination. Last year was a blast, let s make this one even better!',
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
              content: 'We are planning our annual community mixer and need some hands for set up and coordination. Last year was a blast, let s make this one even better!',
              postType: 'Announcement',
              location: 'South Side'
            }
          ];
      }
    });
  }
}

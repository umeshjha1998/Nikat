import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="bg-background text-on-background font-body selection:bg-primary/30 min-h-screen">
      <main class="pt-8 pb-20 px-6 max-w-7xl mx-auto">
        <!-- Header Section -->
        <header class="mb-10">
          <h1 class="font-headline text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Results for "<span class="text-primary">{{ searchQuery || 'Everything' }}</span>"
          </h1>
          <p class="text-on-surface-variant font-medium">Found {{ results.length }} results across Nikat Ecosystem</p>
        </header>

        <!-- Filter Bar -->
        <section class="flex flex-wrap items-center gap-3 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          <button class="flex items-center gap-2 bg-primary text-on-primary font-bold px-5 py-2.5 rounded-full shadow-lg shadow-primary/20 active:scale-95 transition-all">
            <span class="material-symbols-outlined text-sm">tune</span>
            <span class="text-sm font-label uppercase tracking-wider">All Filters</span>
          </button>
          <div class="h-6 w-px bg-outline-variant/30 mx-2"></div>
          <button class="flex items-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface px-4 py-2 rounded-xl transition-all border border-outline-variant/10">
            <span class="text-sm">Distance: <span class="font-bold text-primary">5km</span></span>
            <span class="material-symbols-outlined text-sm">keyboard_arrow_down</span>
          </button>
          <button class="flex items-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface px-4 py-2 rounded-xl transition-all border border-outline-variant/10">
            <span class="text-sm">Rating: <span class="font-bold text-primary">4.5+</span></span>
          </button>
          <button class="flex items-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface px-4 py-2 rounded-xl transition-all border border-outline-variant/10">
            <span class="text-sm">Service: <span class="font-bold text-primary">All Categories</span></span>
            <span class="material-symbols-outlined text-sm">keyboard_arrow_down</span>
          </button>
          <div class="flex items-center gap-2 bg-secondary-container/20 text-secondary border border-secondary/20 px-4 py-2 rounded-xl">
            <div class="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
            <span class="text-sm font-bold uppercase tracking-widest font-label">Open Now</span>
          </div>
        </section>

        <!-- Bento Grid Results -->
        <div class="space-y-16">
          <!-- Shops & Services (Featured Grid) -->
          <section>
            <div class="flex items-end justify-between mb-8">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-primary text-3xl">storefront</span>
                <h2 class="font-headline text-2xl font-bold tracking-tight">Top Shops & Services</h2>
              </div>
              <a class="text-primary font-bold text-sm hover:underline underline-offset-4 decoration-primary/50" routerLink="/browse">View all</a>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Result Cards Wrapper -->
              <ng-container *ngFor="let shop of results">
                <div class="group bg-surface-container-low rounded-xl overflow-hidden shadow-xl transition-all hover:-translate-y-1 cursor-pointer" 
                     [routerLink]="['/shop', shop.id]">
                  <div class="relative h-48 overflow-hidden">
                    <img [src]="shop.image" [alt]="shop.name" class="w-full h-full object-cover transition-transform group-hover:scale-110">
                    <div class="absolute top-4 right-4 bg-surface/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                      <span class="material-symbols-outlined text-tertiary text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
                      <span class="text-sm font-bold">{{ shop.rating }}</span>
                    </div>
                  </div>
                  <div class="p-5">
                    <div class="flex justify-between items-start mb-2">
                      <h3 class="font-headline text-xl font-bold">{{ shop.name }}</h3>
                      <span *ngIf="shop.isOpen" class="text-secondary text-[10px] font-bold uppercase tracking-tighter bg-secondary/10 px-2 py-0.5 rounded border border-secondary/20">Open Now</span>
                    </div>
                    <p class="text-on-surface-variant text-sm mb-4 line-clamp-2 font-body">{{ shop.description }}</p>
                    <div class="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                      <div class="flex items-center gap-2 text-on-surface-variant">
                        <span class="material-symbols-outlined text-sm">location_on</span>
                        <span class="text-xs font-semibold">{{ shop.distance }}</span>
                      </div>
                      <span class="bg-tertiary-container/20 text-on-tertiary-container px-3 py-1 rounded-full text-[10px] font-bold font-label uppercase tracking-widest">{{ shop.category }}</span>
                    </div>
                  </div>
                </div>
              </ng-container>

              <!-- Promo Card -->
              <div class="bg-surface-container-low rounded-xl p-6 shadow-xl flex flex-col justify-between border-l-4 border-primary">
                <div>
                  <span class="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-3 block">Promotion</span>
                  <h3 class="font-headline text-2xl font-extrabold mb-4 leading-tight">Need a Plumber <br/>Right Now?</h3>
                  <p class="text-on-surface-variant text-sm mb-6">Connect with verified emergency technicians in under 15 minutes.</p>
                </div>
                <button class="w-full py-3 bg-primary-container text-on-primary-container font-black rounded-xl hover:brightness-110 active:scale-95 transition-all">
                  Find Emergency Service
                </button>
              </div>
            </div>
          </section>

          <!-- Technicians & Experts -->
          <section>
            <div class="flex items-end justify-between mb-8">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-tertiary text-3xl">engineering</span>
                <h2 class="font-headline text-2xl font-bold tracking-tight">Verified Technicians</h2>
              </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div *ngFor="let tech of technicians" class="flex items-center gap-5 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10 hover:bg-surface-container transition-all cursor-pointer">
                <div class="relative shrink-0">
                  <img [src]="tech.image" [alt]="tech.name" class="w-20 h-20 rounded-full object-cover">
                  <div class="absolute -bottom-1 -right-1 bg-secondary p-1 rounded-full border-4 border-surface-container-low">
                    <span class="material-symbols-outlined text-on-secondary text-xs" style="font-variation-settings: 'FILL' 1;">verified</span>
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-start">
                    <div>
                      <h4 class="font-headline font-bold text-lg">{{ tech.name }}</h4>
                      <p class="text-primary text-xs font-bold uppercase tracking-wider">{{ tech.title }}</p>
                    </div>
                    <div class="text-right">
                      <div class="flex items-center gap-1 justify-end">
                        <span class="material-symbols-outlined text-tertiary text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
                        <span class="text-sm font-bold">{{ tech.rating }}</span>
                      </div>
                      <span class="text-[10px] text-on-surface-variant font-medium">({{ tech.reviews }} Reviews)</span>
                    </div>
                  </div>
                  <div class="flex gap-2 mt-3">
                    <span *ngFor="let skill of tech.skills" class="text-[10px] px-2 py-0.5 bg-surface-container-highest rounded text-on-surface-variant">{{ skill }}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Map View Callout -->
          <section class="relative bg-surface-container rounded-3xl overflow-hidden p-8 md:p-12 min-h-[400px] flex items-center">
            <div class="absolute inset-0 opacity-40 mix-blend-overlay">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgvr-n_Q-8lh0SlqZ0sNzFC6W2LxHcUCdJacJnJog5NF6kMmpibPpgFDoGuGG4lK6euLCQBlL-z3s7hNDaLj3Y30p8Y93jka--zPxakC70pBfodwU9hRum6pGBAzY_gVQa44oOlFIn7KcR9jZFrdXT9gSk7fDIxt7EJFioLDYuo_1z0QtnAVobT0mTaA2DMMT7jV71m1HntpDfJPyTmb8Ky7Rtp3P4XUg3Dtbxs0lZDBLw1sGiO_Ld10Ea71C7-3baP3s75UpQ7kWs" alt="Map" class="w-full h-full object-cover">
            </div>
            <div class="relative z-10 max-w-md">
              <h2 class="font-headline text-3xl md:text-4xl font-black mb-6 leading-tight">See what's around <br/>the corner.</h2>
              <p class="text-on-surface-variant mb-8 font-medium">Use our interactive Nikat Map to find shops and technicians currently active in your neighborhood.</p>
              <button class="px-8 py-4 bg-primary text-on-primary-fixed font-black rounded-full shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                <span class="material-symbols-outlined">map</span>
                Explore Nearby
              </button>
            </div>
            <div class="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-64 bg-surface/80 backdrop-blur-xl p-6 rounded-2xl border border-outline-variant/20 rotate-3 shadow-2xl">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                  <span class="material-symbols-outlined text-on-secondary">near_me</span>
                </div>
                <div>
                  <p class="text-xs font-bold text-on-surface-variant uppercase">Current Area</p>
                  <p class="font-headline font-bold">North District</p>
                </div>
              </div>
              <p class="text-[10px] text-on-surface-variant leading-relaxed">32 active service providers found in this zone today.</p>
            </div>
          </section>
        </div>
      </main>

      <!-- Footer -->
      <footer class="bg-surface-container-highest w-full py-12 px-6 border-t border-outline-variant/30">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div class="space-y-4">
            <span class="text-lg font-bold text-on-surface">Nikat Platform</span>
            <p class="text-on-surface-variant font-['Manrope'] text-sm tracking-wide max-w-xs leading-relaxed">The Luminous Navigator for modern communities. Connect, discover, and build with verified local talent.</p>
            <div class="flex gap-4">
              <button class="p-2 bg-surface-container rounded-lg hover:text-blue-400 transition-colors">
                <span class="material-symbols-outlined">public</span>
              </button>
              <button class="p-2 bg-surface-container rounded-lg hover:text-blue-400 transition-colors">
                <span class="material-symbols-outlined">mail</span>
              </button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-3">
              <h5 class="text-blue-400 font-semibold text-sm">Navigation</h5>
              <a class="text-on-surface-variant hover:text-on-surface hover:underline decoration-primary/50 underline-offset-4 transition-opacity font-['Manrope'] text-sm tracking-wide" routerLink="/">Home</a>
              <a class="text-on-surface-variant hover:text-on-surface hover:underline decoration-primary/50 underline-offset-4 transition-opacity font-['Manrope'] text-sm tracking-wide" routerLink="/help">Help Center</a>
            </div>
            <div class="flex flex-col gap-3">
              <h5 class="text-blue-400 font-semibold text-sm">Legal</h5>
              <a class="text-on-surface-variant hover:text-on-surface hover:underline decoration-primary/50 underline-offset-4 transition-opacity font-['Manrope'] text-sm tracking-wide" href="#">Privacy Policy</a>
              <a class="text-on-surface-variant hover:text-on-surface hover:underline decoration-primary/50 underline-offset-4 transition-opacity font-['Manrope'] text-sm tracking-wide" href="#">Terms of Service</a>
            </div>
          </div>
        </div>
        <div class="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800/30 text-center">
          <p class="text-on-surface-variant font-['Manrope'] text-sm tracking-wide">© 2024 Nikat Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      vertical-align: middle;
    }
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `]
})
export class SearchResultsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  searchQuery = '';
  
  results = [
    { id: 1, name: "The Fixer's Hub", category: 'Premium', description: 'Premium hardware, tool rentals, and expert home renovation consultations in downtown.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwoLhPWUreL1rPKoYu7afhjBsF4SbTB27EkOslTUOQ7uOvPpKXMIY4gttpXr1xVftsBMiuKgLVRN8UvMfYDBxnqZ_KmP6jy9cUEqEOTjlTiHVyWbWdzrDN-z6nC-jxGzGRqloYouwthY0tQ-Q8gnIqQ4_ca5uSpt1nLpYdWwSIVnjMQ7oUcbdf8zmmWp0xt8rbfHpxaORbVZnXxgEJw2nuBgTKTby-uXzj_6Tb_Krq3TlXQxD8bH7GIneNmH5xGmGDrnBjF8hLmpnq', rating: 4.9, distance: '1.2 km', isOpen: true },
    { id: 2, name: 'Circuit Surgeons', category: 'Tech', description: 'Specialized in laptop, smartphone and micro-electronics repair with warranty.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAG4TG9uqWMReIoQkCD8cMECbV95NPKAHdkqvjvOD8OGcTQBDr6YoKg9im1Edhp-3sWWIQH1iDm2ul0o1UkVjHTN3GNJWSNbu-kouNZFKmHS2qptK5NagBQKD_4UoxoLPonBNJxpExay3AmnlHkaKxGqmAcpXxbjErSh9o6eI5s2HmdihTekma-dLgjesODjF6jTdGx0iq9yopQq7RzS5-_-sRk_evbvG-olG_x_jltCE_HW8xLV-CgrroO1XI8879vFIHAKjla2eDy', rating: 4.7, distance: '3.8 km', isOpen: true }
  ];

  technicians = [
    { name: 'Marcus Chen', title: 'Master Electrician', rating: 5.0, reviews: 42, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZsq-XWTNPgwCnmuNumtaHjho5N0Vgk5WIig1Hoy33pZf0wgiGBoI5D5REoinu3-k_-eD0LZLjPcR7LSIvkqruu55Ty1rmJWU-DEHxeQ9CRZXATT2Nkg-Xs7z67VQuVvpwfrbKduOKMmNydg6gArB8kuciTi1rI385x3yzYIdjKz0rbexrm1FOjRFqeEAdtlP2sD4k5RsCYJqzW6JmJrgK_Hp6sPT956WO9LVz3v_xxxfQUuEopl2uylhd77c8xOBOfFzjchGc7Cwh', skills: ['Wiring', 'EV Stations', '+3 more'] },
    { name: 'Elena Rodriguez', title: 'Interior Decorator', rating: 4.8, reviews: 118, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdZYEaGZRJm6OQGztHjnEEdMX7RdlzkDj396Jm20yptWsaOUawDaRxxSv4HgeKkMKntP1WZwrHSDWvb4Ts0OMVGhBxlrW42R82zmaIgfdj_bDf0boeMu8J3zv1ShBpDBzfqKQxqC2uuGqe5ZwH30ISRzX_2AjsANqR8XsD-mWj04ho5dNK80SLetmrCt85RBLBdu-rtUjKWsqmpESIJRfO3qlOhDrEdiSti3j9NeVPWUc6jtfm3YniUrOC6bpm2tj99wnqf87UXVvr', skills: ['Color Theory', 'Minimalism', 'IKEA Hack'] }
  ];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      // In a real app, we would call an API here
    });
  }
}

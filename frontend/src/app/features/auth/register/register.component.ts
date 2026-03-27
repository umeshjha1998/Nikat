import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, RegisterRequest } from '../../../core/auth.service';
import { ApiService, CategoryDto } from '../../../core/api.service';
import { ThemeToggleComponent } from '../../../core/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ThemeToggleComponent],
  template: `
    <div class="split-auth">
      <!-- Left: Visual Side -->
      <aside class="auth-visual">
        <div class="v-content">
          <div class="v-badge">Local Economy 2.0</div>
          <h1>Empowering your local community, <span>one shop</span> at a time.</h1>
          <p>Join thousands of local businesses and service providers growing with Nikat.</p>
          
          <div class="stats-grid">
            <div class="stat">
              <span class="num">10k+</span>
              <span class="lab">Daily Users</span>
            </div>
            <div class="stat">
              <span class="num">500+</span>
              <span class="lab">Verified Shops</span>
            </div>
          </div>
        </div>
        <div class="v-blur-orb"></div>
      </aside>

      <!-- Right: Form Side -->
      <main class="auth-main">
        <header class="main-head">
          <a routerLink="/" class="brand">Nikat</a>
          <div class="head-actions" style="display: flex; align-items: center; gap: 1rem;">
            <app-theme-toggle></app-theme-toggle>
            <p style="margin: 0;">Have an account? <a routerLink="/login" class="link-prime">Sign In</a></p>
          </div>
        </header>

        <div class="form-scroll-wrap">
          <div class="form-container">
            <header class="step-label-wrap">
              <span class="step-pill">Step {{currentStep}} of {{isBusinessRole() ? 3 : 2}}</span>
              <h2>{{ getStepTitle() }}</h2>
              <p>{{ getStepSubtitle() }}</p>
            </header>

            <div *ngIf="errorMessage" class="alert-premium error">
              <span class="material-icons">error_outline</span>
              {{ errorMessage }}
            </div>

            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="premium-form">
              <!-- Step 1: Role Selection -->
              <div class="step-area" *ngIf="currentStep === 1">
                <div class="role-stack">
                  <div class="r-card-prime" 
                       [class.active]="registerForm.get('role')?.value === 'USER'" 
                       (click)="setRole('USER')">
                    <div class="r-icon user"><span class="material-icons">person</span></div>
                    <div class="r-text">
                      <h3>Regular User</h3>
                      <p>Browse nearby shops and services.</p>
                    </div>
                    <div class="r-check"><span class="material-icons">check_circle</span></div>
                  </div>

                  <div class="r-card-prime" 
                       [class.active]="registerForm.get('role')?.value === 'SHOP_OWNER'" 
                       (click)="setRole('SHOP_OWNER')">
                    <div class="r-icon shop"><span class="material-icons">storefront</span></div>
                    <div class="r-text">
                      <h3>Shop Owner</h3>
                      <p>Run your retail business digitally.</p>
                    </div>
                    <div class="r-check"><span class="material-icons">check_circle</span></div>
                  </div>

                  <div class="r-card-prime" 
                       [class.active]="registerForm.get('role')?.value === 'SERVICE_PROVIDER'" 
                       (click)="setRole('SERVICE_PROVIDER')">
                    <div class="r-icon craft"><span class="material-icons">construction</span></div>
                    <div class="r-text">
                      <h3>Service Provider</h3>
                      <p>Offer your professional skills.</p>
                    </div>
                    <div class="r-check"><span class="material-icons">check_circle</span></div>
                  </div>
                </div>

                <div class="actions-footer">
                  <button type="button" class="btn-prime-glow" (click)="nextStep()" [disabled]="!registerForm.get('role')?.value">
                    Continue Registration <span class="material-icons">arrow_forward</span>
                  </button>
                </div>
              </div>

              <!-- Step 2: Personal Details -->
              <div class="step-area" *ngIf="currentStep === 2">
                <div class="input-grid">
                  <div class="f-group half">
                    <label>First Name</label>
                    <input type="text" formControlName="firstName" placeholder="e.g. Alex">
                  </div>
                  <div class="f-group half">
                    <label>Last Name</label>
                    <input type="text" formControlName="lastName" placeholder="e.g. Rivera">
                  </div>
                </div>
                <div class="f-group">
                  <label>Email Address</label>
                  <input type="email" formControlName="email" placeholder="alex@example.com">
                </div>
                <div class="f-group">
                  <label>Phone Number</label>
                  <div class="tel-wrap">
                    <span class="prefix">+91</span>
                    <input type="tel" formControlName="phone" placeholder="98765 43210">
                  </div>
                </div>
                <div class="f-group">
                  <label>Secure Password</label>
                  <input type="password" formControlName="password" placeholder="Min 6 characters">
                </div>

                <div class="actions-footer split">
                  <button type="button" class="btn-ghost" (click)="prevStep()">Back</button>
                  <button type="button" class="btn-prime-glow flex-1" (click)="nextStep()" *ngIf="isBusinessRole()">
                    Next: Business Details
                  </button>
                  <button type="submit" class="btn-prime-glow flex-1" *ngIf="!isBusinessRole()" [disabled]="registerForm.invalid || isLoading">
                    {{ isLoading ? 'Creating Account...' : 'Finish Registration' }}
                  </button>
                </div>
              </div>

              <!-- Step 3: Business Details -->
              <div class="step-area" *ngIf="currentStep === 3">
                <div class="f-group">
                  <label>Business Name</label>
                  <input type="text" formControlName="businessName" placeholder="e.g. Green Valley Organic">
                </div>
                
                <div class="f-group">
                  <label>Business Category</label>
                  <div class="category-search-box">
                    <div class="search-input-wrap">
                      <span class="material-icons">search</span>
                      <input type="text" 
                             [placeholder]="'Search ' + (registerForm.get('role')?.value === 'SHOP_OWNER' ? 'Shops' : 'Services')"
                             (input)="filterCategories($event)"
                             #catSearch>
                    </div>
                    <div class="category-results custom-scroll">
                      <div class="cat-chip" 
                           *ngFor="let cat of filteredCategories" 
                           [class.active]="registerForm.get('categoryId')?.value === cat.id"
                           (click)="setCategory(cat.id)">
                        {{ cat.name }}
                        <span class="material-icons" *ngIf="registerForm.get('categoryId')?.value === cat.id">check</span>
                      </div>
                      <div *ngIf="filteredCategories.length === 0" class="no-results">
                        No matching categories found.
                      </div>
                    </div>
                  </div>
                </div>

                <div class="f-group">
                  <label>Operating Address</label>
                  <textarea rows="3" formControlName="businessAddress" placeholder="Street, landmark, floor..."></textarea>
                </div>

                <div class="actions-footer split">
                  <button type="button" class="btn-ghost" (click)="prevStep()">Back</button>
                  <button type="submit" class="btn-prime-glow flex-1" [disabled]="registerForm.invalid || isLoading">
                    {{ isLoading ? 'Submitting...' : 'Complete Setup' }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap');

    :host {
      font-family: 'Manrope', sans-serif;
    }

    .split-auth { display: flex; min-height: 100vh; background: var(--bg); overflow: hidden; }

    /* Visual Side */
    .auth-visual {
      flex: 1; position: relative; background: var(--header-bg); display: flex; align-items: center; padding: 5rem;
      border-right: 1px solid var(--glass-border);
    }
    .v-content { position: relative; z-index: 10; max-width: 500px; }
    .v-badge {
      display: inline-block; padding: 0.5rem 1rem; border-radius: 2rem; background: rgba(var(--primary-rgb), 0.1);
      color: var(--primary); font-weight: 800; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 2rem;
    }
    .auth-visual h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 3.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; color: var(--text-main); }
    .auth-visual h1 span { color: var(--primary); }
    .auth-visual p { font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 3rem; }
    
    .stats-grid { display: flex; gap: 3rem; }
    .stat { display: flex; flex-direction: column; }
    .stat .num { font-size: 2rem; font-weight: 800; color: var(--text-main); }
    .stat .lab { font-size: 0.85rem; color: var(--text-muted); font-weight: 600; }

    .v-blur-orb {
      position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(var(--primary-rgb),0.15), transparent 70%);
      top: 50%; left: 50%; transform: translate(-50%, -50%); filter: blur(80px);
    }

    /* Main Side */
    .auth-main { width: 600px; display: flex; flex-direction: column; background: var(--bg); }
    .main-head { height: 6rem; display: flex; align-items: center; justify-content: space-between; padding: 2rem 4rem; }
    .brand { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; color: var(--text-main); text-decoration: none; }
    .link-prime { color: var(--primary); text-decoration: none; font-weight: 700; margin-left: 0.5rem; }

    .form-scroll-wrap { flex: 1; overflow-y: auto; display: flex; justify-content: center; padding: 2rem 4rem 6rem 4rem; }
    .form-container { width: 100%; max-width: 440px; }

    .step-pill { font-size: 0.75rem; font-weight: 800; color: var(--primary); text-transform: uppercase; margin-bottom: 0.75rem; display: block; }
    .step-label-wrap { margin-bottom: 3rem; }
    .step-label-wrap h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-main); }
    .step-label-wrap p { color: var(--text-muted); font-size: 1rem; }

    /* Role Cards */
    .role-stack { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 3rem; }
    .r-card-prime {
      display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem; border-radius: 1.25rem;
      background: var(--surface-container); border: 1px solid var(--glass-border); cursor: pointer; transition: 0.33s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .r-card-prime:hover { border-color: var(--primary); transform: translateX(8px); }
    .r-card-prime.active { border-color: var(--primary); background: rgba(var(--primary-rgb), 0.05); }

    .r-icon {
      width: 50px; height: 50px; border-radius: 1rem; display: flex; align-items: center; justify-content: center;
      background: rgba(var(--text-main-rgb), 0.05); color: var(--text-muted); transition: 0.3s;
    }
    .r-card-prime.active .r-icon { background: var(--primary); color: #fff; box-shadow: 0 8px 16px var(--primary-glow); }
    .r-text h3 { font-size: 1.1rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.25rem; }
    .r-text p { font-size: 0.85rem; color: var(--text-muted); }
    .r-check { margin-left: auto; color: var(--primary); opacity: 0; transform: scale(0.5); transition: 0.3s; }
    .r-card-prime.active .r-check { opacity: 1; transform: scale(1); }

    /* Category Search */
    .category-search-box {
      border: 1px solid var(--glass-border); border-radius: 1rem; background: var(--glass); overflow: hidden;
    }
    .search-input-wrap { display: flex; align-items: center; padding: 0.75rem 1rem; border-bottom: 1px solid var(--glass-border); gap: 0.75rem; }
    .search-input-wrap .material-icons { font-size: 1.2rem; color: var(--text-muted); }
    .search-input-wrap input { border: none !important; padding: 0; background: transparent !important; font-size: 0.9rem; }
    .category-results { max-height: 200px; overflow-y: auto; padding: 1rem; display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .cat-chip {
      padding: 0.5rem 1rem; border-radius: 2rem; background: var(--bg-surface); border: 1px solid var(--glass-border);
      font-size: 0.8rem; color: var(--text-muted); cursor: pointer; transition: 0.2s; display: flex; align-items: center; gap: 0.4rem;
    }
    .cat-chip:hover { border-color: var(--primary); color: var(--text-main); }
    .cat-chip.active { background: var(--primary); color: #fff; border-color: var(--primary); border-radius: 2rem; }
    .cat-chip .material-icons { font-size: 0.9rem; }
    .no-results { width: 100%; text-align: center; color: var(--text-muted); font-size: 0.85rem; padding: 1rem; }

    /* Inputs */
    .f-group { margin-bottom: 1.5rem; }
    .f-group label { display: block; font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.6rem; text-transform: uppercase; letter-spacing: 0.05em; }
    input, textarea {
      width: 100%; padding: 1rem 1.25rem; border-radius: 1rem; border: 1px solid var(--border-color);
      background: var(--glass); color: var(--text-main); font-family: inherit; font-size: 1rem; transition: 0.2s;
    }
    input:focus, textarea:focus { border-color: var(--primary); background: rgba(var(--text-main-rgb), 0.05); outline: none; }
    .input-grid { display: flex; gap: 1rem; }
    .tel-wrap { position: relative; display: flex; align-items: center; }
    .tel-wrap .prefix { position: absolute; left: 1.25rem; color: var(--text-muted); font-weight: 700; border-right: 1px solid var(--glass-border); padding-right: 0.75rem; }
    .tel-wrap input { padding-left: 3.8rem; }

    .actions-footer { margin-top: 2rem; }
    .actions-footer.split { display: flex; gap: 1rem; }
    .btn-prime-glow {
      background: var(--primary); color: #fff; border: none; padding: 1.1rem; border-radius: 1.25rem;
      font-weight: 800; font-size: 1rem; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%;
    }
    .btn-prime-glow:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 30px var(--primary-glow); }
    .btn-prime-glow:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-ghost { background: transparent; border: 1px solid var(--glass-border); color: var(--text-main); padding: 1.1rem 1.5rem; border-radius: 1.25rem; font-weight: 700; cursor: pointer; }

    .alert-premium { display: flex; align-items: center; gap: 0.75rem; padding: 1rem; border-radius: 1rem; margin-bottom: 2rem; font-size: 0.9rem; font-weight: 600; }
    .alert-premium.error { background: rgba(239, 68, 68, 0.1); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.2); }

    .custom-scroll::-webkit-scrollbar { width: 4px; }
    .custom-scroll::-webkit-scrollbar-thumb { background: var(--glass-border); border-radius: 10px; }

    @media (max-width: 1100px) {
      .auth-visual { display: none; }
      .auth-main { width: 100%; }
      .form-scroll-wrap { padding: 4rem 2rem; }
    }
  `]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  currentStep = 1;
  
  allCategories: CategoryDto[] = [];
  filteredCategories: CategoryDto[] = [];
  
  private apiService = inject(ApiService);
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  constructor() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER', Validators.required],
      businessName: [''],
      businessAddress: [''],
      categoryId: ['']
    });
  }

  ngOnInit() {
    this.apiService.getCategories().subscribe(cats => {
      this.allCategories = cats;
      this.syncCategories();
    });
  }

  syncCategories() {
    const role = this.registerForm.get('role')?.value;
    if (role === 'SHOP_OWNER') {
      this.filteredCategories = this.allCategories.filter(c => c.isShopCategory);
    } else if (role === 'SERVICE_PROVIDER') {
      this.filteredCategories = this.allCategories.filter(c => c.isServiceProviderCategory);
    } else {
      this.filteredCategories = [];
    }
  }

  filterCategories(event: any) {
    const query = event.target.value.toLowerCase();
    const role = this.registerForm.get('role')?.value;
    const base = role === 'SHOP_OWNER' 
      ? this.allCategories.filter(c => c.isShopCategory)
      : this.allCategories.filter(c => c.isServiceProviderCategory);
    
    this.filteredCategories = base.filter(c => c.name.toLowerCase().includes(query));
  }

  setRole(role: string) {
    this.registerForm.get('role')?.setValue(role);
    this.syncCategories();
    
    // Manage validators dynamically
    if (role === 'USER') {
      this.registerForm.get('businessName')?.clearValidators();
      this.registerForm.get('businessAddress')?.clearValidators();
      this.registerForm.get('categoryId')?.clearValidators();
    } else {
      this.registerForm.get('businessName')?.setValidators(Validators.required);
      this.registerForm.get('businessAddress')?.setValidators(Validators.required);
      this.registerForm.get('categoryId')?.setValidators(Validators.required);
    }
    this.registerForm.get('businessName')?.updateValueAndValidity();
    this.registerForm.get('businessAddress')?.updateValueAndValidity();
    this.registerForm.get('categoryId')?.updateValueAndValidity();
  }

  setCategory(catId: string) {
    this.registerForm.get('categoryId')?.setValue(catId);
  }

  isBusinessRole(): boolean {
    const role = this.registerForm.get('role')?.value;
    return role === 'SHOP_OWNER' || role === 'SERVICE_PROVIDER';
  }

  getStepTitle(): string {
    switch(this.currentStep) {
      case 1: return 'Who are you?';
      case 2: return 'Create Profile';
      case 3: return 'Business Context';
      default: return 'Join Nikat';
    }
  }

  getStepSubtitle(): string {
    switch(this.currentStep) {
      case 1: return 'Choose your journey in the local ecosystem.';
      case 2: return 'Basic info to get you verified.';
      case 3: return 'Tell us what you do, so users can find you.';
      default: return '';
    }
  }

  nextStep() {
    if (this.currentStep === 1 && !this.registerForm.get('role')?.value) return;
    if (this.currentStep === 2) {
      const controls = ['firstName', 'lastName', 'email', 'phone', 'password'];
      let valid = true;
      controls.forEach(c => {
         this.registerForm.get(c)?.markAsTouched();
         if (this.registerForm.get(c)?.invalid) valid = false;
      });
      if (!valid) return;
    }
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const data: RegisterRequest = this.registerForm.value;

      this.authService.register(data).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/verify-otp']);
        },
        error: (err: any) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Registration failed. Email/Phone might already exist.';
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
      this.errorMessage = 'Please complete all required fields.';
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, RegisterRequest } from '../../../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
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
          <p>Have an account? <a routerLink="/login" class="link-prime">Sign In</a></p>
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
                    <div class="r-icon craft"><span class="material-icons">settings</span></div>
                    <div class="r-text">
                      <h3>Service Provider</h3>
                      <p>Offer your professional skills.</p>
                    </div>
                    <div class="r-check"><span class="material-icons">check_circle</span></div>
                  </div>
                </div>

                <div class="actions-footer">
                  <button type="button" class="btn-prime-glow" (click)="nextStep()" [disabled]="!registerForm.get('role')?.value">
                    Continue Navigation <span class="material-icons">arrow_forward</span>
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
                  <label>What’s the name of your business?</label>
                  <input type="text" placeholder="e.g. Green Valley Organic">
                </div>
                <div class="f-group">
                  <label>Operating Address</label>
                  <textarea rows="3" placeholder="Street, landmark, floor..."></textarea>
                </div>
                <div class="f-group">
                  <label>Identity Proof (Aadhar/GST/Trade License)</label>
                  <div class="dropzone-premium">
                    <span class="material-icons">cloud_upload</span>
                    <p>Click to upload document <span>(PDF, JPG max 5MB)</span></p>
                  </div>
                </div>

                <div class="actions-footer split">
                  <button type="button" class="btn-ghost" (click)="prevStep()">Back</button>
                  <button type="button" class="btn-prime-glow flex-1" (click)="onSubmit()" [disabled]="isLoading">
                    {{ isLoading ? 'Verifying...' : 'Submit & Join Nikat' }}
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
      --primary: #3b82f6;
      --prime-light: #60a5fa;
      --bg: #020410;
      --glass: rgba(255, 255, 255, 0.03);
      --glass-border: rgba(255, 255, 255, 0.1);
      --text-muted: #94a3b8;
      font-family: 'Manrope', sans-serif;
    }

    .split-auth { display: flex; min-height: 100vh; background: var(--bg); overflow: hidden; }

    /* Visual Side */
    .auth-visual {
      flex: 1; position: relative; background: #05081d; display: flex; align-items: center; padding: 5rem;
      border-right: 1px solid var(--glass-border);
    }
    .v-content { position: relative; z-index: 10; max-width: 500px; }
    .v-badge {
      display: inline-block; padding: 0.5rem 1rem; border-radius: 2rem; background: rgba(59, 130, 246, 0.1);
      color: var(--prime-light); font-weight: 800; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 2rem;
    }
    .auth-visual h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 3.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; color: #fff; }
    .auth-visual h1 span { color: var(--prime-light); }
    .auth-visual p { font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 3rem; }
    
    .stats-grid { display: flex; gap: 3rem; }
    .stat { display: flex; flex-direction: column; }
    .stat .num { font-size: 2rem; font-weight: 800; color: #fff; }
    .stat .lab { font-size: 0.85rem; color: var(--text-muted); font-weight: 600; }

    .v-blur-orb {
      position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%);
      top: 50%; left: 50%; transform: translate(-50%, -50%); filter: blur(80px);
    }

    /* Main Side */
    .auth-main { width: 600px; display: flex; flex-direction: column; background: #020410; }
    .main-head { height: 6rem; display: flex; align-items: center; justify-content: space-between; padding: 2rem 4rem; }
    .brand { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; color: #fff; text-decoration: none; }
    .link-prime { color: var(--primary); text-decoration: none; font-weight: 700; margin-left: 0.5rem; }

    .form-scroll-wrap { flex: 1; overflow-y: auto; display: flex; justify-content: center; padding: 2rem 4rem 6rem 4rem; }
    .form-container { width: 100%; max-width: 440px; }

    .step-pill { font-size: 0.75rem; font-weight: 800; color: var(--primary); text-transform: uppercase; margin-bottom: 0.75rem; display: block; }
    .step-label-wrap { margin-bottom: 3rem; }
    .step-label-wrap h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; color: #fff; }
    .step-label-wrap p { color: var(--text-muted); font-size: 1rem; }

    /* Role Cards */
    .role-stack { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 3rem; }
    .r-card-prime {
      display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem; border-radius: 1.25rem;
      background: var(--glass); border: 1px solid var(--glass-border); cursor: pointer; transition: 0.33s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .r-card-prime:hover { border-color: var(--primary); transform: translateX(8px); }
    .r-card-prime.active { border-color: var(--primary); background: rgba(59,130,246,0.05); }

    .r-icon {
      width: 50px; height: 50px; border-radius: 1rem; display: flex; align-items: center; justify-content: center;
      background: rgba(255,255,255,0.05); color: var(--text-muted); transition: 0.3s;
    }
    .r-card-prime.active .r-icon { background: var(--primary); color: #fff; box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3); }
    .r-text h3 { font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 0.25rem; }
    .r-text p { font-size: 0.85rem; color: var(--text-muted); }
    .r-check { margin-left: auto; color: var(--primary); opacity: 0; transform: scale(0.5); transition: 0.3s; }
    .r-card-prime.active .r-check { opacity: 1; transform: scale(1); }

    /* Inputs */
    .f-group { margin-bottom: 1.5rem; }
    .f-group label { display: block; font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.6rem; text-transform: uppercase; letter-spacing: 0.05em; }
    input, textarea {
      width: 100%; padding: 1rem 1.25rem; border-radius: 1rem; border: 1px solid var(--glass-border);
      background: rgba(255,255,255,0.02); color: #fff; font-family: inherit; font-size: 1rem; transition: 0.2s;
    }
    input:focus { border-color: var(--primary); background: rgba(255,255,255,0.05); outline: none; }
    .input-grid { display: flex; gap: 1rem; }
    .tel-wrap { position: relative; display: flex; align-items: center; }
    .tel-wrap .prefix { position: absolute; left: 1.25rem; color: var(--text-muted); font-weight: 700; border-right: 1px solid var(--glass-border); padding-right: 0.75rem; }
    .tel-wrap input { padding-left: 3.8rem; }

    /* Dropzone */
    .dropzone-premium { border: 2px dashed var(--glass-border); border-radius: 1rem; padding: 2rem; text-align: center; color: var(--text-muted); transition: 0.3s; }
    .dropzone-premium:hover { border-color: var(--primary); color: #fff; }
    .dropzone-premium .material-icons { font-size: 2.5rem; margin-bottom: 0.5rem; }
    .dropzone-premium p span { font-size: 0.75rem; display: block; opacity: 0.6; }

    /* Buttons */
    .actions-footer { margin-top: 1rem; }
    .actions-footer.split { display: flex; gap: 1rem; }
    .btn-prime-glow {
      background: var(--primary); color: #fff; border: none; padding: 1.1rem; border-radius: 1.25rem;
      font-weight: 800; font-size: 1rem; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%;
    }
    .btn-prime-glow:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4); }
    .btn-prime-glow:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-ghost { background: transparent; border: 1px solid var(--glass-border); color: #fff; padding: 1.1rem 1.5rem; border-radius: 1.25rem; font-weight: 700; cursor: pointer; }
    .btn-ghost:hover { background: rgba(255,255,255,0.05); }

    .alert-premium { display: flex; align-items: center; gap: 0.75rem; padding: 1rem; border-radius: 1rem; margin-bottom: 2rem; font-size: 0.9rem; font-weight: 600; }
    .alert-premium.error { background: rgba(239, 68, 68, 0.1); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.2); }

    @media (max-width: 1100px) {
      .auth-visual { display: none; }
      .auth-main { width: 100%; }
      .form-scroll-wrap { padding: 4rem 2rem; }
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  currentStep = 1;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER', Validators.required]
    });
  }

  setRole(role: string) {
    this.registerForm.get('role')?.setValue(role);
  }

  isBusinessRole(): boolean {
    const role = this.registerForm.get('role')?.value;
    return role === 'SHOP_OWNER' || role === 'SERVICE_PROVIDER';
  }

  getStepTitle(): string {
    switch(this.currentStep) {
      case 1: return 'Who are you?';
      case 2: return 'Create Profile';
      case 3: return 'Business Pass';
      default: return 'Join the Ecosystem';
    }
  }

  getStepSubtitle(): string {
    switch(this.currentStep) {
      case 1: return 'Choose your journey in the Nikat ecosystem.';
      case 2: return 'Basic info to get you started.';
      case 3: return 'Just a few details to verify your business.';
      default: return '';
    }
  }

  nextStep() {
    if (this.currentStep === 1 && !this.registerForm.get('role')?.value) return;
    if (this.currentStep === 2 && (!this.isBusinessRole() || this.registerForm.invalid)) {
       if(this.registerForm.invalid) {
         this.registerForm.markAllAsTouched();
         return;
       }
    }
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

  onSubmit() {
    if (this.currentStep === 2 && this.isBusinessRole()) {
      this.nextStep();
      return;
    }

    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';
      const data: RegisterRequest = this.registerForm.value;

      this.authService.register(data).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Account created successfully! Redirecting to verification...';
          setTimeout(() => this.router.navigate(['/verify-otp']), 2000);
        },
        error: (err: any) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}

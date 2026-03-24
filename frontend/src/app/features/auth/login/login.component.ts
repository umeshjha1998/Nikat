import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, AuthRequest } from '../../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="split-auth">
      <!-- Left: Visual Side (Matching Register) -->
      <aside class="auth-visual">
        <div class="v-content">
          <div class="v-badge">Welcome back</div>
          <h1>Connect with your <span>neighborhood</span> again.</h1>
          <p>Sign in to access your local orders, bookings, and community updates.</p>
          
          <div class="visual-features">
            <div class="v-feat">
              <span class="material-icons">verified_user</span>
              <span>Secure, encrypted authentication</span>
            </div>
            <div class="v-feat">
              <span class="material-icons">bolt</span>
              <span>Instant access to saved shops</span>
            </div>
          </div>
        </div>
        <div class="v-blur-orb"></div>
      </aside>

      <!-- Right: Form Side -->
      <main class="auth-main">
        <header class="main-head">
          <a routerLink="/" class="brand">Nikat</a>
          <p>New here? <a routerLink="/register" class="link-prime">Create Account</a></p>
        </header>

        <div class="form-scroll-wrap">
          <div class="form-container">
            <header class="auth-title-wrap">
              <h2>Sign In</h2>
              <p>Enter your credentials to manage your local life.</p>
            </header>

            <div *ngIf="errorMessage" class="alert-premium error">
              <span class="material-icons">error_outline</span>
              {{ errorMessage }}
            </div>

            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="premium-form">
              <div class="f-group">
                <label>Email or Phone Number</label>
                <div class="input-icon-wrap">
                  <span class="material-icons">alternate_email</span>
                  <input 
                    type="text" 
                    formControlName="emailOrPhone" 
                    placeholder="Enter email or phone"
                    [class.error]="loginForm.get('emailOrPhone')?.invalid && loginForm.get('emailOrPhone')?.touched"
                  >
                </div>
              </div>

              <div class="f-group">
                <div class="label-row">
                  <label>Password</label>
                  <a routerLink="/forgot-password" class="forgot-link">Forgot password?</a>
                </div>
                <div class="input-icon-wrap">
                  <span class="material-icons">lock_open</span>
                  <input 
                    type="password" 
                    formControlName="password" 
                    placeholder="Enter secure password"
                    [class.error]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
                  >
                </div>
              </div>

              <div class="actions-footer">
                <button type="submit" class="btn-prime-glow" [disabled]="loginForm.invalid || isLoading">
                  <span *ngIf="!isLoading">Secure Sign In</span>
                  <span *ngIf="isLoading" class="loader-dots">Authenticating</span>
                  <span class="material-icons" *ngIf="!isLoading">login</span>
                </button>
              </div>

              <div class="social-separator">
                <span>OR SIGN IN WITH</span>
              </div>

              <div class="social-grid">
                <button type="button" class="btn-social">
                  <img src="https://www.google.com/favicon.ico" alt="Google">
                  Google
                </button>
                <button type="button" class="btn-social">
                  <img src="https://www.facebook.com/favicon.ico" alt="Facebook">
                  Facebook
                </button>
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
    .v-content { position: relative; z-index: 10; max-width: 480px; }
    .v-badge {
      display: inline-block; padding: 0.5rem 1rem; border-radius: 2rem; background: rgba(59, 130, 246, 0.1);
      color: var(--prime-light); font-weight: 800; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 2rem;
    }
    .auth-visual h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 3.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; color: #fff; }
    .auth-visual h1 span { color: var(--prime-light); }
    .auth-visual p { font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 3rem; }
    
    .visual-features { display: flex; flex-direction: column; gap: 1rem; }
    .v-feat { display: flex; align-items: center; gap: 0.75rem; color: #fff; font-weight: 600; font-size: 0.95rem; }
    .v-feat .material-icons { color: var(--prime-light); }

    .v-blur-orb {
      position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%);
      top: 50%; left: 50%; transform: translate(-50%, -50%); filter: blur(80px);
    }

    /* Main Side */
    .auth-main { width: 600px; display: flex; flex-direction: column; background: #020410; }
    .main-head { height: 6rem; display: flex; align-items: center; justify-content: space-between; padding: 2rem 4rem; }
    .brand { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; color: #fff; text-decoration: none; }
    .link-prime { color: var(--primary); text-decoration: none; font-weight: 700; margin-left: 0.5rem; }

    .form-scroll-wrap { flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem 4rem; }
    .form-container { width: 100%; max-width: 400px; }

    .auth-title-wrap { margin-bottom: 2.5rem; }
    .auth-title-wrap h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.25rem; font-weight: 800; margin-bottom: 0.5rem; color: #fff; }
    .auth-title-wrap p { color: var(--text-muted); font-size: 1rem; }

    /* Inputs */
    .f-group { margin-bottom: 1.5rem; }
    .label-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem; }
    .f-group label { display: block; font-size: 0.85rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
    .forgot-link { font-size: 0.8rem; font-weight: 700; color: var(--primary); text-decoration: none; }
    
    .input-icon-wrap { position: relative; display: flex; align-items: center; }
    .input-icon-wrap .material-icons { position: absolute; left: 1.25rem; color: var(--text-muted); font-size: 1.25rem; }
    input {
      width: 100%; padding: 1rem 1.25rem 1rem 3.5rem; border-radius: 1rem; border: 1px solid var(--glass-border);
      background: rgba(255,255,255,0.02); color: #fff; font-family: inherit; font-size: 1rem; transition: 0.2s;
    }
    input:focus { border-color: var(--primary); background: rgba(255,255,255,0.05); outline: none; }
    input.error { border-color: #f87171; }

    /* Actions */
    .actions-footer { margin-top: 2rem; }
    .btn-prime-glow {
      background: var(--primary); color: #fff; border: none; padding: 1.1rem; border-radius: 1.25rem;
      font-weight: 800; font-size: 1rem; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 0.75rem; width: 100%;
    }
    .btn-prime-glow:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4); }
    .btn-prime-glow:disabled { opacity: 0.5; cursor: not-allowed; }

    /* Socials */
    .social-separator { display: flex; align-items: center; gap: 1rem; margin: 2rem 0; color: var(--text-muted); font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em; }
    .social-separator::before, .social-separator::after { content: ''; flex: 1; height: 1px; background: var(--glass-border); }
    
    .social-grid { display: flex; gap: 1rem; }
    .btn-social {
      flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.75rem; padding: 0.85rem;
      background: var(--glass); border: 1px solid var(--glass-border); border-radius: 1rem; color: #fff;
      font-weight: 700; font-size: 0.9rem; cursor: pointer; transition: 0.2s;
    }
    .btn-social:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); }
    .btn-social img { width: 18px; height: 18px; }

    .alert-premium { display: flex; align-items: center; gap: 0.75rem; padding: 1rem; border-radius: 1rem; margin-bottom: 2rem; font-size: 0.9rem; font-weight: 600; }
    .alert-premium.error { background: rgba(239, 68, 68, 0.1); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.2); }

    .loader-dots::after { content: '...'; animation: d 1.5s infinite; }
    @keyframes d { 0% { content: '.'; } 33% { content: '..'; } 66% { content: '...'; } }

    @media (max-width: 1100px) {
      .auth-visual { display: none; }
      .auth-main { width: 100%; }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      emailOrPhone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const data: AuthRequest = this.loginForm.value;

      this.authService.login(data).subscribe({
        next: () => {
          this.isLoading = false;
          const user = this.authService.currentUser;
          if (user?.role === 'ADMIN') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error: (err: any) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Invalid credentials. Please try again.';
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

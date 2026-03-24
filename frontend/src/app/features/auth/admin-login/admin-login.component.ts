import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="admin-auth-page">
      <div class="glass-login-container">
        <!-- Brand Header -->
        <header class="admin-brand-head">
          <a routerLink="/" class="logo-text">Nikat</a>
          <div class="portal-tag">
            <span class="material-icons">security</span>
            Admin Access
          </div>
        </header>

        <!-- Main Form -->
        <div class="login-card-inner">
          <div class="head-text">
            <h1>Platform Control</h1>
            <p>Authorized personnel only. Please sign in to manage the ecosystem.</p>
          </div>

          <form (submit)="onLogin($event)" class="admin-form-prime">
            <div class="f-group">
              <label>Administrator Email</label>
              <div class="input-prime-wrap">
                <span class="material-icons">admin_panel_settings</span>
                <input type="email" placeholder="admin@nikat.com" [(ngModel)]="email" name="email" required>
              </div>
            </div>

            <div class="f-group">
              <label>Security Key</label>
              <div class="input-prime-wrap">
                <span class="material-icons">vpn_key</span>
                <input type="password" placeholder="••••••••" [(ngModel)]="password" name="password" required>
              </div>
            </div>

            <div class="error-premium-msg" *ngIf="error">
              <span class="material-icons">gpp_maybe</span>
              {{error}}
            </div>

            <button type="submit" class="btn-royal" [disabled]="loading">
              <span *ngIf="!loading">Initialize Session</span>
              <span *ngIf="loading" class="loader-dots">Verifying</span>
              <span class="material-icons" *ngIf="!loading">arrow_forward</span>
            </button>
          </form>

          <footer class="admin-footer-links">
            <a routerLink="/login" class="back-link">
              <span class="material-icons">west</span>
              Return to Public Portal
            </a>
          </footer>
        </div>
      </div>
      
      <!-- Background Elements -->
      <div class="ambient-glow golden"></div>
      <div class="ambient-glow blue"></div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Manrope:wght@500;600;700&display=swap');

    :host {
      --gold: #f59e0b;
      --gold-dark: #b45309;
      --bg: var(--bg);
      --glass: rgba(255, 255, 255, 0.02);
      --glass-border: rgba(255, 255, 255, 0.08);
      font-family: 'Manrope', sans-serif;
    }

    .admin-auth-page {
      min-height: 100vh; background: var(--bg); display: flex; align-items: center; justify-content: center;
      padding: 2rem; position: relative; overflow: hidden;
    }

    .glass-login-container {
      width: 100%; max-width: 480px; position: relative; z-index: 20;
      background: var(--card-bg); backdrop-filter: blur(24px);
      border-radius: 2.5rem; border: 1px solid var(--glass-border); padding: 3.5rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }

    .admin-brand-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 3rem; }
    .logo-text {
      font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; color: var(--text-main); text-decoration: none;
      background: linear-gradient(135deg, var(--text-main), var(--text-muted)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .portal-tag {
      display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 2rem;
      background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.2);
      color: var(--gold); font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;
    }
    .portal-tag .material-icons { font-size: 1rem; }

    .head-text { margin-bottom: 2.5rem; }
    .head-text h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.25rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.75rem; }
    .head-text p { color: var(--text-muted); font-size: 1rem; line-height: 1.6; }

    .admin-form-prime { display: flex; flex-direction: column; gap: 1.5rem; }
    .f-group label { display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.6rem; text-transform: uppercase; letter-spacing: 0.05em; }
    
    .input-prime-wrap { position: relative; display: flex; align-items: center; }
    .input-prime-wrap .material-icons { position: absolute; left: 1.25rem; color: var(--text-muted); font-size: 1.25rem; }
    .input-prime-wrap input {
      width: 100%; padding: 1.1rem 1.25rem 1.1rem 3.5rem; border-radius: 1.25rem;
      background: rgba(0, 0, 0, 0.05); border: 1px solid var(--glass-border);
      color: var(--text-main); font-size: 1rem; transition: 0.2s; outline: none;
    }
    .input-prime-wrap input:focus { border-color: var(--gold); background: rgba(0,0,0,0.1); }

    .error-premium-msg {
      background: rgba(239, 68, 68, 0.1); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.2);
      padding: 1rem; border-radius: 1.25rem; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.75rem;
    }

    .btn-royal {
      margin-top: 1rem; background: linear-gradient(135deg, var(--gold), #d97706); color: #451a03;
      border: none; padding: 1.25rem; border-radius: 1.25rem; font-weight: 800; font-size: 1rem;
      cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 0.75rem;
    }
    .btn-royal:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(245, 158, 11, 0.3); }
    .btn-royal:disabled { opacity: 0.5; cursor: not-allowed; }

    .admin-footer-links { margin-top: 2.5rem; text-align: center; }
    .back-link {
      display: inline-flex; align-items: center; gap: 0.5rem; color: var(--text-muted); text-decoration: none;
      font-size: 0.875rem; font-weight: 600; transition: 0.2s;
    }
    .back-link:hover { color: var(--text-main); }

    .ambient-glow { position: absolute; width: 600px; height: 600px; filter: blur(120px); border-radius: 50%; z-index: 10; opacity: 0.4; }
    .ambient-glow.golden { top: -200px; left: -200px; background: radial-gradient(circle, var(--gold), transparent 70%); }
    .ambient-glow.blue { bottom: -200px; right: -200px; background: radial-gradient(circle, #3b82f6, transparent 70%); }

    .loader-dots::after { content: '...'; animation: d 1.5s infinite; }
    @keyframes d { 0% { content: '.'; } 33% { content: '..'; } 66% { content: '...'; } }
  `]
})
export class AdminLoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(e: Event) {
    e.preventDefault();
    this.loading = true;
    this.error = '';

    // Hardcoded logic for testing as requested
    if (this.email === 'admin' && this.password === 'admin') {
      setTimeout(() => {
        const dummyUser = {
          id: 'admin-1',
          firstName: 'System',
          lastName: 'Administrator',
          email: 'admin@nikat.com',
          phone: '0000000000',
          role: 'ADMIN',
          isShopOwner: false,
          isServiceProvider: false,
          status: 'ACTIVE'
        };
        this.authService.setSession('mock-admin-session-jwt', dummyUser);

        // Use timeout to simulate login delay/process
        this.loading = false;
        this.router.navigate(['/admin']);
      }, 1000);
    } else {
      setTimeout(() => {
        this.loading = false;
        this.error = 'Invalid admin credentials. Please try again';
      }, 800);
    }
  }
}

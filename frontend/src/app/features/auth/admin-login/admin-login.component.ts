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
    <div class="auth-page admin-login">
      <div class="auth-card">
        <div class="auth-brand"><a routerLink="/" class="logo">Nikat</a></div>
        <div class="admin-badge"><span class="material-icons">admin_panel_settings</span> Admin Portal</div>
        <div class="auth-header">
          <h1>Admin Login</h1>
          <p>Manage your platform, listings, and community.</p>
        </div>
        <form (submit)="onLogin($event)">
          <div class="form-group">
            <label>Admin Email</label>
            <div class="input-wrapper">
              <span class="material-icons">badge</span>
              <input type="email" placeholder="admin@nikat.com" [(ngModel)]="email" name="email" required>
            </div>
          </div>
          <div class="form-group">
            <label>Password</label>
            <div class="input-wrapper">
              <span class="material-icons">lock</span>
              <input type="password" placeholder="Enter admin password" [(ngModel)]="password" name="password" required>
            </div>
          </div>
          <div class="error-msg" *ngIf="error">{{error}}</div>
          <button type="submit" class="btn-glow full-width" [disabled]="loading">
            {{loading ? 'Authenticating...' : 'Sign In as Admin'}}
          </button>
        </form>
        <div class="auth-footer">
          <a routerLink="/login"><span class="material-icons">arrow_back</span> Back to User Login</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page { min-height: 100vh; background: #05092f; display: flex; align-items: center; justify-content: center; padding: 2rem; }
    .admin-login { background: linear-gradient(135deg, #05092f 0%, #0a1040 50%, #05092f 100%); }
    .auth-card { max-width: 440px; width: 100%; background: #080e38; border-radius: 1.5rem; padding: 3rem; border: 1px solid rgba(255,179,71,0.15); }
    .auth-brand { text-align: center; margin-bottom: 1.5rem; }
    .logo { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 800; background: linear-gradient(135deg, #5eb4ff, #2aa7ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-decoration: none; }
    .admin-badge {
      display: flex; align-items: center; justify-content: center; gap: 0.5rem;
      background: rgba(255,179,71,0.1); border: 1px solid rgba(255,179,71,0.2);
      color: #ffb347; padding: 0.5rem 1rem; border-radius: 2rem;
      font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
      margin-bottom: 2rem; width: fit-content; margin-left: auto; margin-right: auto;
    }
    .admin-badge .material-icons { font-size: 1.1rem; }
    .auth-header { text-align: center; margin-bottom: 2rem; }
    .auth-header h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.75rem; font-weight: 700; color: #e2e3ff; margin-bottom: 0.5rem; }
    .auth-header p { color: #a3a8d5; font-size: 0.95rem; }
    .form-group { margin-bottom: 1.25rem; }
    .form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: #a3a8d5; margin-bottom: 0.5rem; }
    .input-wrapper { display: flex; align-items: center; background: #0e1442; border: 1px solid #40456c; border-radius: 0.75rem; padding: 0 1rem; }
    .input-wrapper:focus-within { border-color: #ffb347; }
    .input-wrapper .material-icons { color: #6e739d; font-size: 1.25rem; margin-right: 0.75rem; }
    .input-wrapper input { flex: 1; background: transparent; border: none; color: #e2e3ff; padding: 0.85rem 0; font-size: 0.95rem; outline: none; font-family: 'Manrope', sans-serif; }
    .error-msg { background: rgba(255,107,107,0.1); border: 1px solid rgba(255,107,107,0.2); color: #ff6b6b; padding: 0.75rem 1rem; border-radius: 0.75rem; font-size: 0.85rem; margin-bottom: 1.25rem; text-align: center; }
    .btn-glow { background: linear-gradient(135deg, #ffb347, #ff9500); border: none; color: #3d2000; font-weight: 700; padding: 0.85rem 2rem; border-radius: 2rem; cursor: pointer; font-size: 0.95rem; transition: all 0.2s; }
    .btn-glow:hover:not(:disabled) { box-shadow: 0 6px 20px rgba(255,179,71,0.4); transform: translateY(-2px); }
    .btn-glow:disabled { opacity: 0.5; cursor: not-allowed; }
    .full-width { width: 100%; }
    .auth-footer { text-align: center; margin-top: 2rem; }
    .auth-footer a { color: #5eb4ff; text-decoration: none; font-size: 0.875rem; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem; }
    .auth-footer a .material-icons { font-size: 1rem; }
  `]
})
export class AdminLoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(e: Event) {
    e.preventDefault();
    this.loading = true;
    this.error = '';
    this.authService.login({ emailOrPhone: this.email, password: this.password }).subscribe({
      next: () => { this.loading = false; this.router.navigate(['/admin']); },
      error: () => { this.loading = false; this.error = 'Invalid admin credentials. Please try again.'; }
    });
  }
}

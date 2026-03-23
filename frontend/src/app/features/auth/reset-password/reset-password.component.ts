import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-brand"><a routerLink="/" class="logo">Nikat</a></div>
        <div class="auth-header">
          <div class="icon-circle"><span class="material-icons">vpn_key</span></div>
          <h1>Set New Password</h1>
          <p>Your new password must be different from previously used passwords.</p>
        </div>
        <form (submit)="onSubmit($event)" *ngIf="!success">
          <div class="form-group">
            <label>New Password</label>
            <div class="input-wrapper">
              <span class="material-icons">lock</span>
              <input type="password" placeholder="Enter new password" required>
            </div>
          </div>
          <div class="form-group">
            <label>Confirm Password</label>
            <div class="input-wrapper">
              <span class="material-icons">lock</span>
              <input type="password" placeholder="Confirm new password" required>
            </div>
          </div>
          <div class="password-rules">
            <div class="rule"><span class="material-icons check">check_circle</span> At least 8 characters</div>
            <div class="rule"><span class="material-icons">radio_button_unchecked</span> One uppercase letter</div>
            <div class="rule"><span class="material-icons">radio_button_unchecked</span> One number or symbol</div>
          </div>
          <button type="submit" class="btn-glow full-width">Reset Password</button>
        </form>
        <div class="success-state" *ngIf="success">
          <div class="success-icon"><span class="material-icons">check_circle</span></div>
          <h2>Password Reset!</h2>
          <p>Your password has been successfully reset. You can now log in with your new password.</p>
          <a routerLink="/login" class="btn-glow full-width">Go to Login</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page { min-height: 100vh; background: #05092f; display: flex; align-items: center; justify-content: center; padding: 2rem; }
    .auth-card { max-width: 440px; width: 100%; background: #080e38; border-radius: 1.5rem; padding: 3rem; border: 1px solid rgba(255,255,255,0.05); }
    .auth-brand { text-align: center; margin-bottom: 2rem; }
    .logo { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 800; background: linear-gradient(135deg, #5eb4ff, #2aa7ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-decoration: none; }
    .auth-header { text-align: center; margin-bottom: 2rem; }
    .icon-circle { width: 64px; height: 64px; border-radius: 50%; background: rgba(94,180,255,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; }
    .icon-circle .material-icons { font-size: 2rem; color: #5eb4ff; }
    .auth-header h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.75rem; font-weight: 700; color: #e2e3ff; margin-bottom: 0.5rem; }
    .auth-header p { color: #a3a8d5; font-size: 0.95rem; }
    .form-group { margin-bottom: 1.25rem; }
    .form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: #a3a8d5; margin-bottom: 0.5rem; }
    .input-wrapper { display: flex; align-items: center; background: #0e1442; border: 1px solid #40456c; border-radius: 0.75rem; padding: 0 1rem; }
    .input-wrapper:focus-within { border-color: #5eb4ff; }
    .input-wrapper .material-icons { color: #6e739d; font-size: 1.25rem; margin-right: 0.75rem; }
    .input-wrapper input { flex: 1; background: transparent; border: none; color: #e2e3ff; padding: 0.85rem 0; font-size: 0.95rem; outline: none; font-family: 'Manrope', sans-serif; }
    .password-rules { margin-bottom: 1.5rem; }
    .rule { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: #6e739d; margin-bottom: 0.4rem; }
    .rule .material-icons { font-size: 1rem; }
    .rule .check { color: #6bfe9c; }
    .btn-glow { background: linear-gradient(135deg, #5eb4ff, #2aa7ff); border: none; color: #003151; font-weight: 700; padding: 0.85rem 2rem; border-radius: 2rem; cursor: pointer; font-size: 0.95rem; transition: all 0.2s; text-decoration: none; display: inline-block; text-align: center; }
    .btn-glow:hover { box-shadow: 0 6px 20px rgba(94,180,255,0.4); }
    .full-width { width: 100%; }
    .success-state { text-align: center; }
    .success-icon { width: 72px; height: 72px; border-radius: 50%; background: rgba(107,254,156,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; }
    .success-icon .material-icons { font-size: 2.5rem; color: #6bfe9c; }
    .success-state h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; color: #e2e3ff; margin-bottom: 0.75rem; }
    .success-state p { color: #a3a8d5; font-size: 0.9rem; margin-bottom: 2rem; }
  `]
})
export class ResetPasswordComponent {
  success = false;
  onSubmit(e: Event) { e.preventDefault(); this.success = true; }
}

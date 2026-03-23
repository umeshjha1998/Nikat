import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-brand">
          <a routerLink="/" class="logo">Nikat</a>
        </div>

        <div class="auth-header">
          <div class="icon-circle"><span class="material-icons">lock_reset</span></div>
          <h1>Forgot Password?</h1>
          <p>No worries. Enter your email and we'll send you a reset link.</p>
        </div>

        <form (submit)="onSubmit($event)" *ngIf="!submitted">
          <div class="form-group">
            <label>Email Address</label>
            <div class="input-wrapper">
              <span class="material-icons">email</span>
              <input type="email" placeholder="you@example.com" required>
            </div>
          </div>
          <button type="submit" class="btn-glow full-width">Send Reset Link</button>
        </form>

        <div class="success-state" *ngIf="submitted">
          <div class="success-icon"><span class="material-icons">mark_email_read</span></div>
          <h2>Check your email</h2>
          <p>We've sent a password reset link to your email address. Please check your inbox.</p>
          <button class="btn-glow full-width" (click)="submitted = false">Resend Email</button>
        </div>

        <div class="auth-footer">
          <a routerLink="/login"><span class="material-icons">arrow_back</span> Back to Login</a>
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
    .auth-header p { color: #a3a8d5; font-size: 0.95rem; line-height: 1.5; }
    .form-group { margin-bottom: 1.5rem; }
    .form-group label { display: block; font-size: 0.85rem; font-weight: 600; color: #a3a8d5; margin-bottom: 0.5rem; }
    .input-wrapper { display: flex; align-items: center; background: #0e1442; border: 1px solid #40456c; border-radius: 0.75rem; padding: 0 1rem; }
    .input-wrapper:focus-within { border-color: #5eb4ff; }
    .input-wrapper .material-icons { color: #6e739d; font-size: 1.25rem; margin-right: 0.75rem; }
    .input-wrapper input { flex: 1; background: transparent; border: none; color: #e2e3ff; padding: 0.85rem 0; font-size: 0.95rem; outline: none; font-family: 'Manrope', sans-serif; }
    .btn-glow { background: linear-gradient(135deg, #5eb4ff, #2aa7ff); border: none; color: #003151; font-weight: 700; padding: 0.85rem 2rem; border-radius: 2rem; cursor: pointer; font-size: 0.95rem; transition: all 0.2s; }
    .btn-glow:hover { box-shadow: 0 6px 20px rgba(94,180,255,0.4); transform: translateY(-2px); }
    .full-width { width: 100%; }
    .success-state { text-align: center; }
    .success-icon { width: 72px; height: 72px; border-radius: 50%; background: rgba(107,254,156,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; }
    .success-icon .material-icons { font-size: 2.5rem; color: #6bfe9c; }
    .success-state h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; color: #e2e3ff; margin-bottom: 0.75rem; }
    .success-state p { color: #a3a8d5; font-size: 0.9rem; margin-bottom: 2rem; line-height: 1.6; }
    .auth-footer { text-align: center; margin-top: 2rem; }
    .auth-footer a { color: #5eb4ff; text-decoration: none; font-size: 0.875rem; font-weight: 600; display: inline-flex; align-items: center; gap: 0.25rem; }
    .auth-footer a .material-icons { font-size: 1rem; }
  `]
})
export class ForgotPasswordComponent {
  submitted = false;
  onSubmit(e: Event) { e.preventDefault(); this.submitted = true; }
}

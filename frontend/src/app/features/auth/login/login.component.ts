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
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <span class="brand-logo">Nikat</span>
          <h1>Welcome back</h1>
          <p>Sign in to your Nikat account</p>
        </div>

        <div *ngIf="errorMessage" class="error-banner">
          <span class="material-symbols-outlined">error</span>
          {{ errorMessage }}
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="auth-form">
          <div class="form-group">
            <label for="emailOrPhone">Email or Phone</label>
            <input
              type="text"
              id="emailOrPhone"
              formControlName="emailOrPhone"
              placeholder="Enter your email or phone"
              [class.error]="loginForm.get('emailOrPhone')?.invalid && loginForm.get('emailOrPhone')?.touched"
            >
          </div>

          <div class="form-group">
            <div class="password-header">
              <label for="password">Password</label>
              <a routerLink="/forgot-password" class="forgot-link">Forgot password?</a>
            </div>
            <input
              type="password"
              id="password"
              formControlName="password"
              placeholder="Enter your password"
              [class.error]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched"
            >
          </div>

          <button type="submit" class="btn btn-primary btn-block glow-effect" [disabled]="loginForm.invalid || isLoading">
            {{ isLoading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <div class="auth-footer">
          <p>Don't have an account? <a routerLink="/register">Create one</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex; justify-content: center; align-items: center;
      min-height: 100vh; background: linear-gradient(135deg, #05092f 0%, #0e1442 100%); padding: 1rem;
    }
    .auth-card {
      background: rgba(24, 32, 86, 0.6); backdrop-filter: blur(20px);
      border-radius: 1.5rem; padding: 2.5rem; width: 100%; max-width: 440px;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4); border: 1px solid rgba(110, 115, 157, 0.2);
    }
    .brand-logo {
      font-size: 1.5rem; font-weight: 900; letter-spacing: -0.05em;
      background: linear-gradient(135deg, #5eb4ff, #2aa7ff);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: block; margin-bottom: 1rem;
    }
    .auth-header { text-align: center; margin-bottom: 2rem; }
    .auth-header h1 { font-size: 2rem; margin-bottom: 0.5rem; color: #e2e3ff; }
    .auth-header p { color: #6e739d; }
    .error-banner {
      display: flex; align-items: center; gap: 0.5rem;
      background: rgba(255, 113, 108, 0.15); border: 1px solid rgba(255, 113, 108, 0.3);
      color: #ff716c; border-radius: 0.75rem; padding: 0.75rem 1rem; margin-bottom: 1.5rem; font-size: 0.875rem;
    }
    .error-banner .material-symbols-outlined { font-size: 1.25rem; }
    .form-group { margin-bottom: 1.5rem; }
    .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #e2e3ff; font-size: 0.875rem; }
    .password-header { display: flex; justify-content: space-between; align-items: center; }
    .forgot-link { font-size: 0.875rem; color: #5eb4ff; text-decoration: none; }
    .forgot-link:hover { text-decoration: underline; }
    input {
      width: 100%; padding: 0.75rem 1rem;
      border: 1px solid rgba(110, 115, 157, 0.3); border-radius: 0.75rem;
      background-color: rgba(19, 26, 76, 0.8); color: #e2e3ff;
      font-family: 'Manrope', sans-serif; transition: all 0.2s; outline: none; box-sizing: border-box;
    }
    input:focus { border-color: #5eb4ff; box-shadow: 0 0 0 2px rgba(94, 180, 255, 0.2); }
    input.error { border-color: #ff716c; }
    .btn-block { width: 100%; padding: 0.875rem; font-size: 1rem; cursor: pointer; margin-top: 0.5rem; }
    .glow-effect {
      background: linear-gradient(135deg, #5eb4ff, #2aa7ff);
      border: none; border-radius: 1.5rem; color: #003151; font-weight: 700; transition: all 0.2s;
    }
    .glow-effect:hover { box-shadow: 0 4px 16px rgba(94, 180, 255, 0.4); transform: translateY(-1px); }
    .glow-effect:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }
    .auth-footer { text-align: center; margin-top: 2rem; font-size: 0.875rem; color: #6e739d; }
    .auth-footer a { color: #5eb4ff; text-decoration: none; font-weight: 600; }
    .auth-footer a:hover { text-decoration: underline; }
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

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
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <span class="brand-logo">Nikat</span>
          <h1>Create an Account</h1>
          <p>Join the Nikat community today</p>
        </div>

        <div *ngIf="errorMessage" class="error-banner">
          <span class="material-symbols-outlined">error</span>
          {{ errorMessage }}
        </div>
        <div *ngIf="successMessage" class="success-banner">
          <span class="material-symbols-outlined">check_circle</span>
          {{ successMessage }}
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="auth-form">
          <div class="form-row">
            <div class="form-group half">
              <label for="firstName">First Name</label>
              <input type="text" id="firstName" formControlName="firstName" placeholder="John">
            </div>
            <div class="form-group half">
              <label for="lastName">Last Name</label>
              <input type="text" id="lastName" formControlName="lastName" placeholder="Doe">
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" formControlName="email" placeholder="john&#64;example.com">
          </div>

          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" formControlName="phone" placeholder="+91 9876543210">
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" formControlName="password" placeholder="Create a password">
          </div>

          <div class="form-group">
            <label>Registration Type</label>
            <div class="role-selector">
              <div class="role-option" [class.active]="registerForm.get('role')?.value === 'USER'" (click)="setRole('USER')">
                <span class="material-symbols-outlined">person</span>
                <span>Regular User</span>
              </div>
              <div class="role-option" [class.active]="registerForm.get('role')?.value === 'SHOP_OWNER'" (click)="setRole('SHOP_OWNER')">
                <span class="material-symbols-outlined">storefront</span>
                <span>Shop Owner</span>
              </div>
              <div class="role-option" [class.active]="registerForm.get('role')?.value === 'SERVICE_PROVIDER'" (click)="setRole('SERVICE_PROVIDER')">
                <span class="material-symbols-outlined">engineering</span>
                <span>Service Provider</span>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-block glow-effect" [disabled]="registerForm.invalid || isLoading">
            {{ isLoading ? 'Creating Account...' : 'Register' }}
          </button>
        </form>

        <div class="auth-footer">
          <p>Already have an account? <a routerLink="/login">Sign in</a></p>
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
      border-radius: 1.5rem; padding: 2.5rem; width: 100%; max-width: 520px;
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
    .success-banner {
      display: flex; align-items: center; gap: 0.5rem;
      background: rgba(0, 230, 118, 0.15); border: 1px solid rgba(0, 230, 118, 0.3);
      color: #00e676; border-radius: 0.75rem; padding: 0.75rem 1rem; margin-bottom: 1.5rem; font-size: 0.875rem;
    }
    .error-banner .material-symbols-outlined, .success-banner .material-symbols-outlined { font-size: 1.25rem; }
    .form-row { display: flex; gap: 1rem; }
    .form-group { margin-bottom: 1.25rem; width: 100%; }
    .half { flex: 1; }
    .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; color: #e2e3ff; font-size: 0.875rem; }
    input {
      width: 100%; padding: 0.75rem 1rem;
      border: 1px solid rgba(110, 115, 157, 0.3); border-radius: 0.75rem;
      background-color: rgba(19, 26, 76, 0.8); color: #e2e3ff;
      font-family: 'Manrope', sans-serif; transition: all 0.2s; outline: none; box-sizing: border-box;
    }
    input:focus { border-color: #5eb4ff; box-shadow: 0 0 0 2px rgba(94, 180, 255, 0.2); }
    .role-selector { display: flex; gap: 0.75rem; margin-top: 0.5rem; }
    .role-option {
      flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 1rem 0.5rem; border: 1px solid rgba(110, 115, 157, 0.3); border-radius: 0.75rem;
      background-color: rgba(8, 14, 56, 0.8); cursor: pointer; transition: all 0.2s;
    }
    .role-option:hover { border-color: rgba(110, 115, 157, 0.5); }
    .role-option.active {
      border-color: #5eb4ff; background-color: rgba(14, 20, 66, 0.8); box-shadow: 0 0 0 1px #5eb4ff;
    }
    .role-option .material-symbols-outlined { font-size: 1.75rem; margin-bottom: 0.5rem; color: #6e739d; }
    .role-option.active .material-symbols-outlined, .role-option.active span { color: #5eb4ff; }
    .role-option span { font-size: 0.8rem; font-weight: 500; color: #6e739d; text-align: center; }
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
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

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

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';
      const data: RegisterRequest = this.registerForm.value;

      this.authService.register(data).subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'Account created successfully! Redirecting to login...';
          setTimeout(() => this.router.navigate(['/login']), 2000);
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

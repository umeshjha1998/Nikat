import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeToggleComponent } from '../../../core/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeToggleComponent],
  template: `
    <div class="split-auth">
      <!-- Left: Visual Side -->
      <aside class="auth-visual">
        <div class="v-content">
          <div class="v-badge">Recovery Portal</div>
          <h1>Don't lose your <span>momentum.</span></h1>
          <p>It's easy to forget a password in the bustle of life. We're here to help you get back to your neighborhood life safely.</p>
          
          <div class="visual-features">
            <div class="v-feat">
              <span class="material-icons">security</span>
              <span>Encrypted recovery process</span>
            </div>
            <div class="v-feat">
              <span class="material-icons">access_time</span>
              <span>Quick restoration of access</span>
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
            <button class="btn-ghost-sm" routerLink="/login">Cancel</button>
          </div>
        </header>

        <div class="form-scroll-wrap">
          <div class="form-container">
            <header class="auth-title-wrap" *ngIf="!submitted">
              <div class="recovery-icon-prime">
                <span class="material-icons">lock_reset</span>
              </div>
              <h2>Account Recovery</h2>
              <p>Type in your email and we'll send a secure reset link.</p>
            </header>

            <form (submit)="onSubmit($event)" *ngIf="!submitted" class="premium-form">
              <div class="f-group">
                <label>Registered Email</label>
                <div class="input-icon-wrap">
                  <span class="material-icons">alternate_email</span>
                  <input type="email" placeholder="you@example.com" required>
                </div>
              </div>

              <div class="actions-footer">
                <button type="submit" class="btn-prime-glow">
                  Send Recovery Link
                  <span class="material-icons">send</span>
                </button>
              </div>
            </form>

            <div class="success-stage-premium" *ngIf="submitted">
              <div class="celebrate-icon">
                <span class="material-icons">mark_email_read</span>
              </div>
              <h2>Check your inbox</h2>
              <p>A secure link has been dispatched to your email address. It will expire in 15 minutes for your safety.</p>
              
              <div class="actions-footer">
                <button (click)="submitted = false" class="btn-ghost-outline">
                  Didn't receive it? Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Manrope:wght@500;600;700;800&display=swap');

    :host {
      display: block;
      font-family: 'Manrope', sans-serif;
    }

    .split-auth { display: flex; min-height: 100vh; background: var(--bg); overflow: hidden; transition: all 0.3s ease; }

    /* Visual Side */
    .auth-visual {
      flex: 1; position: relative; background: var(--header-bg); display: flex; align-items: center; padding: 5rem;
      border-right: 1px solid var(--glass-border);
    }
    .v-content { position: relative; z-index: 10; max-width: 480px; }
    .v-badge {
      display: inline-block; padding: 0.5rem 1rem; border-radius: 2rem; background: rgba(59, 130, 246, 0.1);
      color: var(--prime-light); font-weight: 800; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 2rem;
    }
    .auth-visual h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 3.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; color: var(--text-main); }
    .auth-visual h1 span { color: var(--prime-light); }
    .auth-visual p { font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 4rem; }
    
    .visual-features { display: flex; flex-direction: column; gap: 1rem; }
    .v-feat { display: flex; align-items: center; gap: 0.75rem; color: var(--text-main); font-weight: 600; font-size: 0.95rem; }
    .v-feat .material-icons { color: var(--prime-light); }

    .v-blur-orb {
      position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%);
      top: 50%; left: 50%; transform: translate(-50%, -50%); filter: blur(80px);
    }

    /* Main Side */
    .auth-main { width: 600px; display: flex; flex-direction: column; background: var(--bg); transition: all 0.3s ease; }
    .main-head { height: 6rem; display: flex; align-items: center; justify-content: space-between; padding: 2rem 4rem; }
    .brand { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; color: var(--text-main); text-decoration: none; }
    .btn-ghost-sm { background: transparent; border: 1px solid var(--glass-border); color: var(--text-main); padding: 0.5rem 1rem; border-radius: 2rem; font-weight: 700; cursor: pointer; font-size: 0.8rem; }

    .form-scroll-wrap { flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem 4rem; }
    .form-container { width: 100%; max-width: 400px; }

    .recovery-icon-prime {
      width: 64px; height: 64px; border-radius: 1.5rem; background: rgba(59, 130, 246, 0.1);
      display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; color: var(--primary);
      border: 1px solid rgba(59, 130, 246, 0.2);
    }
    .recovery-icon-prime .material-icons { font-size: 2.5rem; }

    .auth-title-wrap { margin-bottom: 2.5rem; }
    .auth-title-wrap h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.25rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-main); }
    .auth-title-wrap p { color: var(--text-muted); font-size: 1rem; }

    /* Inputs */
    .f-group { margin-bottom: 2rem; }
    .f-group label { display: block; font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.6rem; text-transform: uppercase; letter-spacing: 0.05em; }
    .input-icon-wrap { position: relative; display: flex; align-items: center; }
    .input-icon-wrap .material-icons { position: absolute; left: 1.25rem; color: var(--text-muted); font-size: 1.25rem; }
    input {
      width: 100%; padding: 1.1rem 1.25rem 1.1rem 3.5rem; border-radius: 1.25rem;
      background: var(--glass); border: 1px solid var(--glass-border);
      color: var(--text-main); font-size: 1rem; transition: 0.2s; outline: none;
    }
    input:focus { border-color: var(--primary); background: rgba(59, 130, 246, 0.05); }

    .btn-prime-glow {
      background: var(--primary); color: #fff; border: none; padding: 1.1rem; border-radius: 1.25rem;
      font-weight: 800; font-size: 1.1rem; cursor: pointer; transition: 0.3s; width: 100%;
      display: flex; align-items: center; justify-content: center; gap: 0.75rem;
    }
    .btn-prime-glow:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4); }

    /* Success Stage */
    .success-stage-premium { text-align: center; }
    .celebrate-icon {
      width: 80px; height: 80px; border-radius: 50%; background: rgba(59, 130, 246, 0.1);
      display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; color: var(--primary);
      border: 2px solid rgba(59, 130, 246, 0.2);
    }
    .celebrate-icon .material-icons { font-size: 3.5rem; }
    .success-stage-premium h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.25rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem; }
    .success-stage-premium p { color: var(--text-muted); line-height: 1.6; margin-bottom: 3rem; font-size: 1.1rem; }
    .btn-ghost-outline { background: transparent; border: 1px solid var(--glass-border); color: var(--text-main); padding: 1rem 2rem; border-radius: 1.25rem; font-weight: 700; cursor: pointer; font-size: 0.9rem; }

    @media (max-width: 1100px) {
      .auth-visual { display: none; }
      .auth-main { width: 100%; }
    }
  `]
})
export class ForgotPasswordComponent {
  submitted = false;
  onSubmit(e: Event) { e.preventDefault(); this.submitted = true; }
}

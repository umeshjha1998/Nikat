import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="split-auth">
      <!-- Left: Visual Side -->
      <aside class="auth-visual">
        <div class="v-content">
          <div class="v-badge">Security Center</div>
          <h1>Security first, <span>peace of mind</span> second.</h1>
          <p>Resetting your password is a critical security step. Ensure your new credentials are unique and strong.</p>
          
          <div class="security-features">
            <div class="sf-item">
              <span class="material-icons">policy</span>
              <div class="sf-text">
                <h3>End-to-End Encryption</h3>
                <p>Your password is hashed before it even hits our servers.</p>
              </div>
            </div>
            <div class="sf-item">
              <span class="material-icons">history</span>
              <div class="sf-text">
                <h3>Historical Safety</h3>
                <p>We check against millions of pwned passwords for your safety.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="v-blur-orb"></div>
      </aside>

      <!-- Right: Form Side -->
      <main class="auth-main">
        <header class="main-head">
          <a routerLink="/" class="brand">Nikat</a>
          <a routerLink="/login" class="btn-ghost-sm">Cancel</a>
        </header>

        <div class="form-scroll-wrap">
          <div class="form-container">
            <header class="auth-title-wrap" *ngIf="!success">
              <div class="reset-icon-prime">
                <span class="material-icons">lock_reset</span>
              </div>
              <h2>New Credentials</h2>
              <p>Forge a stronger password for your account.</p>
            </header>

            <form (submit)="onSubmit($event)" *ngIf="!success" class="premium-form">
              <div class="f-group">
                <label>New Password</label>
                <div class="input-icon-wrap">
                  <span class="material-icons">lock</span>
                  <input type="password" placeholder="At least 8 characters" required>
                </div>
              </div>

              <div class="f-group">
                <label>Confirm New Password</label>
                <div class="input-icon-wrap">
                  <span class="material-icons">lock_clock</span>
                  <input type="password" placeholder="Must match exactly" required>
                </div>
              </div>

              <div class="password-checklist">
                <div class="check-item active">
                  <span class="material-icons">check_circle</span>
                  Minimum 8 characters
                </div>
                <div class="check-item">
                  <span class="material-icons">radio_button_unchecked</span>
                  Include a special character (#, $, etc)
                </div>
                <div class="check-item">
                  <span class="material-icons">radio_button_unchecked</span>
                  At least one uppercase letter
                </div>
              </div>

              <div class="actions-footer">
                <button type="submit" class="btn-prime-glow">
                  Update Password
                  <span class="material-icons">update</span>
                </button>
              </div>
            </form>

            <!-- Success State -->
            <div class="success-stage-premium" *ngIf="success">
              <div class="celebrate-icon">
                <span class="material-icons">verified</span>
              </div>
              <h2>Security Updated</h2>
              <p>Your password has been successfully reset. Your account is now more secure than ever.</p>
              
              <div class="actions-footer">
                <button routerLink="/login" class="btn-prime-glow">
                  Proceed to Sign In
                  <span class="material-icons">arrow_forward</span>
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
      font-family: 'Manrope', sans-serif;
    }

    .split-auth { display: flex; min-height: 100vh; background: var(--bg); overflow: hidden; }

    /* Visual Side */
    .auth-visual {
      flex: 1; position: relative; background: var(--surface-container-low); display: flex; align-items: center; padding: 5rem;
      border-right: 1px solid var(--glass-border);
    }
    .v-content { position: relative; z-index: 10; max-width: 480px; }
    .v-badge {
      display: inline-block; padding: 0.5rem 1rem; border-radius: 2rem; background: rgba(59, 130, 246, 0.1);
      color: var(--accent); font-weight: 800; font-size: 0.75rem; text-transform: uppercase; margin-bottom: 2rem;
    }
    .auth-visual h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 3.5rem; font-weight: 800; line-height: 1.1; margin-bottom: 1.5rem; color: var(--text-main); }
    .auth-visual h1 span { color: var(--accent); }
    .auth-visual p { font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 4rem; }
    
    .security-features { display: flex; flex-direction: column; gap: 2rem; }
    .sf-item { display: flex; gap: 1.25rem; }
    .sf-item .material-icons { font-size: 2rem; color: var(--accent); margin-top: 0.25rem; }
    .sf-text h3 { color: var(--text-main); font-size: 1.1rem; font-weight: 700; margin-bottom: 0.25rem; }
    .sf-text p { font-size: 0.9rem; color: var(--text-muted); margin: 0; line-height: 1.4; }

    .v-blur-orb {
      position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%);
      top: 50%; left: 50%; transform: translate(-50%, -50%); filter: blur(80px);
    }

    /* Main Side */
    .auth-main { width: 600px; display: flex; flex-direction: column; background: var(--bg); }
    .main-head { height: 6rem; display: flex; align-items: center; justify-content: space-between; padding: 2rem 4rem; }
    .brand { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; color: var(--text-main); text-decoration: none; }
    .btn-ghost-sm { background: transparent; border: 1px solid var(--glass-border); color: var(--text-main); padding: 0.5rem 1rem; border-radius: 2rem; font-weight: 700; cursor: pointer; font-size: 0.8rem; text-decoration: none; }

    .form-scroll-wrap { flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem 4rem; }
    .form-container { width: 100%; max-width: 400px; }

    .reset-icon-prime {
      width: 64px; height: 64px; border-radius: 1.5rem; background: rgba(59, 130, 246, 0.1);
      display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem; color: var(--primary);
      border: 1px solid rgba(59, 130, 246, 0.2);
    }
    .reset-icon-prime .material-icons { font-size: 2.5rem; }

    .auth-title-wrap { margin-bottom: 2.5rem; }
    .auth-title-wrap h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-main); }
    .auth-title-wrap p { color: var(--text-muted); font-size: 1rem; }

    /* Inputs */
    .f-group { margin-bottom: 1.5rem; }
    .f-group label { display: block; font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.6rem; text-transform: uppercase; letter-spacing: 0.05em; }
    .input-icon-wrap { position: relative; display: flex; align-items: center; }
    .input-icon-wrap .material-icons { position: absolute; left: 1.25rem; color: var(--text-muted); font-size: 1.25rem; }
    input {
      width: 100%; padding: 1.1rem 1.25rem 1.1rem 3.5rem; border-radius: 1.25rem;
      background: var(--glass); border: 1px solid var(--glass-border);
      color: var(--text-main); font-size: 1rem; transition: 0.2s; outline: none;
    }
    input:focus { border-color: var(--primary); background: rgba(59, 130, 246, 0.05); }

    /* Checklist */
    .password-checklist { margin: 2rem 0; display: flex; flex-direction: column; gap: 0.75rem; }
    .check-item { display: flex; align-items: center; gap: 0.6rem; font-size: 0.85rem; color: var(--text-muted); font-weight: 600; }
    .check-item.active { color: var(--text-main); }
    .check-item.active .material-icons { color: #10b981; }
    .check-item .material-icons { font-size: 1rem; }

    .btn-prime-glow {
      background: var(--primary); color: #fff; border: none; padding: 1.1rem; border-radius: 1.25rem;
      font-weight: 800; font-size: 1.1rem; cursor: pointer; transition: 0.3s; width: 100%;
      display: flex; align-items: center; justify-content: center; gap: 0.75rem;
    }
    .btn-prime-glow:hover { transform: translateY(-2px); box-shadow: 0 10px 30px var(--accent-glow); }

    /* Success Stage */
    .success-stage-premium { text-align: center; }
    .celebrate-icon {
      width: 80px; height: 80px; border-radius: 50%; background: rgba(16, 185, 129, 0.1);
      display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; color: #10b981;
      border: 2px solid rgba(16, 185, 129, 0.2);
    }
    .celebrate-icon .material-icons { font-size: 3.5rem; }
    .success-stage-premium h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2.25rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem; }
    .success-stage-premium p { color: var(--text-muted); line-height: 1.6; margin-bottom: 3rem; font-size: 1.1rem; }

    @media (max-width: 1100px) {
      .auth-visual { display: none; }
      .auth-main { width: 100%; }
    }
  `]
})
export class ResetPasswordComponent {
  success = false;
  onSubmit(e: Event) { 
    e.preventDefault(); 
    this.success = true; 
  }
}

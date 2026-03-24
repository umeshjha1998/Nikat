import { Component, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="split-auth">
      <!-- Left: Visual Side -->
      <aside class="auth-visual">
        <div class="v-content">
          <div class="v-badge">Verification Sent</div>
          <h1>One last <span>bridge</span> to cross.</h1>
          <p>We've dispatched a secure 6-digit verification code to your registered credentials. Enter it to activate your portal.</p>
          
          <div class="verify-steps">
            <div class="v-step active">
              <span class="v-num">1</span>
              <span class="v-lab">Registration</span>
              <span class="material-icons check">check_circle</span>
            </div>
            <div class="v-step-line"></div>
            <div class="v-step current">
              <span class="v-num">2</span>
              <span class="v-lab">OTP Verify</span>
            </div>
            <div class="v-step-line"></div>
            <div class="v-step">
              <span class="v-num">3</span>
              <span class="v-lab">Success</span>
            </div>
          </div>
        </div>
        <div class="v-blur-orb"></div>
      </aside>

      <!-- Right: Form Side -->
      <main class="auth-main">
        <header class="main-head">
          <a routerLink="/" class="brand">Nikat</a>
          <button class="btn-ghost-sm" routerLink="/login">Cancel</button>
        </header>

        <div class="form-scroll-wrap">
          <div class="form-container">
            <header class="auth-title-wrap">
              <div class="security-shield">
                <span class="material-icons">verified_user</span>
              </div>
              <h2>Verify Identity</h2>
              <p>Type in the code sent to your device.</p>
            </header>

            <div class="otp-grid">
               <input 
                #otpInput
                *ngFor="let d of digits; let i = index" 
                type="text" 
                maxlength="1" 
                class="otp-box-premium"
                [value]="digits[i]" 
                (input)="onInput($event, i)" 
                (keydown)="onKeyDown($event, i)"
                autocomplete="one-time-code"
                inputmode="numeric"
              >
            </div>

            <div class="actions-footer">
              <button class="btn-prime-glow" [disabled]="!isComplete() || isLoading" (click)="verify()">
                <span *ngIf="!isLoading">Confirm Code</span>
                <span *ngIf="isLoading" class="loader-dots">Verifying</span>
              </button>
            </div>

            <div class="resend-section">
              <p *ngIf="countdown > 0">Resend code available in <span>{{countdown}}s</span></p>
              <button *ngIf="countdown === 0" class="btn-text-link" (click)="resend()">
                <span class="material-icons">refresh</span>
                Didn't get it? Resend Code
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=Manrope:wght@500;600;700;800&display=swap');

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
    .auth-visual p { font-size: 1.1rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 4rem; }
    
    .verify-steps { display: flex; align-items: center; gap: 1rem; }
    .v-step { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
    .v-num { width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--text-muted); display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; color: var(--text-muted); }
    .v-lab { font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }
    .v-step.active .v-num { border-color: var(--primary); color: var(--primary); }
    .v-step.active .v-lab { color: var(--primary); }
    .v-step.current .v-num { background: var(--primary); border-color: var(--primary); color: #fff; box-shadow: 0 0 15px rgba(59, 130, 246, 0.4); }
    .v-step.current .v-lab { color: #fff; }
    .v-step-line { width: 40px; height: 1px; background: var(--glass-border); margin-bottom: 1.5rem; }
    .check { color: var(--primary); font-size: 1rem; margin-top: -0.25rem; }

    .v-blur-orb {
      position: absolute; width: 600px; height: 600px; background: radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%);
      top: 50%; left: 50%; transform: translate(-50%, -50%); filter: blur(80px);
    }

    /* Main Side */
    .auth-main { width: 600px; display: flex; flex-direction: column; background: #020410; }
    .main-head { height: 6rem; display: flex; align-items: center; justify-content: space-between; padding: 2rem 4rem; }
    .brand { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 800; color: #fff; text-decoration: none; }
    .btn-ghost-sm { background: transparent; border: 1px solid var(--glass-border); color: #fff; padding: 0.5rem 1rem; border-radius: 2rem; font-weight: 700; cursor: pointer; font-size: 0.8rem; }

    .form-scroll-wrap { flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem 4rem; }
    .form-container { width: 100%; max-width: 400px; text-align: center; }

    .security-shield {
      width: 64px; height: 64px; border-radius: 1.25rem; background: rgba(59, 130, 246, 0.1);
      display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: var(--primary);
      border: 1px solid rgba(59, 130, 246, 0.2);
    }
    .security-shield .material-icons { font-size: 2.5rem; }

    .auth-title-wrap { margin-bottom: 3rem; }
    .auth-title-wrap h2 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem; color: #fff; }
    .auth-title-wrap p { color: var(--text-muted); font-size: 1rem; }

    /* OTP Inputs */
    .otp-grid { display: flex; gap: 0.75rem; justify-content: center; margin-bottom: 3rem; }
    .otp-box-premium {
      width: 50px; height: 64px; border-radius: 1rem; border: 1px solid var(--glass-border);
      background: rgba(255, 255, 255, 0.02); color: #fff; font-size: 1.5rem; font-weight: 800;
      text-align: center; font-family: 'Plus Jakarta Sans', sans-serif; outline: none; transition: 0.2s;
    }
    .otp-box-premium:focus { border-color: var(--primary); background: rgba(59, 130, 246, 0.05); box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15); }

    .btn-prime-glow {
      background: var(--primary); color: #fff; border: none; padding: 1.1rem; border-radius: 1.25rem;
      font-weight: 800; font-size: 1.1rem; cursor: pointer; transition: 0.3s; width: 100%;
    }
    .btn-prime-glow:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4); }
    .btn-prime-glow:disabled { opacity: 0.5; cursor: not-allowed; }

    .resend-section { margin-top: 2rem; color: var(--text-muted); font-size: 0.9rem; font-weight: 600; }
    .resend-section span { color: var(--primary); font-weight: 800; }
    .btn-text-link {
      background: none; border: none; color: var(--primary); font-weight: 800; cursor: pointer;
      display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.5rem 1rem; border-radius: 2rem; transition: 0.2s;
    }
    .btn-text-link:hover { background: rgba(59, 130, 246, 0.1); }
    .btn-text-link .material-icons { font-size: 1rem; }

    .loader-dots::after { content: '...'; animation: d 1.5s infinite; }
    @keyframes d { 0% { content: '.'; } 33% { content: '..'; } 66% { content: '...'; } }

    @media (max-width: 1100px) {
      .auth-visual { display: none; }
      .auth-main { width: 100%; }
    }
  `]
})
export class OtpVerificationComponent {
  digits = ['', '', '', '', '', ''];
  countdown = 0;
  isLoading = false;

  @ViewChildren('otpInput') inputs!: QueryList<ElementRef>;

  constructor(private router: Router) {}

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    
    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      input.value = '';
      return;
    }

    this.digits[index] = value;
    if (value && index < 5) {
      const inputArr = this.inputs.toArray();
      inputArr[index + 1].nativeElement.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.digits[index] && index > 0) {
      const inputArr = this.inputs.toArray();
      inputArr[index - 1].nativeElement.focus();
    }
  }

  isComplete(): boolean { return this.digits.every(d => d.length === 1); }

  verify() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/dashboard']);
    }, 2000);
  }

  resend() {
    this.countdown = 30;
    const timer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) clearInterval(timer);
    }, 1000);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-brand"><a routerLink="/" class="logo">Nikat</a></div>
        <div class="auth-header">
          <div class="icon-circle"><span class="material-icons">pin</span></div>
          <h1>Verify Your Account</h1>
          <p>We've sent a 6-digit code to <strong>j***@email.com</strong></p>
        </div>
        <div class="otp-inputs">
          <input *ngFor="let d of digits; let i = index" type="text" maxlength="1" class="otp-box"
            [value]="digits[i]" (input)="onInput($event, i)" (keydown)="onKeyDown($event, i)">
        </div>
        <button class="btn-glow full-width" [disabled]="!isComplete()">Verify</button>
        <div class="resend-row">
          <p>Didn't receive the code?</p>
          <button class="link-btn" (click)="resend()">Resend Code</button>
        </div>
        <div class="timer" *ngIf="countdown > 0">Resend available in {{countdown}}s</div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page { min-height: 100vh; background: #05092f; display: flex; align-items: center; justify-content: center; padding: 2rem; }
    .auth-card { max-width: 440px; width: 100%; background: #080e38; border-radius: 1.5rem; padding: 3rem; border: 1px solid rgba(255,255,255,0.05); text-align: center; }
    .auth-brand { margin-bottom: 2rem; }
    .logo { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 800; background: linear-gradient(135deg, #5eb4ff, #2aa7ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-decoration: none; }
    .auth-header { margin-bottom: 2rem; }
    .icon-circle { width: 64px; height: 64px; border-radius: 50%; background: rgba(94,180,255,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; }
    .icon-circle .material-icons { font-size: 2rem; color: #5eb4ff; }
    .auth-header h1 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.75rem; font-weight: 700; color: #e2e3ff; margin-bottom: 0.5rem; }
    .auth-header p { color: #a3a8d5; font-size: 0.95rem; }
    .auth-header strong { color: #e2e3ff; }
    .otp-inputs { display: flex; gap: 0.75rem; justify-content: center; margin-bottom: 2rem; }
    .otp-box {
      width: 52px; height: 60px; background: #0e1442; border: 1px solid #40456c;
      border-radius: 0.75rem; text-align: center; font-size: 1.5rem; font-weight: 700;
      color: #e2e3ff; outline: none; caret-color: #5eb4ff;
      font-family: 'Plus Jakarta Sans', sans-serif; transition: border-color 0.2s;
    }
    .otp-box:focus { border-color: #5eb4ff; box-shadow: 0 0 0 3px rgba(94,180,255,0.15); }
    .btn-glow { background: linear-gradient(135deg, #5eb4ff, #2aa7ff); border: none; color: #003151; font-weight: 700; padding: 0.85rem 2rem; border-radius: 2rem; cursor: pointer; font-size: 0.95rem; transition: all 0.2s; }
    .btn-glow:hover:not(:disabled) { box-shadow: 0 6px 20px rgba(94,180,255,0.4); }
    .btn-glow:disabled { opacity: 0.4; cursor: not-allowed; }
    .full-width { width: 100%; }
    .resend-row { margin-top: 1.5rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
    .resend-row p { color: #6e739d; font-size: 0.85rem; margin: 0; }
    .link-btn { background: none; border: none; color: #5eb4ff; font-weight: 600; cursor: pointer; font-size: 0.85rem; }
    .timer { color: #6e739d; font-size: 0.8rem; margin-top: 0.75rem; }
  `]
})
export class OtpVerificationComponent {
  digits = ['', '', '', '', '', ''];
  countdown = 0;

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    this.digits[index] = input.value;
    if (input.value && index < 5) {
      const next = input.parentElement?.querySelectorAll('input')[index + 1];
      next?.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.digits[index] && index > 0) {
      const prev = (event.target as HTMLElement).parentElement?.querySelectorAll('input')[index - 1];
      prev?.focus();
    }
  }

  isComplete(): boolean { return this.digits.every(d => d.length === 1); }

  resend() {
    this.countdown = 30;
    const timer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) clearInterval(timer);
    }, 1000);
  }
}

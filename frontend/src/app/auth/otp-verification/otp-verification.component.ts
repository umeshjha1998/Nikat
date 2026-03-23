import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {
  otpForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.otpForm = this.fb.group({
      digits: this.fb.array(new Array(6).fill('').map(() => this.fb.control('', [Validators.required, Validators.pattern('^[0-9]$')])))
    });
  }

  get digits() {
    return this.otpForm.get('digits') as FormArray;
  }

  onInput(event: any, index: number): void {
    const input = event.target;
    if (input.value && index < 5) {
      const nextInput = input.parentElement.children[index + 1] as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.digits.at(index).value && index > 0) {
      const prevInput = (event.target as HTMLInputElement).parentElement?.children[index - 1] as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  }

  onSubmit(): void {
    if (this.otpForm.valid) {
      const otpValue = this.digits.value.join('');
      console.log('Verifying OTP:', otpValue);
      // Implementation: call service
      this.router.navigate(['/auth/login']);
    }
  }

  resendOtp(): void {
    console.log('Resending OTP');
    alert('OTP Resent');
  }
}

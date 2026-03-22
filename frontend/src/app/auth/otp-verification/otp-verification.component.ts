import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      otp: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  onSubmit(): void {
    if (this.otpForm.valid) {
      console.log('OTP verification logic here', this.otpForm.value);
      // Call service to verify OTP
      this.router.navigate(['/auth/login']); // or directly to dashboard
    }
  }

  resendOtp(): void {
      console.log('Resending OTP');
      // Call service to resend
      alert('OTP Resent');
  }
}

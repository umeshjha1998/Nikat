import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  photoError: string | null = null;
  selectedPhoto: File | null = null;
  locationCaptured = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      role: ['USER', Validators.required],
      permanentAddress: ['', Validators.required],
      baseLocation: [''],
      latitude: [null],
      longitude: [null],
      flatNumber: [''],
      nearbyLandmark: [''],
      floorDetails: ['']
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.size > 1048576) { // 1MB
        this.photoError = 'File size cannot exceed 1MB';
        this.selectedPhoto = null;
      } else {
        this.photoError = null;
        this.selectedPhoto = file;
      }
    }
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.registerForm.patchValue({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            baseLocation: 'Coordinates captured. Geocoding integration needed for address text.' // Mock geocoding
          });
          this.locationCaptured = true;
        },
        (error) => {
          console.error("Error capturing location", error);
          alert("Location access is required for registration.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid && this.locationCaptured && !this.photoError && this.selectedPhoto) {
      console.log('Registration details', this.registerForm.value);
      // Implement logic to send data to backend /api/v1/auth/register
      // Redirect to OTP verification
      this.router.navigate(['/auth/verify-otp']);
    } else {
        this.registerForm.markAllAsTouched();
    }
  }
}

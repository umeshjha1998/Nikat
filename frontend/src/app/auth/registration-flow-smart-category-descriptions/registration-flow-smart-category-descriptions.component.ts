import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-registration-flow-smart-category-descriptions',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registration-flow-smart-category-descriptions.component.html',
  styleUrl: './registration-flow-smart-category-descriptions.component.scss'
})
export class RegistrationFlowSmartCategoryDescriptionsComponent implements OnInit {
  registerForm!: FormGroup;
  photoError: string | null = null;
  selectedPhoto: File | null = null;
  locationCaptured = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      roles: this.fb.array([this.fb.control('user')], Validators.required),
      address: ['', Validators.required],
      latitude: [null],
      longitude: [null],
      shopCategory: [''],
      workerCount: [0],
      shopDescription: [''],
      inventoryManagement: [false],
      rentalOptions: [false],
      serviceType: [''],
      baseCharges: [''],
      serviceDescription: [''],
      availabilityStart: [''],
      availabilityEnd: ['']
    });
  }

  get roles() {
    return this.registerForm.get('roles') as FormArray;
  }

  onRoleChange(event: any) {
    const role = event.target.value;
    if (event.target.checked) {
      this.roles.push(this.fb.control(role));
    } else {
      const index = this.roles.controls.findIndex(x => x.value === role);
      this.roles.removeAt(index);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.size > 1048576) {
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
            longitude: position.coords.longitude
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

  sendOtp(): void {
    const email = this.registerForm.get('email')?.value;
    if (email) {
      console.log('Sending OTP to', email);
      alert('OTP sent to ' + email);
    } else {
      alert('Please enter an email address first.');
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Registration details', this.registerForm.value);
      // Logic to register via AuthService
      this.router.navigate(['/auth/verify-otp']);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}

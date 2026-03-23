import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';

import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegistrationFlowSmartCategoryDescriptionsComponent } from './registration-flow-smart-category-descriptions/registration-flow-smart-category-descriptions.component';

const routes: Routes = [
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: RegistrationFlowSmartCategoryDescriptionsComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'verify-otp', component: OtpVerificationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

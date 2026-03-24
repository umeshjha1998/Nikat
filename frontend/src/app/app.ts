import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from './core/theme.service';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly themeService = inject(ThemeService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly isDarkMode = this.themeService.isDarkMode;
  protected readonly title = signal('frontend');

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get currentUser() {
    return this.authService.currentUser;
  }

  get userInitial(): string {
    const user = this.authService.currentUser;
    if (user?.firstName) return user.firstName.charAt(0).toUpperCase();
    return 'U';
  }

  get userDisplayName(): string {
    const user = this.authService.currentUser;
    if (user) return `${user.firstName} ${user.lastName}`;
    return 'User';
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

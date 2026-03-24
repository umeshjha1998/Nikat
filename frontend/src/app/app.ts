import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from './core/theme.service';
import { AuthService } from './core/auth.service';
import { ThemeToggleComponent } from './core/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, ThemeToggleComponent],
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

  goToDashboard(): void {
    const user = this.authService.currentUser;
    if (!user) return;

    if (user.role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else if (user.isShopOwner) {
      this.router.navigate(['/shop-dashboard']);
    } else if (user.isServiceProvider) {
      this.router.navigate(['/provider-dashboard']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

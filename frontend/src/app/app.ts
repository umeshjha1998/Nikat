import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ThemeService } from './core/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly themeService = inject(ThemeService);
  protected readonly isDarkMode = this.themeService.isDarkMode;
  protected readonly title = signal('frontend');

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}

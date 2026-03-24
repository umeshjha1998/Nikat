import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="theme-toggle-btn" 
            (click)="themeService.toggleTheme()" 
            [title]="themeService.isDarkMode() ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
      <span class="material-icons">
        {{ themeService.isDarkMode() ? 'light_mode' : 'dark_mode' }}
      </span>
    </button>
  `,
  styles: [`
    .theme-toggle-btn {
      background: var(--surface-container);
      border: 1px solid var(--border-color);
      color: var(--on-surface);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    .theme-toggle-btn:hover {
      background: var(--surface-container-high);
      transform: scale(1.05);
    }
    .theme-toggle-btn .material-icons {
      font-size: 1.25rem;
    }
  `]
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
}

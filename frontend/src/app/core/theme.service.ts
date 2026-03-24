import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'nikat-theme';
  
  // false = light mode, true = dark mode (default)
  isDarkMode = signal<boolean>(this.getInitialTheme());

  constructor() {
    // Effect to apply theme class to body whenever isDarkMode changes
    effect(() => {
      const dark = this.isDarkMode();
      if (dark) {
        document.body.classList.remove('light-theme');
      } else {
        document.body.classList.add('light-theme');
      }
      localStorage.setItem(this.THEME_KEY, dark ? 'dark' : 'light');
    });
  }

  toggleTheme() {
    this.isDarkMode.set(!this.isDarkMode());
  }

  private getInitialTheme(): boolean {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Default to dark mode as per current design, or check system preference
    return !window.matchMedia('(prefers-color-scheme: light)').matches;
  }
}

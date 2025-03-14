import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';

  constructor() {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('light-theme'); // Tema por defecto
    }
  }

  setTheme(theme: string): void {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }

  toggleTheme(): void {
    const newTheme = document.body.classList.contains('light-theme') ? 'dark-theme' : 'light-theme';
    this.setTheme(newTheme);
  }
}

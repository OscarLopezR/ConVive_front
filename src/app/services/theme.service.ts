import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

const THEME_KEY = 'convive_theme';

/** Tema de la interfaz. El modo claro es el predeterminado; la elección se guarda en el navegador. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly mode = signal<ThemeMode>(this.stored());

  toggle(): void {
    this.mode.update((m) => (m === 'light' ? 'dark' : 'light'));
    if (this.browser) localStorage.setItem(THEME_KEY, this.mode());
  }

  private stored(): ThemeMode {
    if (!this.browser) return 'light';
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
  }
}

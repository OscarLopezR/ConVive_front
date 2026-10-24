import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Logo de ConVive enlazado al inicio. */
@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a routerLink="/" class="inline-flex items-center" aria-label="ConVive, ir al inicio">
      <img src="logo-nav.png" alt="ConVive" class="w-auto" [class]="size()" />
    </a>
  `
})
export class Brand {
  /** Clase de altura del logo (Tailwind). */
  readonly size = input('h-8');
}

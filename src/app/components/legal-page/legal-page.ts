import { Component, input } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { SiteFooter } from '../site-footer/site-footer';

/** Estructura común para páginas legales: título, fecha y contenido proyectado. */
@Component({
  selector: 'app-legal-page',
  standalone: true,
  imports: [Navbar, SiteFooter],
  templateUrl: './legal-page.html'
})
export class LegalPage {
  readonly title = input.required<string>();
  readonly eyebrow = input('Legal');
  readonly updated = input('23 de octubre de 2026');
}
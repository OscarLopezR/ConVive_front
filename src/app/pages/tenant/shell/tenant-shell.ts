import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Brand } from '../../../components/brand/brand';
import { SiteFooter } from '../../../components/site-footer/site-footer';
import { AuthService } from '../../../services/auth.service';
import { ThemeService } from '../../../services/theme.service';
import { HlmButton } from '../../../ui/button/hlm-button';

interface NavItem {
  label: string;
  path: string;
}

/** Layout del rol Inquilino: navegación por módulos (Explorar, Mi perfil, Solicitudes, Contrato). */
@Component({
  selector: 'app-tenant-shell',
  standalone: true,
  imports: [Brand, RouterLink, RouterLinkActive, RouterOutlet, SiteFooter, HlmButton],
  templateUrl: './tenant-shell.html'
})
export class TenantShell {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly theme = inject(ThemeService);

  readonly nav: NavItem[] = [
    { label: 'Explorar', path: '/inquilino/explorar' },
    { label: 'Mi perfil', path: '/inquilino/perfil' },
    { label: 'Solicitudes', path: '/inquilino/solicitudes' },
    { label: 'Contrato', path: '/inquilino/contrato' }
  ];

  readonly pillActive = 'bg-accent font-semibold text-slate-900 shadow-[0_0_24px_-6px_rgba(204,255,0,0.6)]';
  readonly pillIdle = 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white';

  /** Nombre corto: "Carlos H." */
  get displayName(): string {
    const user = this.auth.user;
    return user ? `${user.nombre} ${user.paterno.charAt(0)}.` : '';
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}

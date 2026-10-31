import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/** Exige sesión iniciada y el rol indicado; si no, redirige al login o al inicio. */
export const roleGuard =
  (role: string): CanActivateFn =>
  () => {
    // En el servidor (SSR) no hay localStorage: la comprobación real ocurre en el navegador.
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return true;

    const auth = inject(AuthService);
    const router = inject(Router);

    if (!auth.token) return router.createUrlTree(['/login']);
    return auth.hasRole(role) ? true : router.createUrlTree([auth.homeFor(auth.user)]);
  };

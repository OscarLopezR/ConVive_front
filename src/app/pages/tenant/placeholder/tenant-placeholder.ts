import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HlmButton } from '../../../ui/button/hlm-button';

/** Vista provisional de los módulos del inquilino que aún no se construyen. */
@Component({
  selector: 'app-tenant-placeholder',
  standalone: true,
  imports: [RouterLink, HlmButton],
  template: `
    <section class="enter mx-auto max-w-xl rounded-3xl bg-white/[0.03] p-10 text-center ring-1 ring-white/10">
      <p class="text-xs font-medium uppercase tracking-wider">
        <span class="mark-accent mark-label">Próximamente</span>
      </p>
      <h1 class="mt-3 text-3xl font-extrabold tracking-tight text-white">{{ title }}</h1>
      <p class="mt-3 text-slate-400">{{ description }}</p>
      <a hlmBtn routerLink="/inquilino/explorar" class="mt-8">Volver a explorar</a>
    </section>
  `
})
export class TenantPlaceholder {
  private readonly data = inject(ActivatedRoute).snapshot.data;

  readonly title: string = this.data['title'] ?? '';
  readonly description: string = this.data['description'] ?? '';
}

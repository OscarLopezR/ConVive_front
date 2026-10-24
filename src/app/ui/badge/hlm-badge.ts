import { Directive, computed, input } from '@angular/core';
import { cn } from '../utils/cn';

export type BadgeVariant = 'default' | 'outline' | 'match';

const variants: Record<BadgeVariant, string> = {
  default: 'bg-white/5 text-slate-300',
  outline: 'border border-white/10 text-slate-400',
  match: 'bg-accent/10 text-accent'
};

/** Badge / etiqueta pequeña. */
@Directive({
  selector: '[hlmBadge]',
  standalone: true,
  host: { '[class]': 'classes()' }
})
export class HlmBadge {
  readonly variant = input<BadgeVariant>('default');

  protected readonly classes = computed(() =>
    cn(
      'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider',
      variants[this.variant()]
    )
  );
}

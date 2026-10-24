import { Directive, computed, input } from '@angular/core';
import { cn } from '../utils/cn';

export type ButtonVariant = 'default' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'default' | 'lg';

const variants: Record<ButtonVariant, string> = {
  default:
    'bg-accent text-slate-900 font-semibold hover:bg-lime-300 hover:shadow-[0_0_32px_-4px_rgba(204,255,0,0.55)]',
  secondary: 'bg-white/5 text-white border border-white/10 hover:bg-white/10',
  ghost: 'text-white hover:text-accent hover:bg-white/5',
  link: 'text-slate-400 hover:text-white'
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  default: 'h-10 px-5 text-sm',
  lg: 'h-12 px-7 text-base'
};

/** Botón estilizado (capa "helm" al estilo spartan.ng). */
@Directive({
  selector: 'button[hlmBtn], a[hlmBtn]',
  standalone: true,
  host: { '[class]': 'classes()' }
})
export class HlmButton {
  readonly variant = input<ButtonVariant>('default');
  readonly size = input<ButtonSize>('default');

  protected readonly classes = computed(() =>
    cn(
      'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full transition-all duration-200 disabled:pointer-events-none disabled:opacity-50',
      variants[this.variant()],
      sizes[this.size()]
    )
  );
}

import { Directive } from '@angular/core';

/** Input / select estilizado estilo Linear: sin caja pesada, borde sutil. */
@Directive({
  selector: 'input[hlmInput], select[hlmInput]',
  standalone: true,
  host: {
    class:
      'h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-slate-500 transition-colors hover:border-white/20 focus:border-accent/60 focus:bg-white/[0.05] focus:outline-none focus:ring-4 focus:ring-accent/10'
  }
})
export class HlmInput {}

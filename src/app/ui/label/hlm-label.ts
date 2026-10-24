import { Directive } from '@angular/core';

/** Etiqueta de campo (micro-copy). */
@Directive({
  selector: 'label[hlmLabel], span[hlmLabel]',
  standalone: true,
  host: { class: 'text-xs font-medium uppercase tracking-wider text-slate-400' }
})
export class HlmLabel {}

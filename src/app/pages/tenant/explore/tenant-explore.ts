import { DecimalPipe } from '@angular/common';
import { Component, afterNextRender, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {
  Recommendations,
  RoomFilters,
  RoomMatch,
  RoomOrder,
  TenantService
} from '../../../services/tenant.service';
import { HlmButton } from '../../../ui/button/hlm-button';
import { HlmInput } from '../../../ui/input/hlm-input';
import { HlmLabel } from '../../../ui/label/hlm-label';

/** Dashboard del inquilino: espacios recomendados según la compatibilidad de su perfil. */
@Component({
  selector: 'app-tenant-explore',
  standalone: true,
  imports: [DecimalPipe, FormsModule, RouterLink, HlmButton, HlmInput, HlmLabel],
  templateUrl: './tenant-explore.html'
})
export class TenantExplore {
  private readonly tenants = inject(TenantService);

  /** Imagen de ejemplo para todas las tarjetas (public/principal-depto.jpg). */
  readonly photo = 'principal-depto.jpg';

  readonly budgets: { label: string; value: number | null }[] = [
    { label: 'Sin límite', value: null },
    { label: 'Hasta $3,000 MXN', value: 3000 },
    { label: 'Hasta $4,000 MXN', value: 4000 },
    { label: 'Hasta $5,000 MXN', value: 5000 },
    { label: 'Hasta $5,500 MXN', value: 5500 },
    { label: 'Hasta $7,000 MXN', value: 7000 },
    { label: 'Hasta $10,000 MXN', value: 10000 }
  ];

  readonly orders: { label: string; value: RoomOrder }[] = [
    { label: 'Mayor compatibilidad', value: 'compatibilidad' },
    { label: 'Menor precio', value: 'precio_asc' },
    { label: 'Mayor precio', value: 'precio_desc' }
  ];

  // Filtros del formulario (se aplican al pulsar "Filtrar").
  ubicacion = '';
  presupuesto: number | null = null;
  orden: RoomOrder = 'compatibilidad';

  readonly loading = signal(true);
  readonly error = signal('');
  readonly data = signal<Recommendations | null>(null);

  constructor() {
    // Solo en el navegador: en SSR no hay sesión ni localStorage.
    afterNextRender(() => this.load());
  }

  apply(): void {
    this.load();
  }

  reset(): void {
    this.ubicacion = '';
    this.presupuesto = null;
    this.orden = 'compatibilidad';
    this.load();
  }

  /** Texto del arrendador: "Ana · Arquitecta · Horario diurno". */
  landlordLine(room: RoomMatch): string {
    const { nombre, ocupacion, horario } = room.arrendador;
    return [nombre, ocupacion, horario].filter(Boolean).join(' · ');
  }

  location(room: RoomMatch): string {
    return [room.colonia, room.delegacion].filter(Boolean).join(' · ');
  }

  specs(room: RoomMatch): string {
    const parts: string[] = [];
    if (room.metros !== null) parts.push(`${room.metros} m²`);
    if (room.servicios.length) parts.push(room.servicios.join(', '));
    return parts.join(' · ');
  }

  trackRoom = (_: number, room: RoomMatch) => room.id;

  private load(): void {
    const filters: RoomFilters = {
      ubicacion: this.ubicacion,
      presupuesto_max: this.presupuesto,
      orden: this.orden
    };
    this.loading.set(true);
    this.error.set('');

    this.tenants.recommendations(filters).subscribe({
      next: (res) => {
        this.data.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(AuthService.errorMessage(err));
        this.loading.set(false);
      }
    });
  }
}

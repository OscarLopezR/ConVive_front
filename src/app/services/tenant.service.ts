import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RoomMatch {
  id: number;
  titulo: string;
  colonia: string | null;
  delegacion: string | null;
  estado: string | null;
  metros: number | null;
  servicios: string[];
  precio: number;
  compatibilidad: number;
  coincidencias: string[];
  arrendador: { nombre: string; ocupacion: string | null; horario: string | null };
}

export interface Recommendations {
  perfil_completo: boolean;
  total: number;
  items: RoomMatch[];
}

export type RoomOrder = 'compatibilidad' | 'precio_asc' | 'precio_desc';

export interface RoomFilters {
  ubicacion: string;
  presupuesto_max: number | null;
  orden: RoomOrder;
}

@Injectable({ providedIn: 'root' })
export class TenantService {
  private readonly http = inject(HttpClient);

  recommendations(filters: RoomFilters): Observable<Recommendations> {
    const params: Record<string, string> = { orden: filters.orden };
    if (filters.ubicacion.trim()) params['ubicacion'] = filters.ubicacion.trim();
    if (filters.presupuesto_max !== null) params['presupuesto_max'] = String(filters.presupuesto_max);

    return this.http.get<Recommendations>(`${environment.apiUrl}/inquilino/recomendaciones`, {
      params
    });
  }
}

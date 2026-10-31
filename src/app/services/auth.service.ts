import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthUser {
  id: number;
  nombreDeUsuario: string;
  nombre: string;
  paterno: string;
  materno: string | null;
  email: string;
  telefono: string | null;
  roles: string[];
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: AuthUser;
}

export interface RegisterPayload {
  role: 'tenant' | 'landlord';
  nombre: string;
  apellidos: string;
  email: string;
  telefono?: string;
  password: string;
  [key: string]: string | undefined;
}

const TOKEN_KEY = 'convive_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/auth`;

  login(email: string, password: string): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(`${this.api}/login`, { email, password })
      .pipe(tap((res) => this.saveToken(res.access_token)));
  }

  register(payload: RegisterPayload): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(`${this.api}/register`, payload)
      .pipe(tap((res) => this.saveToken(res.access_token)));
  }

  requestReset(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.api}/recuperar`, { email });
  }

  validateReset(token: string): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(`${this.api}/recuperar/validar`, {
      params: { token }
    });
  }

  confirmReset(token: string, password: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.api}/recuperar/confirmar`, {
      token,
      password
    });
  }

  get token(): string | null {
    return typeof localStorage === 'undefined' ? null : localStorage.getItem(TOKEN_KEY);
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') localStorage.removeItem(TOKEN_KEY);
  }

  /** Extrae un mensaje legible de un error HTTP del backend. */
  static errorMessage(err: unknown): string {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) return 'No se pudo conectar con el servidor.';
      const detail = err.error?.detail;
      if (typeof detail === 'string') return detail;
      if (Array.isArray(detail)) return 'Revisa los datos del formulario.';
    }
    return 'Ocurrió un error inesperado. Intenta de nuevo.';
  }

  private saveToken(token: string): void {
    if (typeof localStorage !== 'undefined') localStorage.setItem(TOKEN_KEY, token);
  }
}

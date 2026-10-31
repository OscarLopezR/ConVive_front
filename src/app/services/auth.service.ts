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
const USER_KEY = 'convive_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly api = `${environment.apiUrl}/auth`;

  login(email: string, password: string): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(`${this.api}/login`, { email, password })
      .pipe(tap((res) => this.saveSession(res)));
  }

  register(payload: RegisterPayload): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(`${this.api}/register`, payload)
      .pipe(tap((res) => this.saveSession(res)));
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
    if (typeof localStorage === 'undefined') return null;
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && this.isExpired(token)) {
      this.logout();
      return null;
    }
    return token;
  }

  /** Usuario guardado en la sesión actual (null si no hay sesión válida). */
  get user(): AuthUser | null {
    if (!this.token || typeof localStorage === 'undefined') return null;
    try {
      return JSON.parse(localStorage.getItem(USER_KEY) ?? 'null') as AuthUser | null;
    } catch {
      return null;
    }
  }

  hasRole(role: string): boolean {
    return this.user?.roles.includes(role) ?? false;
  }

  /** Ruta inicial según el rol del usuario. */
  homeFor(user: AuthUser | null): string {
    if (user?.roles.includes('INQUILINO')) return '/inquilino';
    return '/';
  }

  logout(): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
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

  private isExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      return typeof payload.exp === 'number' && payload.exp * 1000 <= Date.now();
    } catch {
      return true;
    }
  }

  private saveSession(res: TokenResponse): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, res.access_token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
  }
}

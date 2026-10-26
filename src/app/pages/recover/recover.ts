import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Brand } from '../../components/brand/brand';
import { SiteFooter } from '../../components/site-footer/site-footer';
import { HlmButton } from '../../ui/button/hlm-button';
import { HlmInput } from '../../ui/input/hlm-input';
import { HlmLabel } from '../../ui/label/hlm-label';

type RecoverStep = 'request' | 'sent' | 'reset';

/**
 * Flujo de recuperación de contraseña:
 * 1) solicitar enlace, 2) confirmación de envío, 3) nueva contraseña.
 * El paso 3 también se abre directo desde /recuperar/nueva (destino del enlace del correo).
 */
@Component({
  selector: 'app-recover',
  standalone: true,
  imports: [Brand, FormsModule, RouterLink, SiteFooter, HlmButton, HlmInput, HlmLabel],
  templateUrl: './recover.html'
})
export class Recover {
  private readonly route = inject(ActivatedRoute);
  private readonly auth = inject(AuthService);
  private readonly cdr = inject(ChangeDetectorRef);

  step: RecoverStep = this.route.snapshot.data['step'] ?? 'request';

  email = '';
  newPassword = '';
  confirmPassword = '';
  showPassword = false;

  message = '';
  success = false;

  get title(): string {
    return {
      request: 'Volvamos a encontrarnos.',
      sent: 'Revisa tu correo.',
      reset: 'Comienza de nuevo.'
    }[this.step];
  }

  get subtitle(): string {
    return {
      request: 'Recupera el acceso a tu cuenta de ConVive.',
      sent: 'Si existe una cuenta asociada, recibirás un enlace de recuperación.',
      reset: 'Elige una nueva contraseña para acceder a ConVive.'
    }[this.step];
  }

  sendLink(): void {
    this.message = '';

    if (!/^\S+@\S+\.\S+$/.test(this.email.trim())) {
      this.message = 'Ingresa un correo electrónico válido.';
      return;
    }

    this.auth.requestReset(this.email.trim()).subscribe({
      next: () => {
        this.step = 'sent';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.message = AuthService.errorMessage(err);
        this.cdr.detectChanges();
      }
    });
  }

  continueToReset(): void {
    this.message = '';
    this.step = 'reset';
  }

  savePassword(): void {
    this.message = '';
    this.success = false;

    if (this.newPassword.length < 8) {
      this.message = 'La contraseña debe tener al menos 8 caracteres.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Las contraseñas no coinciden.';
      return;
    }

    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.message = 'El enlace es inválido. Solicita uno nuevo.';
      return;
    }

    this.auth.confirmReset(token, this.newPassword).subscribe({
      next: () => {
        this.success = true;
        this.message = 'Contraseña actualizada. Ya puedes iniciar sesión con tu nueva contraseña.';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.message = AuthService.errorMessage(err);
        this.cdr.detectChanges();
      }
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { passwordError } from '../../utils/validators';
import { Brand } from '../../components/brand/brand';
import { SiteFooter } from '../../components/site-footer/site-footer';
import { HlmButton } from '../../ui/button/hlm-button';
import { HlmInput } from '../../ui/input/hlm-input';
import { HlmLabel } from '../../ui/label/hlm-label';

type RecoverStep = 'request' | 'sent' | 'checking' | 'invalid' | 'reset';

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
  private readonly destroyRef = inject(DestroyRef);

  showSuccessModal = false;

  step: RecoverStep = this.route.snapshot.data['step'] ?? 'request';

  email = '';
  newPassword = '';
  confirmPassword = '';
  showPassword = false;

  message = '';
  success = false;

  /** Segundos restantes para poder reenviar el enlace. */
  resendCooldown = 0;
  private cooldownTimer?: ReturnType<typeof setInterval>;

  constructor() {
    // /recuperar/nueva solo es válida con el token del correo: se comprueba en el backend.
    if (this.step === 'reset') {
      const token = this.route.snapshot.queryParamMap.get('token');
      if (!token) {
        this.step = 'invalid';
      } else {
        this.step = 'checking';
        this.auth.validateReset(token).subscribe({
          next: () => {
            this.step = 'reset';
            this.cdr.detectChanges();
          },
          error: () => {
            this.step = 'invalid';
            this.cdr.detectChanges();
          }
        });
      }
    }

    this.destroyRef.onDestroy(() => clearInterval(this.cooldownTimer));
  }

  get title(): string {
    return {
      request: 'Volvamos a encontrarnos.',
      sent: 'Revisa tu correo.',
      checking: 'Verificando enlace.',
      invalid: 'Enlace no válido.',
      reset: 'Comienza de nuevo.'
    }[this.step];
  }

  get subtitle(): string {
    return {
      request: 'Recupera el acceso a tu cuenta de ConVive.',
      sent: 'Si existe una cuenta asociada, recibirás un enlace de recuperación.',
      checking: 'Un momento, estamos comprobando tu enlace de recuperación.',
      invalid: 'El enlace es incorrecto, ya fue usado o expiró.',
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
        this.startCooldown();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.message = AuthService.errorMessage(err);
        this.cdr.detectChanges();
      }
    });
  }

  /** Reenvía el enlace; solo disponible tras la espera de 60 s. */
  resendLink(): void {
    if (this.resendCooldown > 0) return;
    this.message = '';
    this.auth.requestReset(this.email.trim()).subscribe({
      next: () => {
        this.startCooldown();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.message = AuthService.errorMessage(err);
        this.cdr.detectChanges();
      }
    });
  }

  private startCooldown(): void {
    clearInterval(this.cooldownTimer);
    this.resendCooldown = 60;
    this.cooldownTimer = setInterval(() => {
      this.resendCooldown--;
      if (this.resendCooldown <= 0) clearInterval(this.cooldownTimer);
      this.cdr.detectChanges();
    }, 1000);
  }

  savePassword(): void {
    this.message = '';
    this.success = false;

    const passwordMessage = passwordError(this.newPassword);
    if (passwordMessage) {
      this.message = passwordMessage;
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
        this.showSuccessModal = true;
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
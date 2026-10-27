import { Brand } from '../../components/brand/brand';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SiteFooter } from '../../components/site-footer/site-footer';
import { HlmButton } from '../../ui/button/hlm-button';
import { HlmInput } from '../../ui/input/hlm-input';
import { HlmLabel } from '../../ui/label/hlm-label';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Brand, FormsModule, RouterLink, SiteFooter, HlmButton, HlmInput, HlmLabel],
  templateUrl: './login.html'
})
export class Login {
  private readonly auth = inject(AuthService);

  loading = false;
  email = '';
  password = '';
  showPassword = false;
  message = '';
  success = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  signIn(): void {
    this.message = '';
    this.success = false;

    if (!this.email.trim() || !this.password) {
      this.message = 'Ingresa tu correo y contraseña para continuar.';
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(this.email.trim())) {
      this.message = 'Ingresa un correo electrónico válido.';
      return;
    }

    this.loading = true;
    this.auth.login(this.email.trim(), this.password).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
        this.message = 'Sesión iniciada correctamente.';
      },
      error: (err) => {
        this.loading = false;
        this.message = AuthService.errorMessage(err);
      }
    });
  }
}
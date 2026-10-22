
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SiteFooter } from '../../components/site-footer/site-footer';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, SiteFooter],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  role: 'tenant' | 'landlord' = 'tenant';

  firstName = 'Carlos';
  lastName = 'Hernández López';
  email = 'carlos.h@email.com';
  phone = '55 1234 5678';
  password = '';
  acceptTerms = false;
  showPassword = false;

  submitted = false;
  message = '';

  selectRole(role: 'tenant' | 'landlord'): void {
    this.role = role;
    this.message = '';
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  createAccount(): void {
    this.submitted = true;
    this.message = '';

    if (
      !this.firstName.trim() ||
      !this.lastName.trim() ||
      !this.email.trim() ||
      !this.phone.trim() ||
      !this.password
    ) {
      this.message = 'Completa todos los campos para continuar.';
      return;
    }

    if (this.password.length < 8) {
      this.message = 'La contraseña debe tener al menos 8 caracteres.';
      return;
    }

    if (!this.acceptTerms) {
      this.message = 'Debes aceptar los términos y el aviso de privacidad.';
      return;
    }

    this.message =
      'Formulario validado. La creación de la cuenta estará disponible al conectar el backend.';
  }
}

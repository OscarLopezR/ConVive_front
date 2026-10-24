import { Brand } from '../../components/brand/brand';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SiteFooter } from '../../components/site-footer/site-footer';
import { HlmBadge } from '../../ui/badge/hlm-badge';
import { HlmButton } from '../../ui/button/hlm-button';
import { HlmInput } from '../../ui/input/hlm-input';
import { HlmLabel } from '../../ui/label/hlm-label';

interface Choice {
  id: string;
  label: string;
  /** Texto corto que aparece en el resumen lateral. */
  summary: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [Brand, FormsModule, RouterLink, SiteFooter, HlmBadge, HlmButton, HlmInput, HlmLabel],
  templateUrl: './register.html'
})
export class Register {
  /** Paso actual del registro: 1 = cuenta, 2 = estilo de vida y preferencias. */
  step: 1 | 2 = 1;

  role: 'tenant' | 'landlord' = 'tenant';

  firstName = 'Carlos';
  lastName = 'Hernández López';
  email = 'carlos.h@email.com';
  phone = '55 1234 5678';
  password = '';
  acceptTerms = false;
  showPassword = false;

  // Paso 2: estilo de vida
  occupation = 'student';
  schedule = 'day';
  cleanliness = 'high';
  visits = 'low';
  pets = 'none';

  // Paso 2: preferencias
  petPreference = 'no-pets';
  ageRange = '20-30';
  genderPreference = 'any';

  // Paso 2 (arrendador): perfil ideal de quien compartirá el espacio
  tenantOccupation = 'any';
  tenantSchedule = 'any';
  tenantCleanliness = 'high';
  visitsAllowed = 'some';
  petsAllowed = 'no';
  smoking = 'no';

  submitted = false;
  message = '';

  readonly occupations: Choice[] = [
    { id: 'student', label: 'Estudiante', summary: 'Estudiante' },
    { id: 'professional', label: 'Profesional', summary: 'Profesional' },
    { id: 'other', label: 'Otra', summary: 'Otra ocupación' }
  ];

  readonly schedules: Choice[] = [
    { id: 'day', label: 'Diurno', summary: 'Horario diurno' },
    { id: 'night', label: 'Nocturno', summary: 'Horario nocturno' },
    { id: 'mixed', label: 'Mixto', summary: 'Horario mixto' }
  ];

  readonly cleanlinessLevels: Choice[] = [
    { id: 'high', label: 'Alto · Limpieza frecuente', summary: 'Limpieza frecuente' },
    { id: 'medium', label: 'Medio · Limpieza semanal', summary: 'Limpieza semanal' },
    { id: 'low', label: 'Bajo · Ambiente relajado', summary: 'Ambiente relajado' }
  ];

  readonly visitLevels: Choice[] = [
    { id: 'low', label: 'Baja · Ocasionalmente', summary: 'Visitas ocasionales' },
    { id: 'medium', label: 'Media · Algunas veces al mes', summary: 'Visitas frecuentes' },
    { id: 'high', label: 'Alta · Casi siempre', summary: 'Visitas constantes' }
  ];

  readonly petOptions: Choice[] = [
    { id: 'none', label: 'No tengo mascotas', summary: 'Sin mascotas' },
    { id: 'dog', label: 'Tengo perro', summary: 'Con perro' },
    { id: 'cat', label: 'Tengo gato', summary: 'Con gato' },
    { id: 'other', label: 'Tengo otra mascota', summary: 'Con mascota' }
  ];

  readonly petPreferences: Choice[] = [
    { id: 'no-pets', label: 'Prefiero un hogar sin mascotas', summary: 'Hogar sin mascotas' },
    { id: 'pets-ok', label: 'Me gustan las mascotas', summary: 'Acepta mascotas' },
    { id: 'any', label: 'Me es indiferente', summary: 'Indiferente a mascotas' }
  ];

  readonly ageRanges: Choice[] = [
    { id: '18-20', label: '18 a 20 años', summary: '18 a 20 años' },
    { id: '20-30', label: '20 a 30 años', summary: '20 a 30 años' },
    { id: '30-40', label: '30 a 40 años', summary: '30 a 40 años' },
    { id: '40+', label: '40 años o más', summary: '40 años o más' },
    { id: 'any', label: 'Indistinto', summary: 'Cualquier edad' }
  ];

  readonly genderOptions: Choice[] = [
    { id: 'any', label: 'Indistinto', summary: 'Cualquier género' },
    { id: 'female', label: 'Mujer', summary: 'Prefiere mujeres' },
    { id: 'male', label: 'Hombre', summary: 'Prefiere hombres' }
  ];

  // Opciones del flujo de arrendador
  readonly hostPetOptions: Choice[] = [
    { id: 'none', label: 'No hay mascotas en casa', summary: 'Sin mascotas en casa' },
    { id: 'dog', label: 'Tengo perro', summary: 'Perro en casa' },
    { id: 'cat', label: 'Tengo gato', summary: 'Gato en casa' },
    { id: 'other', label: 'Tengo otra mascota', summary: 'Mascota en casa' }
  ];

  readonly tenantOccupations: Choice[] = [
    { id: 'any', label: 'Indistinto · Estudiantes o profesionales', summary: 'Estudiantes o profesionales' },
    { id: 'student', label: 'Estudiantes', summary: 'Estudiantes' },
    { id: 'professional', label: 'Profesionales', summary: 'Profesionales' }
  ];

  readonly tenantSchedules: Choice[] = [
    { id: 'any', label: 'Indistinto', summary: 'Cualquier horario' },
    { id: 'day', label: 'Diurno', summary: 'Horario diurno' },
    { id: 'night', label: 'Nocturno', summary: 'Horario nocturno' }
  ];

  readonly tenantCleanlinessLevels: Choice[] = [
    { id: 'high', label: 'Alto · Limpieza frecuente', summary: 'Limpieza frecuente' },
    { id: 'medium', label: 'Medio · Limpieza semanal', summary: 'Limpieza semanal' },
    { id: 'low', label: 'Flexible · Ambiente relajado', summary: 'Ambiente relajado' }
  ];

  readonly visitsAllowedOptions: Choice[] = [
    { id: 'none', label: 'Sin visitas', summary: 'Sin visitas' },
    { id: 'some', label: 'Ocasionales', summary: 'Visitas ocasionales' },
    { id: 'many', label: 'Sin restricción', summary: 'Visitas libres' }
  ];

  readonly petsAllowedOptions: Choice[] = [
    { id: 'no', label: 'No se permiten mascotas', summary: 'Sin mascotas' },
    { id: 'small', label: 'Solo mascotas pequeñas', summary: 'Mascotas pequeñas' },
    { id: 'yes', label: 'Se permiten mascotas', summary: 'Acepta mascotas' }
  ];

  readonly smokingOptions: Choice[] = [
    { id: 'no', label: 'No fumadores', summary: 'No fumadores' },
    { id: 'any', label: 'Indistinto', summary: 'Fumadores permitidos' }
  ];

  get roleLabel(): string {
    return this.role === 'tenant' ? 'Inquilino' : 'Arrendador';
  }

  /** Líneas del resumen lateral del paso 2. */
  get summaryItems(): string[] {
    if (this.role === 'landlord') {
      return [
        this.summaryOf(this.tenantOccupations, this.tenantOccupation),
        this.summaryOf(this.tenantSchedules, this.tenantSchedule),
        this.summaryOf(this.tenantCleanlinessLevels, this.tenantCleanliness),
        this.summaryOf(this.visitsAllowedOptions, this.visitsAllowed),
        this.summaryOf(this.petsAllowedOptions, this.petsAllowed),
        this.summaryOf(this.smokingOptions, this.smoking)
      ];
    }

    return [
      this.summaryOf(this.occupations, this.occupation),
      this.summaryOf(this.schedules, this.schedule),
      this.summaryOf(this.cleanlinessLevels, this.cleanliness),
      this.summaryOf(this.visitLevels, this.visits),
      this.summaryOf(this.petOptions, this.pets)
    ];
  }

  selectRole(role: 'tenant' | 'landlord'): void {
    this.role = role;
    this.message = '';
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  /** Valida los datos de la cuenta y avanza al paso de estilo de vida. */
  nextStep(): void {
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

    this.step = 2;
    this.scrollToTop();
  }

  previousStep(): void {
    this.step = 1;
    this.message = '';
    this.scrollToTop();
  }

  saveProfile(): void {
    this.message =
      'Formulario validado. La creación de la cuenta estará disponible al conectar el backend.';
  }

  private summaryOf(options: Choice[], id: string): string {
    return options.find((option) => option.id === id)?.summary ?? '';
  }

  private scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

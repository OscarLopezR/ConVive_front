/** Reglas de validación compartidas; deben coincidir con app/schemas.py del backend. */

/** Devuelve el mensaje de error de la contraseña, o null si es válida. */
export function passwordError(value: string): string | null {
  if (value.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
  if (!/[A-Z]/.test(value)) return 'La contraseña debe incluir al menos una mayúscula.';
  if (!/[a-z]/.test(value)) return 'La contraseña debe incluir al menos una minúscula.';
  if (!/\d/.test(value)) return 'La contraseña debe incluir al menos un número.';
  return null;
}

export function isValidEmail(value: string): boolean {
  return /^\S+@\S+\.\S+$/.test(value.trim());
}

/** Teléfono de 10 dígitos; admite espacios, guiones y paréntesis. */
export function isValidPhone(value: string): boolean {
  return /^\d{10}$/.test(value.replace(/[\s\-()]/g, ''));
}

const NAME_RE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[ '\-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;

export function isValidName(value: string): boolean {
  return NAME_RE.test(value.trim().replace(/\s+/g, ' '));
}

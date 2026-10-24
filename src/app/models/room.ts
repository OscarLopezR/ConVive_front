export interface Room {
  id: number;
  title: string;
  /** Colonia o zona. */
  neighborhood: string;
  city: string;
  /** Precio mensual en MXN. */
  price: number;
  /** Superficie en m². */
  area: number;
  services: string;
  /** Porcentaje de compatibilidad (0-100). */
  compatibility: number;
  owner: string;
  image: string;
}

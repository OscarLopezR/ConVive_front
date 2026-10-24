import { Room } from '../models/room';

const IMAGE = 'principal-depto.jpg';

/** Datos simulados hasta conectar el backend (FastAPI). */
export const MOCK_ROOMS: Room[] = [
  { id: 1, title: 'Habitación cerca de ESCOM', neighborhood: 'Lindavista', city: 'Ciudad de México', price: 4500, area: 16.5, services: 'Agua, luz, internet y gas', compatibility: 92.5, owner: 'Ana · Arquitecta · Horario diurno', image: IMAGE },
  { id: 2, title: 'Cuarto luminoso con escritorio', neighborhood: 'Lindavista', city: 'Ciudad de México', price: 3200, area: 12, services: 'Agua, luz e internet', compatibility: 88, owner: 'Luis · Estudiante · Horario mixto', image: IMAGE },
  { id: 3, title: 'Habitación en departamento compartido', neighborhood: 'Zacatenco', city: 'Ciudad de México', price: 3800, area: 14, services: 'Todos los servicios', compatibility: 85.5, owner: 'Mariana · Diseñadora · Horario diurno', image: IMAGE },
  { id: 4, title: 'Cuarto amplio con balcón', neighborhood: 'Narvarte', city: 'Ciudad de México', price: 5800, area: 18, services: 'Agua, luz, internet y limpieza', compatibility: 81, owner: 'Diego · Ingeniero · Horario diurno', image: IMAGE },
  { id: 5, title: 'Habitación tranquila para estudiantes', neighborhood: 'Copilco', city: 'Ciudad de México', price: 4900, area: 15, services: 'Agua, luz, internet y gas', compatibility: 90, owner: 'Sofía · Estudiante · Horario diurno', image: IMAGE },
  { id: 6, title: 'Cuarto con baño privado', neighborhood: 'Del Valle', city: 'Ciudad de México', price: 7200, area: 20, services: 'Todos los servicios', compatibility: 76.5, owner: 'Andrés · Abogado · Horario nocturno', image: IMAGE },
  { id: 7, title: 'Habitación en casa con jardín', neighborhood: 'Coyoacán', city: 'Ciudad de México', price: 6500, area: 17, services: 'Agua, luz e internet', compatibility: 79, owner: 'Valeria · Fotógrafa · Horario mixto', image: IMAGE },
  { id: 8, title: 'Loft compartido en la Condesa', neighborhood: 'Condesa', city: 'Ciudad de México', price: 9500, area: 22, services: 'Todos los servicios', compatibility: 72, owner: 'Rodrigo · Productor · Horario nocturno', image: IMAGE },
  { id: 9, title: 'Cuarto cerca de Metro Politécnico', neighborhood: 'Lindavista', city: 'Ciudad de México', price: 3500, area: 11, services: 'Agua y luz', compatibility: 83, owner: 'Karen · Estudiante · Horario diurno', image: IMAGE },
  { id: 10, title: 'Habitación moderna en Santa María', neighborhood: 'Santa María la Ribera', city: 'Ciudad de México', price: 4200, area: 13.5, services: 'Agua, luz, internet y gas', compatibility: 86, owner: 'Emiliano · Músico · Horario mixto', image: IMAGE }
];

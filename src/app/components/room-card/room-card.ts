import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Room } from '../../models/room';
import { HlmBadge } from '../../ui/badge/hlm-badge';

const FEATURED_ROOM: Room = {
  id: 1,
  title: 'Habitación cerca de ESCOM',
  neighborhood: 'Lindavista',
  city: 'Ciudad de México',
  price: 4500,
  area: 16.5,
  services: 'Agua, luz, internet y gas',
  compatibility: 92.5,
  owner: 'Ana · Arquitecta · Horario diurno',
  image: 'principal-depto.jpg'
};

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [HlmBadge, DecimalPipe],
  templateUrl: './room-card.html'
})
export class RoomCard {
  readonly room = input<Room>(FEATURED_ROOM);
  /** Versión reducida para listados de resultados. */
  readonly compact = input(false);
}

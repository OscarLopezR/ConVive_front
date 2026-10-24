import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MOCK_ROOMS } from '../../data/mock-rooms';
import { Room } from '../../models/room';
import { Navbar } from '../../components/navbar/navbar';
import { RoomCard } from '../../components/room-card/room-card';
import { SiteFooter } from '../../components/site-footer/site-footer';
import { Reveal } from '../../ui/reveal/reveal';
import { HlmButton } from '../../ui/button/hlm-button';
import { HlmInput } from '../../ui/input/hlm-input';
import { HlmLabel } from '../../ui/label/hlm-label';

/** Máximo de espacios que se muestran por búsqueda. */
const MAX_RESULTS = 6;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Navbar, RoomCard, SiteFooter, HlmButton, HlmInput, HlmLabel, Reveal],
  templateUrl: './home.html'
})
export class Home {
  location = 'Lindavista, Ciudad de México';
  budget = 5000;

  /** Se activa después de la primera búsqueda para mostrar la sección de resultados. */
  searched = false;
  results: Room[] = [];
  /** Total de coincidencias antes de limitar a MAX_RESULTS. */
  totalMatches = 0;

  constructor(private readonly router: Router) {}

  findRoom(): void {
    this.exploreRooms();
  }

  becomeLandlord(): void {
    this.router.navigateByUrl('/register');
  }

  exploreRooms(): void {
    // Simulación: filtra los espacios de prueba hasta conectar el backend.
    const matches = MOCK_ROOMS
      .filter((room) => room.price <= this.budget && this.matchesLocation(room))
      .sort((a, b) => b.compatibility - a.compatibility);

    this.totalMatches = matches.length;
    this.results = matches.slice(0, MAX_RESULTS);
    this.searched = true;

    this.scrollToResults();
  }

  /** Restablece la ubicación y sube el presupuesto máximo para ampliar la búsqueda. */
  clearFilters(): void {
    this.location = '';
    this.budget = 10000;
    this.exploreRooms();
  }

  private matchesLocation(room: Room): boolean {
    const terms = this.location
      .split(',')
      .map((term) => this.normalize(term))
      .filter(Boolean);

    if (!terms.length) {
      return true;
    }

    const roomText = this.normalize(`${room.neighborhood} ${room.city}`);
    return terms.some((term) => roomText.includes(term));
  }

  private normalize(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  private scrollToResults(): void {
    if (typeof document === 'undefined') {
      return;
    }

    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }
}

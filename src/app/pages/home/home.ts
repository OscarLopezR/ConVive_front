
import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { RoomCard } from '../../components/room-card/room-card';
import { SiteFooter } from '../../components/site-footer/site-footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Navbar, RoomCard, SiteFooter],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  location = 'Lindavista, Ciudad de México';
  budget = 5000;

  findRoom(): void {
    this.exploreRooms();
  }

  becomeLandlord(): void {
    window.location.href = '/register';
  }

  exploreRooms(): void {
    const params = new URLSearchParams({
      location: this.location,
      budget: String(this.budget)
    });

    // Por ahora, muestra los criterios de búsqueda.
    alert(
      'Buscando habitaciones en: ' +
      this.location +
      '\nPresupuesto mensual: $' +
      this.budget +
      ' MXN'
    );

    console.log('Criterios de búsqueda:', params.toString());
  }
}

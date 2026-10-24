import { Brand } from '../brand/brand';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButton } from '../../ui/button/hlm-button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [Brand, RouterLink, HlmButton],
  templateUrl: './navbar.html'
})
export class Navbar {}
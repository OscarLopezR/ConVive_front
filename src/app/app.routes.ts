import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { Recover } from './pages/recover/recover';
import { Terms } from './pages/terms/terms';
import { Privacy } from './pages/privacy/privacy';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'recuperar', component: Recover },
  { path: 'recuperar/nueva', component: Recover, data: { step: 'reset' } },
  { path: 'terminos', component: Terms },
  { path: 'privacidad', component: Privacy },
  { path: '**', redirectTo: '' }
];
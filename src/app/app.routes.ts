import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { Recover } from './pages/recover/recover';
import { Terms } from './pages/terms/terms';
import { Privacy } from './pages/privacy/privacy';
import { TenantShell } from './pages/tenant/shell/tenant-shell';
import { TenantExplore } from './pages/tenant/explore/tenant-explore';
import { TenantPlaceholder } from './pages/tenant/placeholder/tenant-placeholder';
import { roleGuard } from './services/role.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'recuperar', component: Recover },
  { path: 'recuperar/nueva', component: Recover, data: { step: 'reset' } },
  { path: 'terminos', component: Terms },
  { path: 'privacidad', component: Privacy },
  {
    path: 'inquilino',
    component: TenantShell,
    canActivate: [roleGuard('INQUILINO')],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'explorar' },
      { path: 'explorar', component: TenantExplore },
      {
        path: 'perfil',
        component: TenantPlaceholder,
        data: { title: 'Mi perfil', description: 'Aquí podrás editar tu estilo de vida y tus preferencias.' }
      },
      {
        path: 'solicitudes',
        component: TenantPlaceholder,
        data: { title: 'Solicitudes', description: 'Aquí verás el estado de tus solicitudes a habitaciones.' }
      },
      {
        path: 'contrato',
        component: TenantPlaceholder,
        data: { title: 'Contrato', description: 'Aquí consultarás tu contrato y tus documentos.' }
      },
      {
        path: 'habitacion/:id',
        component: TenantPlaceholder,
        data: { title: 'Detalle de la habitación', description: 'Aquí verás las fotos, reglas y datos completos del espacio.' }
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

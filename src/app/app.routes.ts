import { Routes } from '@angular/router';
import { publicRoutes } from './public/public.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  ...publicRoutes,
];

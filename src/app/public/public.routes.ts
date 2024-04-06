import { Routes } from '@angular/router';
import {PublicWrapperComponent} from "./public-wrapper.component";

export const publicRoutes: Routes = [
  {
    path: '',
    component: PublicWrapperComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'favorites',
        loadComponent: () => import('./pages/favorites/favorites.component').then(m => m.FavoritesComponent)
      },
    ]

  },

];

import { Routes } from '@angular/router';
import { PublicWrapperComponent } from './public-wrapper.component';
import { provideState, StoreModule } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as currentPlaceEffects from './current-place/store/current-place.effects';
import { currentPlaceReducer, currentPlayFeatureKey } from './current-place/store/current-place.reducer';
import { CurrentPlaceEffects } from './current-place/store/current-place.effects';

export const publicRoutes: Routes = [
  {
    path: '',
    component: PublicWrapperComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./current-place/current-place.component').then((m) => m.CurrentPlaceComponent),
        providers: [
          provideState({
            name: currentPlayFeatureKey,
            reducer: currentPlaceReducer,
          }),
          provideEffects(CurrentPlaceEffects),
        ],
      },
      {
        path: 'favorites',
        loadComponent: () => import('./favorites/favorites.component').then((m) => m.FavoritesComponent),
      },
    ],
  },
];

import { Routes } from '@angular/router';
import { PublicWrapperComponent } from './public-wrapper.component';
import { provideState, StoreModule } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { currentPlaceReducer, currentPlaceFeatureKey } from './current-place/store/current-place.reducer';
import { CurrentPlaceEffects } from './current-place/store/current-place.effects';
import { favoritesFeatureKey, favoritesReducer } from './favorites/store/favorites.reducer';
import { FavoritesEffects } from './favorites/store/favorites.effects';
import { favoritesResolver } from './favorites/favorites.resolver';
import { currentPlaceResolver } from './current-place/current-place.resolver';

export const publicRoutes: Routes = [
  {
    path: '',
    component: PublicWrapperComponent,
    providers: [
      provideState({
        name: favoritesFeatureKey,
        reducer: favoritesReducer,
      }),
      provideEffects(FavoritesEffects),
    ],
    resolve: {
      savedFavorites: favoritesResolver
    },
    children: [
      {
        path: 'home',
        loadComponent: () => import('./current-place/current-place.component').then((m) => m.CurrentPlaceComponent),
        providers: [
          provideState({
            name: currentPlaceFeatureKey,
            reducer: currentPlaceReducer,
          }),
          provideEffects(CurrentPlaceEffects),
        ],
        resolve: {
          currentPlace: currentPlaceResolver
        },
      },
      {
        path: 'favorites',
        loadComponent: () => import('./favorites/favorites.component').then((m) => m.FavoritesComponent),
      },
    ],
  },
];

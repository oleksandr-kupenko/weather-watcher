import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { delay, Observable, of, take, tap } from 'rxjs';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { PublicService } from '../public.service';
import { selectFavoritesPlaces } from './store/favorites.selectors';
import { map } from 'rxjs/operators';
import { FavoritesActions } from './store/favorites.actions';
import { FavoritesService } from './favorites.service';

export const favoritesResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {
  const store = inject(Store);
  const favoritesService = inject(FavoritesService);

  return store.select(selectFavoritesPlaces).pipe(
    take(1),
    map((favoritesPlaces) => {
      if (favoritesPlaces.length) {
        return favoritesPlaces;
      } else {
        const savedFavorites = favoritesService.getSavedFavoritesPlaces();
        if (savedFavorites) {
          store.dispatch(FavoritesActions.setPlace({ places: savedFavorites }));
          return savedFavorites;
        } else {
          return [];
        }
      }
    }),
  );
};

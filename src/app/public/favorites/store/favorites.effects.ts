import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { of, take } from 'rxjs';
import { FavoritesActions } from './favorites.actions';
import { FavoritesService } from '../favorites.service';
import { Store } from '@ngrx/store';
import { selectFavoritesPlaces } from './favorites.selectors';

@Injectable()
export class FavoritesEffects {

  loadFavoritesWeather = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.getFavoritesWeather),
      exhaustMap(({ places }) =>
        this.favoritesService.getCurrentWeatherList(places).pipe(
          map((favoritesWeatherArr) => {
            return FavoritesActions.favoritesWeatherLoadedSuccess({ favoritesWeatherArr: favoritesWeatherArr });
          }),
          catchError(() => of(FavoritesActions.favoritesWeatherLoadedFailure({ error: 'Error' }))),
        ),
      ),
    ),
  );

  saveFavoritesToLocalStorage = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.setPlace, FavoritesActions.removePlace),
      exhaustMap((data) => {
        return this.store.select(selectFavoritesPlaces).pipe(
          take(1),
          switchMap((favorites) => {
            try {
              this.favoritesService.saveFavoritesToStore(favorites);
              return of(FavoritesActions.favoritesListSavedSuccess());
            } catch (error) {
              return of(FavoritesActions.favoritesListSavedFailure({ error: 'Local Storage not available' }));
            }
          })
        )
        }
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private favoritesService: FavoritesService,
    private store: Store
  ) {}
}

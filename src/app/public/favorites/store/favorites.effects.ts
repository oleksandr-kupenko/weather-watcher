import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { of, take } from 'rxjs';
import { FavoritesActions } from './favorites.actions';
import { FavoritesService } from '../favorites.service';
import { Store } from '@ngrx/store';
import { selectFavoritesPlaces } from './favorites.selectors';
import { NotificationService } from '../../shared/notification.service';

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

  saveFavorites = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.setPlace, FavoritesActions.removePlace),
      exhaustMap((action) => {
        return this.store.select(selectFavoritesPlaces).pipe(
          take(1),
          switchMap((favorites) => {
            try {
              this.favoritesService.saveFavoritesToStore(favorites);
              if (action.type === FavoritesActions.setPlace.type) {
                action.showNotification &&
                  this.notificationService.showNotification('Added to favorites list', 'success');
                return of(FavoritesActions.favoritesListSavedSuccess({ action: 'add' }));
              } else {
                action.showNotification &&
                  this.notificationService.showNotification('Removed from favorites list', 'info');
                return of(FavoritesActions.favoritesListSavedSuccess({ action: 'remove' }));
              }
            } catch (error) {
              console.error(error);
              this.notificationService.showNotification('Failed to save', 'error');
              return of(FavoritesActions.favoritesListSavedFailure({ error: 'Local Storage not available' }));
            }
          }),
        );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private favoritesService: FavoritesService,
    private store: Store,
    private notificationService: NotificationService,
  ) {}
}

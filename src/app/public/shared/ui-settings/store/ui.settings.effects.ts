import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavoritesActions } from '../../../favorites/store/favorites.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { UiSettingsActions } from './ui-settings.actions';
import { UiSettingsService } from '../ui-settings.service';

@Injectable()
export class UiSettingsEffects {
  loadFavoritesWeather = createEffect(() =>
    this.actions$.pipe(
      ofType(UiSettingsActions.setDarkModeStatus),
      exhaustMap((action) => {
        try {
          this.uiSettingsService.saveDarkModeStatus(action.status);
          return of(UiSettingsActions.darkModeStatusSavedSuccess());
        } catch (error) {
          console.error(error);
          return of(UiSettingsActions.darkModeStatusSavedFailure({ error: 'Failed to save darkModeStatus' }));
        }
      }),
    ),
  );
  constructor(
    private actions$: Actions,
    private uiSettingsService: UiSettingsService,
  ) {}
}

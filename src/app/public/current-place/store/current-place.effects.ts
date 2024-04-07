import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { CurrentPlaceService } from '../current-place.service';
import { CurrentPlaceReducers } from './current-place.actions';

@Injectable()
export class CurrentPlaceEffects {
  loadCurrentWeather = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrentPlaceReducers.getCurrentPlaceCurrentWeather),
      exhaustMap(({ key }) =>
        this.currentPlaceService.getCurrentWeather(key).pipe(
          map((currentWeather) => CurrentPlaceReducers.currentPlaceWeatherLoadedSuccess({ currentWeather })),
          catchError(() => of(CurrentPlaceReducers.currentPlaceWeatherLoadedFailure({ error: 'Error' }))),
        ),
      ),
    ),
  );

  loadPredictedWeatherByDays = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrentPlaceReducers.getPredictWeatherByDays),
      exhaustMap(({ key }) =>
        this.currentPlaceService.getCurrentPredictedWeatherByDays(key).pipe(
          map((predictedWeather) => CurrentPlaceReducers.predictWeatherByDaysLoadedSuccess({ predictedWeather })),
          catchError(() => of(CurrentPlaceReducers.currentPlaceWeatherLoadedFailure({ error: 'Error' }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private currentPlaceService: CurrentPlaceService,
  ) {}
}

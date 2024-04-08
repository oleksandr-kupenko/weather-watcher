import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { CurrentPlaceService } from '../current-place.service';
import { CurrentPlaceActions } from './current-place.actions';
import { PublicService } from '../../public.service';

@Injectable()
export class CurrentPlaceEffects {
  loadCurrentWeather = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrentPlaceActions.getCurrentPlaceCurrentWeather),
      exhaustMap(({ key }) =>
        this.publicService.getPlaceWeather(key).pipe(
          map((currentWeather) => CurrentPlaceActions.currentPlaceWeatherLoadedSuccess({ currentWeather })),
          catchError(() => of(CurrentPlaceActions.currentPlaceWeatherLoadedFailure({ error: 'Error' }))),
        ),
      ),
    ),
  );

  loadPredictedWeatherByDays = createEffect(() =>
    this.actions$.pipe(
      ofType(CurrentPlaceActions.getPredictWeatherByDays),
      exhaustMap(({ key }) =>
        this.currentPlaceService.getCurrentPredictedWeatherByDays(key).pipe(
          map((predictedWeather) => CurrentPlaceActions.predictWeatherByDaysLoadedSuccess({ predictedWeather })),
          catchError(() => of(CurrentPlaceActions.currentPlaceWeatherLoadedFailure({ error: 'Error' }))),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private currentPlaceService: CurrentPlaceService,
    private publicService: PublicService
  ) {}
}

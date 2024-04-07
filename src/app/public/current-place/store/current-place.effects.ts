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
      ofType(CurrentPlaceReducers.getCurrentPlaceWeather),
      exhaustMap(({ key }) =>
        this.currentPlaceService.getCurrentWeather(key).pipe(
          map((currentWeather) => CurrentPlaceReducers.currentPlaceWeatherLoadedSuccess({ currentWeather })),
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

// export const loadPlaceDetails = createEffect(
//   (actions$ = inject(Actions), currentPlaceWeatherService = inject(CurrentPlaceService)) => {
//     return actions$.pipe(
//       ofType(CurrentPlaceReducers.getCurrentPlaceWeather),
//       exhaustMap(({ key }) =>
//         currentPlaceWeatherService.getCurrentWeather(key).pipe(
//           map((placeDetails) => {
//             console.log('YES', placeDetails);
//             return CurrentPlaceReducers.currentPlaceWeatherLoadedSuccess({ currentPlaceDetails: placeDetails });
//           }),
//           catchError((error: { message: string }) =>
//             of(CurrentPlaceReducers.currentPlaceWeatherLoadedFailure({ error: error.message })),
//           ),
//         ),
//       ),
//     );
//   },
//   { functional: true },
// );

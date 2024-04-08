import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { delay, Observable, of, take, tap } from 'rxjs';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFavoritesPlaces } from '../favorites/store/favorites.selectors';
import { map } from 'rxjs/operators';
import { FavoritesActions } from '../favorites/store/favorites.actions';
import { selectCurrentPlaceCurrentData, selectCurrentPlaceState } from './store/current-place.selectors';
import { CurrentPlaceActions } from './store/current-place.actions';


export const currentPlaceResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {
  const store = inject(Store);

  return store.select(selectCurrentPlaceCurrentData)
    .pipe(take(1), map((currentPlace) => {
      if (currentPlace && currentPlace.currentTemperature) {
        return currentPlace;
      } else {
        store.dispatch(CurrentPlaceActions.getCurrentPlaceCurrentWeather({ key: currentPlace.key }));
        store.dispatch(CurrentPlaceActions.getPredictWeatherByDays({ key: currentPlace.key }));
        return currentPlace;
      }
    }));
};

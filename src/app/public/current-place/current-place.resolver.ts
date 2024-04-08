import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, take } from 'rxjs';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectCurrentPlaceCurrentData, selectCurrentPlaceState } from './store/current-place.selectors';
import { CurrentPlaceActions } from './store/current-place.actions';


export const currentPlaceResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {
  const store = inject(Store);
  const placeKeyFromRoute = route.params['key'];

  return store.select(selectCurrentPlaceCurrentData)
    .pipe(take(1), map((currentPlace) => {
      if (placeKeyFromRoute && currentPlace.key !== placeKeyFromRoute) {
        store.dispatch(CurrentPlaceActions.getCurrentPlaceLocationInfo({ key: placeKeyFromRoute }));
      }

      if (currentPlace && currentPlace.currentTemperature) {
        return currentPlace;
      } else {
        store.dispatch(CurrentPlaceActions.getCurrentPlaceCurrentWeather({ key: currentPlace.key }));
        store.dispatch(CurrentPlaceActions.getPredictWeatherByDays({ key: currentPlace.key }));
        return currentPlace;
      }
    }));
};

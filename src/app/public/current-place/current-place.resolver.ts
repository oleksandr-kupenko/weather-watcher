import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, take } from 'rxjs';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectCurrentPlaceCurrentData, selectCurrentPlaceState } from './store/current-place.selectors';
import { CurrentPlaceActions } from './store/current-place.actions';
import { PlaceFabric, PlaceWithCurrentWeather } from '../public.interfaces';

export const currentPlaceResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {
  const store = inject(Store);
  const placeKeyFromRoute = route.params['key'];

  return store.select(selectCurrentPlaceCurrentData).pipe(
    take(1),
    map((currentPlace) => {
      if (placeKeyFromRoute && !currentPlace.key) {
        store.dispatch(CurrentPlaceActions.setCurrentPlace({ key: placeKeyFromRoute, name: null, countryData: null }));
        store.dispatch(CurrentPlaceActions.getCurrentPlaceLocationInfo({ key: placeKeyFromRoute }));

        store.dispatch(CurrentPlaceActions.getCurrentPlaceCurrentWeather({ key: placeKeyFromRoute }));
        store.dispatch(CurrentPlaceActions.getPredictWeatherByDays({ key: placeKeyFromRoute }));

        return new PlaceFabric(placeKeyFromRoute, null, null);
      }

      if (currentPlace.key) {
        store.dispatch(CurrentPlaceActions.getCurrentPlaceCurrentWeather({ key: currentPlace.key }));
        store.dispatch(CurrentPlaceActions.getPredictWeatherByDays({ key: currentPlace.key }));
        return currentPlace;
      } else {
        const defaultPlace = new PlaceFabric() as PlaceWithCurrentWeather;
        store.dispatch(
          CurrentPlaceActions.setCurrentPlace({
            key: defaultPlace.key,
            name: defaultPlace.name,
            countryData: defaultPlace.countryData,
          }),
        );

        store.dispatch(CurrentPlaceActions.getCurrentPlaceCurrentWeather({ key: defaultPlace.key as string }));
        store.dispatch(CurrentPlaceActions.getPredictWeatherByDays({ key: defaultPlace.key as string }));
        return defaultPlace;
      }
    }),
  );
};

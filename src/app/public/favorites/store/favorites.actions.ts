import { createAction, props } from '@ngrx/store';
import { CurrentWeather } from '../../current-place/components/current-weather/current-weather.interface';
import { PlaceWithCurrentWeather } from '../../public.interfaces';

export const FavoritesActions = {
  setPlace: createAction('[Favorites] Set place', props<{ places: PlaceWithCurrentWeather | PlaceWithCurrentWeather[], showNotification?: boolean }>()),
  removePlace: createAction('[Favorites] Remove place', props<{ key: string, showNotification?: boolean }>()),

  getFavoritesWeather: createAction('[Favorites] Get Favorites Weather', props<{ places: PlaceWithCurrentWeather[] }>()),

  favoritesWeatherLoadedSuccess: createAction(
    '[Favorites] FavoritesWeather Loaded Success',
    props<{ favoritesWeatherArr: PlaceWithCurrentWeather[] }>(),
  ),

  favoritesWeatherLoadedFailure: createAction(
    '[Favorites] FavoritesWeather Loaded Failure',
    props<{ error: string }>(),
  ),

  favoritesListSavedSuccess: createAction(
    '[Favorites] Favorites List Saved Success',
    props<{ action: 'add' | 'remove' }>(),
  ),

  favoritesListSavedFailure: createAction(
    '[Favorites] Favorites List Saved Failure',
    props<{ error: string }>(),
  ),
};

import { createAction, props } from '@ngrx/store';
import { WeatherForecast } from '../../current-place/components/prediction-weather/prediction-weater.interfaces';

export const FavoritesActions = {
  setPlace: createAction('[Favorites] Set place', props<{ key: string }>()),
  removePlace: createAction('[Favorites] Remove place', props<{ key: string }>()),

  getFavoritesWeather: createAction('[Favorites] Get Favorites Weather', props<{ keys: string[] }>()),

  favoritesWeatherLoadedSuccess: createAction(
    '[Favorites] FavoritesWeather Loaded Success',
    props<{ predictedWeather: WeatherForecast }>(),
  ),

  favoritesWeatherLoadedFailure: createAction(
    '[Current Placer] FavoritesWeather Loaded Failure',
    props<{ error: string }>(),
  ),
};

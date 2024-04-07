import { createAction, props } from '@ngrx/store';
import { CurrentWeather } from '../components/current-weather/current-weather.interface';
import { CountryData } from '../components/search-autocomplete/search-autocomplete.interfaces';

export const CurrentPlaceReducers = {
  currentPlaceDataLoading: createAction('[Current Placer] Current Place Data Loading', props<{ isLoading: boolean }>()),

  setCurrentPlace: createAction(
    '[Current Placer] Set Current Place Key',
    props<{ key: string; name: string; countryData: CountryData }>(),
  ),

  currentPlaceKeyLoadedSuccess: createAction(
    '[Current Placer] Current Place Loaded Success',
    props<{ currentPlaceDetails: CurrentWeather }>(),
  ),

  currentPlaceKeyLoadedFailure: createAction('[Current Placer] Current Place Loaded Failure', props<{ error: any }>()),

  getCurrentPlaceWeather: createAction('[Current Placer] Get Current Place Weather', props<{ key: string }>()),

  currentPlaceWeatherLoadedSuccess: createAction(
    '[Current Placer] Current Place Weather Loaded Success',
    props<{ currentWeather: CurrentWeather }>(),
  ),

  currentPlaceWeatherLoadedFailure: createAction(
    '[Current Placer] Current Place Weather Loaded Failure',
    props<{ error: any }>(),
  ),
};

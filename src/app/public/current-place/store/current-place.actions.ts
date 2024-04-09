import { createAction, props } from '@ngrx/store';
import { CurrentWeather, PlaceLocationInfo } from '../components/current-weather/current-weather.interface';
import { CountryData } from '../components/search-autocomplete/search-autocomplete.interfaces';
import {
  WeatherForecast,
  WeatherForecastResponse,
} from '../components/prediction-weather/prediction-weater.interfaces';
import { FORECAST_VIEW_TYPE } from '../components/prediction-weather-chart/prediction-weather-chart.interfaces';

export const CurrentPlaceActions = {
  currentPlaceDataLoading: createAction('[Current Placer] Current Place Data Loading', props<{ isLoading: boolean }>()),

  setCurrentPlace: createAction(
    '[Current Placer] Set Current Place Key',
    props<{ key: string; name: string | null; countryData: CountryData | null }>(),
  ),

  setToDefaultCurrentPlace: createAction('[Current Placer] Set to Default Current Place'),

  getCurrentPlaceLocationInfo: createAction(
    '[Current Placer] Get Current Place Location Info',
    props<{ key: string }>(),
  ),

  locationInfoLoadedSuccess: createAction(
    '[Current Placer] Location Info Loaded Success',
    props<{ locationInfo: PlaceLocationInfo }>(),
  ),

  locationInfoLoadedFailure: createAction('[Current Placer] Location Info Loaded Failure', props<{ error: string }>()),

  getCurrentPlaceCurrentWeather: createAction(
    '[Current Placer] Get Current Place Current Weather',
    props<{ key: string }>(),
  ),

  currentPlaceWeatherLoadedSuccess: createAction(
    '[Current Placer] Current Place Weather Loaded Success',
    props<{ currentWeather: CurrentWeather }>(),
  ),

  currentPlaceWeatherLoadedFailure: createAction(
    '[Current Placer] Current Place Weather Loaded Failure',
    props<{ error: string }>(),
  ),

  getPredictWeatherByDays: createAction('[Current Placer] Get Predict Weather by Days', props<{ key: string }>()),

  predictWeatherByDaysLoadedSuccess: createAction(
    '[Current Placer] Predict Weather by Days Loaded Success',
    props<{ predictedWeather: WeatherForecast }>(),
  ),

  predictWeatherByDaysLoadedFailure: createAction(
    '[Current Placer] Predict Weather by Days Loaded Failure',
    props<{ error: string }>(),
  ),

  setPredictionDataDisplayType: createAction(
    '[Current Placer] Set Prediction Data Type',
    props<{ displayType: FORECAST_VIEW_TYPE }>(),
  ),
};

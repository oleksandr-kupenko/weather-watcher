import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from './weather.reducer';

export const selectWeatherState = createFeatureSelector<WeatherState>('weather');

export const selectCurrentWeather = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.currentWeather
);

export const selectForecast = createSelector(
  selectWeatherState,
  (state: WeatherState) => state.forecast
);

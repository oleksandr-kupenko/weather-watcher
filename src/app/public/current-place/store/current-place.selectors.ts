import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrentPlaceState, currentPlaceFeatureKey } from './current-place.reducer';
import { CurrentPlaceWithWeather } from '../components/current-weather/current-weather.interface';
import { WeatherForecast } from '../components/prediction-weather/prediction-weater.interfaces';

export const selectCurrentPlaceState = createFeatureSelector<CurrentPlaceState>(currentPlaceFeatureKey);

export const selectCurrentPlaceCurrentData = createSelector(
  selectCurrentPlaceState,
  (state): CurrentPlaceWithWeather => {
    return {
      key: state.placeKey,
      currentTemperature: state.currentData.temperature,
      name: state.name,
      iconNumber: state.currentData.iconNumber,
      countryData: state.countryData,
      description: state.currentData.description,
    };
  },
);

export const selectCurrentPlacePredictedData = createSelector(
  selectCurrentPlaceState,
  (state): WeatherForecast | null => {
    return state.predictionDataByDays;
  },
);

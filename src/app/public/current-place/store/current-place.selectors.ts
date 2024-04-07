import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrentPlaceState, currentPlayFeatureKey } from './current-place.reducer';
import { CurrentPlaceWithWeather } from '../components/current-weather/current-weather.interface';

export const selectCurrentPlaceState = createFeatureSelector<CurrentPlaceState>(currentPlayFeatureKey);

export const selectCurrentPlaceCurrentData = createSelector(
  selectCurrentPlaceState,
  (state): CurrentPlaceWithWeather => {
    return {
      key: state.placeKey,
      currentTemperature: state.currentData.temperature,
      name: state.name,
      iconNumber: state.currentData.iconNumber,
      countryData: state.countryData,
    };
  },
);

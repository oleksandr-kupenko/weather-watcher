import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CurrentPlaceState, currentPlaceFeatureKey } from './current-place.reducer';
import { WeatherForecast } from '../components/prediction-weather/prediction-weater.interfaces';
import { FORECAST_VIEW_TYPE } from '../components/prediction-weather-chart/prediction-weather-chart.interfaces';
import { PlaceWithCurrentWeather } from '../../public.interfaces';

export const selectCurrentPlaceState = createFeatureSelector<CurrentPlaceState>(currentPlaceFeatureKey);

export const selectCurrentPlaceCurrentData = createSelector(
  selectCurrentPlaceState,
  (state): PlaceWithCurrentWeather => {
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

export const selectForecastViewType = createSelector(
  selectCurrentPlaceState,
  (state): FORECAST_VIEW_TYPE => {
    return state.displayForecastType;
  },
);

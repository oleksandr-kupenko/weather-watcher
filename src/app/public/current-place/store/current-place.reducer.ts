import { ActionReducer, createReducer, on } from '@ngrx/store';
import { CurrentPlaceActions } from './current-place.actions';
import { WeatherForecast } from '../components/prediction-weather/prediction-weater.interfaces';
import { FORECAST_VIEW_TYPE } from '../components/prediction-weather-chart/prediction-weather-chart.interfaces';
import { PlaceFabric, PlaceWithCurrentWeather, PlaceWithCurrentWeatherWithoutKey } from '../../public.interfaces';

export interface CurrentPlaceState {
  isCurrentPlaceCurrentWeatherLoading: boolean;
  isPredictionDataLoading: boolean;
  isLocationDataLoading: boolean;
  placeCurrentData: PlaceWithCurrentWeatherWithoutKey;
  predictionDataByDays: WeatherForecast | null;
  displayForecastType: FORECAST_VIEW_TYPE;
}
export const initialState: CurrentPlaceState = {
  isCurrentPlaceCurrentWeatherLoading: false,
  isPredictionDataLoading: false,
  isLocationDataLoading: false,
  placeCurrentData: new PlaceFabric(null, null, null),
  predictionDataByDays: null,
  displayForecastType: FORECAST_VIEW_TYPE.cards,
};

export const currentPlaceReducer: ActionReducer<CurrentPlaceState> = createReducer(
  initialState,
  on(CurrentPlaceActions.setCurrentPlace, (state, { key, name, countryData }) => ({
    ...state,
    placeCurrentData: {
      ...state.placeCurrentData,
      key,
      name: name ? name : '',
      countryData: countryData ? countryData : initialState.placeCurrentData.countryData,
    },
  })),

  //location
  on(CurrentPlaceActions.getCurrentPlaceLocationInfo, (state) => ({ ...state, isLocationDataLoading: true })),
  on(CurrentPlaceActions.locationInfoLoadedSuccess, (state, { locationInfo }) => ({
    ...state,
    placeCurrentData: {
      ...state.placeCurrentData,
      name: locationInfo.LocalizedName,
      countryData: { ID: locationInfo.Country.ID, LocalizedName: locationInfo.Country.LocalizedName },
      key: locationInfo.Key,
    },
    isLocationDataLoading: false,
  })),
  on(CurrentPlaceActions.locationInfoLoadedFailure, (state) => ({ ...state, isLocationDataLoading: false })),

  //current weather
  on(CurrentPlaceActions.getCurrentPlaceCurrentWeather, (state) => ({
    ...state,
    isCurrentPlaceCurrentWeatherLoading: true,
  })),
  on(CurrentPlaceActions.currentPlaceWeatherLoadedSuccess, (state, { currentWeather }) => ({
    ...state,
    isCurrentPlaceCurrentWeatherLoading: false,
    placeCurrentData: {
      ...state.placeCurrentData,
      iconNumber: currentWeather.WeatherIcon,
      currentTemperature: currentWeather.Temperature.Metric.Value,
      description: currentWeather.WeatherText,
    },
  })),
  on(CurrentPlaceActions.currentPlaceWeatherLoadedFailure, (state) => ({
    ...state,
    isCurrentPlaceCurrentWeatherLoading: false,
  })),

  // forecast weather
  on(CurrentPlaceActions.getPredictWeatherByDays, (state) => ({ ...state, isPredictionDataLoading: true })),
  on(CurrentPlaceActions.predictWeatherByDaysLoadedSuccess, (state, { predictedWeather }) => ({
    ...state,
    predictionDataByDays: predictedWeather,
    isPredictionDataLoading: false,
  })),
  on(CurrentPlaceActions.predictWeatherByDaysLoadedFailure, (state) => ({ ...state, isPredictionDataLoading: false })),

  //change prediction view type
  on(CurrentPlaceActions.setPredictionDataDisplayType, (state, { displayType }) => ({
    ...state,
    displayForecastType: displayType,
  })),
);

export const currentPlaceFeatureKey = 'CurrentPlaceState';

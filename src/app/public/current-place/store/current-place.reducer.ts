import { Action, createReducer, on } from '@ngrx/store';
import { CurrentPlaceReducers } from './current-place.actions';
import { CountryData } from '../components/search-autocomplete/search-autocomplete.interfaces';
import { WeatherForecast } from '../components/prediction-weather/prediction-weater.interfaces';

export interface CurrentPlaceState {
  isCurrentPlaceDataLoading: boolean;
  placeKey: string;
  name: string;
  countryData: CountryData;
  currentData: {
    iconNumber: number | null;
    temperature: number | null;
    description: string | null;
  };
  predictionDataByDay: WeatherForecast | null;
}

export const initialState: CurrentPlaceState = {
  isCurrentPlaceDataLoading: false,
  placeKey: '324505',
  name: 'Kyiv',
  countryData: { ID: 'ua', LocalizedName: 'Ukraine' },
  currentData: {
    iconNumber: null,
    temperature: null,
    description: null,
  },
  predictionDataByDay: null,
};

export const currentPlaceReducer = createReducer(
  initialState,
  on(CurrentPlaceReducers.setCurrentPlace, (state, { key, name, countryData }) => ({
    ...state,
    placeKey: key,
    name,
    countryData,
  })),
  on(CurrentPlaceReducers.getCurrentPlaceCurrentWeather, (state) => ({ ...state, isPlaceWeatherLoading: true })),
  on(CurrentPlaceReducers.currentPlaceWeatherLoadedSuccess, (state, { currentWeather }) => ({
    ...state,
    isPlaceWeatherLoading: false,
    currentData: {
      ...state.currentData,
      iconNumber: currentWeather.WeatherIcon,
      temperature: currentWeather.Temperature.Metric.Value,
      description: currentWeather.WeatherText,
    },
  })),
  on(CurrentPlaceReducers.predictWeatherByDaysLoadedSuccess, (state, { predictedWeather }) => ({
    ...state,
   predictionDataByDay: predictedWeather,
  })),
);

export const currentPlayFeatureKey = 'CurrentPlaceState';

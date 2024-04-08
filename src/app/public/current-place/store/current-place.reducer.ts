import { Action, createReducer, on } from '@ngrx/store';
import { CurrentPlaceActions } from './current-place.actions';
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
  predictionDataByDays: WeatherForecast | null;
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
  predictionDataByDays: null,
};

export const currentPlaceReducer = createReducer(
  initialState,
  on(CurrentPlaceActions.setCurrentPlace, (state, { key, name, countryData }) => ({
    ...state,
    placeKey: key,
    name,
    countryData,
  })),
  on(CurrentPlaceActions.getCurrentPlaceCurrentWeather, (state) => ({ ...state, isPlaceWeatherLoading: true })),
  on(CurrentPlaceActions.currentPlaceWeatherLoadedSuccess, (state, { currentWeather }) => ({
    ...state,
    isPlaceWeatherLoading: false,
    currentData: {
      ...state.currentData,
      iconNumber: currentWeather.WeatherIcon,
      temperature: currentWeather.Temperature.Metric.Value,
      description: currentWeather.WeatherText,
    },
  })),
  on(CurrentPlaceActions.predictWeatherByDaysLoadedSuccess, (state, { predictedWeather }) => ({
    ...state,
   predictionDataByDays: predictedWeather,
  })),
);

export const currentPlaceFeatureKey = 'CurrentPlaceState';

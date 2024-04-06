import { Action, createReducer, on } from '@ngrx/store';
import {setWeatherLoading} from "./weather.actions";
//import * as WeatherActions from './weather.actions';

export interface WeatherState {
  isWeatherLoading: boolean;
  currentWeather: any;
  forecast: any[];
}

export const initialState: WeatherState = {
  isWeatherLoading: false,
  currentWeather: null,
  forecast: []
};

export const weatherReducer = createReducer(
  initialState,
  on(setWeatherLoading, (state, { isLoading }) => ({ ...state, isWeatherLoading: isLoading }))
);

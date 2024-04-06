import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { locationsReducer, LocationsState } from '../public/store/locations/locations.reducer';
import { weatherReducer, WeatherState } from '../public/store/weather/weather.reducer';
import { uiReducer, UiState } from '../public/store/ui/ui.reducer';

export interface AppState {
  locations: LocationsState;
  weather: WeatherState;
  ui: UiState;
}

export const appReducer: ActionReducerMap<AppState> = {
  locations: locationsReducer,
  weather: weatherReducer,
  ui: uiReducer
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];

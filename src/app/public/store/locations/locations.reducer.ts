import { Action, createReducer, on } from '@ngrx/store';
//import * as LocationsActions from './locations.actions';

export interface LocationsState {
  searchResults: any[];
  selectedLocation: any;
  favoriteLocations: any[];
}

export const initialState: LocationsState = {
  searchResults: [],
  selectedLocation: null,
  favoriteLocations: []
};

export const locationsReducer = createReducer(
  initialState,
  // Add your reducer cases here
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LocationsState } from './locations.reducer';

export const selectLocationsState = createFeatureSelector<LocationsState>('locations');

export const selectSearchResults = createSelector(
  selectLocationsState,
  (state: LocationsState) => state.searchResults
);

export const selectSelectedLocation = createSelector(
  selectLocationsState,
  (state: LocationsState) => state.selectedLocation
);

export const selectFavoriteLocations = createSelector(
  selectLocationsState,
  (state: LocationsState) => state.favoriteLocations
);

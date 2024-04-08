import { createFeatureSelector, createSelector } from '@ngrx/store';
import { favoritesFeatureKey, FavoritesState } from './favorites.reducer';
import { CurrentPlaceWithWeather } from '../../current-place/components/current-weather/current-weather.interface';

export const selectFavoritesState = createFeatureSelector<FavoritesState>(favoritesFeatureKey);

export const selectFavoritesKeys = createSelector(
  selectFavoritesState,
  (state): string[] => {
    return state.favoritesKeys;
  },
);

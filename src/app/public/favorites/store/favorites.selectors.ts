import { createFeatureSelector, createSelector } from '@ngrx/store';
import { favoritesFeatureKey, FavoritesState } from './favorites.reducer';
import { PlaceWithCurrentWeather } from '../../public.interfaces';
import { selectCurrentPlaceState } from '../../current-place/store/current-place.selectors';

export const selectFavoritesState = createFeatureSelector<FavoritesState>(favoritesFeatureKey);

export const selectFavoritesPlaces = createSelector(
  selectFavoritesState,
  (state): PlaceWithCurrentWeather[] => {
    return state.favoritePlacesWithWeather;
  },
);

export const selectFavoritePlace = (key: string) => createSelector(
  selectFavoritesState,
  (state): PlaceWithCurrentWeather | undefined => {
    return state.favoritePlacesWithWeather.find(place => place.key === key);
  },
);

export const selectIsFavorite = createSelector(
  selectFavoritesState,
  selectCurrentPlaceState,
  (favoritesState, currentPlaceSate): boolean => {
    return favoritesState.favoritePlacesWithWeather.some(place => place.key === currentPlaceSate.placeCurrentData.key);
  },
);

export const selectFavoriteLoadingStatus = createSelector(
  selectFavoritesState,
  (state): boolean => {
    return state.isFavoritesLoading;
  },
);

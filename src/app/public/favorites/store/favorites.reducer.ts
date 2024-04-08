import { createReducer, on } from '@ngrx/store';
import { CurrentPlaceActions } from '../../current-place/store/current-place.actions';
import { FavoritesActions } from './favorites.actions';

export interface FavoritesState {
  isFavoritesLoading: boolean;
  favoritesKeys: string[];
}

export const initialState: FavoritesState = {
  isFavoritesLoading: false,
  favoritesKeys: []
};

export const favoritesReducer = createReducer(
  initialState,
  on(FavoritesActions.setPlace, (state, { key }) => ({
    ...state,
    favoritesKeys: [...state.favoritesKeys, key],
  })),
  on(FavoritesActions.removePlace, (state, { key }) => ({
    ...state,
    favoritesKeys: state.favoritesKeys.filter(placeKey => placeKey !== key),
  })),
);

export const favoritesFeatureKey = 'FavoritesState';

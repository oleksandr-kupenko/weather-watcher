import { createReducer, on } from '@ngrx/store';
import { FavoritesActions } from './favorites.actions';
import { PlaceWithCurrentWeather } from '../../public.interfaces';

export interface FavoritesState {
  isFavoritesLoading: boolean;
  favoritePlacesWithWeather: PlaceWithCurrentWeather[];
}

export const initialState: FavoritesState = {
  isFavoritesLoading: false,
  favoritePlacesWithWeather: [],
};

export const favoritesReducer = createReducer(
  initialState,
  on(FavoritesActions.setPlace, (state, { places }) => ({
    ...state,
    favoritePlacesWithWeather: places instanceof Array ? [...state.favoritePlacesWithWeather, ...places] : [...state.favoritePlacesWithWeather, places],
  })),
  on(FavoritesActions.removePlace, (state, { key }) => ({
    ...state,
    favoritePlacesWithWeather: state.favoritePlacesWithWeather.filter(place => place.key !== key),
  })),
);

export const favoritesFeatureKey = 'FavoritesState';

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

  //add or remove
  on(FavoritesActions.setPlace, (state, { places }) => ({
    ...state,
    favoritePlacesWithWeather: places instanceof Array ? [...state.favoritePlacesWithWeather, ...places] : [...state.favoritePlacesWithWeather, places],
  })),
  on(FavoritesActions.removePlace, (state, { key }) => {
     return ({
        ...state,
        favoritePlacesWithWeather: state.favoritePlacesWithWeather.filter(place => place.key !== key)
      });
    }
  ),

  // loading
  on(FavoritesActions.getFavoritesWeather, (state) => {
      return ({
        ...state,
        isFavoritesLoading: true
      });
    }
  ),
  on(FavoritesActions.favoritesWeatherLoadedSuccess, (state) => {
    return ({
      ...state,
      isFavoritesLoading: false
    });
  }),
  on(FavoritesActions.favoritesWeatherLoadedFailure, (state) => {
    return ({
      ...state,
      isFavoritesLoading: false
    });
  }),
);

export const favoritesFeatureKey = 'FavoritesState';

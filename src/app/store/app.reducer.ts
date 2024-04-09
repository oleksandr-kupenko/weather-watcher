import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { currentPlaceFeatureKey, CurrentPlaceState } from '../public/current-place/store/current-place.reducer';
import { favoritesFeatureKey, FavoritesState } from '../public/favorites/store/favorites.reducer';
import {
  uiSettingsFeatureKey,
  uiSettingsReducer,
  UiSettingsState,
} from '../public/shared/ui-settings/store/ui-settings.reducer';

export interface AppState {
  [currentPlaceFeatureKey]?: CurrentPlaceState;
  [favoritesFeatureKey]?: FavoritesState;
  [uiSettingsFeatureKey]: UiSettingsState;
}

export const apiReducers: ActionReducerMap<AppState> = {
  [uiSettingsFeatureKey]: uiSettingsReducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];

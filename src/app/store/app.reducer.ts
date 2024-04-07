import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import {
  currentPlaceReducer,
  currentPlayFeatureKey,
  CurrentPlaceState,
} from '../public/current-place/store/current-place.reducer';

export interface AppState {
  [currentPlayFeatureKey]: CurrentPlaceState;
}

export const appReducer: ActionReducerMap<AppState> = {
  [currentPlayFeatureKey]: currentPlaceReducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState } from './ui.reducer';

export const selectUiState = createFeatureSelector<UiState>('ui');

export const selectUnitSystem = createSelector(
  selectUiState,
  (state: UiState) => state.unitSystem
);

export const selectTheme = createSelector(
  selectUiState,
  (state: UiState) => state.theme
);

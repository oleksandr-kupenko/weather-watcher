import { createFeatureSelector, createSelector } from '@ngrx/store';
import { uiSettingsFeatureKey, UiSettingsState } from './ui-settings.reducer';

export const selectUiState = createFeatureSelector<UiSettingsState>(uiSettingsFeatureKey);

export const selectDarkModeStatus = createSelector(selectUiState, (state): boolean | null => {
  return state.isDarkMode;
});

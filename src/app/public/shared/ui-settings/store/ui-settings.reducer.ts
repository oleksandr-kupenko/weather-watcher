import { ActionReducer, createReducer, on } from '@ngrx/store';
import { UiSettingsActions } from './ui-settings.actions';

export interface UiSettingsState {
  isDarkMode: boolean | null;
}
export const initialState: UiSettingsState = {
  isDarkMode: null,
};

export const uiSettingsReducer: ActionReducer<UiSettingsState> = createReducer(
  initialState,
  on(UiSettingsActions.setDarkModeStatus, (state, { status }) => ({ ...state, isDarkMode: status })),
);

export const uiSettingsFeatureKey = 'UiSettingsState';

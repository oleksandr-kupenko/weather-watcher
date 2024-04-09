import { createAction, props } from '@ngrx/store';

export const UiSettingsActions = {
  setDarkModeStatus: createAction('[UI Settings] Set Dark Mode Status', props<{ status: boolean }>()),

  darkModeStatusSavedSuccess: createAction('[Favorites] Dark Mode Status Saved Success'),

  darkModeStatusSavedFailure: createAction('[Favorites] Dark Mode Status Saved Failure', props<{ error: string }>()),
};

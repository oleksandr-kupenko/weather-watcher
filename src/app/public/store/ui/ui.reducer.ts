import { Action, createReducer, on } from '@ngrx/store';
//import * as UiActions from './ui.actions';

export interface UiState {
  unitSystem: string;
  theme: string;
}

export const initialState: UiState = {
  unitSystem: 'metric',
  theme: 'light'
};

export const uiReducer = createReducer(
  initialState,
  // Add your reducer cases here
);

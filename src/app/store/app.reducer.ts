import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';


export interface AppState {

}


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];

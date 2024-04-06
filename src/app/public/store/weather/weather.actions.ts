import {createAction} from "@ngrx/store";

export const setWeatherLoading = createAction('[Weather] Set Weather Loading', (isLoading: boolean) => ({ isLoading }));

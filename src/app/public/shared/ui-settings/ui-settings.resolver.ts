import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, take } from 'rxjs';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectDarkModeStatus } from './store/ui-serrings.selectors';
import { UiSettingsService } from './ui-settings.service';
import { UiSettingsActions } from './store/ui-settings.actions';

export const uiSettingsResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> => {
  const store = inject(Store);
  const uiSettingsService = inject(UiSettingsService);

  return store.select(selectDarkModeStatus).pipe(
    take(1),
    map((isDarkTheme) => {
      if (isDarkTheme != null) {
        return isDarkTheme;
      } else {
        const savedDarkModeStatus = uiSettingsService.getSavedDarkModeStatus();
        if (savedDarkModeStatus) {
          store.dispatch(UiSettingsActions.setDarkModeStatus({ status: savedDarkModeStatus }));
          return savedDarkModeStatus;
        }
      }

      return isDarkTheme;
    }),
  );
};

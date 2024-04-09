import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { apiReducers } from './store/app.reducer';
import { provideEffects } from '@ngrx/effects';
import { UiSettingsEffects } from './public/shared/ui-settings/store/ui.settings.effects';
import { authenticationInterceptor } from './public/shared/interceptors/api-key.interceptor';
import { errorsInterceptor } from './public/shared/interceptors/errors.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authenticationInterceptor, errorsInterceptor])),
    provideRouter(routes),
    provideStore(apiReducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    provideEffects(UiSettingsEffects),
    importProvidersFrom(HttpClientModule, StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })),
    provideAnimationsAsync(),
  ],
};

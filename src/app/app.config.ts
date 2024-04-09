import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { apiReducers } from './store/app.reducer';
import { provideEffects } from '@ngrx/effects';
import { UiSettingsEffects } from './public/shared/ui-settings/store/ui.settings.effects';
import { authenticationInterceptor } from './public/shared/interceptors/api-key.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(apiReducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useValue: authenticationInterceptor,
      multi: true,
    },
    provideEffects(UiSettingsEffects),
    importProvidersFrom(HttpClientModule, StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })),
    provideAnimationsAsync(),
  ],
};

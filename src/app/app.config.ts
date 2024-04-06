import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {StoreModule} from "@ngrx/store";
import {appReducer} from "./store/app.reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    importProvidersFrom(
      StoreModule.forRoot(appReducer, {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        }
      }),
      StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()})
    ), provideAnimationsAsync()
  ]
};

import { HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';

import { environment } from '@environments/environment';

let apiKeyIndex = 0;

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const currentApiKey = getApiKey();
  const modifiedReq = req.clone({
    params: req.params.set('apikey', currentApiKey),
  });

  function getApiKey(): string {
    if (Array.isArray(environment.apiKey)) {
      const key = environment.apiKey[apiKeyIndex];
      apiKeyIndex = environment.apiKey.length - 1 <= apiKeyIndex ? 0 : apiKeyIndex + 1;
      return key;
    } else {
      return environment.apiKey;
    }
  }

  return next(modifiedReq);
};

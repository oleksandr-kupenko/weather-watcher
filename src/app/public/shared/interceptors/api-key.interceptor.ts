import { HttpRequest, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';

import { environment } from '@environments/environment';

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const apiKey = environment.apiKey;
  const modifiedReq = req.clone({
    params: req.params.set('apikey', apiKey),
  });

  return next(modifiedReq);
};

import { HttpInterceptorFn, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';

import { environment } from '@environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { NotificationService } from '../notification.service';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        notificationService.showNotification('Problem with api key', 'error');
      } else {
        notificationService.showNotification('Error: ' + error.message, 'error');
      }
      console.error(error);
      return throwError(() => error);
    }),
  );
};

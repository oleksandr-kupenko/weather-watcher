import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showNotification(message: string, type: 'info' | 'error' | 'warning' | 'success') {
    const config: MatSnackBarConfig = {
      duration: 3000,
      panelClass: this.getSnackBarClass(type),
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    };

    this.snackBar.open(message, 'Close', config);
  }

  private getSnackBarClass(type: string): string {
    switch (type) {
      case 'info':
        return 'snackbar-info';
      case 'error':
        return 'snackbar-error';
      case 'warning':
        return 'snackbar-warning';
      case 'success':
        return 'snackbar-success';
      default:
        return '';
    }
  }
}

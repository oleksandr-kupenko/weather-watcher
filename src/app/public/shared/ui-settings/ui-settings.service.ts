import { Injectable } from '@angular/core';
import { PlaceWithCurrentWeather } from '../../public.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UiSettingsService {
  getSavedDarkModeStatus(): boolean | null {
    const savedFavorites = localStorage.getItem('isDarkModeEnabled');
    if (savedFavorites) {
      return JSON.parse(savedFavorites);
    } else {
      return null;
    }
  }

  saveDarkModeStatus(status: boolean) {
    localStorage.setItem('isDarkModeEnabled', JSON.stringify(status));
  }
}

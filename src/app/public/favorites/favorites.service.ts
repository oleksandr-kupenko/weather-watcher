import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, forkJoin, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { PublicService } from '../public.service';
import { PlaceWithCurrentWeather } from '../public.interfaces';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private publicService: PublicService) {}

  getCurrentFavoritesCurrentWeather(favoritePlaces: PlaceWithCurrentWeather[]): Observable<PlaceWithCurrentWeather[]> {
    const requests = favoritePlaces.map((place) =>
      this.publicService.getPlaceWeather(place.key).pipe(
        map((response) => {
          return {
            ...place,
            currentTemperature: response.Temperature.Metric.Value,
            iconNumber: response.WeatherIcon,
            description: response.WeatherText,
          };
        }),
      ),
    );
    return forkJoin(requests);
  }

  getSavedFavoritesPlaces(): PlaceWithCurrentWeather[] | null {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      return JSON.parse(savedFavorites);
    } else {
      return null;
    }
  }

  saveFavoritesToStore(favorites: PlaceWithCurrentWeather[]) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

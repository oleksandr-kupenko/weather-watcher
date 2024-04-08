import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PublicService } from '../public.service';
import { PlaceWithCurrentWeather } from '../public.interfaces';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private apiKey = 'YOUR_API_KEY';
  private baseUrl = 'http://dataservice.accuweather.com';

  constructor(private http: HttpClient, private publicService: PublicService) { }

  getCurrentWeatherList(favoritePlaces: PlaceWithCurrentWeather[]): Observable<PlaceWithCurrentWeather[]> {
    const requests = favoritePlaces.map(place => this.publicService.getPlaceWeather(place.key).pipe(
      map(response => {
        return {
          ...place,
          currentTemperature: response.Temperature.Metric.Value,
          iconNumber: response.WeatherIcon,
          description: response.WeatherText
        };
      })
    ));
    return forkJoin(requests).pipe(delay(1000));
  }

  getFavoritesFromStore(): PlaceWithCurrentWeather[] | null {
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

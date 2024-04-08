import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CurrentWeather } from './current-place/components/current-weather/current-weather.interface';
import { currentPlaceMock } from './current-place/current-place.mock';
import { PlaceWithCurrentWeather } from './public.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private readonly API_KEY = 'YOUR_ACCUWEATHER_API_KEY';
  private readonly BASE_URL = 'https://dataservice.accuweather.com';

  constructor(private http: HttpClient) {}
  private apiKey = 'YOUR_API_KEY';
  private baseUrl = 'http://dataservice.accuweather.com';
  getPlaceWeather(locationKey: string): Observable<CurrentWeather> {
    const url = `${this.baseUrl}/currentconditions/v1/${locationKey}?apikey=${this.apiKey}`;
    return of(currentPlaceMock[0]);
    //return this.http.get<CurrentWeather[]>(url).pipe(map((data) => data[0]));
  }
}

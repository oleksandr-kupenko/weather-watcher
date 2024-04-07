import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentWeather } from './components/current-weather/current-weather.interface';
import { currentPlaceMock } from './current-place.mock';

@Injectable({
  providedIn: 'root',
})
export class CurrentPlaceService {
  private apiKey = 'ur2EzZIFTszrCMATM2goNKe9e3H4BJqy';
  private baseUrl = 'http://dataservice.accuweather.com';

  constructor(private http: HttpClient) {}

  getCurrentWeather(locationKey: string): Observable<CurrentWeather> {
    const url = `${this.baseUrl}/currentconditions/v1/${locationKey}?apikey=${this.apiKey}`;
    return of(currentPlaceMock[0]);
    //return this.http.get<CurrentWeather[]>(url).pipe(map((data) => data[0]));
  }
}

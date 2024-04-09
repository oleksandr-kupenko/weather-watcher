import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CurrentWeather } from './current-place/components/current-weather/current-weather.interface';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  getPlaceWeather(locationKey: string): Observable<CurrentWeather> {
    const url = `${this.apiBaseUrl}/currentconditions/v1/${locationKey}`;
    return this.http.get<CurrentWeather[]>(url).pipe(map((data) => data[0]));
  }
}

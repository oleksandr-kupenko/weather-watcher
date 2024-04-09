import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlaceLocationInfo } from './components/current-weather/current-weather.interface';

import {
  ForecastDay,
  WeatherForecast,
  WeatherForecastResponse,
} from './components/prediction-weather/prediction-weater.interfaces';
import { predictionMock } from './components/prediction-weather/prediction.mock';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrentPlaceService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getPlaceLocationData(locationKey: string): Observable<PlaceLocationInfo> {
    const url = `${this.baseUrl}/locations/v1/${locationKey}`;

    return this.http.get<PlaceLocationInfo>(url);
  }

  getCurrentPredictedWeatherByDays(locationKey: string): Observable<WeatherForecast> {
    const url = `${this.baseUrl}/forecasts/v1/daily/5day/${locationKey}?&metric=true`;
    return this.http.get<WeatherForecastResponse>(url).pipe(
      map((data) => {
        return {
          description: data.Headline.Text,
          forecast: this.forecastToArrayAdapter(data),
        };
      }),
    );
  }

  private forecastToArrayAdapter(forecast: WeatherForecastResponse): ForecastDay[] {
    return forecast.DailyForecasts.map((dailyForecast) => {
      return {
        date: dailyForecast.EpochDate * 1000,
        minTemperature: dailyForecast.Temperature.Minimum.Value,
        maxTemperature: dailyForecast.Temperature.Maximum.Value,
        dayInfo: {
          description: dailyForecast.Day.IconPhrase,
          iconNumber: dailyForecast.Day.Icon,
        },
        nightInfo: {
          description: dailyForecast.Night.IconPhrase,
          iconNumber: dailyForecast.Night.Icon,
        },
      };
    });
  }
}

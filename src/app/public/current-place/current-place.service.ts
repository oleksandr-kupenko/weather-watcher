import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentWeather } from './components/current-weather/current-weather.interface';
import { currentPlaceMock } from './current-place.mock';
import {
  ForecastDay,
  ForecastPartDay, WeatherForecast,
  WeatherForecastResponse
} from './components/prediction-weather/prediction-weater.interfaces';
import { predictionMock } from './components/prediction-weather/prediction.mock';

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

  getCurrentPredictedWeatherByDays(locationKey: string): Observable<WeatherForecast> {
    const url = `${this.baseUrl}/forecasts/v1/daily/5day/${locationKey}?&metric=true&apikey=${this.apiKey}`;
    return of(predictionMock).pipe(map((data) => {
      return {
        description: data.Headline.Text,
        forecast: this.forecastToArrayAdapter(data)
      }
    }))

    // return this.http.get<WeatherForecastResponse>(url).pipe(map((data) => {
    //   return {
    //     description: data.Headline.Text,
    //     forecast: this.forecastToArrayAdapter(data)
    //   }
    // }))
  }

  private forecastToArrayAdapter(forecast: WeatherForecastResponse): ForecastDay[] {

   return  forecast.DailyForecasts.map(dailyForecast => {
      return {
        date: dailyForecast.EpochDate * 1000,
        minTemperature: dailyForecast.Temperature.Minimum.Value,
        maxTemperature: dailyForecast.Temperature.Maximum.Value,
        dayInfo: {
          description: dailyForecast.Day.IconPhrase,
          iconNumber: dailyForecast.Day.Icon
        },
        nightInfo: {
          description: dailyForecast.Night.IconPhrase,
          iconNumber: dailyForecast.Night.Icon
        }
      }
    })
  }
}

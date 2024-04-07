import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchAutocompleteComponent } from './components/search-autocomplete/search-autocomplete.component';
import { CurrentPlaceService } from './current-place.service';
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { Store } from '@ngrx/store';
import { PlaceAutoCompletePrediction } from './components/search-autocomplete/search-autocomplete.interfaces';
import { CurrentPlaceReducers } from './store/current-place.actions';
import { PredictionWeatherComponent } from './components/prediction-weather/prediction-weather.component';
import {
  PredictionWeatherChartComponent
} from './components/prediction-weather-chart/prediction-weather-chart.component';

@Component({
  selector: 'app-current-place',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    MatFormFieldModule,
    RouterModule,
    SearchAutocompleteComponent,
    CurrentWeatherComponent,
    PredictionWeatherComponent,
    PredictionWeatherChartComponent
  ],
  templateUrl: './current-place.component.html',
  styleUrl: './current-place.component.scss',
})
export class CurrentPlaceComponent {
  public isForecastChart = false;

  constructor(
    private placeDetailsService: CurrentPlaceService,
    private store: Store,
  ) {}

  public handlePlaceSelected(place: PlaceAutoCompletePrediction) {
    this.store.dispatch(
      CurrentPlaceReducers.setCurrentPlace({
        key: place.Key,
        name: place.LocalizedName,
        countryData: place.Country,
      }),
    );

    this.store.dispatch(CurrentPlaceReducers.getCurrentPlaceCurrentWeather({ key: place.Key }));
    this.store.dispatch(CurrentPlaceReducers.getPredictWeatherByDays({ key: place.Key }));
  }

  public handleIsForecastChart(value: boolean) {
    this.isForecastChart = !this.isForecastChart;
  }
}

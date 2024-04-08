import { Component, DestroyRef, inject, OnInit } from '@angular/core';
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
import { CurrentPlaceActions } from './store/current-place.actions';
import { PredictionWeatherComponent } from './components/prediction-weather/prediction-weather.component';
import {
  PredictionWeatherChartComponent
} from './components/prediction-weather-chart/prediction-weather-chart.component';
import { FavoritesActions } from '../favorites/store/favorites.actions';
import { Observable } from 'rxjs';
import { selectFavoritesKeys } from '../favorites/store/favorites.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FORECAST_VIEW_TYPE } from './components/prediction-weather-chart/prediction-weather-chart.interfaces';
import { selectForecastViewType } from './store/current-place.selectors';

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
export class CurrentPlaceComponent implements OnInit{
  public isForecastChart = false;
  public isFavoritePlace = false;
  public forecastDisplayType: FORECAST_VIEW_TYPE = FORECAST_VIEW_TYPE.cards;

  private currentPlaceKey = '';
  private destroyRef = inject(DestroyRef);

  constructor(
    private store: Store
  ) {}

  ngOnInit() {
    this.checkIsFavorite();
    this.getForecastViewType();
  }

  public handlePlaceSelected(place: PlaceAutoCompletePrediction) {
    this.currentPlaceKey = place.Key;
    this.store.dispatch(
      CurrentPlaceActions.setCurrentPlace({
        key: place.Key,
        name: place.LocalizedName,
        countryData: place.Country,
      }),
    );

    this.store.dispatch(CurrentPlaceActions.getCurrentPlaceCurrentWeather({ key: place.Key }));
    this.store.dispatch(CurrentPlaceActions.getPredictWeatherByDays({ key: place.Key }));
  }

  public handleIsForecastChart(value: boolean) {
    this.store.dispatch(CurrentPlaceActions
      .setPredictionDataDisplayType({ displayType: this.isForecastChart ? FORECAST_VIEW_TYPE.chartDayNight : FORECAST_VIEW_TYPE.cards }));
  }

  public handleToggleFavorite() {
    if (!this.isFavoritePlace) {
      this.store.dispatch(FavoritesActions.setPlace({ key: this.currentPlaceKey}));
    } else {
      this.store.dispatch(FavoritesActions.removePlace({ key: this.currentPlaceKey}));
    }
  }

  private checkIsFavorite() {
    this.store.select(selectFavoritesKeys).pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(favoritesList => {
        this.isFavoritePlace = favoritesList.includes(this.currentPlaceKey);
      });
  }

  private getForecastViewType() {
    this.store.select(selectForecastViewType).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(type => {
      this.forecastDisplayType = type;
      this.isForecastChart = type === FORECAST_VIEW_TYPE.chartDayNight || type === FORECAST_VIEW_TYPE.chartAvg;
    })
  }
}

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
import { CurrentWeatherComponent } from './components/current-weather/current-weather.component';
import { Store } from '@ngrx/store';
import { PlaceAutoCompletePrediction } from './components/search-autocomplete/search-autocomplete.interfaces';
import { CurrentPlaceActions } from './store/current-place.actions';
import { PredictionWeatherComponent } from './components/prediction-weather/prediction-weather.component';
import {
  PredictionWeatherChartComponent
} from './components/prediction-weather-chart/prediction-weather-chart.component';
import { FavoritesActions } from '../favorites/store/favorites.actions';
import { selectIsFavorite } from '../favorites/store/favorites.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FORECAST_VIEW_TYPE } from './components/prediction-weather-chart/prediction-weather-chart.interfaces';
import {
  selectCurrenPlaceLoadingStatus,
  selectCurrentPlaceCurrentData,
  selectForecastViewType
} from './store/current-place.selectors';
import { PlaceWithCurrentWeather } from '../public.interfaces';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';


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
    PredictionWeatherChartComponent,
    MatProgressSpinner
  ],
  templateUrl: './current-place.component.html',
  styleUrl: './current-place.component.scss',
})
export class CurrentPlaceComponent implements OnInit{
  public isLoading$: Observable<boolean> = this.store.select(selectCurrenPlaceLoadingStatus);
  public isForecastChart = false;
  public isFavoritePlace = false;
  public forecastDisplayType: FORECAST_VIEW_TYPE = FORECAST_VIEW_TYPE.cards;

  private currentPlace!: PlaceWithCurrentWeather;
  private destroyRef = inject(DestroyRef);

  constructor(
    private store: Store
  ) {}

  ngOnInit() {
    this.getForecastViewType();
    this.getCurrentPlaceFromStore();
    this.checkIsFavorite(this.currentPlace.key);
  }

  public handlePlaceSelected(place: PlaceAutoCompletePrediction) {
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
      this.store.dispatch(FavoritesActions.setPlace({ places: this.currentPlace, showNotification: true}));
    } else {
      this.store.dispatch(FavoritesActions.removePlace({ key: this.currentPlace.key, showNotification: true}));
    }
  }

  private getForecastViewType() {
    this.store.select(selectForecastViewType).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(type => {
      this.forecastDisplayType = type;
      this.isForecastChart = type === FORECAST_VIEW_TYPE.chartDayNight || type === FORECAST_VIEW_TYPE.chartAvg;
    })
  }

  private getCurrentPlaceFromStore() {
    this.store.select(selectCurrentPlaceCurrentData)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((currenPlace) => {
        this.currentPlace = currenPlace;
      });
  }

  private checkIsFavorite(key: string){
    this.store.select(selectIsFavorite).pipe(
      takeUntilDestroyed(this.destroyRef))
      .subscribe((isFavorite => {
        this.isFavoritePlace = isFavorite;
      }));
  }
}

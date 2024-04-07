import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { WeatherForecast, WeatherForecastTelemetry } from './prediction-weater.interfaces';
import { Store } from '@ngrx/store';
import { selectCurrentPlacePredictedData } from '../../store/current-place.selectors';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { forecastToTelemetryTransformer } from './utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-prediction-weather',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTooltip, MatSlideToggleModule],
  templateUrl: './prediction-weather.component.html',
  styleUrl: './prediction-weather.component.scss',
})
export class PredictionWeatherComponent implements OnInit{
  public forecast: WeatherForecast | null = null;

  private destroyRef = inject(DestroyRef);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectCurrentPlacePredictedData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
      this.forecast = data;
    })
  }


}
import { Component, DestroyRef, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { selectCurrentPlacePredictedData } from '../../store/current-place.selectors';
import { forecastToTelemetryTransformer } from '../prediction-weather/utils';
import { Store } from '@ngrx/store';
import { WeatherForecastTelemetry } from '../prediction-weather/prediction-weater.interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-prediction-weather-chart',
  standalone: true,
  imports: [],
  templateUrl: './prediction-weather-chart.component.html',
  styleUrl: './prediction-weather-chart.component.scss'
})
export class PredictionWeatherChartComponent implements OnInit {
  @ViewChild('chartDivElement') chartElementRef!: ElementRef;


  public forecastTelemetry: WeatherForecastTelemetry  | null = null;
  private destroyRef = inject(DestroyRef);
  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.select(selectCurrentPlacePredictedData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
      if (data) {
        this.forecastTelemetry = forecastToTelemetryTransformer(data.forecast);
        console.log(this.forecastTelemetry)
      }
    })
  }


}

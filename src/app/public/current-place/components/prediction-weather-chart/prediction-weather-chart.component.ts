import { Component, DestroyRef, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { selectCurrentPlacePredictedData } from '../../store/current-place.selectors';
import { forecastToTelemetryTransformer } from '../prediction-weather/utils';
import { Store } from '@ngrx/store';
import { WeatherForecastTelemetry } from '../prediction-weather/prediction-weater.interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EChartsOption, EChartsType } from 'echarts';
import * as echarts from 'echarts';


@Component({
  selector: 'app-prediction-weather-chart',
  standalone: true,
  imports: [],
  templateUrl: './prediction-weather-chart.component.html',
  styleUrl: './prediction-weather-chart.component.scss'
})
export class PredictionWeatherChartComponent implements OnInit {
  @ViewChild('chartDivElement') chartElementRef!: ElementRef;

  public chart!: EChartsType;
  public options!: EChartsOption;

  private tooltipValues!: string[];

  private destroyRef = inject(DestroyRef);

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeChart();
  }
  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.select(selectCurrentPlacePredictedData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
      if (data) {
        const forecastTelemetry = forecastToTelemetryTransformer(data.forecast);
        this.createOptions(forecastTelemetry);
        this.createTooltipValues(forecastTelemetry);
        setTimeout(() => this.initChart());
      }
    })
  }

  initChart() {
    if (this.chartElementRef) {
      this.chart = echarts.init(this.chartElementRef.nativeElement);
      this.chart.setOption(this.options);
      this.resizeChart();
    } else {
      console.log('element not present');
    }
  }

  private resizeChart() {
    if (this.chartElementRef && this.chart) {
      this.chart.resize({
        width: 'auto',
        height: 'auto',
      });
    } else {
      console.log('element not present for resize');
    }
  }

  private createOptions(forecastTelemetry: WeatherForecastTelemetry) {
    this.options = {
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          const index = (params as unknown as any)[0].dataIndex;
          return this.tooltipValues[index];
        },
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: Object.keys(forecastTelemetry)
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: Object.values(forecastTelemetry).map(value => value.avg),
          type: 'line',
          areaStyle: {}
        }
      ]
    }
  }

  private createTooltipValues(forecastTelemetry: WeatherForecastTelemetry) {
    this.tooltipValues = Object.values(forecastTelemetry).map(value => {
      return `<p><strong>Min:</strong> ${value.min}°C</p><p><strong>Max:</strong> ${value.max}°C</p>
               <p><strong>Day:</strong> ${value.dayDescription}</p><p><strong>Night:</strong> ${value.nightDescription}</p>`;
    });
  }
}

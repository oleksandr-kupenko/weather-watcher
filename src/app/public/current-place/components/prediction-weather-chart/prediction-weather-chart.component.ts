import { Component, DestroyRef, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { selectCurrentPlacePredictedData } from '../../store/current-place.selectors';
import { forecastToTelemetryTransformer } from '../prediction-weather/utils';
import { Store } from '@ngrx/store';
import { WeatherForecastTelemetry } from '../prediction-weather/prediction-weater.interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EChartsOption, EChartsType } from 'echarts';
import * as echarts from 'echarts';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-prediction-weather-chart',
  standalone: true,
  imports: [MatCheckboxModule],
  templateUrl: './prediction-weather-chart.component.html',
  styleUrl: './prediction-weather-chart.component.scss'
})
export class PredictionWeatherChartComponent implements OnInit {
  @ViewChild('chartDivElement') chartElementRef!: ElementRef;

  public chart!: EChartsType;

  private currentOptions!: EChartsOption;
  private dayNightOptions!: EChartsOption;
  private onlyAvgOptions!: EChartsOption;

  private tooltipValues!: string[];

  private destroyRef = inject(DestroyRef);

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.resizeChart();
  }
  constructor(private store: Store) {
  }

  ngOnInit() {
    this.initChartWithOptions();
  }

  public handleTypeChart(value: boolean) {
    if (value) {
      this.currentOptions = this.onlyAvgOptions;
      this.chart.setOption(this.currentOptions, true);
    } else {
      this.currentOptions = this.dayNightOptions;
      this.chart.setOption(this.dayNightOptions, true);
    }
  }

  private initChart() {
    if (this.chartElementRef) {
      this.chart = echarts.init(this.chartElementRef.nativeElement);
      setTimeout(() => this.chart.setOption(this.currentOptions), 100);
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
    this.dayNightOptions = {
      grid: {
        right: '3%'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
        }
      },
      legend: {
        data: ['Day', 'Night', 'AVG']
      },
      xAxis: [
        {
          type: 'category',
          data: Object.keys(forecastTelemetry),
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Temperature',
          interval: 5,
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        {
          type: 'value',
          name: 'Night',
          interval: 5,
          axisLabel: {
            formatter: '{value} °C'
          },
          show: false
        }
      ],
      series: [
        {
          name: 'Night',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' °C';
            }
          },
          data: Object.values(forecastTelemetry).map(value => value.min)
        },
        {
          name: 'Day',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' °C';
            }
          },
          data: Object.values(forecastTelemetry).map(value => value.max)
        },
        {
          name: 'AVG Temperature',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value + ' °C';
            }
          },
          data: Object.values(forecastTelemetry).map(value => value.avg)
        }
      ]
    }
  }

  private createAVGOptions(forecastTelemetry: WeatherForecastTelemetry) {
    this.onlyAvgOptions = {
      grid: {
        right: '5%'
      },
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

  private initChartWithOptions() {
    this.store.select(selectCurrentPlacePredictedData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        if (data) {
          const forecastTelemetry = forecastToTelemetryTransformer(data.forecast);
          this.createOptions(forecastTelemetry);
          this.createAVGOptions(forecastTelemetry);
          this.createTooltipValues(forecastTelemetry);
          this.currentOptions = this.dayNightOptions;
          setTimeout(() => this.initChart());
        }
      });
  }
}

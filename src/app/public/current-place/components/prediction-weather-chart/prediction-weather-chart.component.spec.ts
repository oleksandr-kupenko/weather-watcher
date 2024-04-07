import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionWeatherChartComponent } from './prediction-weather-chart.component';

describe('PredictionWeatherChartComponent', () => {
  let component: PredictionWeatherChartComponent;
  let fixture: ComponentFixture<PredictionWeatherChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionWeatherChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PredictionWeatherChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

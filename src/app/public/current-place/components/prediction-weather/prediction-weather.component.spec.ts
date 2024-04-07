import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionWeatherComponent } from './prediction-weather.component';

describe('PredictionWeatherComponent', () => {
  let component: PredictionWeatherComponent;
  let fixture: ComponentFixture<PredictionWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionWeatherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PredictionWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPlaceComponent } from './current-place.component';

describe('HomeComponent', () => {
  let component: CurrentPlaceComponent;
  let fixture: ComponentFixture<CurrentPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentPlaceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicWrapperComponent } from './public-wrapper.component';

describe('PublicWrapperComponent', () => {
  let component: PublicWrapperComponent;
  let fixture: ComponentFixture<PublicWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicWrapperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

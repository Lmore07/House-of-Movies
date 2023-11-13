import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderSerieComponent } from './slider-serie.component';

describe('SliderSerieComponent', () => {
  let component: SliderSerieComponent;
  let fixture: ComponentFixture<SliderSerieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderSerieComponent]
    });
    fixture = TestBed.createComponent(SliderSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

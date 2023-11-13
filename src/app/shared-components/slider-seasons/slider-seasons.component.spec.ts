import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderSeasonsComponent } from './slider-seasons.component';

describe('SliderSeasonsComponent', () => {
  let component: SliderSeasonsComponent;
  let fixture: ComponentFixture<SliderSeasonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderSeasonsComponent]
    });
    fixture = TestBed.createComponent(SliderSeasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

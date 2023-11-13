import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderPersonComponent } from './slider-person.component';

describe('SliderPersonComponent', () => {
  let component: SliderPersonComponent;
  let fixture: ComponentFixture<SliderPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SliderPersonComponent]
    });
    fixture = TestBed.createComponent(SliderPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

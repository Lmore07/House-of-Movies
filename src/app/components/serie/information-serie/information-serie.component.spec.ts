import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationSerieComponent } from './information-serie.component';

describe('InformationSerieComponent', () => {
  let component: InformationSerieComponent;
  let fixture: ComponentFixture<InformationSerieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformationSerieComponent]
    });
    fixture = TestBed.createComponent(InformationSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchImageComponent } from './watch-image.component';

describe('WatchImageComponent', () => {
  let component: WatchImageComponent;
  let fixture: ComponentFixture<WatchImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WatchImageComponent]
    });
    fixture = TestBed.createComponent(WatchImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

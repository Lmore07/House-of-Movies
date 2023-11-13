import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchVideoInfoComponent } from './watch-video-info.component';

describe('WatchVideoInfoComponent', () => {
  let component: WatchVideoInfoComponent;
  let fixture: ComponentFixture<WatchVideoInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WatchVideoInfoComponent]
    });
    fixture = TestBed.createComponent(WatchVideoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeModalComponent } from './episode-modal.component';

describe('EpisodeModalComponent', () => {
  let component: EpisodeModalComponent;
  let fixture: ComponentFixture<EpisodeModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EpisodeModalComponent]
    });
    fixture = TestBed.createComponent(EpisodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

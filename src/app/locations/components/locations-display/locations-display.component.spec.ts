import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsDisplayComponent } from './locations-display.component';

describe('LocationsDisplayComponent', () => {
  let component: LocationsDisplayComponent;
  let fixture: ComponentFixture<LocationsDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationsDisplayComponent]
    });
    fixture = TestBed.createComponent(LocationsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorsDisplayComponent } from './directors-display.component';

describe('DirectorsDisplayComponent', () => {
  let component: DirectorsDisplayComponent;
  let fixture: ComponentFixture<DirectorsDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectorsDisplayComponent]
    });
    fixture = TestBed.createComponent(DirectorsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

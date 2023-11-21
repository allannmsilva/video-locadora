import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentsDisplayComponent } from './dependents-display.component';

describe('DependentsDisplayComponent', () => {
  let component: DependentsDisplayComponent;
  let fixture: ComponentFixture<DependentsDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DependentsDisplayComponent]
    });
    fixture = TestBed.createComponent(DependentsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

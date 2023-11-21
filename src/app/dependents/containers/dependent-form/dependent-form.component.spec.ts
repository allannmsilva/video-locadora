import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentFormComponent } from './dependent-form.component';

describe('DependentsFormComponent', () => {
  let component: DependentFormComponent;
  let fixture: ComponentFixture<DependentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DependentFormComponent]
    });
    fixture = TestBed.createComponent(DependentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

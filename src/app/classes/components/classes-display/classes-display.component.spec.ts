import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesDisplayComponent } from './classes-display.component';

describe('ClassesDisplayComponent', () => {
  let component: ClassesDisplayComponent;
  let fixture: ComponentFixture<ClassesDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesDisplayComponent]
    });
    fixture = TestBed.createComponent(ClassesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

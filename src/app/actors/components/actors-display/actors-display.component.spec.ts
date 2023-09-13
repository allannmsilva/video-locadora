import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorsDisplayComponent } from './actors-display.component';

describe('ActorsDisplayComponent', () => {
  let component: ActorsDisplayComponent;
  let fixture: ComponentFixture<ActorsDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActorsDisplayComponent]
    });
    fixture = TestBed.createComponent(ActorsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

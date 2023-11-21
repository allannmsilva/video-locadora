import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersDisplayComponent } from './partners-display.component';

describe('PartnersDisplayComponent', () => {
  let component: PartnersDisplayComponent;
  let fixture: ComponentFixture<PartnersDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnersDisplayComponent]
    });
    fixture = TestBed.createComponent(PartnersDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorsComponent } from './actors.component';

describe('ActorsComponent', () => {
  let component: ActorsComponent;
  let fixture: ComponentFixture<ActorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActorsComponent]
    });
    fixture = TestBed.createComponent(ActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

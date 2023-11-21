import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerFormComponent } from './partner-form.component';

describe('PartnerFormComponent', () => {
  let component: PartnerFormComponent;
  let fixture: ComponentFixture<PartnerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerFormComponent]
    });
    fixture = TestBed.createComponent(PartnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DependentsService } from './dependents.service';

describe('DependentsService', () => {
  let service: DependentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DependentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

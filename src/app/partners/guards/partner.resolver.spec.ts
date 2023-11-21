import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { partnerResolver } from './partner.resolver';
import { Partner } from '../model/partner';

describe('partnerResolver', () => {
  const executeResolver: ResolveFn<Partner> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => partnerResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
